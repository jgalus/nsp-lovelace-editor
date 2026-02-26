"""Config flow for NSPanel Lovelace Editor."""
from __future__ import annotations

from pathlib import Path
from typing import Any

import voluptuous as vol

from homeassistant.config_entries import ConfigFlow, ConfigFlowResult

from .const import CONF_APPDAEMON_PATH, DEFAULT_APPDAEMON_PATH, DOMAIN, LOGGER, APPDAEMON_PATH_CANDIDATES


class NsPanelLovelaceEditorConfigFlow(ConfigFlow, domain=DOMAIN):
    """Handle a config flow for NSPanel Lovelace Editor."""

    VERSION = 1

    async def async_step_user(
        self, user_input: dict[str, Any] | None = None
    ) -> ConfigFlowResult:
        """Handle the initial step."""
        # Only allow a single config entry
        await self.async_set_unique_id(DOMAIN)
        self._abort_if_unique_id_configured()

        errors: dict[str, str] = {}

        if user_input is not None:
            appdaemon_path = user_input[CONF_APPDAEMON_PATH]

            # Validate the path exists (check in executor to avoid blocking)
            path_exists = await self.hass.async_add_executor_job(
                Path(appdaemon_path).is_file
            )

            if not path_exists:
                LOGGER.warning(
                    "AppDaemon apps.yaml not found at %s — "
                    "YAML import/export will be unavailable until the path is "
                    "corrected. You can still use paste-based import and the "
                    "visual editor.",
                    appdaemon_path,
                )

            return self.async_create_entry(
                title=DOMAIN,
                data={CONF_APPDAEMON_PATH: appdaemon_path},
            )

        # Try to auto-detect AppDaemon path across deployment modes
        default_path = DEFAULT_APPDAEMON_PATH
        for candidate in APPDAEMON_PATH_CANDIDATES:
            exists = await self.hass.async_add_executor_job(Path(candidate).is_file)
            if exists:
                default_path = candidate
                break

        return self.async_show_form(
            step_id="user",
            data_schema=vol.Schema(
                {
                    vol.Required(
                        CONF_APPDAEMON_PATH, default=default_path
                    ): str,
                }
            ),
            errors=errors,
        )
