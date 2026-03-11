import { LitElement, html, css, nothing } from "lit";
import { customElement, property } from "lit/decorators.js";
import type { HomeAssistant, EntityConfig } from "../models/types";
import { parseOptionalJsonObject } from "../utils/json-field";
import "./nsp-entity-picker";

@customElement("nsp-entity-editor")
export class NspEntityEditor extends LitElement {
  @property({ attribute: false }) public hass!: HomeAssistant;
  @property({ attribute: false }) public entity!: EntityConfig;
  @property({ type: Array }) public includeDomains: string[] = [];
  @property({ type: Array }) public hiddenCardKeys: string[] = [];
  @property({ type: Boolean }) public allowSpeed = false;

  private _fireChanged(updated: EntityConfig) {
    this.dispatchEvent(
      new CustomEvent("entity-changed", { detail: { entity: updated }, bubbles: true, composed: true })
    );
  }

  private _updateField(field: string, value: any) {
    const updated = { ...this.entity, [field]: value };
    if (value === undefined || value === "" || value === null) {
      delete updated[field];
    }
    this._fireChanged(updated);
  }

  private _isInternalEntity(): "iText" | "delete" | "navigate" | "service" | false {
    const e = this.entity.entity || "";
    if (e === "iText") return "iText";
    if (e === "delete") return "delete";
    if (e.startsWith("navigate.")) return "navigate";
    if (e.startsWith("service.")) return "service";
    return false;
  }

  private _getIconMode(): "none" | "simple" | "map" {
    if (this.entity.icon === undefined) return "none";
    if (typeof this.entity.icon === "string") return "simple";
    return "map";
  }

  private _getColorMode(): "none" | "rgb" | "map" | "template" {
    if (this.entity.color === undefined) return "none";
    if (Array.isArray(this.entity.color)) return "rgb";
    if (typeof this.entity.color === "object") return "map";
    return "template";
  }

  render() {
    const internal = this._isInternalEntity();

    return html`
      <div class="entity-editor">
        ${this._renderEntityPicker(internal)}
        ${internal ? this._renderInternalFields(internal) : this._renderStandardFields()}
      </div>
    `;
  }

  private _renderEntityPicker(internal: "iText" | "delete" | "navigate" | "service" | false) {
    if (internal) {
      return html`
        <div class="field">
          <label>Entity (internal)</label>
          <input type="text" .value=${this.entity.entity}
            @input=${(e: Event) => this._updateField("entity", (e.target as HTMLInputElement).value)} />
          <small>Internal entity: ${internal}</small>
        </div>
      `;
    }

    return html`
      <div class="field">
        <label>Entity</label>
        <nsp-entity-picker
          .hass=${this.hass}
          .value=${this.entity.entity || ""}
          .includeDomains=${this.includeDomains}
          allow-custom-entity
          @value-changed=${(e: CustomEvent) => this._updateField("entity", e.detail.value)}
        ></nsp-entity-picker>
      </div>
    `;
  }

  private _renderInternalFields(type: "iText" | "delete" | "navigate" | "service") {
    switch (type) {
      case "iText":
        return html`
          <div class="field">
            <label>Display Name</label>
            <input type="text" .value=${this.entity.name || ""}
              @input=${(e: Event) => this._updateField("name", (e.target as HTMLInputElement).value)} />
          </div>
          <div class="field">
            <label>Display Value</label>
            <input type="text" .value=${this.entity.value || ""}
              @input=${(e: Event) => this._updateField("value", (e.target as HTMLInputElement).value)} />
          </div>
          ${this._renderIconField()}
          ${this._renderColorField()}
        `;
      case "delete":
        return html`<p class="hint">Placeholder entity — no additional fields.</p>`;
      case "navigate":
        return html`
          <div class="field">
            <label>Navigate to Hidden Card</label>
            <select @change=${(e: Event) => {
              const key = (e.target as HTMLSelectElement).value;
              this._updateField("entity", key ? `navigate.${key}` : "navigate.");
            }}>
              <option value="">Select a key…</option>
              ${this.hiddenCardKeys.map(
                (k) => html`<option value=${k} ?selected=${this.entity.entity === `navigate.${k}`}>${k}</option>`
              )}
            </select>
          </div>
          ${this._renderNameField()}
          ${this._renderIconField()}
          ${this._renderColorField()}
        `;
      case "service": {
        const parts = (this.entity.entity || "service.").replace("service.", "").split(".");
        const domain = parts[0] || "";
        const service = parts[1] || "";
        return html`
          <div class="field-row">
            <div class="field">
              <label>Domain</label>
              <input type="text" .value=${domain}
                @input=${(e: Event) => {
                  const d = (e.target as HTMLInputElement).value;
                  this._updateField("entity", `service.${d}.${service}`);
                }} />
            </div>
            <div class="field">
              <label>Service</label>
              <input type="text" .value=${service}
                @input=${(e: Event) => {
                  const s = (e.target as HTMLInputElement).value;
                  this._updateField("entity", `service.${domain}.${s}`);
                }} />
            </div>
          </div>
          <div class="field">
            <label>Service Data (JSON)</label>
            <textarea rows="3"
              .value=${this.entity.data ? JSON.stringify(this.entity.data, null, 2) : ""}
              placeholder='{"entity_id": "light.example"}'
              @input=${(e: Event) => {
                (e.target as HTMLTextAreaElement).setCustomValidity("");
              }}
              @change=${(e: Event) => {
                const target = e.target as HTMLTextAreaElement;
                const result = parseOptionalJsonObject(target.value, "Service data");
                target.setCustomValidity(result.error || "");
                if (result.error) {
                  target.reportValidity();
                  return;
                }
                this._updateField("data", result.value);
              }}></textarea>
            <small>Enter a JSON object matching the Home Assistant service data payload.</small>
          </div>
          ${this._renderNameField()}
          ${this._renderIconField()}
          ${this._renderColorField()}
        `;
      }
    }
  }

  private _renderStandardFields() {
    return html`
      ${this._renderNameField()}
      <div class="field">
        <label>Value Override</label>
        <input type="text" .value=${this.entity.value || ""} placeholder="HA template supported"
          @input=${(e: Event) => this._updateField("value", (e.target as HTMLInputElement).value)} />
      </div>
      ${this.allowSpeed ? this._renderSpeedField() : nothing}
      ${this._renderIconField()}
      ${this._renderColorField()}
      ${this._renderConditionalVisibility()}
    `;
  }

  private _renderSpeedField() {
    const speed = this.entity.speed;
    return html`
      <div class="field">
        <label>Power Card Speed</label>
        <input
          type="text"
          .value=${speed === undefined ? "" : String(speed)}
          placeholder="-100..100 or HA template"
          @input=${(e: Event) => {
            const raw = (e.target as HTMLInputElement).value.trim();
            if (!raw) {
              this._updateField("speed", undefined);
              return;
            }
            this._updateField(
              "speed",
              /^-?\d+$/.test(raw) ? Number(raw) : raw
            );
          }}
        />
        <small>Integer from -100 to 100, or a Home Assistant template.</small>
      </div>
    `;
  }

  private _renderNameField() {
    return html`
      <div class="field">
        <label>Name Override</label>
        <input type="text" .value=${this.entity.name || ""} placeholder="HA template supported"
          @input=${(e: Event) => this._updateField("name", (e.target as HTMLInputElement).value)} />
      </div>
    `;
  }

  private _renderIconField() {
    const mode = this._getIconMode();
    return html`
      <div class="field">
        <label>Icon Override</label>
        <select .value=${mode} @change=${(e: Event) => {
          const m = (e.target as HTMLSelectElement).value;
          if (m === "none") this._updateField("icon", undefined);
          else if (m === "simple") this._fireChanged({ ...this.entity, icon: "" });
          else this._updateField("icon", {});
        }}>
          <option value="none">None</option>
          <option value="simple" ?selected=${mode === "simple"}>Simple</option>
          <option value="map" ?selected=${mode === "map"}>Per-state map</option>
        </select>
        ${mode === "simple" ? html`
          <input type="text" .value=${(this.entity.icon as string) || ""} placeholder="mdi:lightbulb"
            @input=${(e: Event) => this._updateField("icon", (e.target as HTMLInputElement).value)} />
        ` : nothing}
        ${mode === "map" ? this._renderStringMap("icon", this.entity.icon as Record<string, string>) : nothing}
      </div>
    `;
  }

  private _renderColorField() {
    const mode = this._getColorMode();
    return html`
      <div class="field">
        <label>Color Override</label>
        <select .value=${mode} @change=${(e: Event) => {
          const m = (e.target as HTMLSelectElement).value;
          if (m === "none") this._updateField("color", undefined);
          else if (m === "rgb") this._updateField("color", [255, 255, 255]);
          else if (m === "map") this._updateField("color", {});
          else this._fireChanged({ ...this.entity, color: "" });
        }}>
          <option value="none">None</option>
          <option value="rgb" ?selected=${mode === "rgb"}>RGB [R,G,B]</option>
          <option value="map" ?selected=${mode === "map"}>Per-state map</option>
          <option value="template" ?selected=${mode === "template"}>Template string</option>
        </select>
        ${mode === "rgb" ? this._renderRGBInputs() : nothing}
        ${mode === "template" ? html`
          <input type="text" .value=${(this.entity.color as string) || ""} placeholder="HA template"
            @input=${(e: Event) => this._updateField("color", (e.target as HTMLInputElement).value)} />
        ` : nothing}
        ${mode === "map" ? this._renderStringMap("color", this.entity.color as Record<string, string>) : nothing}
      </div>
    `;
  }

  private _renderRGBInputs() {
    const c = (Array.isArray(this.entity.color) ? this.entity.color : [255, 255, 255]) as number[];
    return html`
      <div class="rgb-row">
        ${["R", "G", "B"].map(
          (label, i) => html`
            <label>${label}</label>
            <input type="number" min="0" max="255" .value=${String(c[i] ?? 0)}
              @input=${(e: Event) => {
                const val = parseInt((e.target as HTMLInputElement).value) || 0;
                const newC = [...c];
                newC[i] = Math.max(0, Math.min(255, val));
                this._updateField("color", newC);
              }} />
          `
        )}
      </div>
    `;
  }

  private _renderStringMap(field: string, map: Record<string, string>) {
    const entries = Object.entries(map || {});
    return html`
      <div class="map-editor">
        ${entries.map(
          ([key, val], i) => html`
            <div class="map-row">
              <input type="text" .value=${key} placeholder="state"
                @input=${(e: Event) => {
                  const newKey = (e.target as HTMLInputElement).value;
                  const newMap = { ...map };
                  delete newMap[key];
                  newMap[newKey] = val;
                  this._updateField(field, newMap);
                }} />
              <input type="text" .value=${String(val)} placeholder="value"
                @input=${(e: Event) => {
                  const newMap = { ...map, [key]: (e.target as HTMLInputElement).value };
                  this._updateField(field, newMap);
                }} />
              <button class="btn-icon" @click=${() => {
                const newMap = { ...map };
                delete newMap[key];
                this._updateField(field, Object.keys(newMap).length ? newMap : undefined);
              }}>✕</button>
            </div>
          `
        )}
        <button class="btn-sm" @click=${() => {
          this._updateField(field, { ...map, "": "" });
        }}>+ Add state</button>
      </div>
    `;
  }

  private _renderConditionalVisibility() {
    return html`
      <details class="advanced">
        <summary>Conditional Display</summary>
        <div class="field">
          <label>Show when state equals</label>
          <input type="text" .value=${this.entity.state || ""} placeholder="e.g. on, home, playing"
            @input=${(e: Event) => this._updateField("state", (e.target as HTMLInputElement).value)} />
          <small>Entity is only shown when its state equals this value</small>
        </div>
        <div class="field">
          <label>Hide when state equals</label>
          <input type="text" .value=${this.entity.state_not || ""} placeholder="e.g. off, unavailable"
            @input=${(e: Event) => this._updateField("state_not", (e.target as HTMLInputElement).value)} />
          <small>Entity is only shown when its state does NOT equal this value</small>
        </div>
        <div class="field">
          <label>Condition template</label>
          <input type="text" .value=${this.entity.state_template || ""} placeholder="{{ states('sensor.example') == 'on' }}"
            @input=${(e: Event) => this._updateField("state_template", (e.target as HTMLInputElement).value)} />
          <small>Jinja2 template — entity is hidden when this evaluates to true</small>
        </div>
      </details>
    `;
  }

  static styles = css`
    :host { display: block; }
    .entity-editor {
      display: flex;
      flex-direction: column;
      gap: 8px;
      padding: 12px;
      background: var(--secondary-background-color, #f5f5f5);
      border-radius: 8px;
    }
    .field { display: flex; flex-direction: column; gap: 4px; }
    .field label { font-size: 12px; font-weight: 500; color: var(--secondary-text-color); }
    .field input, .field select, .field textarea {
      padding: 8px;
      border: 1px solid var(--divider-color, #e0e0e0);
      border-radius: 4px;
      background: var(--card-background-color, white);
      color: var(--primary-text-color);
      font-family: inherit;
      font-size: 14px;
    }
    .field-row { display: flex; gap: 8px; }
    .field-row .field { flex: 1; }
    .rgb-row { display: flex; gap: 8px; align-items: center; margin-top: 4px; }
    .rgb-row input { width: 60px; }
    .rgb-row label { font-size: 12px; font-weight: 500; }
    .map-editor { display: flex; flex-direction: column; gap: 4px; margin-top: 4px; }
    .map-row { display: flex; gap: 4px; align-items: center; }
    .map-row input { flex: 1; padding: 6px; border: 1px solid var(--divider-color); border-radius: 4px; background: var(--card-background-color, white); color: var(--primary-text-color); font-size: 13px; }
    .btn-icon { background: none; border: none; cursor: pointer; font-size: 16px; padding: 4px 8px; color: var(--error-color, #db4437); }
    .btn-sm { align-self: flex-start; padding: 4px 12px; border: 1px dashed var(--divider-color); border-radius: 4px; background: none; cursor: pointer; font-size: 12px; color: var(--primary-color); }
    .hint { color: var(--secondary-text-color); font-size: 13px; font-style: italic; margin: 4px 0; }
    small { color: var(--secondary-text-color); font-size: 11px; }
    details.advanced { margin-top: 4px; }
    details.advanced summary {
      cursor: pointer; font-size: 13px; color: var(--secondary-text-color);
      padding: 4px 0;
    }
    details.advanced[open] summary { margin-bottom: 8px; }
  `;
}

declare global {
  interface HTMLElementTagNameMap {
    "nsp-entity-editor": NspEntityEditor;
  }
}
