"""NSPanel Lovelace Editor - Visual editor for NSPanel Lovelace UI configuration.

For more details about this integration, please refer to the documentation.
"""
from __future__ import annotations

import json
from pathlib import Path
from typing import TYPE_CHECKING

from homeassistant.components import frontend
from homeassistant.config_entries import ConfigEntry
from homeassistant.core import HomeAssistant
from homeassistant.helpers import config_validation as cv

from .const import CONF_APPDAEMON_PATH, DOMAIN, LOGGER, NAME
from .storage import NsPanelStorage
from .websocket_api import async_register_websocket_commands

_MANIFEST_PATH = Path(__file__).parent / "manifest.json"

try:
    from homeassistant.components.http import StaticPathConfig
except ImportError:
    class StaticPathConfig:  # type: ignore[no-redef]
        """Shim for HA < 2024.7."""

        def __init__(self, url_path: str, path: str, cache_headers: bool) -> None:
            self.url_path = url_path
            self.path = path
            self.cache_headers = cache_headers


CONFIG_SCHEMA = cv.config_entry_only_config_schema(DOMAIN)


async def async_setup(hass: HomeAssistant, config: dict) -> bool:
    """Set up the NSPanel Lovelace Editor component."""
    hass.data.setdefault(DOMAIN, {})
    return True


async def async_setup_entry(hass: HomeAssistant, entry: ConfigEntry) -> bool:
    """Set up NSPanel Lovelace Editor from a config entry."""
    hass.data.setdefault(DOMAIN, {})

    # Store config
    hass.data[DOMAIN]["appdaemon_path"] = entry.data.get(CONF_APPDAEMON_PATH, "")

    # Initialize storage
    storage = NsPanelStorage(hass)
    hass.data[DOMAIN]["storage"] = storage

    # Register WebSocket commands
    async_register_websocket_commands(hass)

    # Register static path for frontend assets
    frontend_path = Path(__file__).parent / "frontend"
    url_path = f"/{DOMAIN}"

    if hasattr(hass.http, "async_register_static_paths"):
        await hass.http.async_register_static_paths(
            [
                StaticPathConfig(
                    url_path=url_path,
                    path=str(frontend_path),
                    cache_headers=False,
                )
            ]
        )
    elif hasattr(hass.http, "register_static_path"):
        hass.http.register_static_path(url_path, str(frontend_path), False)

    # Read version from manifest.json for cache busting
    try:
        version = json.loads(_MANIFEST_PATH.read_text())["version"]
    except Exception:
        version = "0"

    # Register sidebar panel
    frontend.async_register_built_in_panel(
        hass,
        component_name="custom",
        sidebar_title=NAME,
        sidebar_icon="mdi:tablet-dashboard",
        frontend_url_path=DOMAIN.replace("_", "-"),
        config={"_panel_custom": {
            "name": "nspanel-lovelace-editor",
            "embed_iframe": False,
            "trust_external": False,
            "js_url": f"{url_path}/entrypoint.js?v={version}",
        }},
        require_admin=True,
    )

    LOGGER.info("NSPanel Lovelace Editor setup complete")
    return True


async def async_unload_entry(hass: HomeAssistant, entry: ConfigEntry) -> bool:
    """Handle removal of an entry."""
    frontend.async_remove_panel(hass, DOMAIN.replace("_", "-"))
    hass.data.pop(DOMAIN, None)
    return True
