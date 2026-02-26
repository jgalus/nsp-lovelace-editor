import { LitElement, html, css } from "lit";
import { customElement, property, state } from "lit/decorators.js";
import type { HomeAssistant } from "../models/types";

@customElement("nsp-yaml-preview")
export class NspYamlPreview extends LitElement {
  @property({ attribute: false }) public hass!: HomeAssistant;

  @state() private _yaml = "";
  @state() private _loading = true;
  @state() private _error: string | null = null;
  @state() private _copied = false;

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
      // Fallback for older browsers
      const textarea = document.createElement("textarea");
      textarea.value = this._yaml;
      document.body.appendChild(textarea);
      textarea.select();
      document.execCommand("copy");
      document.body.removeChild(textarea);
      this._copied = true;
      setTimeout(() => { this._copied = false; }, 2000);
    }
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
        </div>
        <pre><code>${this._yaml}</code></pre>
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
