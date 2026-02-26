import { LitElement, html, css } from "lit";
import { customElement, property, state } from "lit/decorators.js";
import type { HomeAssistant, PanelSummary } from "../models/types";

@customElement("nsp-panel-list")
export class NspPanelList extends LitElement {
  @property({ attribute: false }) public hass!: HomeAssistant;
  @property({ attribute: false }) public panels: Record<string, PanelSummary> = {};

  @state() private _showImportDialog = false;
  @state() private _importText = "";
  @state() private _importing = false;

  private _fireSelect(panelId: string) {
    this.dispatchEvent(
      new CustomEvent("panel-selected", { detail: { panelId }, bubbles: true, composed: true })
    );
  }

  private _fireRefresh() {
    this.dispatchEvent(new CustomEvent("refresh-panels", { bubbles: true, composed: true }));
  }

  private async _importYaml() {
    try {
      const result = await this.hass.callWS({ type: "nspanel_editor/import_yaml" });
      alert(`Imported ${result.count} panel(s): ${result.imported.join(", ")}`);
      this._fireRefresh();
    } catch (err: any) {
      alert(`Import failed: ${err.message}`);
    }
  }

  private async _importPastedYaml() {
    if (!this._importText.trim()) return;
    this._importing = true;
    try {
      const result = await this.hass.callWS({
        type: "nspanel_editor/import_yaml_text",
        yaml_text: this._importText,
      });
      alert(`Imported ${result.count} panel(s): ${result.imported.join(", ")}`);
      this._showImportDialog = false;
      this._importText = "";
      this._fireRefresh();
    } catch (err: any) {
      alert(`Import failed: ${err.message}`);
    }
    this._importing = false;
  }

  private async _addNewPanel() {
    const name = prompt("Enter a name for the new panel (e.g., nspanel-bedroom):");
    if (!name) return;
    try {
      await this.hass.callWS({
        type: "nspanel_editor/save_panel",
        panel_id: name,
        config: {
          panelRecvTopic: `cmnd/${name}/CustomSend`,
          panelSendTopic: `tele/${name}/RESULT`,
          model: "eu",
          updateMode: "auto-notify",
          locale: "en_US",
        },
        cards: [],
        hiddenCards: [],
        screensaver: {},
      });
      this._fireRefresh();
    } catch (err: any) {
      alert(`Failed to create panel: ${err.message}`);
    }
  }

  render() {
    const panelIds = Object.keys(this.panels);

    return html`
      <div class="panel-list">
        <div class="header">
          <h1>NSPanel Lovelace Editor</h1>
          <div class="actions">
            <button class="btn btn-primary" @click=${this._addNewPanel}>+ New Panel</button>
            <button class="btn" @click=${this._importYaml}>Import from apps.yaml</button>
            <button class="btn" @click=${() => { this._showImportDialog = true; }}>Import from pasted YAML</button>
          </div>
        </div>

        ${this._showImportDialog ? this._renderImportDialog() : ""}

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

  private _renderImportDialog() {
    return html`
      <div class="import-dialog">
        <h3>Paste apps.yaml content</h3>
        <textarea rows="12" placeholder="Paste your apps.yaml content here..."
          .value=${this._importText}
          @input=${(e: Event) => { this._importText = (e.target as HTMLTextAreaElement).value; }}></textarea>
        <div class="dialog-actions">
          <button class="btn" @click=${() => { this._showImportDialog = false; this._importText = ""; }}>Cancel</button>
          <button class="btn btn-primary" ?disabled=${this._importing || !this._importText.trim()}
            @click=${this._importPastedYaml}>
            ${this._importing ? "Importing..." : "Import"}
          </button>
        </div>
      </div>
    `;
  }

  private _renderPanelCard(id: string, panel: PanelSummary) {
    return html`
      <div class="panel-card" @click=${() => this._fireSelect(id)}>
        <h3>${id}</h3>
        <div class="panel-info">
          <span>Model: ${panel.model?.toUpperCase() || "EU"}</span>
          <span>Cards: ${panel.card_count}</span>
          ${panel.hidden_card_count > 0
            ? html`<span>Hidden: ${panel.hidden_card_count}</span>`
            : ""}
          ${panel.has_screensaver
            ? html`<span class="badge">Screensaver</span>`
            : ""}
        </div>
      </div>
    `;
  }

  static styles = css`
    :host { display: block; }
    .header {
      display: flex;
      align-items: center;
      gap: 16px;
      margin-bottom: 24px;
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
    .panel-card:hover { box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1); }
    .panel-card h3 { margin: 0 0 8px 0; }
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
    .import-dialog {
      background: var(--card-background-color, white);
      border: 1px solid var(--divider-color, #e0e0e0);
      border-radius: 8px;
      padding: 16px;
      margin-bottom: 16px;
    }
    .import-dialog h3 { margin: 0 0 12px; }
    .import-dialog textarea {
      width: 100%;
      box-sizing: border-box;
      padding: 12px;
      border: 1px solid var(--divider-color, #e0e0e0);
      border-radius: 4px;
      font-family: "Fira Code", "Consolas", monospace;
      font-size: 13px;
      resize: vertical;
      background: var(--card-background-color, white);
      color: var(--primary-text-color);
    }
    .dialog-actions { display: flex; gap: 8px; justify-content: flex-end; margin-top: 12px; }
  `;
}

declare global {
  interface HTMLElementTagNameMap {
    "nsp-panel-list": NspPanelList;
  }
}
