"""NSPanel Lovelace UI configuration schema definitions.

Based on https://docs.nspanel.pky.eu/config-overview/ and
https://github.com/joBr99/nspanel-lovelace-ui/tree/main/docs
"""
from __future__ import annotations

from typing import Any

import voluptuous as vol

from .const import (
    BACKGROUND_COLORS,
    CARD_TYPES,
    ENTITY_DOMAINS_CARD_ENTITIES,
    ENTITY_DOMAINS_CARD_QR,
    MODELS,
    SCREENSAVER_THEME_KEYS,
    SCREENSAVER_TYPES,
    UPDATE_MODES,
)

# --- Entity schema ---

ENTITY_SCHEMA = vol.Schema(
    {
        vol.Required("entity"): str,
        vol.Optional("name"): str,
        vol.Optional("value"): str,
        vol.Optional("icon"): vol.Any(str, dict),  # string or per-state map
        vol.Optional("color"): vol.Any(list, dict, str),  # [R,G,B], per-state map, or template
        vol.Optional("state"): str,
        vol.Optional("state_not"): str,
        vol.Optional("state_template"): str,
        vol.Optional("status"): str,
        vol.Optional("assumed_state"): str,
        vol.Optional("action_name"): str,
        vol.Optional("font"): vol.In(["small", "medium-icon", "medium"]),
        vol.Optional("effectList"): str,
        vol.Optional("data"): dict,  # for service entities
    },
    extra=vol.ALLOW_EXTRA,
)

# --- Card schemas ---

CARD_ENTITIES_SCHEMA = vol.Schema(
    {
        vol.Required("type"): "cardEntities",
        vol.Required("entities"): [ENTITY_SCHEMA],
        vol.Optional("title"): str,
        vol.Optional("key"): str,
        vol.Optional("navItem1"): ENTITY_SCHEMA,
        vol.Optional("navItem2"): ENTITY_SCHEMA,
    }
)

CARD_GRID_SCHEMA = vol.Schema(
    {
        vol.Required("type"): "cardGrid",
        vol.Required("entities"): [ENTITY_SCHEMA],
        vol.Optional("title"): str,
        vol.Optional("key"): str,
        vol.Optional("navItem1"): ENTITY_SCHEMA,
        vol.Optional("navItem2"): ENTITY_SCHEMA,
    }
)

CARD_THERMO_SCHEMA = vol.Schema(
    {
        vol.Required("type"): "cardThermo",
        vol.Required("entity"): str,
        vol.Optional("title"): str,
        vol.Optional("key"): str,
        vol.Optional("temperatureUnit"): vol.In(["celsius", "fahrenheit"]),
        vol.Optional("supportedModes"): list,
    }
)

CARD_MEDIA_SCHEMA = vol.Schema(
    {
        vol.Required("type"): "cardMedia",
        vol.Required("entity"): str,
        vol.Optional("title"): str,
        vol.Optional("key"): str,
        vol.Optional("entities"): [ENTITY_SCHEMA],
        vol.Optional("status"): str,
    }
)

CARD_ALARM_SCHEMA = vol.Schema(
    {
        vol.Required("type"): "cardAlarm",
        vol.Required("entity"): str,
        vol.Optional("title"): str,
        vol.Optional("key"): str,
        vol.Optional("alarmControl"): dict,
        vol.Optional("supportedModes"): list,
    }
)

CARD_QR_SCHEMA = vol.Schema(
    {
        vol.Required("type"): "cardQR",
        vol.Required("qrCode"): str,
        vol.Required("entities"): [ENTITY_SCHEMA],
        vol.Optional("title"): str,
        vol.Optional("key"): str,
    }
)

CARD_POWER_SCHEMA = vol.Schema(
    {
        vol.Required("type"): "cardPower",
        vol.Required("entities"): [ENTITY_SCHEMA],
        vol.Optional("title"): str,
        vol.Optional("key"): str,
        vol.Optional("cooldown"): vol.Any(int, float),
    }
)

CARD_SCHEMAS: dict[str, vol.Schema] = {
    "cardEntities": CARD_ENTITIES_SCHEMA,
    "cardGrid": CARD_GRID_SCHEMA,
    "cardThermo": CARD_THERMO_SCHEMA,
    "cardMedia": CARD_MEDIA_SCHEMA,
    "cardAlarm": CARD_ALARM_SCHEMA,
    "cardQR": CARD_QR_SCHEMA,
    "cardPower": CARD_POWER_SCHEMA,
}

# --- Screensaver schema ---

RGB_COLOR = vol.All(list, vol.Length(min=3, max=3))

SCREENSAVER_THEME_SCHEMA = vol.Schema(
    {vol.Optional(key): RGB_COLOR for key in SCREENSAVER_THEME_KEYS}
)

SCREENSAVER_ENTITY_SCHEMA = vol.Schema(
    {
        vol.Required("entity"): str,
        vol.Optional("type"): vol.In([0, 1, 2, 3]),
        vol.Optional("name"): str,
        vol.Optional("icon"): vol.Any(str, dict),
        vol.Optional("color"): vol.Any(list, dict, str),
        vol.Optional("value"): str,
    },
    extra=vol.ALLOW_EXTRA,
)

STATUS_ICON_SCHEMA = vol.Schema(
    {
        vol.Required("entity"): str,
        vol.Optional("icon"): vol.Any(str, dict),
        vol.Optional("color"): vol.Any(list, dict, str),
        vol.Optional("altFont"): bool,
    },
    extra=vol.ALLOW_EXTRA,
)

SCREENSAVER_SCHEMA = vol.Schema(
    {
        vol.Optional("entity"): str,
        vol.Optional("entities"): [SCREENSAVER_ENTITY_SCHEMA],
        vol.Optional("statusIcon1"): STATUS_ICON_SCHEMA,
        vol.Optional("statusIcon2"): STATUS_ICON_SCHEMA,
        vol.Optional("doubleTapToUnlock"): bool,
        vol.Optional("theme"): SCREENSAVER_THEME_SCHEMA,
        vol.Optional("defaultCard"): str,
        vol.Optional("key"): str,
        vol.Optional("type"): vol.In(SCREENSAVER_TYPES),
    },
    extra=vol.ALLOW_EXTRA,
)

# --- Brightness schedule schema ---

BRIGHTNESS_SCHEDULE_ENTRY = vol.Schema(
    {
        vol.Required("time"): str,  # "HH:MM:SS", "sunrise", "sunset + H:MM:SS"
        vol.Required("value"): vol.All(int, vol.Range(min=0, max=100)),
    }
)

SLEEP_OVERRIDE_SCHEMA = vol.Schema(
    {
        vol.Required("entity"): str,
        vol.Required("brightness"): vol.All(int, vol.Range(min=0, max=100)),
    }
)

# --- Global panel config schema ---

PANEL_CONFIG_SCHEMA = vol.Schema(
    {
        vol.Required("panelRecvTopic"): str,
        vol.Required("panelSendTopic"): str,
        vol.Optional("model"): vol.In(MODELS),
        vol.Optional("updateMode"): vol.In(UPDATE_MODES),
        vol.Optional("sleepTimeout"): vol.All(int, vol.Range(min=0)),
        vol.Optional("sleepBrightness"): vol.Any(
            int, str, [BRIGHTNESS_SCHEDULE_ENTRY]
        ),
        vol.Optional("screenBrightness"): vol.Any(
            int, str, [BRIGHTNESS_SCHEDULE_ENTRY]
        ),
        vol.Optional("sleepTracking"): str,
        vol.Optional("sleepTrackingZones"): [str],
        vol.Optional("sleepOverride"): SLEEP_OVERRIDE_SCHEMA,
        vol.Optional("locale"): str,
        vol.Optional("dateFormatBabel"): str,
        vol.Optional("timeFormat"): str,
        vol.Optional("dateFormat"): str,
        vol.Optional("dateAdditionalTemplate"): str,
        vol.Optional("timeAdditionalTemplate"): str,
        vol.Optional("timezone"): str,
        vol.Optional("defaultBackgroundColor"): vol.In(BACKGROUND_COLORS),
        vol.Optional("displayURL-EU"): str,
        vol.Optional("displayURL-US-L"): str,
        vol.Optional("displayURL-US-P"): str,
        vol.Optional("berryURL"): str,
    },
    extra=vol.ALLOW_EXTRA,
)


def validate_card(card: dict[str, Any]) -> dict[str, Any]:
    """Validate a single card configuration."""
    card_type = card.get("type")
    if card_type not in CARD_SCHEMAS:
        raise vol.Invalid(f"Unknown card type: {card_type}")
    return CARD_SCHEMAS[card_type](card)


def validate_panel(panel_data: dict[str, Any]) -> list[str]:
    """Validate a full panel configuration. Returns list of error messages."""
    errors: list[str] = []

    config = panel_data.get("config", {})
    try:
        PANEL_CONFIG_SCHEMA(config)
    except vol.Invalid as err:
        errors.append(f"Config: {err}")

    for i, card in enumerate(panel_data.get("cards", [])):
        try:
            validate_card(card)
        except vol.Invalid as err:
            errors.append(f"Card {i} ({card.get('type', '?')}): {err}")

    for i, card in enumerate(panel_data.get("hiddenCards", [])):
        try:
            validate_card(card)
        except vol.Invalid as err:
            errors.append(f"Hidden card {i} ({card.get('type', '?')}): {err}")

    screensaver = panel_data.get("screensaver", {})
    if screensaver:
        try:
            SCREENSAVER_SCHEMA(screensaver)
        except vol.Invalid as err:
            errors.append(f"Screensaver: {err}")

    return errors


def get_entity_domains_for_card(card_type: str) -> list[str]:
    """Get the supported entity domains for a given card type."""
    if card_type == "cardQR":
        return ENTITY_DOMAINS_CARD_QR
    if card_type == "cardPower":
        return ["sensor"]
    if card_type == "cardThermo":
        return ["climate"]
    if card_type == "cardMedia":
        return ["media_player"]
    if card_type == "cardAlarm":
        return ["alarm_control_panel"]
    return ENTITY_DOMAINS_CARD_ENTITIES
