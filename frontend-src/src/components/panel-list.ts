import { LitElement, html, css } from "lit";
import { customElement, property, state } from "lit/decorators.js";
import type { HomeAssistant, PanelSummary } from "../models/types";
import "./import-export";

const PANEL_ID_RE = /^[a-zA-Z0-9_-]{1,64}$/;

@customElement("nsp-panel-list")
export class NspPanelList extends LitElement {
  @property({ attribute: false }) public hass!: HomeAssistant;
  @property({ attribute: false }) public panels: Record<string, PanelSummary> = {};

  // Add-panel form
  @state() private _showAddForm = false;
  @state() private _newPanelId = "";
  @state() private _addError: string | null = null;
  @state() private _adding = false;

  // Per-panel inline actions
  @state() private _pendingDelete: string | null = null;
  @state() private _pendingClone: string | null = null;
  @state() private _cloneNewId = "";
  @state() private _cloneError: string | null = null;
  @state() private _cloning = false;
  @state() private _pendingRename: string | null = null;
  @state() private _renameNewId = "";
  @state() private _renameError: string | null = null;
  @state() private _renaming = false;

  // Status feedback
  @state() private _status: { type: "success" | "error"; message: string } | null = null;

  // Show import/export section
  @state() private _showImportExport = false;

  private _fireSelect(panelId: string) {
    this.dispatchEvent(
      new CustomEvent("panel-selected", { detail: { panelId }, bubbles: true, composed: true })
    );
  }

  private _fireRefresh() {
    this.dispatchEvent(new CustomEvent("refresh-panels", { bubbles: true, composed: true }));
  }

  private async _addNewPanel() {
    const id = this._newPanelId.trim();
    if (!id) { this._addError = "Panel ID is required."; return; }
    if (!PANEL_ID_RE.test(id)) {
      this._addError = "Panel ID must be 1–64 alphanumeric, hyphen, or underscore characters.";
      return;
    }
    if (this.panels[id]) {
      this._addError = `A panel with ID "${id}" already exists.`;
      return;
    }
    this._adding = true;
    this._addError = null;
    try {
      await this.hass.callWS({
        type: "nspanel_editor/save_panel",
        panel_id: id,
        config: {
          panelRecvTopic: `cmnd/${id}/CustomSend`,
          panelSendTopic: `tele/${id}/RESULT`,
          model: "eu",
          updateMode: "auto-notify",
          locale: "en_US",
        },
        cards: [],
        hiddenCards: [],
        screensaver: {},
      });
      this._showAddForm = false;
      this._newPanelId = "";
      this._fireRefresh();
    } catch (err: any) {
      this._addError = err.message || "Failed to create panel";
    }
    this._adding = false;
  }

  private async _deletePanel(id: string) {
    try {
      await this.hass.callWS({ type: "nspanel_editor/delete_panel", panel_id: id });
      this._pendingDelete = null;
      this._status = { type: "success", message: `Panel "${id}" deleted.` };
      this._fireRefresh();
    } catch (err: any) {
      this._pendingDelete = null;
      this._status = { type: "error", message: err.message || "Delete failed" };
    }
  }

  private async _clonePanel() {
    const srcId = this._pendingClone!;
    const newId = this._cloneNewId.trim();
    if (!newId) { this._cloneError = "New panel ID is required."; return; }
    if (!PANEL_ID_RE.test(newId)) {
      this._cloneError = "Panel ID must be 1–64 alphanumeric, hyphen, or underscore characters.";
      return;
    }
    if (this.panels[newId]) {
      this._cloneError = `A panel with ID "${newId}" already exists.`;
      return;
    }
    this._cloning = true;
    this._cloneError = null;
    try {
      const src = await this.hass.callWS({ type: "nspanel_editor/get_panel", panel_id: srcId });
      await this.hass.callWS({
        type: "nspanel_editor/save_panel",
        panel_id: newId,
        config: src.config || {},
        cards: src.cards || [],
        hiddenCards: src.hiddenCards || [],
        screensaver: src.screensaver || {},
      });
      this._pendingClone = null;
      this._cloneNewId = "";
      this._status = { type: "success", message: `Panel "${srcId}" cloned as "${newId}".` };
      this._fireRefresh();
    } catch (err: any) {
      this._cloneError = err.message || "Clone failed";
    }
    this._cloning = false;
  }

  private async _renamePanel() {
    const oldId = this._pendingRename!;
    const newId = this._renameNewId.trim();
    if (!newId) { this._renameError = "New panel ID is required."; return; }
    if (newId === oldId) { this._renameError = "New ID must differ from current ID."; return; }
    if (!PANEL_ID_RE.test(newId)) {
      this._renameError = "Panel ID must be 1–64 alphanumeric, hyphen, or underscore characters.";
      return;
    }
    if (this.panels[newId]) {
      this._renameError = `A panel with ID "${newId}" already exists.`;
      return;
    }
    this._renaming = true;
    this._renameError = null;
    try {
      const src = await this.hass.callWS({ type: "nspanel_editor/get_panel", panel_id: oldId });
      await this.hass.callWS({
        type: "nspanel_editor/save_panel",
        panel_id: newId,
        config: src.config || {},
        cards: src.cards || [],
        hiddenCards: src.hiddenCards || [],
        screensaver: src.screensaver || {},
      });
      await this.hass.callWS({ type: "nspanel_editor/delete_panel", panel_id: oldId });
      this._pendingRename = null;
      this._renameNewId = "";
      this._status = { type: "success", message: `Panel renamed from "${oldId}" to "${newId}".` };
      this._fireRefresh();
    } catch (err: any) {
      this._renameError = err.message || "Rename failed";
    }
    this._renaming = false;
  }

  render() {
    const panelIds = Object.keys(this.panels);

    return html`
      <div class="panel-list">
        <div class="header">
          <h1>NSPanel Lovelace Editor</h1>
          <div class="actions">
            <button class="btn btn-primary" @click=${() => { this._showAddForm = !this._showAddForm; this._addError = null; this._newPanelId = ""; }}>+ New Panel</button>
            <button class="btn" @click=${() => { this._showImportExport = !this._showImportExport; }}>
              ${this._showImportExport ? "Hide Import/Export" : "Import / Export"}
            </button>
          </div>
        </div>

        ${this._status
          ? html`
              <div class="status-banner ${this._status.type}">
                ${this._status.message}
                <button class="dismiss" @click=${() => { this._status = null; }}>&times;</button>
              </div>
            `
          : ""}

        ${this._showAddForm ? this._renderAddForm() : ""}

        ${this._showImportExport
          ? html`
              <div class="import-export-wrap">
                <nsp-import-export
                  .hass=${this.hass}
                  @refresh-panels=${this._fireRefresh}
                ></nsp-import-export>
              </div>
            `
          : ""}

        ${panelIds.length === 0
          ? html`
              <div class="empty-state">
                <p>No NSPanel configurations found.</p>
                <p>Import from an existing apps.yaml, paste YAML, or create a new panel.</p>
              </div>
            `
          : html`
              <div class="panel-grid">
                ${panelIds.map((id) => this._renderPanelCard(id, this.panels[id]))}
              </div>
            `}
      </div>
    `;
  }

  private _renderAddForm() {
    return html`
      <div class="inline-form">
        <h3>New Panel</h3>
        <div class="form-row">
          <input
            type="text"
            placeholder="Panel ID (e.g., nspanel-bedroom)"
            .value=${this._newPanelId}
            @input=${(e: Event) => { this._newPanelId = (e.target as HTMLInputElement).value; this._addError = null; }}
            @keydown=${(e: KeyboardEvent) => { if (e.key === "Enter") this._addNewPanel(); }}
          />
          <button class="btn btn-primary" ?disabled=${this._adding} @click=${this._addNewPanel}>
            ${this._adding ? "Creating…" : "Create"}
          </button>
          <button class="btn" @click=${() => { this._showAddForm = false; this._newPanelId = ""; this._addError = null; }}>Cancel</button>
        </div>
        ${this._addError ? html`<div class="field-error">${this._addError}</div>` : ""}
        <p class="hint">ID must be 1–64 alphanumeric, hyphen, or underscore characters.</p>
      </div>
    `;
  }

  private _renderPanelCard(id: string, panel: PanelSummary) {
    const isDeleting = this._pendingDelete === id;
    const isCloning = this._pendingClone === id;
    const isRenaming = this._pendingRename === id;

    return html`
      <div class="panel-card">
        <div class="card-main" @click=${() => { if (!isDeleting && !isCloning && !isRenaming) this._fireSelect(id); }}>
          <h3>${id}</h3>
          <div class="panel-info">
            <span>Model: ${panel.model?.toUpperCase() || "EU"}</span>
            <span>Cards: ${panel.card_count}</span>
            ${panel.hidden_card_count > 0 ? html`<span>Hidden: ${panel.hidden_card_count}</span>` : ""}
            ${panel.has_screensaver ? html`<span class="badge">Screensaver</span>` : ""}
          </div>
        </div>
        <div class="card-actions" @click=${(e: Event) => e.stopPropagation()}>
          ${!isDeleting && !isCloning && !isRenaming
            ? html`
                <button class="btn-icon" title="Rename" @click=${() => { this._pendingRename = id; this._renameNewId = id; this._renameError = null; }}>✏️</button>
                <button class="btn-icon" title="Clone" @click=${() => { this._pendingClone = id; this._cloneNewId = ""; this._cloneError = null; }}>⧉</button>
                <button class="btn-icon btn-danger" title="Delete" @click=${() => { this._pendingDelete = id; }}>🗑</button>
              `
            : ""}
        </div>

        ${isDeleting
          ? html`
              <div class="confirm-row">
                <span>Delete "${id}"?</span>
                <button class="btn btn-danger-sm" @click=${() => this._deletePanel(id)}>Delete</button>
                <button class="btn btn-sm" @click=${() => { this._pendingDelete = null; }}>Cancel</button>
              </div>
            `
          : ""}

        ${isCloning
          ? html`
              <div class="action-form">
                <span class="action-label">Clone as:</span>
                <input
                  type="text"
                  placeholder="New panel ID"
                  .value=${this._cloneNewId}
                  @input=${(e: Event) => { this._cloneNewId = (e.target as HTMLInputElement).value; this._cloneError = null; }}
                  @keydown=${(e: KeyboardEvent) => { if (e.key === "Enter") this._clonePanel(); if (e.key === "Escape") { this._pendingClone = null; } }}
                />
                <button class="btn btn-primary-sm" ?disabled=${this._cloning} @click=${this._clonePanel}>
                  ${this._cloning ? "…" : "Clone"}
                </button>
                <button class="btn btn-sm" @click=${() => { this._pendingClone = null; this._cloneNewId = ""; this._cloneError = null; }}>Cancel</button>
                ${this._cloneError ? html`<div class="field-error">${this._cloneError}</div>` : ""}
              </div>
            `
          : ""}

        ${isRenaming
          ? html`
              <div class="action-form">
                <span class="action-label">New ID:</span>
                <input
                  type="text"
                  .value=${this._renameNewId}
                  @input=${(e: Event) => { this._renameNewId = (e.target as HTMLInputElement).value; this._renameError = null; }}
                  @keydown=${(e: KeyboardEvent) => { if (e.key === "Enter") this._renamePanel(); if (e.key === "Escape") { this._pendingRename = null; } }}
                />
                <button class="btn btn-primary-sm" ?disabled=${this._renaming} @click=${this._renamePanel}>
                  ${this._renaming ? "…" : "Rename"}
                </button>
                <button class="btn btn-sm" @click=${() => { this._pendingRename = null; this._renameNewId = ""; this._renameError = null; }}>Cancel</button>
                ${this._renameError ? html`<div class="field-error">${this._renameError}</div>` : ""}
              </div>
            `
          : ""}
      </div>
    `;
  }

  static styles = css`
    :host { display: block; }
    .header {
      display: flex;
      align-items: center;
      gap: 16px;
      margin-bottom: 16px;
      flex-wrap: wrap;
    }
    .header h1 { margin: 0; flex: 1; }
    .actions { display: flex; gap: 8px; flex-wrap: wrap; }
    .btn {
      padding: 8px 16px;
      border: 1px solid var(--divider-color, #e0e0e0);
      border-radius: 4px;
      background: var(--card-background-color, white);
      color: var(--primary-text-color);
      cursor: pointer;
      font-size: 14px;
    }
    .btn:hover { background: var(--secondary-background-color, #f5f5f5); }
    .btn-primary {
      background: var(--primary-color, #03a9f4);
      color: white;
      border-color: var(--primary-color, #03a9f4);
    }
    .btn-primary:hover { opacity: 0.9; }
    .btn:disabled { opacity: 0.5; cursor: not-allowed; }
    .status-banner {
      padding: 10px 14px;
      border-radius: 4px;
      font-size: 14px;
      display: flex;
      align-items: center;
      gap: 12px;
      margin-bottom: 16px;
    }
    .status-banner.success { background: var(--success-color, #4caf50); color: white; }
    .status-banner.error { background: var(--error-color, #db4437); color: white; }
    .dismiss {
      background: none;
      border: none;
      color: white;
      cursor: pointer;
      font-size: 18px;
      padding: 0;
      margin-left: auto;
      line-height: 1;
    }
    .inline-form {
      background: var(--card-background-color, white);
      border: 1px solid var(--divider-color, #e0e0e0);
      border-radius: 8px;
      padding: 16px;
      margin-bottom: 16px;
    }
    .inline-form h3 { margin: 0 0 12px; }
    .form-row { display: flex; gap: 8px; align-items: center; flex-wrap: wrap; }
    .form-row input {
      flex: 1;
      min-width: 200px;
      padding: 8px;
      border: 1px solid var(--divider-color, #e0e0e0);
      border-radius: 4px;
      background: var(--card-background-color, white);
      color: var(--primary-text-color);
      font-size: 14px;
    }
    .hint { margin: 8px 0 0; font-size: 12px; color: var(--secondary-text-color); }
    .field-error { color: var(--error-color, #db4437); font-size: 12px; margin-top: 4px; width: 100%; }
    .import-export-wrap { margin-bottom: 16px; }
    .panel-grid {
      display: grid;
      grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));
      gap: 16px;
    }
    .panel-card {
      background: var(--card-background-color, white);
      border-radius: 8px;
      padding: 16px;
      border: 1px solid var(--divider-color, #e0e0e0);
      transition: box-shadow 0.2s;
      display: flex;
      flex-direction: column;
      gap: 8px;
    }
    .panel-card:hover { box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1); }
    .card-main { cursor: pointer; flex: 1; }
    .card-main h3 { margin: 0 0 8px 0; }
    .card-actions { display: flex; gap: 4px; justify-content: flex-end; }
    .btn-icon {
      background: none;
      border: none;
      cursor: pointer;
      font-size: 16px;
      padding: 4px;
      border-radius: 4px;
      opacity: 0.6;
      line-height: 1;
    }
    .btn-icon:hover { opacity: 1; background: var(--secondary-background-color, #f5f5f5); }
    .btn-danger { color: var(--error-color, #db4437); }
    .panel-info {
      display: flex;
      gap: 12px;
      color: var(--secondary-text-color, #727272);
      font-size: 14px;
      flex-wrap: wrap;
    }
    .badge {
      background: var(--primary-color, #03a9f4);
      color: white;
      padding: 2px 8px;
      border-radius: 10px;
      font-size: 11px;
    }
    .empty-state {
      text-align: center;
      padding: 48px;
      color: var(--secondary-text-color, #727272);
    }
    .confirm-row {
      display: flex;
      align-items: center;
      gap: 8px;
      padding: 8px;
      background: var(--secondary-background-color, #fff3e0);
      border-radius: 4px;
      font-size: 13px;
      flex-wrap: wrap;
    }
    .confirm-row span { flex: 1; }
    .action-form {
      display: flex;
      align-items: center;
      gap: 8px;
      padding: 8px;
      background: var(--secondary-background-color, #f5f5f5);
      border-radius: 4px;
      flex-wrap: wrap;
    }
    .action-label { font-size: 13px; color: var(--secondary-text-color); white-space: nowrap; }
    .action-form input {
      flex: 1;
      min-width: 120px;
      padding: 6px;
      border: 1px solid var(--divider-color, #e0e0e0);
      border-radius: 4px;
      background: var(--card-background-color, white);
      color: var(--primary-text-color);
      font-size: 13px;
    }
    .btn-primary-sm {
      padding: 5px 10px;
      border: 1px solid var(--primary-color, #03a9f4);
      border-radius: 4px;
      background: var(--primary-color, #03a9f4);
      color: white;
      cursor: pointer;
      font-size: 13px;
    }
    .btn-primary-sm:disabled { opacity: 0.5; cursor: not-allowed; }
    .btn-sm {
      padding: 5px 10px;
      border: 1px solid var(--divider-color, #e0e0e0);
      border-radius: 4px;
      background: var(--card-background-color, white);
      color: var(--primary-text-color);
      cursor: pointer;
      font-size: 13px;
    }
    .btn-danger-sm {
      padding: 5px 10px;
      border: 1px solid var(--error-color, #db4437);
      border-radius: 4px;
      background: var(--error-color, #db4437);
      color: white;
      cursor: pointer;
      font-size: 13px;
    }
  `;
}

declare global {
  interface HTMLElementTagNameMap {
    "nsp-panel-list": NspPanelList;
  }
}
