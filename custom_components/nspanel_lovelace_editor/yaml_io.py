"""YAML import/export for NSPanel Lovelace UI AppDaemon configuration."""
from __future__ import annotations

from pathlib import Path
from typing import Any

import yaml

from .const import LOGGER

NSPANEL_MODULE = "nspanel-lovelace-ui"
NSPANEL_CLASS = "NsPanelLovelaceUIManager"


def parse_appdaemon_yaml(file_path: str) -> dict[str, Any]:
    """Parse AppDaemon apps.yaml and extract NSPanel entries.

    Returns a dict of panel_id -> config for NSPanel Lovelace UI entries.
    """
    path = Path(file_path)
    if not path.is_file():
        raise FileNotFoundError(f"apps.yaml not found at {file_path}")

    with open(path, encoding="utf-8") as f:
        data = yaml.safe_load(f) or {}

    panels: dict[str, Any] = {}
    for key, value in data.items():
        if not isinstance(value, dict):
            continue
        if (
            value.get("module") == NSPANEL_MODULE
            and value.get("class") == NSPANEL_CLASS
        ):
            config = value.get("config", {})
            panels[key] = {
                "config": {
                    k: v
                    for k, v in config.items()
                    if k not in ("cards", "hiddenCards", "screensaver")
                },
                "cards": config.get("cards", []),
                "hiddenCards": config.get("hiddenCards", []),
                "screensaver": config.get("screensaver", {}),
            }
    return panels


def export_to_appdaemon_yaml(
    file_path: str, panels: dict[str, Any]
) -> str:
    """Export panel configs back to AppDaemon apps.yaml format.

    Merges NSPanel entries with existing non-NSPanel entries in the file.
    Returns the generated YAML string.
    """
    path = Path(file_path)

    # Load existing data to preserve non-NSPanel entries
    existing_data: dict[str, Any] = {}
    if path.is_file():
        with open(path, encoding="utf-8") as f:
            existing_data = yaml.safe_load(f) or {}

    # Remove old NSPanel entries
    for key in list(existing_data.keys()):
        value = existing_data[key]
        if isinstance(value, dict) and (
            value.get("module") == NSPANEL_MODULE
            and value.get("class") == NSPANEL_CLASS
        ):
            del existing_data[key]

    # Add updated NSPanel entries
    for panel_id, panel_data in panels.items():
        config = dict(panel_data.get("config", {}))
        if panel_data.get("cards"):
            config["cards"] = panel_data["cards"]
        if panel_data.get("hiddenCards"):
            config["hiddenCards"] = panel_data["hiddenCards"]
        if panel_data.get("screensaver"):
            config["screensaver"] = panel_data["screensaver"]

        existing_data[panel_id] = {
            "module": NSPANEL_MODULE,
            "class": NSPANEL_CLASS,
            "config": config,
        }

    yaml_str = yaml.dump(
        existing_data,
        default_flow_style=False,
        allow_unicode=True,
        sort_keys=False,
    )
    return yaml_str


def write_appdaemon_yaml(file_path: str, panels: dict[str, Any]) -> None:
    """Write the exported YAML to the apps.yaml file."""
    yaml_str = export_to_appdaemon_yaml(file_path, panels)
    path = Path(file_path)
    path.parent.mkdir(parents=True, exist_ok=True)
    with open(path, "w", encoding="utf-8") as f:
        f.write(yaml_str)
    LOGGER.info("Exported NSPanel config to %s", file_path)
