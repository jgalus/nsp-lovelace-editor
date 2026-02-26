import { LitElement, html, css, nothing } from "lit";
import { customElement, property, state } from "lit/decorators.js";
import type { HomeAssistant, PanelConfig, BrightnessScheduleEntry, BrightnessValue } from "../models/types";
import { MODELS, UPDATE_MODES, BACKGROUND_COLORS, LOCALES } from "../models/types";
import "./nsp-entity-picker";

@customElement("nsp-settings-editor")
export class NspSettingsEditor extends LitElement {
  @property({ attribute: false }) public hass!: HomeAssistant;
  @property({ attribute: false }) public config!: PanelConfig;

  private _fireChanged(updated: PanelConfig) {
    this.dispatchEvent(
      new CustomEvent("config-changed", { detail: { config: updated }, bubbles: true, composed: true })
    );
  }

  private _updateField(field: string, value: any) {
    const updated = { ...this.config, [field]: value };
    if (value === undefined || value === "" || value === null) {
      delete updated[field];
    }
    this._fireChanged(updated);
  }

  private _getBrightnessMode(value: BrightnessValue | undefined): "static" | "entity" | "schedule" {
    if (value === undefined || typeof value === "number") return "static";
    if (typeof value === "string") return "entity";
    return "schedule";
  }

  render() {
    return html`
      <div class="settings">
        <section>
          <h3>MQTT Topics</h3>
          <div class="field">
            <label>Panel Receive Topic</label>
            <input type="text" .value=${this.config.panelRecvTopic || ""}
              @input=${(e: Event) => this._updateField("panelRecvTopic", (e.target as HTMLInputElement).value)} />
          </div>
          <div class="field">
            <label>Panel Send Topic</label>
            <input type="text" .value=${this.config.panelSendTopic || ""}
              @input=${(e: Event) => this._updateField("panelSendTopic", (e.target as HTMLInputElement).value)} />
          </div>
        </section>

        <section>
          <h3>Device</h3>
          <div class="field-row">
            <div class="field">
              <label>Model</label>
              <select .value=${this.config.model || "eu"}
                @change=${(e: Event) => this._updateField("model", (e.target as HTMLSelectElement).value)}>
                ${MODELS.map((m) => html`<option value=${m} ?selected=${this.config.model === m}>${m.toUpperCase()}</option>`)}
              </select>
            </div>
            <div class="field">
              <label>Update Mode</label>
              <select .value=${this.config.updateMode || "auto-notify"}
                @change=${(e: Event) => this._updateField("updateMode", (e.target as HTMLSelectElement).value)}>
                ${UPDATE_MODES.map((m) => html`<option value=${m} ?selected=${this.config.updateMode === m}>${m}</option>`)}
              </select>
            </div>
          </div>
        </section>

        <section>
          <h3>Display</h3>
          <div class="field">
            <label>Sleep Timeout (seconds)</label>
            <input type="number" min="0" .value=${String(this.config.sleepTimeout ?? "")}
              @input=${(e: Event) => {
                const v = (e.target as HTMLInputElement).value;
                this._updateField("sleepTimeout", v ? Number(v) : undefined);
              }} />
          </div>
          ${this._renderBrightnessField("screenBrightness", "Screen Brightness")}
          ${this._renderBrightnessField("sleepBrightness", "Sleep Brightness")}
          <div class="field">
            <label>Default Background Color</label>
            <select .value=${this.config.defaultBackgroundColor || ""}
              @change=${(e: Event) => this._updateField("defaultBackgroundColor", (e.target as HTMLSelectElement).value || undefined)}>
              <option value="">Default</option>
              ${BACKGROUND_COLORS.map((c) => html`<option value=${c} ?selected=${this.config.defaultBackgroundColor === c}>${c}</option>`)}
            </select>
          </div>
        </section>

        <section>
          <h3>Locale &amp; Time</h3>
          <div class="field">
            <label>Locale</label>
            <select .value=${this.config.locale || "en_US"}
              @change=${(e: Event) => this._updateField("locale", (e.target as HTMLSelectElement).value)}>
              ${LOCALES.map(([code, name]) => html`<option value=${code} ?selected=${this.config.locale === code}>${name} (${code})</option>`)}
            </select>
          </div>
          <div class="field-row">
            <div class="field">
              <label>Time Format</label>
              <input type="text" .value=${this.config.timeFormat || ""} placeholder="%H:%M"
                @input=${(e: Event) => this._updateField("timeFormat", (e.target as HTMLInputElement).value)} />
            </div>
            <div class="field">
              <label>Date Format</label>
              <input type="text" .value=${this.config.dateFormat || ""} placeholder="%A, %d. %B %Y"
                @input=${(e: Event) => this._updateField("dateFormat", (e.target as HTMLInputElement).value)} />
            </div>
          </div>
          <div class="field">
            <label>Date Format (Babel)</label>
            <input type="text" .value=${this.config.dateFormatBabel || ""} placeholder="full"
              @input=${(e: Event) => this._updateField("dateFormatBabel", (e.target as HTMLInputElement).value)} />
          </div>
          <div class="field-row">
            <div class="field">
              <label>Date Additional Template</label>
              <input type="text" .value=${this.config.dateAdditionalTemplate || ""}
                @input=${(e: Event) => this._updateField("dateAdditionalTemplate", (e.target as HTMLInputElement).value)} />
            </div>
            <div class="field">
              <label>Time Additional Template</label>
              <input type="text" .value=${this.config.timeAdditionalTemplate || ""}
                @input=${(e: Event) => this._updateField("timeAdditionalTemplate", (e.target as HTMLInputElement).value)} />
            </div>
          </div>
          <div class="field">
            <label>Timezone</label>
            <input type="text" .value=${this.config.timezone || ""} placeholder="e.g. Europe/Berlin"
              @input=${(e: Event) => this._updateField("timezone", (e.target as HTMLInputElement).value)} />
          </div>
        </section>

        <section>
          <h3>Sleep Tracking</h3>
          <div class="field">
            <label>Sleep Tracking Entity</label>
            <nsp-entity-picker
              .hass=${this.hass}
              .value=${this.config.sleepTracking || ""}
              .includeDomains=${["device_tracker", "person"]}
              allow-custom-entity
              @value-changed=${(e: CustomEvent) => this._updateField("sleepTracking", e.detail.value)}
            ></nsp-entity-picker>
          </div>
          <div class="field">
            <label>Sleep Tracking Zones (comma-separated)</label>
            <input type="text" .value=${(this.config.sleepTrackingZones || []).join(", ")}
              @input=${(e: Event) => {
                const val = (e.target as HTMLInputElement).value;
                this._updateField("sleepTrackingZones", val ? val.split(",").map((s: string) => s.trim()) : undefined);
              }} />
          </div>
          <div class="field-row">
            <div class="field">
              <label>Sleep Override Entity</label>
              <nsp-entity-picker
                .hass=${this.hass}
                .value=${this.config.sleepOverride?.entity || ""}
                allow-custom-entity
                @value-changed=${(e: CustomEvent) => {
                  const entity = e.detail.value;
                  if (entity) {
                    this._updateField("sleepOverride", {
                      entity,
                      brightness: this.config.sleepOverride?.brightness ?? 0,
                    });
                  } else {
                    this._updateField("sleepOverride", undefined);
                  }
                }}
              ></nsp-entity-picker>
            </div>
            <div class="field">
              <label>Sleep Override Brightness</label>
              <input type="number" min="0" max="100"
                .value=${String(this.config.sleepOverride?.brightness ?? "")}
                @input=${(e: Event) => {
                  const v = parseInt((e.target as HTMLInputElement).value);
                  if (this.config.sleepOverride?.entity) {
                    this._updateField("sleepOverride", {
                      ...this.config.sleepOverride,
                      brightness: isNaN(v) ? 0 : v,
                    });
                  }
                }} />
            </div>
          </div>
        </section>

        <section>
          <h3>OTA URL Overrides</h3>
          ${(["displayURL-EU", "displayURL-US-L", "displayURL-US-P", "berryURL"] as const).map(
            (key) => html`
              <div class="field">
                <label>${key}</label>
                <input type="text" .value=${(this.config as any)[key] || ""}
                  @input=${(e: Event) => this._updateField(key, (e.target as HTMLInputElement).value)} />
              </div>
            `
          )}
        </section>
      </div>
    `;
  }

  private _renderBrightnessField(field: "screenBrightness" | "sleepBrightness", label: string) {
    const value = this.config[field];
    const mode = this._getBrightnessMode(value);

    return html`
      <div class="brightness-field">
        <div class="field">
          <label>${label}</label>
          <select .value=${mode} @change=${(e: Event) => {
            const m = (e.target as HTMLSelectElement).value;
            if (m === "static") this._updateField(field, typeof value === "number" ? value : 100);
            else if (m === "entity") this._updateField(field, "");
            else this._updateField(field, []);
          }}>
            <option value="static" ?selected=${mode === "static"}>Static value</option>
            <option value="entity" ?selected=${mode === "entity"}>Entity reference</option>
            <option value="schedule" ?selected=${mode === "schedule"}>Time schedule</option>
          </select>
        </div>
        ${mode === "static" ? html`
          <div class="field">
            <input type="number" min="0" max="100" .value=${String(typeof value === "number" ? value : 100)}
              @input=${(e: Event) => this._updateField(field, Number((e.target as HTMLInputElement).value))} />
          </div>
        ` : nothing}
        ${mode === "entity" ? html`
          <div class="field">
            <nsp-entity-picker
              .hass=${this.hass}
              .value=${typeof value === "string" ? value : ""}
              .includeDomains=${["input_number"]}
              allow-custom-entity
              @value-changed=${(e: CustomEvent) => this._updateField(field, e.detail.value)}
            ></nsp-entity-picker>
          </div>
        ` : nothing}
        ${mode === "schedule" ? this._renderScheduleEditor(field, Array.isArray(value) ? value : []) : nothing}
      </div>
    `;
  }

  private _renderScheduleEditor(field: string, schedule: BrightnessScheduleEntry[]) {
    return html`
      <div class="schedule-editor">
        ${schedule.map(
          (entry, i) => html`
            <div class="schedule-row">
              <input type="text" .value=${entry.time} placeholder="HH:MM:SS or sunrise/sunset"
                @input=${(e: Event) => {
                  const newSchedule = [...schedule];
                  newSchedule[i] = { ...entry, time: (e.target as HTMLInputElement).value };
                  this._updateField(field, newSchedule);
                }} />
              <input type="number" min="0" max="100" .value=${String(entry.value)}
                @input=${(e: Event) => {
                  const newSchedule = [...schedule];
                  newSchedule[i] = { ...entry, value: Number((e.target as HTMLInputElement).value) };
                  this._updateField(field, newSchedule);
                }} />
              <button class="btn-icon" @click=${() => {
                const newSchedule = schedule.filter((_, idx) => idx !== i);
                this._updateField(field, newSchedule.length ? newSchedule : undefined);
              }}>&#x2715;</button>
            </div>
          `
        )}
        <button class="btn-sm" @click=${() => {
          this._updateField(field, [...schedule, { time: "", value: 100 }]);
        }}>+ Add time entry</button>
      </div>
    `;
  }

  static styles = css`
    :host { display: block; }
    .settings { display: flex; flex-direction: column; gap: 4px; }
    section {
      background: var(--card-background-color, white);
      border: 1px solid var(--divider-color, #e0e0e0);
      border-radius: 8px;
      padding: 16px;
    }
    section h3 { margin: 0 0 12px; font-size: 15px; color: var(--primary-text-color); }
    .field { display: flex; flex-direction: column; gap: 4px; margin-bottom: 12px; }
    .field:last-child { margin-bottom: 0; }
    .field label { font-size: 12px; font-weight: 500; color: var(--secondary-text-color); }
    .field input, .field select {
      padding: 8px;
      border: 1px solid var(--divider-color, #e0e0e0);
      border-radius: 4px;
      background: var(--card-background-color, white);
      color: var(--primary-text-color);
      font-size: 14px;
    }
    .field-row { display: flex; gap: 12px; }
    .field-row .field { flex: 1; }
    .brightness-field { margin-bottom: 12px; }
    .schedule-editor { display: flex; flex-direction: column; gap: 4px; margin-top: 4px; }
    .schedule-row { display: flex; gap: 8px; align-items: center; }
    .schedule-row input[type="text"] { flex: 2; padding: 6px; border: 1px solid var(--divider-color); border-radius: 4px; font-size: 13px; background: var(--card-background-color, white); color: var(--primary-text-color); }
    .schedule-row input[type="number"] { width: 60px; padding: 6px; border: 1px solid var(--divider-color); border-radius: 4px; font-size: 13px; background: var(--card-background-color, white); color: var(--primary-text-color); }
    .btn-icon { background: none; border: none; cursor: pointer; font-size: 16px; padding: 4px 8px; color: var(--error-color, #db4437); }
    .btn-sm { align-self: flex-start; padding: 6px 12px; border: 1px dashed var(--divider-color); border-radius: 4px; background: none; cursor: pointer; font-size: 12px; color: var(--primary-color); }
  `;
}

declare global {
  interface HTMLElementTagNameMap {
    "nsp-settings-editor": NspSettingsEditor;
  }
}
