import { LitElement, html, css } from "lit";
import { customElement, property, state } from "lit/decorators.js";
import type { HomeAssistant } from "../models/types";

/**
 * Self-contained entity picker that works without HA's built-in
 * `ha-entity-picker`.  Uses `hass.states` for suggestions and fires
 * `value-changed` with the same shape as the HA component.
 */
@customElement("nsp-entity-picker")
export class NspEntityPicker extends LitElement {
  @property({ attribute: false }) public hass!: HomeAssistant;
  @property({ type: String }) public value = "";
  @property({ type: Array }) public includeDomains: string[] = [];
  @property({ type: Boolean, attribute: "allow-custom-entity" })
  public allowCustomEntity = false;
  @property({ type: String }) public label = "";
  @property({ type: String }) public placeholder = "";

  @state() private _filter = "";
  @state() private _opened = false;

  private _getEntities(): { id: string; name: string }[] {
    if (!this.hass?.states) return [];
    return Object.keys(this.hass.states)
      .filter((eid) => {
        if (this.includeDomains.length === 0) return true;
        const domain = eid.split(".")[0];
        return this.includeDomains.includes(domain);
      })
      .map((eid) => ({
        id: eid,
        name:
          this.hass.states[eid]?.attributes?.friendly_name || eid,
      }))
      .sort((a, b) => a.id.localeCompare(b.id));
  }

  private _getFiltered(): { id: string; name: string }[] {
    const q = this._filter.toLowerCase();
    if (!q) return this._getEntities().slice(0, 50);
    return this._getEntities()
      .filter(
        (e) =>
          e.id.toLowerCase().includes(q) ||
          e.name.toLowerCase().includes(q)
      )
      .slice(0, 50);
  }

  private _onInput(e: Event) {
    const val = (e.target as HTMLInputElement).value;
    this._filter = val;
    this._opened = true;

    if (this.allowCustomEntity) {
      this._setValue(val);
    }
  }

  private _onFocus() {
    this._filter = this.value || "";
    this._opened = true;
  }

  private _onBlur() {
    // Delay to allow click on suggestion
    setTimeout(() => {
      this._opened = false;
    }, 200);
  }

  private _select(entityId: string) {
    this._filter = entityId;
    this._opened = false;
    this._setValue(entityId);
  }

  private _setValue(val: string) {
    this.dispatchEvent(
      new CustomEvent("value-changed", {
        detail: { value: val },
        bubbles: true,
        composed: true,
      })
    );
  }

  private _clear() {
    this._filter = "";
    this._opened = false;
    this._setValue("");
  }

  render() {
    const filtered = this._opened ? this._getFiltered() : [];
    const displayValue = this._opened ? this._filter : this.value;

    return html`
      <div class="picker">
        <div class="input-row">
          <input
            type="text"
            .value=${displayValue || ""}
            placeholder=${this.placeholder || "Search entities..."}
            @input=${this._onInput}
            @focus=${this._onFocus}
            @blur=${this._onBlur}
          />
          ${this.value
            ? html`<button class="clear-btn" @mousedown=${(e: Event) => {
                e.preventDefault();
                this._clear();
              }}>✕</button>`
            : ""}
        </div>
        ${this._opened && filtered.length > 0
          ? html`
              <div class="suggestions">
                ${filtered.map(
                  (e) => html`
                    <div
                      class="suggestion ${e.id === this.value ? "selected" : ""}"
                      @mousedown=${(ev: Event) => {
                        ev.preventDefault();
                        this._select(e.id);
                      }}
                    >
                      <span class="entity-id">${e.id}</span>
                      ${e.name !== e.id
                        ? html`<span class="friendly-name">${e.name}</span>`
                        : ""}
                    </div>
                  `
                )}
              </div>
            `
          : ""}
      </div>
    `;
  }

  static styles = css`
    :host {
      display: block;
      position: relative;
    }
    .picker {
      position: relative;
    }
    .input-row {
      display: flex;
      align-items: center;
      position: relative;
    }
    input {
      width: 100%;
      padding: 8px;
      padding-right: 32px;
      border: 1px solid var(--divider-color, #e0e0e0);
      border-radius: 4px;
      background: var(--card-background-color, white);
      color: var(--primary-text-color);
      font-size: 14px;
      font-family: inherit;
      box-sizing: border-box;
    }
    input:focus {
      outline: none;
      border-color: var(--primary-color, #03a9f4);
    }
    .clear-btn {
      position: absolute;
      right: 4px;
      background: none;
      border: none;
      cursor: pointer;
      font-size: 14px;
      padding: 4px 6px;
      color: var(--secondary-text-color, #727272);
    }
    .clear-btn:hover {
      color: var(--error-color, #db4437);
    }
    .suggestions {
      position: absolute;
      top: 100%;
      left: 0;
      right: 0;
      max-height: 240px;
      overflow-y: auto;
      background: var(--card-background-color, white);
      border: 1px solid var(--divider-color, #e0e0e0);
      border-top: none;
      border-radius: 0 0 4px 4px;
      box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
      z-index: 10;
    }
    .suggestion {
      padding: 8px 10px;
      cursor: pointer;
      display: flex;
      flex-direction: column;
      gap: 1px;
    }
    .suggestion:hover {
      background: var(--secondary-background-color, #f5f5f5);
    }
    .suggestion.selected {
      background: var(--primary-color, #03a9f4);
      color: white;
    }
    .suggestion.selected .friendly-name {
      color: rgba(255, 255, 255, 0.8);
    }
    .entity-id {
      font-size: 13px;
    }
    .friendly-name {
      font-size: 11px;
      color: var(--secondary-text-color, #727272);
    }
  `;
}

declare global {
  interface HTMLElementTagNameMap {
    "nsp-entity-picker": NspEntityPicker;
  }
}
