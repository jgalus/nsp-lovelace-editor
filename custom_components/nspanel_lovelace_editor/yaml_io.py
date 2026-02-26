"""YAML import/export for NSPanel Lovelace UI AppDaemon configuration."""
from __future__ import annotations

import os
import tempfile
from pathlib import Path
from typing import Any

import yaml

from .const import LOGGER

NSPANEL_MODULE = "nspanel-lovelace-ui"
NSPANEL_CLASS = "NsPanelLovelaceUIManager"

# Allowed parent directories for file I/O operations
_ALLOWED_PATH_PREFIXES = (
    "/config/",
    "/addon_configs/",
    "/homeassistant/",
    "/share/",
)


def _validate_path_safety(file_path: str) -> None:
    """Ensure file_path resolves within allowed directories."""
    resolved = str(Path(file_path).resolve())
    if not any(
        resolved.startswith(prefix.rstrip("/"))
        for prefix in _ALLOWED_PATH_PREFIXES
    ):
        raise PermissionError(
            f"Path {file_path} is outside allowed directories"
        )


class YamlWriteError(Exception):
    """Base exception for YAML write failures."""


class YamlPermissionError(YamlWriteError):
    """Raised when the process lacks permission to write the YAML file."""


class YamlVerificationError(YamlWriteError):
    """Raised when the written file fails post-write verification."""


def parse_appdaemon_yaml(file_path: str) -> dict[str, Any]:
    """Parse AppDaemon apps.yaml and extract NSPanel entries.

    Returns a dict of panel_id -> config for NSPanel Lovelace UI entries.
    """
    _validate_path_safety(file_path)
    path = Path(file_path)
    if not path.is_file():
        raise FileNotFoundError(f"apps.yaml not found at {file_path}")

    with open(path, encoding="utf-8") as f:
        content = f.read()

    return _extract_nspanel_entries(yaml.safe_load(content) or {})


def parse_yaml_string(yaml_text: str) -> dict[str, Any]:
    """Parse a YAML string and extract NSPanel entries.

    Use this when direct file access is unavailable (e.g., container deployments
    where AppDaemon runs in a separate container).
    """
    data = yaml.safe_load(yaml_text) or {}
    return _extract_nspanel_entries(data)


def _extract_nspanel_entries(data: dict[str, Any]) -> dict[str, Any]:
    """Extract NSPanel Lovelace UI entries from parsed AppDaemon config."""
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
    if file_path and path.is_file():
        _validate_path_safety(file_path)
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
    """Write the exported YAML to the apps.yaml file.

    Uses atomic write (temp file + rename) with pre-write permission checks
    and post-write verification.

    Raises:
        YamlPermissionError: If the process lacks write access.
        YamlVerificationError: If the written file fails read-back verification.
        OSError: For other I/O failures (disk full, etc.).
    """
    _validate_path_safety(file_path)
    path = Path(file_path)

    # Pre-write permission checks
    _check_write_permissions(path)

    yaml_str = export_to_appdaemon_yaml(file_path, panels)

    # Atomic write: write to temp file in same directory, then rename
    parent = path.parent
    try:
        fd, tmp_path = tempfile.mkstemp(
            dir=str(parent), prefix=".apps_yaml_", suffix=".tmp"
        )
        try:
            os.fchmod(fd, 0o644)
            with os.fdopen(fd, "w", encoding="utf-8") as f:
                f.write(yaml_str)
                f.flush()
                os.fsync(f.fileno())
        except Exception:
            # Clean up temp file on write failure
            try:
                os.unlink(tmp_path)
            except OSError:
                pass
            raise

        os.replace(tmp_path, str(path))
    except PermissionError as err:
        raise YamlPermissionError(
            f"Permission denied writing to {file_path}. "
            "Ensure the Home Assistant process has write access to the "
            "AppDaemon configuration directory. In container setups, check "
            "that the volume is mounted with write permissions."
        ) from err

    # Post-write verification: read back and confirm valid YAML with entries
    _verify_written_file(path, panels)

    LOGGER.info("Exported NSPanel config to %s", file_path)


def check_yaml_path(file_path: str) -> dict[str, Any]:
    """Check accessibility of the apps.yaml path.

    Returns a dict with keys: exists, readable, writable, parent_writable, error.
    """
    _validate_path_safety(file_path)
    path = Path(file_path)
    result: dict[str, Any] = {
        "path": file_path,
        "exists": False,
        "readable": False,
        "writable": False,
        "parent_writable": False,
        "error": None,
    }

    try:
        result["exists"] = path.is_file()
        if result["exists"]:
            result["readable"] = os.access(str(path), os.R_OK)
            result["writable"] = os.access(str(path), os.W_OK)
        result["parent_writable"] = (
            path.parent.is_dir() and os.access(str(path.parent), os.W_OK)
        )
    except OSError as err:
        result["error"] = str(err)

    return result


def _check_write_permissions(path: Path) -> None:
    """Raise YamlPermissionError if the path is not writable."""
    parent = path.parent
    if not parent.is_dir():
        raise YamlPermissionError(
            f"Directory {parent} does not exist. "
            "Check the configured AppDaemon apps.yaml path."
        )
    if not os.access(str(parent), os.W_OK):
        raise YamlPermissionError(
            f"No write permission on directory {parent}. "
            "In container setups, ensure the AppDaemon config volume "
            "is mounted with write permissions."
        )
    if path.is_file() and not os.access(str(path), os.W_OK):
        raise YamlPermissionError(
            f"No write permission on {path}. "
            "Check file ownership and permissions."
        )


def _verify_written_file(path: Path, panels: dict[str, Any]) -> None:
    """Read back the written file and verify it contains valid YAML."""
    try:
        content = path.read_text(encoding="utf-8")
    except OSError as err:
        raise YamlVerificationError(
            f"Failed to read back {path} after writing: {err}"
        ) from err

    if not content.strip():
        raise YamlVerificationError(
            f"Written file {path} is empty after export."
        )

    try:
        data = yaml.safe_load(content)
    except yaml.YAMLError as err:
        raise YamlVerificationError(
            f"Written file {path} contains invalid YAML: {err}"
        ) from err

    if not isinstance(data, dict):
        raise YamlVerificationError(
            f"Written file {path} does not contain a YAML mapping."
        )

    # Verify expected NSPanel entries are present
    for panel_id in panels:
        if panel_id not in data:
            raise YamlVerificationError(
                f"Verification failed: panel '{panel_id}' missing from "
                f"written file {path}."
            )
