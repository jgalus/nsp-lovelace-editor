import { LitElement, html, css } from "lit";
import { customElement, property, state } from "lit/decorators.js";
import type { HomeAssistant, PanelSummary } from "./models/types";
import "./components/panel-list";
import "./components/panel-editor";

@customElement("nspanel-lovelace-editor")
export class NsPanelLovelaceEditor extends LitElement {
  @property({ attribute: false }) public hass!: HomeAssistant;
  @property({ type: Boolean }) public narrow = false;
  @property({ attribute: false }) public route: any;
  @property({ attribute: false }) public panel: any;

  @state() private _panels: Record<string, PanelSummary> = {};
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

  private _selectPanel(e: CustomEvent) {
    this._selectedPanel = e.detail.panelId;
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
      return html`
        <div class="container">
          <nsp-panel-editor
            .hass=${this.hass}
            .panelId=${this._selectedPanel}
            @back-to-list=${this._backToList}
          ></nsp-panel-editor>
        </div>
      `;
    }

    return html`
      <div class="container">
        ${this._error ? html`<div class="error">${this._error}</div>` : ""}
        <nsp-panel-list
          .hass=${this.hass}
          .panels=${this._panels}
          @panel-selected=${this._selectPanel}
          @refresh-panels=${this._loadPanels}
        ></nsp-panel-list>
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
  `;
}
