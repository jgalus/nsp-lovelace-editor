import { LitElement, html, css, nothing } from "lit";
import { customElement, property } from "lit/decorators.js";
import type {
  HomeAssistant,
  ScreensaverConfig,
  ScreensaverEntityConfig,
  StatusIconConfig,
  RGBColor,
  ScreensaverTheme,
} from "../models/types";
import "./nsp-entity-picker";

const THEME_KEYS: Array<keyof ScreensaverTheme> = [
  "background",
  "time",
  "timeAMPM",
  "date",
  "tMainText",
  "tForecast1",
  "tForecast2",
  "tForecast3",
  "tForecast4",
  "tForecast1Val",
  "tForecast2Val",
  "tForecast3Val",
  "tForecast4Val",
  "bar",
  "tMainTextAlt2",
  "tTimeAdd",
];

@customElement("nsp-screensaver-editor")
export class NspScreensaverEditor extends LitElement {
  @property({ attribute: false }) public hass!: HomeAssistant;
  @property({ attribute: false }) public screensaver!: ScreensaverConfig;
  @property({ type: Array }) public cardKeys: string[] = [];

  private _fireChanged(updated: ScreensaverConfig) {
    this.dispatchEvent(
      new CustomEvent("screensaver-changed", {
        detail: { screensaver: updated },
        bubbles: true,
        composed: true,
      })
    );
  }

  private _updateField(field: string, value: any) {
    const updated = { ...this.screensaver, [field]: value };
    if (value === undefined || value === "" || value === null) {
      delete (updated as any)[field];
    }
    this._fireChanged(updated);
  }

  private _isAdvancedMode(): boolean {
    return !!(this.screensaver?.entities?.length);
  }

  private _getEntities(): ScreensaverEntityConfig[] {
    return this.screensaver?.entities || [];
  }

  private _addEntity() {
    const entities = [...this._getEntities(), { entity: "" }];
    this._updateField("entities", entities);
  }

  private _removeEntity(index: number) {
    const entities = this._getEntities().filter((_, i) => i !== index);
    this._updateField("entities", entities.length ? entities : undefined);
  }

  private _updateEntity(index: number, entity: ScreensaverEntityConfig) {
    const entities = [...this._getEntities()];
    entities[index] = entity;
    this._updateField("entities", entities);
  }

  private _updateStatusIcon(
    field: "statusIcon1" | "statusIcon2",
    icon: Partial<StatusIconConfig> | undefined
  ) {
    this._updateField(field, icon);
  }

  private _updateThemeColor(
    key: keyof ScreensaverTheme,
    rgb: RGBColor | undefined
  ) {
    const theme: ScreensaverTheme = { ...(this.screensaver?.theme || {}) };
    if (rgb === undefined) {
      delete theme[key];
    } else {
      theme[key] = rgb;
    }
    this._updateField(
      "theme",
      Object.keys(theme).length ? theme : undefined
    );
  }

  render() {
    const sc = this.screensaver || {};
    const advanced = this._isAdvancedMode();
    const entities = this._getEntities();

    return html`
      <div class="screensaver-editor">
        <!-- Type & Mode -->
        <section>
          <h3>Type</h3>
          <div class="field-row">
            <div class="field">
              <label>Screensaver Type</label>
              <select
                .value=${sc.type || "screensaver"}
                @change=${(e: Event) =>
                  this._updateField(
                    "type",
                    (e.target as HTMLSelectElement).value
                  )}
              >
                <option
                  value="screensaver"
                  ?selected=${!sc.type || sc.type === "screensaver"}
                >
                  screensaver
                </option>
                <option
                  value="screensaver2"
                  ?selected=${sc.type === "screensaver2"}
                >
                  screensaver2 (v4.0.0+)
                </option>
              </select>
            </div>
            <div class="field">
              <label>Mode</label>
              <select
                @change=${(e: Event) => {
                  const val = (e.target as HTMLSelectElement).value;
                  if (val === "simple") {
                    this._updateField("entities", undefined);
                  } else {
                    this._updateField("entity", undefined);
                    if (!this._getEntities().length) this._addEntity();
                  }
                }}
              >
                <option value="simple" ?selected=${!advanced}>
                  Simple (single entity)
                </option>
                <option value="advanced" ?selected=${advanced}>
                  Advanced (entity list)
                </option>
              </select>
            </div>
          </div>
        </section>

        <!-- Entity config -->
        <section>
          <h3>Weather / Entities</h3>
          ${!advanced
            ? html`
                <div class="field">
                  <label>Weather Entity</label>
                  <nsp-entity-picker
                    .hass=${this.hass}
                    .value=${sc.entity || ""}
                    .includeDomains=${["weather"]}
                    allow-custom-entity
                    @value-changed=${(e: CustomEvent) =>
                      this._updateField("entity", e.detail.value)}
                  ></nsp-entity-picker>
                </div>
              `
            : html`
                <div class="entity-list">
                  <div class="section-header">
                    <span class="count-label"
                      >Entities (${entities.length}/6)</span
                    >
                    ${entities.length < 6
                      ? html`<button
                          class="btn-sm"
                          @click=${this._addEntity}
                        >
                          + Add Entity
                        </button>`
                      : nothing}
                  </div>
                  ${entities.length === 6
                    ? html`<div class="info-banner">
                        ℹ️ 6 entities trigger the alternative screensaver
                        layout
                      </div>`
                    : nothing}
                  ${entities.map((entity, i) =>
                    this._renderScreensaverEntity(entity, i)
                  )}
                </div>
              `}
        </section>

        <!-- Status Icons -->
        <section>
          <h3>Status Icons</h3>
          ${this._renderStatusIcon("statusIcon1", sc.statusIcon1)}
          ${this._renderStatusIcon("statusIcon2", sc.statusIcon2)}
        </section>

        <!-- Other settings -->
        <section>
          <h3>Behavior</h3>
          <div class="field">
            <label class="checkbox-label">
              <input
                type="checkbox"
                .checked=${!!sc.doubleTapToUnlock}
                @change=${(e: Event) =>
                  this._updateField(
                    "doubleTapToUnlock",
                    (e.target as HTMLInputElement).checked || undefined
                  )}
              />
              Double-tap to unlock
            </label>
          </div>
          <div class="field">
            <label>Default Card (key or template)</label>
            <div class="default-card-row">
              <input
                type="text"
                .value=${sc.defaultCard || ""}
                placeholder="Card key or HA template"
                @input=${(e: Event) =>
                  this._updateField(
                    "defaultCard",
                    (e.target as HTMLInputElement).value
                  )}
              />
              ${this.cardKeys.length > 0
                ? html`
                    <select
                      @change=${(e: Event) => {
                        const val = (e.target as HTMLSelectElement).value;
                        if (val) this._updateField("defaultCard", val);
                        (e.target as HTMLSelectElement).value = "";
                      }}
                    >
                      <option value="">Pick key…</option>
                      ${this.cardKeys.map(
                        (k) => html`<option value=${k}>${k}</option>`
                      )}
                    </select>
                  `
                : nothing}
            </div>
          </div>
        </section>

        <!-- Theme -->
        <details class="theme-section">
          <summary>Theme Colors</summary>
          <div class="theme-grid">
            ${THEME_KEYS.map((key) =>
              this._renderThemeColor(key, sc.theme)
            )}
          </div>
        </details>
      </div>
    `;
  }

  private _renderScreensaverEntity(
    entity: ScreensaverEntityConfig,
    index: number
  ) {
    return html`
      <div class="ss-entity">
        <div class="ss-entity-header">
          <span class="entity-label">${entity.entity || "(empty)"}</span>
          <button
            class="btn-icon"
            @click=${() => this._removeEntity(index)}
          >
            ✕
          </button>
        </div>
        <div class="ss-entity-body">
          <div class="field">
            <label>Entity</label>
            <nsp-entity-picker
              .hass=${this.hass}
              .value=${entity.entity || ""}
              .includeDomains=${["weather", "sensor"]}
              allow-custom-entity
              @value-changed=${(e: CustomEvent) =>
                this._updateEntity(index, {
                  ...entity,
                  entity: e.detail.value,
                })}
            ></nsp-entity-picker>
          </div>
          <div class="field-row">
            <div class="field">
              <label>Type (forecast day 0–3)</label>
              <select
                .value=${String(entity.type ?? "")}
                @change=${(e: Event) => {
                  const val = (e.target as HTMLSelectElement).value;
                  const newEntity = { ...entity };
                  if (val === "") delete newEntity.type;
                  else newEntity.type = parseInt(val) as 0 | 1 | 2 | 3;
                  this._updateEntity(index, newEntity);
                }}
              >
                <option value="">Default</option>
                <option value="0" ?selected=${entity.type === 0}>
                  0 (today)
                </option>
                <option value="1" ?selected=${entity.type === 1}>
                  1 (tomorrow)
                </option>
                <option value="2" ?selected=${entity.type === 2}>2</option>
                <option value="3" ?selected=${entity.type === 3}>3</option>
              </select>
            </div>
            <div class="field">
              <label>Name Override</label>
              <input
                type="text"
                .value=${entity.name || ""}
                @input=${(e: Event) => {
                  const val = (e.target as HTMLInputElement).value;
                  const newEntity = { ...entity };
                  if (val) newEntity.name = val;
                  else delete newEntity.name;
                  this._updateEntity(index, newEntity);
                }}
              />
            </div>
          </div>
        </div>
      </div>
    `;
  }

  private _renderStatusIcon(
    field: "statusIcon1" | "statusIcon2",
    icon: StatusIconConfig | undefined
  ) {
    const label = field === "statusIcon1" ? "Status Icon 1" : "Status Icon 2";
    if (!icon) {
      return html`
        <div class="field">
          <label>${label}</label>
          <button
            class="btn-sm"
            @click=${() =>
              this._updateStatusIcon(field, { entity: "" })}
          >
            + Configure ${label}
          </button>
        </div>
      `;
    }
    return html`
      <div class="status-icon">
        <div class="section-header">
          <label>${label}</label>
          <button
            class="btn-sm danger"
            @click=${() => this._updateStatusIcon(field, undefined)}
          >
            Remove
          </button>
        </div>
        <div class="field">
          <label>Entity</label>
          <nsp-entity-picker
            .hass=${this.hass}
            .value=${icon.entity || ""}
            allow-custom-entity
            @value-changed=${(e: CustomEvent) =>
              this._updateStatusIcon(field, {
                ...icon,
                entity: e.detail.value,
              })}
          ></nsp-entity-picker>
        </div>
        <div class="field">
          <label>Icon Override</label>
          <input
            type="text"
            .value=${(icon.icon as string) || ""}
            placeholder="mdi:icon-name"
            @input=${(e: Event) => {
              const val = (e.target as HTMLInputElement).value;
              const updated = { ...icon };
              if (val) updated.icon = val;
              else delete updated.icon;
              this._updateStatusIcon(field, updated);
            }}
          />
        </div>
        <div class="field">
          <label class="checkbox-label">
            <input
              type="checkbox"
              .checked=${!!icon.altFont}
              @change=${(e: Event) =>
                this._updateStatusIcon(field, {
                  ...icon,
                  altFont:
                    (e.target as HTMLInputElement).checked || undefined,
                })}
            />
            Use alt font
          </label>
        </div>
      </div>
    `;
  }

  private _renderThemeColor(
    key: keyof ScreensaverTheme,
    theme: ScreensaverTheme | undefined
  ) {
    const color = theme?.[key] as RGBColor | undefined;
    const active = !!color;
    const r = color?.[0] ?? 255;
    const g = color?.[1] ?? 255;
    const b = color?.[2] ?? 255;

    return html`
      <div class="theme-color">
        <div class="theme-color-header">
          <label class="checkbox-label">
            <input
              type="checkbox"
              .checked=${active}
              @change=${(e: Event) => {
                if ((e.target as HTMLInputElement).checked) {
                  this._updateThemeColor(key, [255, 255, 255]);
                } else {
                  this._updateThemeColor(key, undefined);
                }
              }}
            />
            ${key}
          </label>
        </div>
        ${active
          ? html`
              <div class="rgb-row">
                ${(["R", "G", "B"] as const).map(
                  (ch, i) => html`
                    <label>${ch}</label>
                    <input
                      type="number"
                      min="0"
                      max="255"
                      .value=${String([r, g, b][i])}
                      @input=${(e: Event) => {
                        const val = Math.max(
                          0,
                          Math.min(
                            255,
                            parseInt(
                              (e.target as HTMLInputElement).value
                            ) || 0
                          )
                        );
                        const newColor: RGBColor = [r, g, b];
                        newColor[i] = val;
                        this._updateThemeColor(key, newColor);
                      }}
                    />
                  `
                )}
                <div
                  class="color-preview"
                  style="background: rgb(${r},${g},${b})"
                ></div>
              </div>
            `
          : nothing}
      </div>
    `;
  }

  static styles = css`
    :host {
      display: block;
    }
    .screensaver-editor {
      display: flex;
      flex-direction: column;
      gap: 4px;
    }
    section {
      background: var(--card-background-color, white);
      border: 1px solid var(--divider-color, #e0e0e0);
      border-radius: 8px;
      padding: 16px;
    }
    section h3 {
      margin: 0 0 12px;
      font-size: 15px;
      color: var(--primary-text-color);
    }
    .field {
      display: flex;
      flex-direction: column;
      gap: 4px;
      margin-bottom: 12px;
    }
    .field:last-child {
      margin-bottom: 0;
    }
    .field label {
      font-size: 12px;
      font-weight: 500;
      color: var(--secondary-text-color);
    }
    .field input[type="text"],
    .field input[type="number"],
    .field select {
      padding: 8px;
      border: 1px solid var(--divider-color, #e0e0e0);
      border-radius: 4px;
      background: var(--card-background-color, white);
      color: var(--primary-text-color);
      font-size: 14px;
    }
    .field-row {
      display: flex;
      gap: 12px;
    }
    .field-row .field {
      flex: 1;
    }
    .checkbox-label {
      display: flex;
      align-items: center;
      gap: 8px;
      cursor: pointer;
      font-size: 14px;
      color: var(--primary-text-color);
    }
    .checkbox-label input[type="checkbox"] {
      width: 16px;
      height: 16px;
      cursor: pointer;
    }
    .section-header {
      display: flex;
      justify-content: space-between;
      align-items: center;
      margin-bottom: 8px;
    }
    .count-label {
      font-size: 13px;
      font-weight: 500;
      color: var(--secondary-text-color);
    }
    .btn-sm {
      padding: 6px 12px;
      border: 1px dashed var(--divider-color);
      border-radius: 4px;
      background: none;
      cursor: pointer;
      font-size: 13px;
      color: var(--primary-color);
    }
    .btn-sm.danger {
      color: var(--error-color, #db4437);
      border-color: var(--error-color, #db4437);
      border-style: solid;
    }
    .btn-icon {
      background: none;
      border: none;
      cursor: pointer;
      font-size: 16px;
      padding: 4px 8px;
      color: var(--error-color, #db4437);
    }
    .info-banner {
      background: var(--info-color, #2196f3);
      color: white;
      padding: 8px 12px;
      border-radius: 4px;
      font-size: 13px;
      margin-bottom: 8px;
    }
    .entity-list {
      display: flex;
      flex-direction: column;
      gap: 8px;
    }
    .ss-entity {
      border: 1px solid var(--divider-color, #e0e0e0);
      border-radius: 8px;
      overflow: hidden;
    }
    .ss-entity-header {
      display: flex;
      justify-content: space-between;
      align-items: center;
      padding: 8px 12px;
      background: var(--secondary-background-color, #f5f5f5);
    }
    .entity-label {
      font-size: 13px;
      color: var(--primary-text-color);
    }
    .ss-entity-body {
      padding: 12px;
      display: flex;
      flex-direction: column;
      gap: 8px;
    }
    .status-icon {
      border: 1px solid var(--divider-color, #e0e0e0);
      border-radius: 8px;
      padding: 12px;
      margin-bottom: 12px;
    }
    .status-icon:last-child {
      margin-bottom: 0;
    }
    .default-card-row {
      display: flex;
      gap: 8px;
    }
    .default-card-row input {
      flex: 1;
    }
    .default-card-row select {
      padding: 8px;
      border: 1px solid var(--divider-color);
      border-radius: 4px;
      background: var(--card-background-color, white);
      color: var(--primary-text-color);
      font-size: 14px;
    }
    .theme-section {
      background: var(--card-background-color, white);
      border: 1px solid var(--divider-color, #e0e0e0);
      border-radius: 8px;
      padding: 16px;
    }
    .theme-section summary {
      cursor: pointer;
      font-size: 15px;
      font-weight: 500;
      color: var(--primary-text-color);
    }
    .theme-section[open] summary {
      margin-bottom: 16px;
    }
    .theme-grid {
      display: grid;
      grid-template-columns: repeat(auto-fill, minmax(220px, 1fr));
      gap: 12px;
    }
    .theme-color {
      border: 1px solid var(--divider-color, #e0e0e0);
      border-radius: 6px;
      padding: 8px;
    }
    .theme-color-header {
      margin-bottom: 4px;
    }
    .rgb-row {
      display: flex;
      align-items: center;
      gap: 4px;
      margin-top: 4px;
    }
    .rgb-row label {
      font-size: 11px;
      font-weight: 500;
      min-width: 14px;
    }
    .rgb-row input {
      width: 54px;
      padding: 4px 6px;
      font-size: 12px;
      border: 1px solid var(--divider-color);
      border-radius: 4px;
      background: var(--card-background-color, white);
      color: var(--primary-text-color);
    }
    .color-preview {
      width: 28px;
      height: 28px;
      border-radius: 4px;
      border: 1px solid var(--divider-color);
      flex-shrink: 0;
    }
  `;
}

declare global {
  interface HTMLElementTagNameMap {
    "nsp-screensaver-editor": NspScreensaverEditor;
  }
}
