import { LitElement, html, css, PropertyValues } from "lit";
import { customElement, property, state } from "lit/decorators.js";

interface HassObject {
  states: Record<string, any>;
  callWS: (msg: Record<string, any>) => Promise<any>;
  connection: any;
}

@customElement("nspanel-lovelace-editor")
export class NsPanelLovelaceEditor extends LitElement {
  @property({ attribute: false }) public hass!: HassObject;
  @property({ type: Boolean }) public narrow = false;
  @property({ attribute: false }) public route: any;
  @property({ attribute: false }) public panel: any;

  @state() private _panels: Record<string, any> = {};
  @state() private _selectedPanel: string | null = null;
  @state() private _loading = true;
  @state() private _error: string | null = null;

  async connectedCallback() {
    super.connectedCallback();
    await this._loadPanels();
  }

  private async _loadPanels() {
    this._loading = true;
    this._error = null;
    try {
      const result = await this.hass.callWS({
        type: "nspanel_editor/list_panels",
      });
      this._panels = result.panels || {};
    } catch (err: any) {
      this._error = err.message || "Failed to load panels";
    }
    this._loading = false;
  }

  private async _importYaml() {
    try {
      const result = await this.hass.callWS({
        type: "nspanel_editor/import_yaml",
      });
      alert(`Imported ${result.count} panel(s): ${result.imported.join(", ")}`);
      await this._loadPanels();
    } catch (err: any) {
      alert(`Import failed: ${err.message}`);
    }
  }

  private async _exportYaml() {
    if (!confirm("Export all panel configs to apps.yaml? This will overwrite NSPanel entries in the file.")) {
      return;
    }
    try {
      const result = await this.hass.callWS({
        type: "nspanel_editor/export_yaml",
      });
      alert(`Exported ${result.count} panel(s) to apps.yaml`);
    } catch (err: any) {
      alert(`Export failed: ${err.message}`);
    }
  }

  private _selectPanel(panelId: string) {
    this._selectedPanel = panelId;
  }

  private _backToList() {
    this._selectedPanel = null;
    this._loadPanels();
  }

  render() {
    if (this._loading) {
      return html`
        <div class="container">
          <div class="loading">Loading NSPanel configurations...</div>
        </div>
      `;
    }

    if (this._selectedPanel) {
      return this._renderPanelEditor();
    }

    return this._renderPanelList();
  }

  private _renderPanelList() {
    const panelIds = Object.keys(this._panels);

    return html`
      <div class="container">
        <div class="header">
          <h1>NSPanel Lovelace Editor</h1>
          <div class="actions">
            <button class="btn btn-primary" @click=${this._importYaml}>
              Import from apps.yaml
            </button>
            <button class="btn" @click=${this._exportYaml}>
              Export to apps.yaml
            </button>
          </div>
        </div>

        ${this._error ? html`<div class="error">${this._error}</div>` : ""}

        ${panelIds.length === 0
          ? html`
              <div class="empty-state">
                <p>No NSPanel configurations found.</p>
                <p>Import from an existing apps.yaml or create a new panel.</p>
              </div>
            `
          : html`
              <div class="panel-grid">
                ${panelIds.map(
                  (id) => html`
                    <div class="panel-card" @click=${() => this._selectPanel(id)}>
                      <h3>${id}</h3>
                      <div class="panel-info">
                        <span>Model: ${this._panels[id].model}</span>
                        <span>Cards: ${this._panels[id].card_count}</span>
                        ${this._panels[id].hidden_card_count > 0
                          ? html`<span>Hidden: ${this._panels[id].hidden_card_count}</span>`
                          : ""}
                      </div>
                    </div>
                  `
                )}
              </div>
            `}
      </div>
    `;
  }

  private _renderPanelEditor() {
    return html`
      <div class="container">
        <div class="header">
          <button class="btn" @click=${this._backToList}>← Back</button>
          <h2>Editing: ${this._selectedPanel}</h2>
        </div>
        <div class="editor-placeholder">
          <p>Panel editor for <strong>${this._selectedPanel}</strong> — coming in Phase 3.</p>
          <p>Use the WebSocket API directly for now.</p>
        </div>
      </div>
    `;
  }

  static styles = css`
    :host {
      display: block;
      padding: 16px;
      background: var(--primary-background-color, #fafafa);
      min-height: 100vh;
      font-family: var(--paper-font-body1_-_font-family, "Roboto", sans-serif);
      color: var(--primary-text-color, #212121);
    }

    .container {
      max-width: 1200px;
      margin: 0 auto;
    }

    .header {
      display: flex;
      align-items: center;
      gap: 16px;
      margin-bottom: 24px;
      flex-wrap: wrap;
    }

    .header h1,
    .header h2 {
      margin: 0;
      flex: 1;
    }

    .actions {
      display: flex;
      gap: 8px;
    }

    .btn {
      padding: 8px 16px;
      border: 1px solid var(--divider-color, #e0e0e0);
      border-radius: 4px;
      background: var(--card-background-color, white);
      color: var(--primary-text-color, #212121);
      cursor: pointer;
      font-size: 14px;
    }

    .btn:hover {
      background: var(--secondary-background-color, #f5f5f5);
    }

    .btn-primary {
      background: var(--primary-color, #03a9f4);
      color: white;
      border-color: var(--primary-color, #03a9f4);
    }

    .btn-primary:hover {
      opacity: 0.9;
    }

    .panel-grid {
      display: grid;
      grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));
      gap: 16px;
    }

    .panel-card {
      background: var(--card-background-color, white);
      border-radius: 8px;
      padding: 16px;
      cursor: pointer;
      border: 1px solid var(--divider-color, #e0e0e0);
      transition: box-shadow 0.2s;
    }

    .panel-card:hover {
      box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
    }

    .panel-card h3 {
      margin: 0 0 8px 0;
    }

    .panel-info {
      display: flex;
      gap: 12px;
      color: var(--secondary-text-color, #727272);
      font-size: 14px;
    }

    .empty-state {
      text-align: center;
      padding: 48px;
      color: var(--secondary-text-color, #727272);
    }

    .loading {
      text-align: center;
      padding: 48px;
    }

    .error {
      background: var(--error-color, #db4437);
      color: white;
      padding: 12px 16px;
      border-radius: 4px;
      margin-bottom: 16px;
    }

    .editor-placeholder {
      background: var(--card-background-color, white);
      border-radius: 8px;
      padding: 32px;
      text-align: center;
      border: 1px solid var(--divider-color, #e0e0e0);
    }
  `;
}
