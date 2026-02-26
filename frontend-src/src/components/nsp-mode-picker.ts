import { LitElement, html, css } from "lit";
import { customElement, property, state } from "lit/decorators.js";
import type { HomeAssistant } from "../models/types";
import { CLIMATE_MODES, ALARM_MODES } from "../models/types";

type ModeType = "climate" | "alarm";

@customElement("nsp-mode-picker")
export class NspModePicker extends LitElement {
  @property({ attribute: false }) public hass!: HomeAssistant;
  @property({ type: String }) public entity = "";
  @property({ type: Array }) public value: string[] = [];
  @property({ type: String }) public modeType: ModeType = "climate";
  @property({ type: String }) public label = "Supported Modes";

  @state() private _customInput = "";

  private _getAvailableModes(): string[] {
    if (this.entity && this.hass?.states?.[this.entity]) {
      const attrs = this.hass.states[this.entity].attributes;
      if (this.modeType === "climate" && Array.isArray(attrs?.hvac_modes)) {
        return attrs.hvac_modes;
      }
      if (this.modeType === "alarm") {
        // HA alarm entities don't directly list arm modes in attributes,
        // but supported_features bitmask indicates which are available:
        // 1=arm_home, 2=arm_away, 4=trigger, 8=arm_night, 16=arm_vacation, 32=arm_custom_bypass
        const features: number = attrs?.supported_features ?? 0;
        const featureMap: [number, string][] = [
          [1, "arm_home"],
          [2, "arm_away"],
          [8, "arm_night"],
          [16, "arm_vacation"],
          [32, "arm_custom_bypass"],
        ];
        const modes = featureMap
          .filter(([bit]) => features & bit)
          .map(([, mode]) => mode);
        return modes.length > 0 ? modes : [...ALARM_MODES];
      }
    }
    // Fallback to full known list
    return this.modeType === "climate" ? [...CLIMATE_MODES] : [...ALARM_MODES];
  }

  private _toggle(mode: string) {
    const current = this.value || [];
    const updated = current.includes(mode)
      ? current.filter((m) => m !== mode)
      : [...current, mode];
    this._fireChanged(updated.length > 0 ? updated : undefined);
  }

  private _addCustom() {
    const mode = this._customInput.trim();
    if (!mode) return;
    const current = this.value || [];
    if (!current.includes(mode)) {
      this._fireChanged([...current, mode]);
    }
    this._customInput = "";
  }

  private _fireChanged(value: string[] | undefined) {
    this.dispatchEvent(
      new CustomEvent("value-changed", {
        detail: { value },
        bubbles: true,
        composed: true,
      })
    );
  }

  render() {
    const available = this._getAvailableModes();
    const selected = this.value || [];
    // Modes in value that aren't in the available list (e.g., entity changed)
    const extraModes = selected.filter((m) => !available.includes(m));
    const entityFound = !!(this.entity && this.hass?.states?.[this.entity]);

    return html`
      <div class="mode-picker">
        <label class="picker-label">${this.label}</label>
        ${!this.entity
          ? html`<p class="hint">Select an entity to see its supported modes</p>`
          : !entityFound
            ? html`<p class="hint">Entity not found in HA — showing all known modes</p>`
            : ""}
        <div class="chips">
          ${available.map(
            (mode) => html`
              <button
                class="chip ${selected.includes(mode) ? "selected" : ""}"
                @click=${() => this._toggle(mode)}
              >
                ${this._formatMode(mode)}
              </button>
            `
          )}
          ${extraModes.map(
            (mode) => html`
              <button
                class="chip selected unavailable"
                @click=${() => this._toggle(mode)}
                title="Not available on selected entity"
              >
                ${this._formatMode(mode)} ⚠
              </button>
            `
          )}
        </div>
        <div class="custom-row">
          <input
            type="text"
            placeholder="Custom mode…"
            .value=${this._customInput}
            @input=${(e: Event) => {
              this._customInput = (e.target as HTMLInputElement).value;
            }}
            @keydown=${(e: KeyboardEvent) => {
              if (e.key === "Enter") {
                e.preventDefault();
                this._addCustom();
              }
            }}
          />
          <button class="btn-add" @click=${this._addCustom}>+</button>
        </div>
      </div>
    `;
  }

  private _formatMode(mode: string): string {
    return mode.replace(/_/g, " ");
  }

  static styles = css`
    :host {
      display: block;
    }
    .mode-picker {
      display: flex;
      flex-direction: column;
      gap: 6px;
    }
    .picker-label {
      font-size: 12px;
      font-weight: 500;
      color: var(--secondary-text-color);
    }
    .hint {
      font-size: 12px;
      font-style: italic;
      color: var(--secondary-text-color);
      margin: 0;
    }
    .chips {
      display: flex;
      flex-wrap: wrap;
      gap: 6px;
    }
    .chip {
      padding: 4px 12px;
      border: 1px solid var(--divider-color, #e0e0e0);
      border-radius: 16px;
      background: var(--card-background-color, white);
      color: var(--primary-text-color);
      font-size: 13px;
      cursor: pointer;
      text-transform: capitalize;
      transition: all 0.15s ease;
    }
    .chip:hover {
      border-color: var(--primary-color, #03a9f4);
    }
    .chip.selected {
      background: var(--primary-color, #03a9f4);
      color: white;
      border-color: var(--primary-color, #03a9f4);
    }
    .chip.unavailable {
      background: var(--warning-color, #ffa726);
      border-color: var(--warning-color, #ffa726);
      opacity: 0.85;
    }
    .custom-row {
      display: flex;
      gap: 4px;
      align-items: center;
    }
    .custom-row input {
      flex: 1;
      padding: 4px 8px;
      border: 1px solid var(--divider-color, #e0e0e0);
      border-radius: 4px;
      background: var(--card-background-color, white);
      color: var(--primary-text-color);
      font-size: 13px;
    }
    .custom-row input:focus {
      outline: none;
      border-color: var(--primary-color, #03a9f4);
    }
    .btn-add {
      padding: 4px 10px;
      border: 1px solid var(--divider-color, #e0e0e0);
      border-radius: 4px;
      background: none;
      cursor: pointer;
      font-size: 16px;
      color: var(--primary-color, #03a9f4);
    }
    .btn-add:hover {
      background: var(--secondary-background-color, #f5f5f5);
    }
  `;
}

declare global {
  interface HTMLElementTagNameMap {
    "nsp-mode-picker": NspModePicker;
  }
}
