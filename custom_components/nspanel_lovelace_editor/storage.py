"""Storage manager for NSPanel Lovelace Editor."""
from __future__ import annotations

from typing import Any

from homeassistant.core import HomeAssistant
from homeassistant.helpers.storage import Store

from .const import DOMAIN, LOGGER

STORAGE_VERSION = 1
STORAGE_KEY = f"{DOMAIN}.panels"


class NsPanelStorage:
    """Manage persistent storage for NSPanel configurations."""

    def __init__(self, hass: HomeAssistant) -> None:
        """Initialize the storage."""
        self._store = Store[dict[str, Any]](hass, STORAGE_VERSION, STORAGE_KEY)
        self._data: dict[str, Any] | None = None

    async def async_load(self) -> dict[str, Any]:
        """Load data from storage."""
        if self._data is None:
            stored = await self._store.async_load()
            self._data = stored or {"version": 1, "panels": {}}
        return self._data

    async def async_save(self) -> None:
        """Save data to storage."""
        if self._data is not None:
            await self._store.async_save(self._data)

    async def async_get_panels(self) -> dict[str, Any]:
        """Get all panel configurations."""
        data = await self.async_load()
        return data.get("panels", {})

    async def async_get_panel(self, panel_id: str) -> dict[str, Any] | None:
        """Get a single panel configuration."""
        panels = await self.async_get_panels()
        return panels.get(panel_id)

    async def async_save_panel(self, panel_id: str, config: dict[str, Any]) -> None:
        """Save a panel configuration."""
        data = await self.async_load()
        data.setdefault("panels", {})[panel_id] = config
        await self.async_save()
        LOGGER.debug("Saved panel config for %s", panel_id)

    async def async_delete_panel(self, panel_id: str) -> bool:
        """Delete a panel configuration. Returns True if panel existed."""
        data = await self.async_load()
        panels = data.get("panels", {})
        if panel_id in panels:
            del panels[panel_id]
            await self.async_save()
            LOGGER.debug("Deleted panel config for %s", panel_id)
            return True
        return False
