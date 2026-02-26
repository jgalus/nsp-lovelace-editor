import { LitElement, html, css } from "lit";
import { unsafeHTML } from "lit/directives/unsafe-html.js";
import { customElement, property, state } from "lit/decorators.js";
import type { HomeAssistant } from "../models/types";

/** Minimal YAML syntax highlighter — no external dependencies. */
function highlightYaml(yaml: string): string {
  return yaml
    .split("\n")
    .map((raw) => {
      // Escape HTML entities first
      const line = raw
        .replace(/&/g, "&amp;")
        .replace(/</g, "&lt;")
        .replace(/>/g, "&gt;");

      // Comment line
      if (/^\s*#/.test(line)) {
        return `<span class="y-comment">${line}</span>`;
      }

      // List item prefix: "  - " — highlight the dash separately
      const listMatch = line.match(/^(\s*-\s+)(.*)$/);
      if (listMatch) {
        const [, prefix, rest] = listMatch;
        return `<span class="y-list-dash">${prefix}</span>${colorizeValue(rest)}`;
      }

      // Key: value
      const kvMatch = line.match(/^(\s*)([^:]+?)(\s*:\s*)(.*)$/);
      if (kvMatch) {
        const [, indent, key, sep, value] = kvMatch;
        return `${indent}<span class="y-key">${key}</span>${sep}${colorizeValue(value)}`;
      }

      return line;
    })
    .join("\n");
}

function colorizeValue(value: string): string {
  if (!value) return value;
  // Quoted string
  if (/^["'].*["']$/.test(value)) return `<span class="y-string">${value}</span>`;
  // Number
  if (/^-?\d+(\.\d+)?$/.test(value)) return `<span class="y-number">${value}</span>`;
  // Boolean / null
  if (/^(true|false|yes|no|null|~)$/i.test(value)) return `<span class="y-bool">${value}</span>`;
  // Inline comment
  const commentIdx = value.indexOf(" #");
  if (commentIdx !== -1) {
    const v = value.slice(0, commentIdx);
    const c = value.slice(commentIdx);
    return `${colorizeValue(v)}<span class="y-comment">${c}</span>`;
  }
  return `<span class="y-value">${value}</span>`;
}

@customElement("nsp-yaml-preview")
export class NspYamlPreview extends LitElement {
  @property({ attribute: false }) public hass!: HomeAssistant;

  @state() private _yaml = "";
  @state() private _loading = true;
  @state() private _error: string | null = null;
  @state() private _copied = false;
  @state() private _exporting = false;
  @state() private _exportStatus: { type: "success" | "error"; message: string } | null = null;

  async connectedCallback() {
    super.connectedCallback();
    await this._loadPreview();
  }

  async _loadPreview() {
    this._loading = true;
    this._error = null;
    try {
      const result = await this.hass.callWS({ type: "nspanel_editor/preview_yaml" });
      this._yaml = result.yaml || "";
    } catch (err: any) {
      this._error = err.message || "Failed to load YAML preview";
    }
    this._loading = false;
  }

  private async _copyToClipboard() {
    try {
      await navigator.clipboard.writeText(this._yaml);
      this._copied = true;
      setTimeout(() => { this._copied = false; }, 2000);
    } catch {
      // Clipboard API unavailable — ignore silently
    }
  }

  private async _exportToFile() {
    this._exporting = true;
    this._exportStatus = null;
    try {
      const result = await this.hass.callWS({ type: "nspanel_editor/export_yaml" });
      this._exportStatus = {
        type: "success",
        message: `Exported ${result.count} panel(s) to apps.yaml: ${result.exported.join(", ")}`,
      };
      setTimeout(() => { this._exportStatus = null; }, 10000);
    } catch (err: any) {
      const code = err.code || "";
      let hint = "";
      if (code === "permission_denied") {
        hint =
          " Check that the Home Assistant process has write access to the " +
          "AppDaemon configuration directory. In container setups, ensure the " +
          "volume is mounted with write permissions.";
      } else if (code === "verification_failed") {
        hint = " The file was written but could not be verified. Check disk space and file integrity.";
      } else if (code === "not_configured") {
        hint = " Configure the AppDaemon apps.yaml path in the integration settings.";
      }
      this._exportStatus = {
        type: "error",
        message: (err.message || "Export failed") + hint,
      };
    }
    this._exporting = false;
  }

  render() {
    if (this._loading) {
      return html`<div class="loading">Loading YAML preview...</div>`;
    }
    if (this._error) {
      return html`<div class="error">${this._error}</div>`;
    }
    return html`
      <div class="yaml-preview">
        <div class="toolbar">
          <button class="btn" @click=${this._loadPreview}>Refresh</button>
          <button class="btn btn-primary" @click=${this._copyToClipboard}>
            ${this._copied ? "Copied!" : "Copy to Clipboard"}
          </button>
          <button class="btn btn-export" ?disabled=${this._exporting} @click=${this._exportToFile}>
            ${this._exporting ? "Exporting..." : "Export to apps.yaml"}
          </button>
        </div>
        ${this._exportStatus
          ? html`
              <div class="status-banner ${this._exportStatus.type}">
                ${this._exportStatus.message}
                <button class="dismiss" @click=${() => { this._exportStatus = null; }}>&times;</button>
              </div>
            `
          : ""}
        <pre><code>${unsafeHTML(highlightYaml(this._yaml))}</code></pre>
      </div>
    `;
  }

  static styles = css`
    :host { display: block; }
    .yaml-preview { display: flex; flex-direction: column; gap: 12px; }
    .toolbar { display: flex; gap: 8px; justify-content: flex-end; }
    .btn {
      padding: 8px 16px;
      border: 1px solid var(--divider-color, #e0e0e0);
      border-radius: 4px;
      background: var(--card-background-color, white);
      color: var(--primary-text-color);
      cursor: pointer;
      font-size: 14px;
    }
    .btn-primary {
      background: var(--primary-color, #03a9f4);
      color: white;
      border-color: var(--primary-color, #03a9f4);
    }
    .btn-export {
      background: var(--success-color, #4caf50);
      color: white;
      border-color: var(--success-color, #4caf50);
    }
    .btn-export:hover { opacity: 0.9; }
    .btn:disabled { opacity: 0.5; cursor: not-allowed; }
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
    .status-banner .dismiss {
      background: none;
      border: none;
      color: white;
      cursor: pointer;
      font-size: 18px;
      padding: 0;
      margin-left: auto;
      line-height: 1;
    }
    pre {
      background: var(--card-background-color, white);
      border: 1px solid var(--divider-color, #e0e0e0);
      border-radius: 8px;
      padding: 16px;
      overflow: auto;
      max-height: 600px;
      font-size: 13px;
      line-height: 1.5;
      margin: 0;
      white-space: pre-wrap;
      word-break: break-word;
    }
    code { font-family: "Fira Code", "Consolas", monospace; color: var(--primary-text-color); }
    /* YAML syntax highlight tokens */
    .y-key { color: #0d47a1; }
    .y-string { color: #2e7d32; }
    .y-number { color: #6a1b9a; }
    .y-bool { color: #e65100; }
    .y-comment { color: #78909c; font-style: italic; }
    .y-list-dash { color: #c62828; }
    .y-value { color: var(--primary-text-color); }
    @media (prefers-color-scheme: dark) {
      .y-key { color: #90caf9; }
      .y-string { color: #a5d6a7; }
      .y-number { color: #ce93d8; }
      .y-bool { color: #ffcc80; }
      .y-comment { color: #90a4ae; }
      .y-list-dash { color: #ef9a9a; }
    }
    .loading { text-align: center; padding: 32px; color: var(--secondary-text-color); }
    .error {
      background: var(--error-color, #db4437);
      color: white;
      padding: 12px 16px;
      border-radius: 4px;
    }
  `;
}

declare global {
  interface HTMLElementTagNameMap {
    "nsp-yaml-preview": NspYamlPreview;
  }
}
