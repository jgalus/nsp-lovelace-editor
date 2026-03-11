"""Helpers for validating filesystem paths used by the integration."""
from __future__ import annotations

from pathlib import Path

_ALLOWED_PATH_ROOTS = (
    Path("/config"),
    Path("/addon_configs"),
    Path("/homeassistant"),
    Path("/share"),
)


def is_allowed_path(path_str: str) -> bool:
    """Return True if path_str resolves within one of the allowed roots."""
    try:
        resolved = Path(path_str).resolve()
    except (OSError, RuntimeError, ValueError):
        return False

    return any(
        root == resolved or root in resolved.parents
        for root in _ALLOWED_PATH_ROOTS
    )


def validate_allowed_path(path_str: str) -> None:
    """Raise PermissionError if path_str resolves outside allowed roots."""
    if not is_allowed_path(path_str):
        raise PermissionError(
            f"Path {path_str} is outside allowed directories"
        )
