# Changelog

## 0.4.2 — 2026-02-26

### Improved

- **Key field helper text** — Added placeholder and descriptive hint to the card
  Key input field explaining that keys are used by `navigate.<key>` entities for
  subpage navigation and as the screensaver's default card reference.

## 0.4.1 — 2026-02-26

### Improved

- **Conditional display UX** — Reworked the entity conditional visibility
  section for clarity. Renamed section from "Conditional Visibility" to
  "Conditional Display" and field label from "Visibility template" to "Condition
  template". Replaced jargon placeholder "Jinja2 template → truthy/falsy" with
  an actual example template. Added descriptive help text under all three fields
  explaining their behavior, including the counterintuitive "entity is hidden
  when template evaluates to true" semantics. Added example placeholders to the
  state match fields.

## 0.4.0 — 2026-02-26

### Added

- **Multiselect mode pickers** — `cardThermo` and `cardAlarm` now use chip-based
  toggle pickers for `supportedModes` instead of free-text comma-separated input.
  When an entity is selected, the picker dynamically reads its attributes
  (`hvac_modes` for climate, `supported_features` bitmask for alarm) to show
  only the modes the entity actually supports. Falls back to the full known mode
  list when no entity is selected. Includes a custom mode input for edge cases.

## 0.3.3 — 2026-02-26

### Security

- **WebSocket API authorization** — Added `require_admin` to all 9 WebSocket
  command handlers. Previously, any authenticated HA user (not just admins)
  could read, write, and delete panel configs or trigger filesystem writes via
  the `nspanel_editor/*` commands.
- **Path traversal protection** — The `appdaemon_path` is now validated against
  a set of allowed directory prefixes (`/config/`, `/addon_configs/`,
  `/homeassistant/`, `/share/`). Previously any filesystem path was accepted,
  allowing reads/writes to arbitrary files.
- **Panel ID validation** — `panel_id` is now constrained to
  `^[a-zA-Z0-9_-]{1,64}$`. Previously any string was accepted as a storage key.
- **YAML import size limit** — The `import_yaml_text` endpoint now enforces a
  1 MB maximum payload size to prevent YAML bomb / denial-of-service attacks.
- **Schema validation on save** — `ws_save_panel` now validates panel data
  against the Voluptuous schemas before persisting. Previously schema validators
  existed but were never called.
- **Error message sanitization** — WebSocket error responses no longer include
  raw exception messages or filesystem paths. Full details are logged
  server-side only.
- **Temp file permissions** — Atomic write temp files now have explicit `0o644`
  permissions set immediately after creation.
- **Schema strictness** — Changed `vol.ALLOW_EXTRA` to `vol.REMOVE_EXTRA` on
  entity, screensaver entity, status icon, and screensaver schemas to strip
  unexpected fields.
- **Clipboard fallback removed** — Removed deprecated `document.execCommand`
  clipboard fallback that injected elements outside the Shadow DOM.

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
