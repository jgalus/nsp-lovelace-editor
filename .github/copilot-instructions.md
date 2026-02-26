# NSPanel Lovelace Editor — Copilot Instructions

## Project Overview

This is a HACS custom integration for Home Assistant that provides a visual form-based editor for [NSPanel Lovelace UI](https://github.com/joBr99/nspanel-lovelace-ui) YAML configuration. It registers a sidebar panel in HA and lets users build their NSPanel config through a GUI instead of manually editing AppDaemon's `apps.yaml`.

## Build & Development Commands

### Frontend (TypeScript + LitElement)

```bash
cd frontend-src
npm install          # Install dependencies
npm run build        # Build once → outputs to custom_components/.../frontend/entrypoint.js
npm run dev          # Watch mode for development
```

The frontend builds with Rollup and outputs a single bundled JS file to `custom_components/nspanel_lovelace_editor/frontend/entrypoint.js`.

### Python Backend

No separate build step. The integration is loaded by Home Assistant directly from `custom_components/nspanel_lovelace_editor/`.

### Validation

The HACS and hassfest validation workflows run on push/PR to `main` (`.github/workflows/validate.yml`).

## Architecture

### Two-Layer System

1. **Python backend** (`custom_components/nspanel_lovelace_editor/`): Runs inside Home Assistant. Handles storage, YAML import/export, config flow, and exposes a WebSocket API.
2. **LitElement frontend** (`frontend-src/`): TypeScript SPA that renders as an HA sidebar panel. Communicates with backend exclusively via HA WebSocket API.

### Data Flow

```
HA Sidebar Panel (LitElement) ←→ WebSocket API (Python) ←→ HA Storage (.storage/)
                                                         ←→ AppDaemon apps.yaml (import/export)
```

- Working config lives in HA's `.storage/nspanel_lovelace_editor.panels`
- YAML export to AppDaemon `apps.yaml` is an explicit user action (not auto-sync)
- Import detects NSPanel entries by `module: nspanel-lovelace-ui` + `class: NsPanelLovelaceUIManager`

### Key Backend Files

- `__init__.py` — Integration setup: registers static path, sidebar panel, WebSocket commands
- `websocket_api.py` — All frontend↔backend communication: CRUD panels, import/export, preview
- `storage.py` — Wraps `homeassistant.helpers.storage.Store` for panel config persistence
- `yaml_io.py` — Parses and generates AppDaemon `apps.yaml`, merges with non-NSPanel entries
- `schema.py` — Voluptuous schemas for all 7 card types, entity config, screensaver, and global config
- `config_flow.py` — Single-entry config flow that asks for AppDaemon `apps.yaml` path
- `const.py` — All constants: card types, entity domains per card, locales, theme keys, models

### Key Frontend Files

- `frontend-src/src/main.ts` — Entry point, imports the root component
- `frontend-src/src/nspanel-editor.ts` — Root panel component with panel list and editor views
- `frontend-src/src/components/` — Sub-editors for cards, entities, screensaver, settings, etc.

## NSPanel Config Schema

The editor must support the full NSPanel Lovelace UI config schema documented at:
- **Config overview**: https://docs.nspanel.pky.eu/config-overview/
- **GitHub docs source**: https://github.com/joBr99/nspanel-lovelace-ui/tree/main/docs

### Card Types

| Type | Primary Entities | Key Specifics |
|------|-----------------|---------------|
| `cardEntities` | List of entities (4/page) | Most entity types supported |
| `cardGrid` | List of entities (6/page) | Same entity types as cardEntities |
| `cardThermo` | Single `climate` entity | `temperatureUnit`, `supportedModes` |
| `cardMedia` | Single `media_player` | Bottom row entities, `status` override |
| `cardAlarm` | Single `alarm_control_panel` | `alarmControl`, `supportedModes` |
| `cardQR` | Entity list + `qrCode` string | QR value supports HA templates |
| `cardPower` | Sensor entities with `speed` | Template-based speed, `cooldown` |

### Entity Config Complexity

Entity overrides can be:
- Simple strings (`icon: "mdi:lightbulb"`)
- Per-state maps (`icon: {"on": "mdi:lightbulb", "off": "mdi:lightbulb-off"}`)
- HA templates (`color: '{{iif(states("binary_sensor.test")=="on", "[0,255,0]", "[255,165,0]")}}'`)
- RGB arrays (`color: [255, 0, 0]`)

Internal entity types: `iText` (static text), `delete` (placeholder), `navigate.<key>` (subpage nav), `service.<domain>.<service>` (direct service call with `data`).

### Screensaver

Two layouts: `screensaver` (default) and `screensaver2` (v4.0.0+). Up to 6 weather/sensor entities (6th triggers alt layout). Entity `type` field (0-3) selects forecast day. Theme has 15 RGB color keys. Status icons support `altFont`.

### Brightness Config

`sleepBrightness`/`screenBrightness` can be: static int, HA entity reference (`input_number.*`), or time schedule (list of `{time, value}` with `sunrise`/`sunset` support).

## Conventions

- **WebSocket commands** are prefixed `nspanel_editor/` (e.g., `nspanel_editor/list_panels`)
- **Frontend components** use LitElement with HA's web component conventions (properties via `@property`, `@state`)
- **HA native components** should be reused where possible: `ha-entity-picker`, `ha-form`, `ha-card`
- Panel registration uses `frontend.async_register_built_in_panel` with `component_name="custom"`
- Static path compatibility: supports both `async_register_static_paths` (HA 2024.7+) and `register_static_path` (older)
- Storage uses `homeassistant.helpers.storage.Store` — never write config files directly to disk except via explicit YAML export
- YAML export preserves non-NSPanel entries in `apps.yaml` (merge, don't overwrite)
- RGB565 conversion needed for notification colors (NSPanel uses decimal RGB565)

## Deployment Mode Handling

The integration must work across all HA deployment modes:

| Mode | AppDaemon Location | File I/O? |
|------|-------------------|-----------|
| **HA OS / Green** (addon) | `/addon_configs/a0d7b954_appdaemon/apps/apps.yaml` | ✅ |
| **HA Supervised** (addon) | Same as above | ✅ |
| **HA Core** (direct install) | User-specified path | ✅ |
| **HA Container** + separate AppDaemon container | Different container filesystem | ❌ |

For container deployments where AppDaemon runs in a separate container, the integration provides **paste-based import** (`nspanel_editor/import_yaml_text`) and **copy-based export** (`nspanel_editor/preview_yaml`) as alternatives to direct file I/O. The visual editor and HA Storage always work regardless of deployment mode.

Auto-detection paths are defined in `const.py:APPDAEMON_PATH_CANDIDATES`. The config flow warns but doesn't block if the path is unreachable.
