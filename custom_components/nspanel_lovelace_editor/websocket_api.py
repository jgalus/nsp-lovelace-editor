"""WebSocket API for NSPanel Lovelace Editor."""
from __future__ import annotations

from typing import Any

import voluptuous as vol

from homeassistant.components import websocket_api
from homeassistant.core import HomeAssistant, callback

from .const import CONF_APPDAEMON_PATH, DOMAIN, LOGGER
from .schema import validate_panel
from .storage import NsPanelStorage
from .yaml_io import (
    YamlPermissionError,
    YamlVerificationError,
    YamlWriteError,
    check_yaml_path,
    export_to_appdaemon_yaml,
    parse_appdaemon_yaml,
    parse_yaml_string,
    write_appdaemon_yaml,
)

# panel_id must be a safe identifier: alphanumeric, hyphens, underscores, 1-64 chars
PANEL_ID = vol.All(str, vol.Match(r"^[a-zA-Z0-9_-]{1,64}$"))
PANEL_DATA_SCHEMA = {
    vol.Required("config"): dict,
    vol.Optional("cards"): list,
    vol.Optional("hiddenCards"): list,
    vol.Optional("screensaver"): dict,
}


def async_register_websocket_commands(hass: HomeAssistant) -> None:
    """Register WebSocket commands."""
    websocket_api.async_register_command(hass, ws_list_panels)
    websocket_api.async_register_command(hass, ws_get_panel)
    websocket_api.async_register_command(hass, ws_save_panel)
    websocket_api.async_register_command(hass, ws_delete_panel)
    websocket_api.async_register_command(hass, ws_import_yaml)
    websocket_api.async_register_command(hass, ws_export_yaml)
    websocket_api.async_register_command(hass, ws_preview_yaml)
    websocket_api.async_register_command(hass, ws_import_yaml_text)
    websocket_api.async_register_command(hass, ws_check_yaml_path)


def _get_storage(hass: HomeAssistant) -> NsPanelStorage:
    """Get the storage instance."""
    return hass.data[DOMAIN]["storage"]


def _get_appdaemon_path(hass: HomeAssistant) -> str:
    """Get the configured AppDaemon path."""
    return hass.data[DOMAIN].get("appdaemon_path", "")


def _normalize_panel_data(payload: dict[str, Any]) -> dict[str, Any]:
    """Normalize panel data into the storage/export structure."""
    return {
        "config": payload["config"],
        "cards": payload.get("cards", []),
        "hiddenCards": payload.get("hiddenCards", []),
        "screensaver": payload.get("screensaver", {}),
    }


@websocket_api.require_admin
@websocket_api.websocket_command(
    {vol.Required("type"): "nspanel_editor/list_panels"}
)
@websocket_api.async_response
async def ws_list_panels(
    hass: HomeAssistant,
    connection: websocket_api.ActiveConnection,
    msg: dict[str, Any],
) -> None:
    """List all configured NSPanel instances."""
    storage = _get_storage(hass)
    panels = await storage.async_get_panels()
    # Return summary info for each panel
    result = {}
    for panel_id, panel_data in panels.items():
        config = panel_data.get("config", {})
        result[panel_id] = {
            "model": config.get("model", "eu"),
            "card_count": len(panel_data.get("cards", [])),
            "hidden_card_count": len(panel_data.get("hiddenCards", [])),
            "has_screensaver": bool(panel_data.get("screensaver")),
        }
    connection.send_result(msg["id"], {"panels": result})


@websocket_api.require_admin
@websocket_api.websocket_command(
    {
        vol.Required("type"): "nspanel_editor/get_panel",
        vol.Required("panel_id"): PANEL_ID,
    }
)
@websocket_api.async_response
async def ws_get_panel(
    hass: HomeAssistant,
    connection: websocket_api.ActiveConnection,
    msg: dict[str, Any],
) -> None:
    """Get full config for one panel."""
    storage = _get_storage(hass)
    panel = await storage.async_get_panel(msg["panel_id"])
    if panel is None:
        connection.send_error(msg["id"], "not_found", "Panel not found")
        return
    connection.send_result(msg["id"], {"panel_id": msg["panel_id"], **panel})


@websocket_api.require_admin
@websocket_api.websocket_command(
    {
        vol.Required("type"): "nspanel_editor/save_panel",
        vol.Required("panel_id"): PANEL_ID,
        vol.Required("config"): dict,
        vol.Optional("cards"): list,
        vol.Optional("hiddenCards"): list,
        vol.Optional("screensaver"): dict,
    }
)
@websocket_api.async_response
async def ws_save_panel(
    hass: HomeAssistant,
    connection: websocket_api.ActiveConnection,
    msg: dict[str, Any],
) -> None:
    """Save/update a panel config."""
    storage = _get_storage(hass)
    panel_data = _normalize_panel_data(msg)
    errors = validate_panel(panel_data)
    if errors:
        connection.send_error(
            msg["id"],
            "validation_error",
            f"Invalid panel config: {'; '.join(errors)}",
        )
        return
    await storage.async_save_panel(msg["panel_id"], panel_data)
    connection.send_result(msg["id"], {"success": True})


@websocket_api.require_admin
@websocket_api.websocket_command(
    {
        vol.Required("type"): "nspanel_editor/delete_panel",
        vol.Required("panel_id"): PANEL_ID,
    }
)
@websocket_api.async_response
async def ws_delete_panel(
    hass: HomeAssistant,
    connection: websocket_api.ActiveConnection,
    msg: dict[str, Any],
) -> None:
    """Delete a panel config."""
    storage = _get_storage(hass)
    deleted = await storage.async_delete_panel(msg["panel_id"])
    if not deleted:
        connection.send_error(msg["id"], "not_found", "Panel not found")
        return
    connection.send_result(msg["id"], {"success": True})


@websocket_api.require_admin
@websocket_api.websocket_command(
    {vol.Required("type"): "nspanel_editor/import_yaml"}
)
@websocket_api.async_response
async def ws_import_yaml(
    hass: HomeAssistant,
    connection: websocket_api.ActiveConnection,
    msg: dict[str, Any],
) -> None:
    """Import config from apps.yaml into storage."""
    appdaemon_path = _get_appdaemon_path(hass)
    if not appdaemon_path:
        connection.send_error(msg["id"], "not_configured", "AppDaemon path not set")
        return

    try:
        panels = await hass.async_add_executor_job(
            parse_appdaemon_yaml, appdaemon_path
        )
    except FileNotFoundError as err:
        LOGGER.warning("apps.yaml not found: %s", err)
        connection.send_error(msg["id"], "file_not_found", "apps.yaml not found at configured path")
        return
    except Exception as err:
        LOGGER.exception("Failed to parse apps.yaml")
        connection.send_error(msg["id"], "parse_error", "Failed to parse apps.yaml")
        return

    storage = _get_storage(hass)
    for panel_id, panel_data in panels.items():
        await storage.async_save_panel(panel_id, panel_data)

    connection.send_result(
        msg["id"],
        {"imported": list(panels.keys()), "count": len(panels)},
    )


@websocket_api.require_admin
@websocket_api.websocket_command(
    {vol.Required("type"): "nspanel_editor/export_yaml"}
)
@websocket_api.async_response
async def ws_export_yaml(
    hass: HomeAssistant,
    connection: websocket_api.ActiveConnection,
    msg: dict[str, Any],
) -> None:
    """Export config from storage to apps.yaml."""
    appdaemon_path = _get_appdaemon_path(hass)
    if not appdaemon_path:
        connection.send_error(msg["id"], "not_configured", "AppDaemon path not set")
        return

    storage = _get_storage(hass)
    panels = await storage.async_get_panels()

    try:
        await hass.async_add_executor_job(
            write_appdaemon_yaml, appdaemon_path, panels
        )
    except YamlPermissionError as err:
        LOGGER.error("Permission denied writing apps.yaml: %s", err)
        connection.send_error(
            msg["id"],
            "permission_denied",
            "Permission denied writing to apps.yaml. "
            "Ensure the Home Assistant process has write access.",
        )
        return
    except YamlVerificationError as err:
        LOGGER.error("Verification failed after writing apps.yaml: %s", err)
        connection.send_error(
            msg["id"],
            "verification_failed",
            "Written file failed verification. Check disk space and file integrity.",
        )
        return
    except OSError as err:
        LOGGER.exception("I/O error writing apps.yaml")
        connection.send_error(
            msg["id"],
            "io_error",
            "I/O error writing to apps.yaml",
        )
        return
    except Exception as err:
        LOGGER.exception("Failed to write apps.yaml")
        connection.send_error(msg["id"], "write_error", "Failed to write apps.yaml")
        return

    connection.send_result(
        msg["id"],
        {"exported": list(panels.keys()), "count": len(panels)},
    )


@websocket_api.require_admin
@websocket_api.websocket_command(
    {
        vol.Required("type"): "nspanel_editor/preview_yaml",
        vol.Optional("panel_id"): PANEL_ID,
        vol.Optional("panel"): PANEL_DATA_SCHEMA,
    }
)
@websocket_api.async_response
async def ws_preview_yaml(
    hass: HomeAssistant,
    connection: websocket_api.ActiveConnection,
    msg: dict[str, Any],
) -> None:
    """Preview the YAML that would be exported without writing it."""
    appdaemon_path = _get_appdaemon_path(hass)
    storage = _get_storage(hass)
    panels = dict(await storage.async_get_panels())

    panel_override = msg.get("panel")
    panel_id = msg.get("panel_id")
    if (panel_override is None) != (panel_id is None):
        connection.send_error(
            msg["id"],
            "invalid_format",
            "panel_id and panel must be provided together.",
        )
        return

    if panel_override is not None and panel_id is not None:
        panel_data = _normalize_panel_data(panel_override)
        errors = validate_panel(panel_data)
        if errors:
            connection.send_error(
                msg["id"],
                "validation_error",
                f"Invalid panel config: {'; '.join(errors)}",
            )
            return
        panels[panel_id] = panel_data

    try:
        yaml_str = await hass.async_add_executor_job(
            export_to_appdaemon_yaml, appdaemon_path or "", panels
        )
    except Exception as err:
        LOGGER.exception("Failed to generate YAML preview")
        connection.send_error(msg["id"], "preview_error", "Failed to generate YAML preview")
        return

    connection.send_result(msg["id"], {"yaml": yaml_str})


@websocket_api.require_admin
@websocket_api.websocket_command(
    {
        vol.Required("type"): "nspanel_editor/import_yaml_text",
        vol.Required("yaml_text"): vol.All(str, vol.Length(max=1_048_576)),
    }
)
@websocket_api.async_response
async def ws_import_yaml_text(
    hass: HomeAssistant,
    connection: websocket_api.ActiveConnection,
    msg: dict[str, Any],
) -> None:
    """Import config from pasted YAML text.

    Use this when direct file access to apps.yaml is unavailable,
    e.g. in container deployments where AppDaemon runs separately.
    """
    try:
        panels = await hass.async_add_executor_job(
            parse_yaml_string, msg["yaml_text"]
        )
    except Exception as err:
        LOGGER.exception("Failed to parse pasted YAML")
        connection.send_error(msg["id"], "parse_error", "Failed to parse pasted YAML")
        return

    if not panels:
        connection.send_error(
            msg["id"],
            "no_panels_found",
            "No NSPanel Lovelace UI entries found in the pasted YAML. "
            "Entries must have module: nspanel-lovelace-ui and "
            "class: NsPanelLovelaceUIManager.",
        )
        return

    storage = _get_storage(hass)
    for panel_id, panel_data in panels.items():
        await storage.async_save_panel(panel_id, panel_data)

    connection.send_result(
        msg["id"],
        {"imported": list(panels.keys()), "count": len(panels)},
    )


@websocket_api.require_admin
@websocket_api.websocket_command(
    {vol.Required("type"): "nspanel_editor/check_yaml_path"}
)
@websocket_api.async_response
async def ws_check_yaml_path(
    hass: HomeAssistant,
    connection: websocket_api.ActiveConnection,
    msg: dict[str, Any],
) -> None:
    """Check accessibility of the configured apps.yaml path."""
    appdaemon_path = _get_appdaemon_path(hass)
    if not appdaemon_path:
        connection.send_error(msg["id"], "not_configured", "AppDaemon path not set")
        return

    result = await hass.async_add_executor_job(check_yaml_path, appdaemon_path)
    connection.send_result(msg["id"], result)
