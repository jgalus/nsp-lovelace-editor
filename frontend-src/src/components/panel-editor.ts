import { LitElement, html, css, nothing } from "lit";
import { customElement, property, state } from "lit/decorators.js";
import type { HomeAssistant, PanelData, PanelConfig, CardConfig } from "../models/types";
import "./settings-editor";
import "./card-list";
import "./yaml-preview";

type EditorTab = "settings" | "cards" | "hiddenCards" | "screensaver" | "yaml";

const TAB_LABELS: Record<EditorTab, string> = {
  settings: "Settings",
  cards: "Cards",
  hiddenCards: "Hidden Cards",
  screensaver: "Screensaver",
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
  @state() private _error: string | null = null;
  @state() private _dirty = false;

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
    } catch (err: any) {
      alert(`Save failed: ${err.message}`);
    }
    this._saving = false;
  }

  private async _deletePanel() {
    if (!confirm(`Delete panel "${this.panelId}"? This cannot be undone.`)) return;
    try {
      await this.hass.callWS({
        type: "nspanel_editor/delete_panel",
        panel_id: this.panelId,
      });
      this._fireBack();
    } catch (err: any) {
      alert(`Delete failed: ${err.message}`);
    }
  }

  private _fireBack() {
    this.dispatchEvent(new CustomEvent("back-to-list", { bubbles: true, composed: true }));
  }

  private _handleBack() {
    if (this._dirty && !confirm("You have unsaved changes. Discard and go back?")) return;
    this._fireBack();
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

  private _getHiddenCardKeys(): string[] {
    if (!this._data) return [];
    return this._data.hiddenCards
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
          <button class="btn btn-danger" @click=${this._deletePanel}>Delete Panel</button>
          <button class="btn btn-primary" ?disabled=${this._saving} @click=${this._savePanel}>
            ${this._saving ? "Saving..." : "Save"}
          </button>
        </div>

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
        return this._renderScreensaverReadonly();
      case "yaml":
        return html`
          <nsp-yaml-preview .hass=${this.hass}></nsp-yaml-preview>
        `;
    }
  }

  private _renderScreensaverReadonly() {
    const sc = this._data?.screensaver;
    if (!sc || Object.keys(sc).length === 0) {
      return html`<p class="empty">No screensaver configured. Full screensaver editor coming in a future update.</p>`;
    }
    return html`
      <div class="screensaver-readonly">
        <p class="hint">Screensaver config (read-only). Full editor coming in a future update.</p>
        <pre><code>${JSON.stringify(sc, null, 2)}</code></pre>
      </div>
    `;
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
    .screensaver-readonly { display: flex; flex-direction: column; gap: 8px; }
    .hint { color: var(--secondary-text-color); font-size: 13px; font-style: italic; margin: 0; }
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
