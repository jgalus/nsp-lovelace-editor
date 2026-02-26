# NSPanel Lovelace Editor

[![hacs_badge](https://img.shields.io/badge/HACS-Custom-41BDF5.svg)](https://github.com/hacs/integration)

A visual editor for [NSPanel Lovelace UI](https://github.com/joBr99/nspanel-lovelace-ui) configuration, running as a Home Assistant custom integration.

Instead of manually editing complex YAML in AppDaemon's `apps.yaml`, use this editor to visually configure your NSPanel cards, entities, screensaver, and settings through a form-based GUI directly in Home Assistant's sidebar.

## Features

- **Visual form-based editor** for all NSPanel Lovelace UI card types:
  - cardEntities, cardGrid, cardThermo, cardMedia, cardAlarm, cardQR, cardPower
- **Entity picker** — browse and select Home Assistant entities directly
- **Screensaver editor** — configure weather, status icons, themes, and layout
- **Import/Export** — import from existing `apps.yaml`, edit visually, export back
- **Multi-panel support** — manage multiple NSPanel devices from one place
- **Live YAML preview** — see the generated configuration in real-time
- **Navigation editor** — manage subpages, hidden cards, and navigation items
- **Notification templates** — generate MQTT notification scripts

## Installation

### HACS (Recommended)

1. Open HACS in Home Assistant
2. Click the three dots menu → **Custom repositories**
3. Add this repository URL and select **Integration** as the category
4. Search for "NSPanel Lovelace Editor" and install
5. Restart Home Assistant
6. Go to **Settings → Devices & Services → Add Integration** → search "NSPanel Lovelace Editor"
7. Enter the path to your AppDaemon `apps.yaml` file

### Manual

1. Copy the `custom_components/nspanel_lovelace_editor` directory to your Home Assistant `custom_components/` folder
2. Restart Home Assistant
3. Add the integration via Settings → Devices & Services

## Usage

After installation, a new **NSPanel Lovelace Editor** item appears in the Home Assistant sidebar. From there you can:

1. **Import** your existing configuration from `apps.yaml`
2. **Edit** panel settings, cards, entities, and screensaver visually
3. **Export** the configuration back to `apps.yaml`

## Development

### Frontend

```bash
cd frontend-src
npm install
npm run build    # Build once
npm run dev      # Watch mode
```

### Project Structure

```
custom_components/nspanel_lovelace_editor/
├── __init__.py          # Integration setup, panel registration
├── config_flow.py       # Config flow (AppDaemon path)
├── const.py             # Constants, card types, locales
├── storage.py           # HA Storage persistence
├── websocket_api.py     # WebSocket API for frontend
├── yaml_io.py           # AppDaemon apps.yaml import/export
└── frontend/            # Built frontend assets
```

## References

- [NSPanel Lovelace UI Documentation](https://docs.nspanel.pky.eu/)
- [NSPanel Lovelace UI GitHub](https://github.com/joBr99/nspanel-lovelace-ui)
- [HACS](https://hacs.xyz/)

## License

MIT
