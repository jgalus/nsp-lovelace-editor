import { LitElement, html, css, nothing } from "lit";
import { customElement, property, state } from "lit/decorators.js";
import type { HomeAssistant, CardConfig, EntityConfig, CardType } from "../models/types";
import { getEntityDomainsForCard, createDefaultEntity } from "../models/types";
import "./entity-editor";
import "./nsp-entity-picker";

@customElement("nsp-card-editor")
export class NspCardEditor extends LitElement {
  @property({ attribute: false }) public hass!: HomeAssistant;
  @property({ attribute: false }) public card!: CardConfig;
  @property({ type: Array }) public hiddenCardKeys: string[] = [];

  @state() private _expandedEntity: number | null = null;
  private _fireChanged(updated: CardConfig) {
    this.dispatchEvent(
      new CustomEvent("card-changed", { detail: { card: updated }, bubbles: true, composed: true })
    );
  }

  private _updateField(field: string, value: any) {
    const updated = { ...this.card, [field]: value } as CardConfig;
    if (value === undefined || value === "" || value === null) {
      delete (updated as any)[field];
    }
    this._fireChanged(updated);
  }

  private _getEntities(): EntityConfig[] {
    return (this.card as any).entities || [];
  }

  private _updateEntity(index: number, entity: EntityConfig) {
    const entities = [...this._getEntities()];
    entities[index] = entity;
    this._updateField("entities", entities);
  }

  private _addEntity() {
    const entities = [...this._getEntities(), createDefaultEntity()];
    this._expandedEntity = entities.length - 1;
    this._updateField("entities", entities);
  }

  private _removeEntity(index: number) {
    const entities = this._getEntities().filter((_, i) => i !== index);
    this._updateField("entities", entities);
  }

  private _moveEntity(from: number, to: number) {
    const entities = [...this._getEntities()];
    const [item] = entities.splice(from, 1);
    entities.splice(to, 0, item);
    this._updateField("entities", entities);
  }

  render() {
    return html`
      <div class="card-editor">
        ${this._renderCommonFields()}
        ${this._renderTypeSpecificFields()}
      </div>
    `;
  }

  private _renderCommonFields() {
    return html`
      <div class="field-row">
        <div class="field">
          <label>Title</label>
          <input type="text" .value=${this.card.title || ""}
            @input=${(e: Event) => this._updateField("title", (e.target as HTMLInputElement).value)} />
        </div>
        <div class="field">
          <label>Key</label>
          <input type="text" .value=${this.card.key || ""}
            @input=${(e: Event) => this._updateField("key", (e.target as HTMLInputElement).value)} />
        </div>
      </div>
    `;
  }

  private _renderTypeSpecificFields() {
    switch (this.card.type) {
      case "cardEntities":
      case "cardGrid":
        return html`
          ${this._renderEntityList()}
          ${this._renderNavItems()}
        `;
      case "cardThermo":
        return this._renderThermoFields();
      case "cardMedia":
        return this._renderMediaFields();
      case "cardAlarm":
        return this._renderAlarmFields();
      case "cardQR":
        return this._renderQRFields();
      case "cardPower":
        return this._renderPowerFields();
      default:
        return html`<p>Unknown card type: ${(this.card as any).type}</p>`;
    }
  }

  private _renderEntityList() {
    const entities = this._getEntities();
    const domains = getEntityDomainsForCard(this.card.type);

    return html`
      <div class="entity-list">
        <div class="section-header">
          <label>Entities (${entities.length})</label>
          <button class="btn-sm" @click=${this._addEntity}>+ Add Entity</button>
        </div>
        ${entities.map(
          (entity, i) => html`
            <div class="entity-item">
              <div class="entity-header" @click=${() => { this._expandedEntity = this._expandedEntity === i ? null : i; }}>
                <span class="entity-grip" draggable="true"
                  @dragstart=${(e: DragEvent) => { e.stopPropagation(); e.dataTransfer!.setData("text/plain", String(i)); e.dataTransfer!.effectAllowed = "move"; }}
                  @dragover=${(e: DragEvent) => e.preventDefault()}
                  @drop=${(e: DragEvent) => { e.preventDefault(); this._moveEntity(parseInt(e.dataTransfer!.getData("text/plain")), i); }}
                  @click=${(e: Event) => e.stopPropagation()}>⠿</span>
                <span class="entity-label">${entity.entity || "(empty)"}</span>
                <span class="expand-indicator">${this._expandedEntity === i ? "▼" : "▶"}</span>
                <button class="btn-icon" @click=${(e: Event) => { e.stopPropagation(); this._removeEntity(i); }}>✕</button>
              </div>
              ${this._expandedEntity === i ? html`
                <nsp-entity-editor
                  .hass=${this.hass}
                  .entity=${entity}
                  .includeDomains=${domains}
                  .hiddenCardKeys=${this.hiddenCardKeys}
                  @entity-changed=${(e: CustomEvent) => { e.stopPropagation(); this._updateEntity(i, e.detail.entity); }}
                ></nsp-entity-editor>
              ` : ""}
            </div>
          `
        )}
      </div>
    `;
  }

  private _renderNavItems() {
    const card = this.card as any;
    return html`
      <details class="nav-items">
        <summary>Navigation Item Overrides</summary>
        <div class="field">
          <label>navItem1</label>
          ${card.navItem1 ? html`
            <nsp-entity-editor
              .hass=${this.hass}
              .entity=${card.navItem1}
              .includeDomains=${getEntityDomainsForCard(this.card.type)}
              .hiddenCardKeys=${this.hiddenCardKeys}
              @entity-changed=${(e: CustomEvent) => { e.stopPropagation(); this._updateField("navItem1", e.detail.entity); }}
            ></nsp-entity-editor>
            <button class="btn-sm" @click=${() => this._updateField("navItem1", undefined)}>Remove navItem1</button>
          ` : html`
            <button class="btn-sm" @click=${() => this._updateField("navItem1", createDefaultEntity())}>+ Add navItem1</button>
          `}
        </div>
        <div class="field">
          <label>navItem2</label>
          ${card.navItem2 ? html`
            <nsp-entity-editor
              .hass=${this.hass}
              .entity=${card.navItem2}
              .includeDomains=${getEntityDomainsForCard(this.card.type)}
              .hiddenCardKeys=${this.hiddenCardKeys}
              @entity-changed=${(e: CustomEvent) => { e.stopPropagation(); this._updateField("navItem2", e.detail.entity); }}
            ></nsp-entity-editor>
            <button class="btn-sm" @click=${() => this._updateField("navItem2", undefined)}>Remove navItem2</button>
          ` : html`
            <button class="btn-sm" @click=${() => this._updateField("navItem2", createDefaultEntity())}>+ Add navItem2</button>
          `}
        </div>
      </details>
    `;
  }

  private _renderThermoFields() {
    const card = this.card as any;
    return html`
      <div class="field">
        <label>Climate Entity</label>
        <nsp-entity-picker
          .hass=${this.hass}
          .value=${card.entity || ""}
          .includeDomains=${["climate"]}
          @value-changed=${(e: CustomEvent) => this._updateField("entity", e.detail.value)}
        ></nsp-entity-picker>
      </div>
      <div class="field-row">
        <div class="field">
          <label>Temperature Unit</label>
          <select .value=${card.temperatureUnit || "celsius"}
            @change=${(e: Event) => this._updateField("temperatureUnit", (e.target as HTMLSelectElement).value)}>
            <option value="celsius">Celsius</option>
            <option value="fahrenheit">Fahrenheit</option>
          </select>
        </div>
      </div>
      <div class="field">
        <label>Supported Modes (comma-separated)</label>
        <input type="text" .value=${(card.supportedModes || []).join(", ")}
          @input=${(e: Event) => {
            const val = (e.target as HTMLInputElement).value;
            this._updateField("supportedModes", val ? val.split(",").map((s: string) => s.trim()) : undefined);
          }} />
      </div>
    `;
  }

  private _renderMediaFields() {
    const card = this.card as any;
    return html`
      <div class="field">
        <label>Media Player Entity</label>
        <nsp-entity-picker
          .hass=${this.hass}
          .value=${card.entity || ""}
          .includeDomains=${["media_player"]}
          @value-changed=${(e: CustomEvent) => this._updateField("entity", e.detail.value)}
        ></nsp-entity-picker>
      </div>
      <div class="field">
        <label>Status Override</label>
        <input type="text" .value=${card.status || ""}
          @input=${(e: Event) => this._updateField("status", (e.target as HTMLInputElement).value)} />
      </div>
      ${this._renderEntityList()}
    `;
  }

  private _renderAlarmFields() {
    const card = this.card as any;
    return html`
      <div class="field">
        <label>Alarm Control Panel Entity</label>
        <nsp-entity-picker
          .hass=${this.hass}
          .value=${card.entity || ""}
          .includeDomains=${["alarm_control_panel"]}
          @value-changed=${(e: CustomEvent) => this._updateField("entity", e.detail.value)}
        ></nsp-entity-picker>
      </div>
      <div class="field">
        <label>Supported Modes (comma-separated)</label>
        <input type="text" .value=${(card.supportedModes || []).join(", ")}
          @input=${(e: Event) => {
            const val = (e.target as HTMLInputElement).value;
            this._updateField("supportedModes", val ? val.split(",").map((s: string) => s.trim()) : undefined);
          }} />
      </div>
    `;
  }

  private _renderQRFields() {
    const card = this.card as any;
    return html`
      <div class="field">
        <label>QR Code Value</label>
        <input type="text" .value=${card.qrCode || ""} placeholder="URL, text, or HA template"
          @input=${(e: Event) => this._updateField("qrCode", (e.target as HTMLInputElement).value)} />
      </div>
      ${this._renderEntityList()}
    `;
  }

  private _renderPowerFields() {
    const card = this.card as any;
    return html`
      <div class="field">
        <label>Cooldown (seconds)</label>
        <input type="number" .value=${String(card.cooldown ?? "")}
          @input=${(e: Event) => {
            const v = (e.target as HTMLInputElement).value;
            this._updateField("cooldown", v ? Number(v) : undefined);
          }} />
      </div>
      ${this._renderEntityList()}
    `;
  }

  static styles = css`
    :host { display: block; }
    .card-editor {
      display: flex;
      flex-direction: column;
      gap: 12px;
    }
    .field { display: flex; flex-direction: column; gap: 4px; }
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
    .section-header { display: flex; justify-content: space-between; align-items: center; }
    .section-header label { font-weight: 600; font-size: 14px; }
    .entity-list { display: flex; flex-direction: column; gap: 8px; }
    .entity-item {
      border: 1px solid var(--divider-color, #e0e0e0);
      border-radius: 8px;
    }
    .entity-header {
      display: flex;
      align-items: center;
      gap: 8px;
      padding: 8px 12px;
      background: var(--card-background-color, white);
      cursor: pointer;
      user-select: none;
    }
    .entity-header:hover { background: var(--secondary-background-color, #f5f5f5); }
    .entity-grip { cursor: grab; user-select: none; color: var(--secondary-text-color); }
    .entity-label { flex: 1; font-size: 13px; color: var(--primary-text-color); overflow: hidden; text-overflow: ellipsis; white-space: nowrap; }
    .expand-indicator { font-size: 12px; color: var(--secondary-text-color); }
    .btn-icon { background: none; border: none; cursor: pointer; font-size: 16px; padding: 4px 8px; color: var(--error-color, #db4437); }
    .btn-sm { padding: 6px 12px; border: 1px dashed var(--divider-color); border-radius: 4px; background: none; cursor: pointer; font-size: 13px; color: var(--primary-color); }
    details.nav-items summary { cursor: pointer; font-size: 14px; font-weight: 500; color: var(--secondary-text-color); padding: 4px 0; }
    details.nav-items[open] summary { margin-bottom: 12px; }
    details.nav-items { border-top: 1px solid var(--divider-color); padding-top: 8px; }
  `;
}

declare global {
  interface HTMLElementTagNameMap {
    "nsp-card-editor": NspCardEditor;
  }
}
