import { LitElement, html, css, nothing } from "lit";
import { customElement, property, state } from "lit/decorators.js";
import type { HomeAssistant, PanelData, PanelConfig, CardConfig } from "../models/types";
import "./settings-editor";
import "./card-list";
import "./yaml-preview";
import "./screensaver-editor";
import "./notification-editor";

type EditorTab = "settings" | "cards" | "hiddenCards" | "screensaver" | "notifications" | "yaml";

const TAB_LABELS: Record<EditorTab, string> = {
  settings: "Settings",
  cards: "Cards",
  hiddenCards: "Hidden Cards",
  screensaver: "Screensaver",
  notifications: "Notifications",
  yaml: "YAML Preview",
};

@customElement("nsp-panel-editor")
export class NspPanelEditor extends LitElement {
  @property({ attribute: false }) public hass!: HomeAssistant;
  @property({ type: String }) public panelId!: string;

  @state() private _data: PanelData | null = null;
  @state() private _activeTab: EditorTab = "settings";
  @state() private _loading = true;
  @state() private _saving = false;
  @state() private _saveError: string | null = null;
  @state() private _deleteError: string | null = null;
  @state() private _error: string | null = null;
  @state() private _dirty = false;
  @state() private _saveSuccess = false;
  @state() private _exporting = false;
  @state() private _exportStatus: { type: "success" | "error"; message: string } | null = null;
  @state() private _confirmDelete = false;
  @state() private _confirmBack = false;

  async connectedCallback() {
    super.connectedCallback();
    await this._loadPanel();
  }

  private async _loadPanel() {
    this._loading = true;
    this._error = null;
    try {
      const result = await this.hass.callWS({
        type: "nspanel_editor/get_panel",
        panel_id: this.panelId,
      });
      this._data = {
        config: result.config || {},
        cards: result.cards || [],
        hiddenCards: result.hiddenCards || [],
        screensaver: result.screensaver || {},
      };
      this._dirty = false;
    } catch (err: any) {
      this._error = err.message || "Failed to load panel";
    }
    this._loading = false;
  }

  private async _savePanel() {
    if (!this._data) return;
    this._saving = true;
    this._saveError = null;
    try {
      await this.hass.callWS({
        type: "nspanel_editor/save_panel",
        panel_id: this.panelId,
        config: this._data.config,
        cards: this._data.cards,
        hiddenCards: this._data.hiddenCards,
        screensaver: this._data.screensaver,
      });
      this._dirty = false;
      this._confirmBack = false;
      this._saveSuccess = true;
      this._exportStatus = null;
      setTimeout(() => { this._saveSuccess = false; }, 15000);
    } catch (err: any) {
      this._saveError = err.message || "Save failed";
    }
    this._saving = false;
  }

  private async _exportNow() {
    this._exporting = true;
    this._exportStatus = null;
    try {
      const result = await this.hass.callWS({ type: "nspanel_editor/export_yaml" });
      this._exportStatus = {
        type: "success",
        message: `Exported ${result.count} panel(s) to apps.yaml`,
      };
      this._saveSuccess = false;
      setTimeout(() => { this._exportStatus = null; }, 10000);
    } catch (err: any) {
      const code = err.code || "";
      let hint = "";
      if (code === "permission_denied") {
        hint =
          " Check that the Home Assistant process has write access to the " +
          "AppDaemon configuration directory.";
      } else if (code === "not_configured") {
        hint = " Configure the AppDaemon apps.yaml path in the integration settings.";
      }
      this._exportStatus = {
        type: "error",
        message: (err.message || "Export failed") + hint,
      };
      this._saveSuccess = false;
    }
    this._exporting = false;
  }

  private async _deletePanel() {
    try {
      await this.hass.callWS({
        type: "nspanel_editor/delete_panel",
        panel_id: this.panelId,
      });
      this._confirmDelete = false;
      this._fireBack();
    } catch (err: any) {
      this._confirmDelete = false;
      this._deleteError = err.message || "Delete failed";
    }
  }

  private _fireBack() {
    this.dispatchEvent(new CustomEvent("back-to-list", { bubbles: true, composed: true }));
  }

  private _handleBack() {
    if (this._dirty) {
      this._confirmBack = true;
    } else {
      this._fireBack();
    }
  }

  private _onConfigChanged(e: CustomEvent) {
    if (!this._data) return;
    this._data = { ...this._data, config: e.detail.config };
    this._dirty = true;
  }

  private _onCardsChanged(e: CustomEvent) {
    if (!this._data) return;
    this._data = { ...this._data, cards: e.detail.cards };
    this._dirty = true;
  }

  private _onHiddenCardsChanged(e: CustomEvent) {
    if (!this._data) return;
    this._data = { ...this._data, hiddenCards: e.detail.cards };
    this._dirty = true;
  }

  private _onScreensaverChanged(e: CustomEvent) {
    if (!this._data) return;
    this._data = { ...this._data, screensaver: e.detail.screensaver };
    this._dirty = true;
  }

  private _getHiddenCardKeys(): string[] {
    if (!this._data) return [];
    return this._data.hiddenCards
      .map((c) => c.key)
      .filter((k): k is string => !!k);
  }

  private _getCardKeys(): string[] {
    if (!this._data) return [];
    return [...this._data.cards, ...this._data.hiddenCards]
      .map((c) => c.key)
      .filter((k): k is string => !!k);
  }

  render() {
    if (this._loading) {
      return html`<div class="loading">Loading panel configuration...</div>`;
    }
    if (this._error) {
      return html`
        <div class="error-container">
          <div class="error">${this._error}</div>
          <button class="btn" @click=${this._fireBack}>Back to list</button>
        </div>
      `;
    }
    if (!this._data) return nothing;

    return html`
      <div class="panel-editor">
        <div class="header">
          <button class="btn" @click=${this._handleBack}>&larr; Back</button>
          <h2>${this.panelId}</h2>
          ${this._dirty ? html`<span class="dirty-badge">Unsaved</span>` : ""}
          <span class="spacer"></span>
          ${this._confirmDelete
            ? html`
                <span class="confirm-text">Delete "${this.panelId}"?</span>
                <button class="btn btn-danger" @click=${this._deletePanel}>Confirm Delete</button>
                <button class="btn" @click=${() => { this._confirmDelete = false; }}>Cancel</button>
              `
            : html`
                <button class="btn btn-danger" @click=${() => { this._confirmDelete = true; }}>Delete Panel</button>
                <button class="btn btn-primary" ?disabled=${this._saving} @click=${this._savePanel}>
                  ${this._saving ? "Saving…" : "Save"}
                </button>
              `}
        </div>

        ${this._confirmBack
          ? html`
              <div class="warn-banner">
                <span>You have unsaved changes. Discard and go back?</span>
                <button class="btn-warn-action" @click=${() => { this._confirmBack = false; this._fireBack(); }}>Discard &amp; Go Back</button>
                <button class="btn-warn-cancel" @click=${() => { this._confirmBack = false; }}>Keep Editing</button>
              </div>
            `
          : ""}

        ${this._saveError
          ? html`
              <div class="status-banner error">
                Save failed: ${this._saveError}
                <button class="dismiss" @click=${() => { this._saveError = null; }}>&times;</button>
              </div>
            `
          : ""}

        ${this._deleteError
          ? html`
              <div class="status-banner error">
                Delete failed: ${this._deleteError}
                <button class="dismiss" @click=${() => { this._deleteError = null; }}>&times;</button>
              </div>
            `
          : ""}

        ${this._saveSuccess
          ? html`
              <div class="info-banner">
                <span>Save successful — don't forget to export to apps.yaml for changes to take effect in AppDaemon.</span>
                <button class="btn btn-export-sm" ?disabled=${this._exporting} @click=${this._exportNow}>
                  ${this._exporting ? "Exporting..." : "Export now"}
                </button>
                <button class="dismiss" @click=${() => { this._saveSuccess = false; }}>&times;</button>
              </div>
            `
          : ""}
        ${this._exportStatus
          ? html`
              <div class="status-banner ${this._exportStatus.type}">
                ${this._exportStatus.message}
                <button class="dismiss" @click=${() => { this._exportStatus = null; }}>&times;</button>
              </div>
            `
          : ""}

        <div class="tabs">
          ${(Object.keys(TAB_LABELS) as EditorTab[]).map(
            (tab) => html`
              <button class="tab ${this._activeTab === tab ? "active" : ""}"
                @click=${() => { this._activeTab = tab; }}>
                ${TAB_LABELS[tab]}
                ${tab === "cards" ? html`<span class="count">${this._data!.cards.length}</span>` : ""}
                ${tab === "hiddenCards" ? html`<span class="count">${this._data!.hiddenCards.length}</span>` : ""}
              </button>
            `
          )}
        </div>

        <div class="tab-content">
          ${this._renderActiveTab()}
        </div>
      </div>
    `;
  }

  private _renderActiveTab() {
    if (!this._data) return nothing;

    switch (this._activeTab) {
      case "settings":
        return html`
          <nsp-settings-editor
            .hass=${this.hass}
            .config=${this._data.config}
            @config-changed=${this._onConfigChanged}
          ></nsp-settings-editor>
        `;
      case "cards":
        return html`
          <nsp-card-list
            .hass=${this.hass}
            .cards=${this._data.cards}
            .hiddenCardKeys=${this._getHiddenCardKeys()}
            label="Cards"
            @cards-changed=${this._onCardsChanged}
          ></nsp-card-list>
        `;
      case "hiddenCards":
        return html`
          <nsp-card-list
            .hass=${this.hass}
            .cards=${this._data.hiddenCards}
            .hiddenCardKeys=${this._getHiddenCardKeys()}
            label="Hidden Cards"
            @cards-changed=${this._onHiddenCardsChanged}
          ></nsp-card-list>
        `;
      case "screensaver":
        return html`
          <nsp-screensaver-editor
            .hass=${this.hass}
            .screensaver=${this._data.screensaver}
            .cardKeys=${this._getCardKeys()}
            @screensaver-changed=${this._onScreensaverChanged}
          ></nsp-screensaver-editor>
        `;
      case "notifications":
        return html`
          <nsp-notification-editor></nsp-notification-editor>
        `;
      case "yaml":
        return html`
          <nsp-yaml-preview .hass=${this.hass}></nsp-yaml-preview>
        `;
    }
  }

  static styles = css`
    :host { display: block; }
    .panel-editor { display: flex; flex-direction: column; gap: 16px; }
    .header {
      display: flex;
      align-items: center;
      gap: 12px;
      flex-wrap: wrap;
    }
    .header h2 { margin: 0; }
    .spacer { flex: 1; }
    .dirty-badge {
      background: var(--warning-color, #ffa726);
      color: white;
      padding: 2px 10px;
      border-radius: 10px;
      font-size: 12px;
    }
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
    .btn-danger {
      color: var(--error-color, #db4437);
      border-color: var(--error-color, #db4437);
    }
    .btn-danger:hover { background: var(--error-color, #db4437); color: white; }
    .btn:disabled { opacity: 0.5; cursor: not-allowed; }
    .tabs {
      display: flex;
      gap: 0;
      border-bottom: 2px solid var(--divider-color, #e0e0e0);
      overflow-x: auto;
    }
    .tab {
      padding: 10px 20px;
      border: none;
      background: none;
      cursor: pointer;
      font-size: 14px;
      color: var(--secondary-text-color);
      border-bottom: 2px solid transparent;
      margin-bottom: -2px;
      white-space: nowrap;
      display: flex;
      align-items: center;
      gap: 6px;
    }
    .tab:hover { color: var(--primary-text-color); }
    .tab.active {
      color: var(--primary-color, #03a9f4);
      border-bottom-color: var(--primary-color, #03a9f4);
      font-weight: 500;
    }
    .count {
      background: var(--secondary-background-color, #e0e0e0);
      padding: 1px 7px;
      border-radius: 10px;
      font-size: 11px;
    }
    .tab.active .count { background: var(--primary-color, #03a9f4); color: white; }
    .tab-content { min-height: 200px; }
    .loading { text-align: center; padding: 48px; color: var(--secondary-text-color); }
    .error-container { display: flex; flex-direction: column; gap: 16px; align-items: flex-start; }
    .error {
      background: var(--error-color, #db4437);
      color: white;
      padding: 12px 16px;
      border-radius: 4px;
      width: 100%;
      box-sizing: border-box;
    }
    .empty { text-align: center; color: var(--secondary-text-color); padding: 32px; }
    .info-banner {
      background: var(--info-color, #039be5);
      color: white;
      padding: 12px 16px;
      border-radius: 4px;
      display: flex;
      align-items: center;
      gap: 12px;
      font-size: 14px;
    }
    .btn-export-sm {
      padding: 4px 12px;
      border: 1px solid white;
      border-radius: 4px;
      background: transparent;
      color: white;
      cursor: pointer;
      font-size: 13px;
      white-space: nowrap;
    }
    .btn-export-sm:hover { background: rgba(255, 255, 255, 0.15); }
    .btn-export-sm:disabled { opacity: 0.5; cursor: not-allowed; }
    .status-banner {
      padding: 12px 16px;
      border-radius: 4px;
      font-size: 14px;
      display: flex;
      align-items: flex-start;
      gap: 12px;
    }
    .status-banner.success {
      background: var(--success-color, #4caf50);
      color: white;
    }
    .status-banner.error {
      background: var(--error-color, #db4437);
      color: white;
    }
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
    .confirm-text {
      font-size: 14px;
      color: var(--error-color, #db4437);
      white-space: nowrap;
    }
    .warn-banner {
      background: var(--warning-color, #ffa726);
      color: white;
      padding: 12px 16px;
      border-radius: 4px;
      display: flex;
      align-items: center;
      gap: 12px;
      font-size: 14px;
      flex-wrap: wrap;
    }
    .btn-warn-action {
      padding: 4px 12px;
      border: 1px solid white;
      border-radius: 4px;
      background: transparent;
      color: white;
      cursor: pointer;
      font-size: 13px;
      white-space: nowrap;
    }
    .btn-warn-action:hover { background: rgba(255, 255, 255, 0.2); }
    .btn-warn-cancel {
      padding: 4px 12px;
      border: 1px solid rgba(255, 255, 255, 0.5);
      border-radius: 4px;
      background: transparent;
      color: white;
      cursor: pointer;
      font-size: 13px;
      white-space: nowrap;
    }
    pre {
      background: var(--card-background-color, white);
      border: 1px solid var(--divider-color, #e0e0e0);
      border-radius: 8px;
      padding: 16px;
      overflow: auto;
      max-height: 400px;
      font-size: 13px;
      margin: 0;
    }
    code { font-family: "Fira Code", "Consolas", monospace; }
  `;
}

declare global {
  interface HTMLElementTagNameMap {
    "nsp-panel-editor": NspPanelEditor;
  }
}
