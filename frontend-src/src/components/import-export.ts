import { LitElement, html, css } from "lit";
import { customElement, property, state } from "lit/decorators.js";
import type { HomeAssistant } from "../models/types";

type ImportTab = "file" | "paste";

/** Matches the dict returned by yaml_io.check_yaml_path(). */
interface PathStatus {
  path?: string;
  exists: boolean;
  readable: boolean;
  writable: boolean;
  parent_writable: boolean;
  error?: string | null;
}

type StatusMsg = { type: "success" | "error"; message: string };

@customElement("nsp-import-export")
export class NspImportExport extends LitElement {
  @property({ attribute: false }) public hass!: HomeAssistant;

  @state() private _tab: ImportTab = "file";
  @state() private _pasteText = "";
  @state() private _loading = false;
  @state() private _importStatus: StatusMsg | null = null;
  @state() private _exportStatus: StatusMsg | null = null;
  @state() private _pathStatus: PathStatus | null = null;
  @state() private _checkingPath = false;
  @state() private _yamlPreview = "";
  @state() private _previewLoading = false;
  @state() private _copied = false;
  @state() private _showExport = false;

  async connectedCallback() {
    super.connectedCallback();
    await this._checkPath();
  }

  private async _checkPath() {
    this._checkingPath = true;
    try {
      const result: PathStatus = await this.hass.callWS({ type: "nspanel_editor/check_yaml_path" });
      this._pathStatus = result;
      // Derive accessibility: file must exist and be readable
      if (!result.exists || !result.readable) this._tab = "paste";
    } catch {
      this._pathStatus = null;
      this._tab = "paste";
    }
    this._checkingPath = false;
  }

  private async _importFromFile() {
    this._loading = true;
    this._importStatus = null;
    try {
      const result = await this.hass.callWS({ type: "nspanel_editor/import_yaml" });
      this._importStatus = {
        type: "success",
        message: `Imported ${result.count} panel(s): ${result.imported.join(", ")}`,
      };
      this._fireRefresh();
    } catch (err: any) {
      this._importStatus = { type: "error", message: err.message || "Import failed" };
    }
    this._loading = false;
  }

  private async _importFromPaste() {
    if (!this._pasteText.trim()) return;
    this._loading = true;
    this._importStatus = null;
    try {
      const result = await this.hass.callWS({
        type: "nspanel_editor/import_yaml_text",
        yaml_text: this._pasteText,
      });
      this._importStatus = {
        type: "success",
        message: `Imported ${result.count} panel(s): ${result.imported.join(", ")}`,
      };
      this._pasteText = "";
      this._fireRefresh();
    } catch (err: any) {
      this._importStatus = { type: "error", message: err.message || "Import failed" };
    }
    this._loading = false;
  }

  private async _loadPreview() {
    this._previewLoading = true;
    this._yamlPreview = "";
    try {
      const result = await this.hass.callWS({ type: "nspanel_editor/preview_yaml" });
      this._yamlPreview = result.yaml || "";
    } catch (err: any) {
      this._exportStatus = { type: "error", message: err.message || "Failed to load YAML preview" };
    }
    this._previewLoading = false;
  }

  private async _exportToFile() {
    this._loading = true;
    this._exportStatus = null;
    try {
      const result = await this.hass.callWS({ type: "nspanel_editor/export_yaml" });
      this._exportStatus = {
        type: "success",
        message: `Exported ${result.count} panel(s) to apps.yaml: ${result.exported.join(", ")}`,
      };
    } catch (err: any) {
      const code = err.code || "";
      let hint = "";
      if (code === "permission_denied") {
        hint = " Ensure Home Assistant has write access to the AppDaemon directory.";
      } else if (code === "not_configured") {
        hint = " Configure the AppDaemon apps.yaml path in the integration settings.";
      }
      this._exportStatus = { type: "error", message: (err.message || "Export failed") + hint };
    }
    this._loading = false;
  }

  private async _copyToClipboard() {
    try {
      await navigator.clipboard.writeText(this._yamlPreview);
      this._copied = true;
      setTimeout(() => { this._copied = false; }, 2000);
    } catch { /* clipboard unavailable */ }
  }

  private _fireRefresh() {
    this.dispatchEvent(new CustomEvent("refresh-panels", { bubbles: true, composed: true }));
  }

  private _toggleExport() {
    this._showExport = !this._showExport;
    if (this._showExport && !this._yamlPreview && !this._previewLoading) {
      this._loadPreview();
    }
  }

  render() {
    return html`
      <div class="import-export">
        <div class="section">
          <h3>Import</h3>
          <div class="tabs">
            <button
              class="tab ${this._tab === "file" ? "active" : ""}"
              @click=${() => { this._tab = "file"; }}
            >From apps.yaml File</button>
            <button
              class="tab ${this._tab === "paste" ? "active" : ""}"
              @click=${() => { this._tab = "paste"; }}
            >Paste YAML</button>
          </div>
          ${this._importStatus
            ? html`
                <div class="status-banner ${this._importStatus.type}">
                  ${this._importStatus.message}
                  <button class="dismiss" @click=${() => { this._importStatus = null; }}>&times;</button>
                </div>
              `
            : ""}
          ${this._tab === "file" ? this._renderFileImport() : this._renderPasteImport()}
        </div>

        <div class="section">
          <button
            type="button"
            class="section-header"
            @click=${this._toggleExport}
            aria-expanded=${this._showExport ? "true" : "false"}
          >
            <h3>Export / YAML Preview</h3>
            <span class="chevron">${this._showExport ? "▲" : "▼"}</span>
          </button>
          ${this._showExport ? this._renderExport() : ""}
        </div>
      </div>
    `;
  }

  private _renderFileImport() {
    const pathOk = this._pathStatus?.exists && this._pathStatus?.readable;
    return html`
      <div class="tab-content">
        <p class="description">Import all NSPanel configurations from the configured apps.yaml file.</p>
        ${this._checkingPath
          ? html`<div class="hint">Checking apps.yaml accessibility…</div>`
          : ""}
        ${!this._checkingPath && this._pathStatus !== null && (!this._pathStatus.exists || !this._pathStatus.readable)
          ? html`
              <div class="warning">
                ⚠ apps.yaml is not accessible from Home Assistant.
                Use <button class="link-btn" @click=${() => { this._tab = "paste"; }}>paste-based import</button> instead.
                instead.
              </div>
            `
          : ""}
        ${!this._checkingPath && this._pathStatus === null
          ? html`
              <div class="warning">
                ⚠ apps.yaml path could not be verified.
                Use <button class="link-btn" @click=${() => { this._tab = "paste"; }}>paste-based import</button> instead.
              </div>
            `
          : ""}
        <button
          class="btn btn-primary"
          ?disabled=${this._loading || this._checkingPath || !pathOk}
          @click=${this._importFromFile}
        >
          ${this._loading ? "Importing…" : "Import from apps.yaml"}
        </button>
      </div>
    `;
  }

  private _renderPasteImport() {
    return html`
      <div class="tab-content">
        <p class="description">
          Paste the contents of your apps.yaml file. Useful for container setups
          where the file is not directly accessible from Home Assistant.
        </p>
        <textarea
          rows="10"
          placeholder="Paste your apps.yaml content here…"
          .value=${this._pasteText}
          @input=${(e: Event) => { this._pasteText = (e.target as HTMLTextAreaElement).value; }}
        ></textarea>
        <div class="actions">
          <button
            class="btn btn-primary"
            ?disabled=${this._loading || !this._pasteText.trim()}
            @click=${this._importFromPaste}
          >
            ${this._loading ? "Importing…" : "Import"}
          </button>
        </div>
      </div>
    `;
  }

  private _renderExport() {
    return html`
      <div class="tab-content">
        <div class="export-actions">
          <button
            class="btn"
            ?disabled=${this._previewLoading}
            @click=${this._loadPreview}
          >${this._previewLoading ? "Loading…" : "Refresh Preview"}</button>
          <button
            class="btn btn-primary"
            ?disabled=${!this._yamlPreview}
            @click=${this._copyToClipboard}
          >${this._copied ? "Copied!" : "Copy to Clipboard"}</button>
          <button
            class="btn btn-export"
            ?disabled=${this._loading || !(this._pathStatus?.writable || (!this._pathStatus?.exists && this._pathStatus?.parent_writable))}
            @click=${this._exportToFile}
          >${this._loading ? "Exporting…" : "Export to apps.yaml"}</button>
        </div>
        ${this._exportStatus
          ? html`
              <div class="status-banner ${this._exportStatus.type}">
                ${this._exportStatus.message}
                <button class="dismiss" @click=${() => { this._exportStatus = null; }}>&times;</button>
              </div>
            `
          : ""}
        ${!this._checkingPath && this._pathStatus !== null && !this._pathStatus.writable && !(!this._pathStatus.exists && this._pathStatus.parent_writable)
          ? html`
              <div class="warning">
                ⚠ apps.yaml is not writable. Copy the YAML to clipboard and paste it manually.
              </div>
            `
          : ""}
        ${this._previewLoading
          ? html`<div class="loading">Loading YAML preview…</div>`
          : ""}
        ${this._yamlPreview
          ? html`<pre><code>${this._yamlPreview}</code></pre>`
          : ""}
      </div>
    `;
  }

  static styles = css`
    :host { display: block; }
    .import-export { display: flex; flex-direction: column; gap: 16px; }
    .section {
      background: var(--card-background-color, white);
      border: 1px solid var(--divider-color, #e0e0e0);
      border-radius: 8px;
      padding: 16px;
    }
    .section h3 { margin: 0 0 12px; font-size: 16px; }
    .section-header {
      display: flex;
      align-items: center;
      justify-content: space-between;
      cursor: pointer;
      user-select: none;
      width: 100%;
      background: none;
      border: none;
      padding: 0;
      text-align: left;
      color: inherit;
      font: inherit;
    }
    .section-header:focus-visible { outline: 2px solid var(--primary-color, #03a9f4); border-radius: 4px; }
    .section-header h3 { margin: 0; }
    .chevron { color: var(--secondary-text-color); font-size: 12px; }
    .tabs {
      display: flex;
      border-bottom: 2px solid var(--divider-color, #e0e0e0);
      margin-bottom: 16px;
    }
    .tab {
      padding: 8px 16px;
      border: none;
      background: none;
      cursor: pointer;
      font-size: 14px;
      color: var(--secondary-text-color);
      border-bottom: 2px solid transparent;
      margin-bottom: -2px;
    }
    .tab:hover { color: var(--primary-text-color); }
    .tab.active {
      color: var(--primary-color, #03a9f4);
      border-bottom-color: var(--primary-color, #03a9f4);
      font-weight: 500;
    }
    .tab-content { display: flex; flex-direction: column; gap: 12px; }
    .description { margin: 0; color: var(--secondary-text-color); font-size: 14px; }
    .hint { color: var(--secondary-text-color); font-size: 13px; font-style: italic; }
    .warning {
      background: var(--warning-color, #ffa726);
      color: white;
      padding: 8px 12px;
      border-radius: 4px;
      font-size: 13px;
    }
    .actions { display: flex; justify-content: flex-end; }
    .export-actions { display: flex; gap: 8px; flex-wrap: wrap; }
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
    .btn-export {
      background: var(--success-color, #4caf50);
      color: white;
      border-color: var(--success-color, #4caf50);
    }
    .btn-export:hover { opacity: 0.9; }
    .btn:disabled { opacity: 0.5; cursor: not-allowed; }
    .link-btn {
      background: none;
      border: none;
      color: white;
      text-decoration: underline;
      cursor: pointer;
      font-size: inherit;
      padding: 0;
    }
    textarea {
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
    pre {
      background: var(--secondary-background-color, #f5f5f5);
      border: 1px solid var(--divider-color, #e0e0e0);
      border-radius: 4px;
      padding: 12px;
      overflow: auto;
      max-height: 400px;
      font-size: 13px;
      line-height: 1.5;
      margin: 0;
      white-space: pre-wrap;
      word-break: break-word;
    }
    code { font-family: "Fira Code", "Consolas", monospace; color: var(--primary-text-color); }
    .loading { text-align: center; padding: 16px; color: var(--secondary-text-color); }
    .status-banner {
      padding: 10px 12px;
      border-radius: 4px;
      font-size: 14px;
      display: flex;
      align-items: flex-start;
      gap: 12px;
      margin-bottom: 8px;
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
  `;
}

declare global {
  interface HTMLElementTagNameMap {
    "nsp-import-export": NspImportExport;
  }
}
