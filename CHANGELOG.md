# Changelog

## 0.3.2 — 2026-02-26

### Fixed

- **Icon/color override inputs not appearing** — Switching the "Icon Override"
  selector to "Simple" (or "Color Override" to "Template") on an entity with no
  prior override did not show the text input. The mode-switch handler passed an
  empty string to `_updateField()`, which treated it as a cleared value and
  deleted the field, so the UI never transitioned out of "None" mode.

## 0.2.2 — 2026-02-26

### Fixed

- **Frontend cache busting** — The browser was serving cached v0.2.0 JS after
  upgrading because the `js_url` had no version parameter. The `entrypoint.js`
  URL now includes `?v={version}` read from `manifest.json`, forcing browsers
  to fetch the new file on every version bump.

## 0.2.1 — 2026-02-26

### Fixed

- **Entity picker not rendering** — The editor relied on `ha-entity-picker`, a
  Home Assistant web component that is lazy-loaded and unavailable in custom
  panel contexts. It rendered as an invisible empty element, leaving no way to
  select or edit entities on any card type.
- **Built-in entity picker replaced** — Introduced a self-contained
  `nsp-entity-picker` component that uses `hass.states` directly, with
  searchable dropdown, domain filtering, and the same event API. Works
  regardless of HA frontend load order.
- **HA component pre-loading** — Added `loadCardHelpers()` call on panel init
  to trigger Home Assistant to load its lazy frontend components, improving
  compatibility.
- **Entity item overflow clipping** — Removed `overflow: hidden` from entity
  list items that could clip dropdown overlays.
- **Event propagation** — Stopped `entity-changed` events from bubbling past
  the card editor, preventing potential double-update issues.

### Improved

- **Entity expand/collapse** — Entity items in card editors are now
  collapsible. Click an entity row to expand its editor; newly added entities
  auto-expand. This makes cards with many entities much easier to manage.

## 0.2.0

- Full visual editor for all NSPanel Lovelace UI card types
- Entity editor with icon, color, conditional visibility overrides
- Card list with drag-and-drop reordering
- Settings editor for MQTT, display, locale, sleep tracking
- Import/export from `apps.yaml` and pasted YAML
- YAML preview with copy-to-clipboard

## 0.1.0

- Initial release with HACS support
- Basic panel management and WebSocket API
