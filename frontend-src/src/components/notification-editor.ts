import { LitElement, html, css } from "lit";
import { customElement, state } from "lit/decorators.js";

/** Convert 8-bit R, G, B channels to a decimal RGB565 value (NSPanel format). */
function rgbToRgb565(r: number, g: number, b: number): number {
  return ((r & 0xf8) << 8) | ((g & 0xfc) << 3) | (b >> 3);
}

interface Rgb565Picker {
  r: number;
  g: number;
  b: number;
}

interface PopupNotification {
  heading: string;
  text: string;
  headingColor: Rgb565Picker;
  textColor: Rgb565Picker;
  backgroundColor: Rgb565Picker;
  buttonLeft: string;
  buttonRight: string;
  font: number;
  icon: string;
}

interface ScreensaverNotification {
  heading: string;
  text: string;
}

@customElement("nsp-notification-editor")
export class NspNotificationEditor extends LitElement {
  @state() private _type: "popup" | "screensaver" = "popup";

  @state() private _popup: PopupNotification = {
    heading: "Notification",
    text: "Enter your message here",
    headingColor: { r: 255, g: 255, b: 255 },
    textColor: { r: 255, g: 255, b: 255 },
    backgroundColor: { r: 42, g: 87, b: 100 },
    buttonLeft: "Dismiss",
    buttonRight: "",
    font: 0,
    icon: "",
  };

  @state() private _screensaverNotif: ScreensaverNotification = {
    heading: "Notification",
    text: "Enter your message here",
  };

  @state() private _buzzer = false;
  @state() private _copied = false;

  private _updatePopup(field: keyof PopupNotification, value: any) {
    this._popup = { ...this._popup, [field]: value };
  }

  private _updatePopupColor(
    field: "headingColor" | "textColor" | "backgroundColor",
    channel: "r" | "g" | "b",
    value: number
  ) {
    this._popup = {
      ...this._popup,
      [field]: {
        ...this._popup[field],
        [channel]: Math.max(0, Math.min(255, value)),
      },
    };
  }

  private _generateYaml(): string {
    if (this._type === "popup") {
      const p = this._popup;
      const headingColor565 = rgbToRgb565(
        p.headingColor.r,
        p.headingColor.g,
        p.headingColor.b
      );
      const textColor565 = rgbToRgb565(
        p.textColor.r,
        p.textColor.g,
        p.textColor.b
      );
      const bgColor565 = rgbToRgb565(
        p.backgroundColor.r,
        p.backgroundColor.g,
        p.backgroundColor.b
      );

      const buttons = [p.buttonLeft, p.buttonRight]
        .filter(Boolean)
        .join("~");
      const fontPart = p.font ? String(p.font) : "";
      // Trim trailing tildes: NSPanel ignores empty trailing fields in the
      // tilde-separated payload, but some firmware versions are sensitive to them.
      const notifPayload = [
        p.heading,
        p.text,
        headingColor565,
        textColor565,
        bgColor565,
        fontPart,
        buttons,
        p.icon,
      ]
        .join("~")
        .replace(/~+$/, ""); // trim trailing tildes

      const buzzerBlock = this._buzzer
        ? `      - service: mqtt.publish\n        data:\n          topic: "YOUR_PANEL_RECV_TOPIC"\n          payload: "buzzer~3~3"\n`
        : "";

      return (
        `# Send popup notification to NSPanel\n` +
        `script:\n` +
        `  send_nspanel_notification:\n` +
        `    alias: "NSPanel Popup Notification"\n` +
        `    sequence:\n` +
        `      - service: mqtt.publish\n` +
        `        data:\n` +
        `          topic: "YOUR_PANEL_RECV_TOPIC"\n` +
        `          payload: "pageType~pageNotify"\n` +
        `      - service: mqtt.publish\n` +
        `        data:\n` +
        `          topic: "YOUR_PANEL_RECV_TOPIC"\n` +
        `          payload: "notification~${notifPayload}"\n` +
        buzzerBlock
      );
    } else {
      const n = this._screensaverNotif;
      const buzzerBlock = this._buzzer
        ? `      - service: mqtt.publish\n        data:\n          topic: "YOUR_PANEL_RECV_TOPIC"\n          payload: "buzzer~3~3"\n`
        : "";
      return (
        `# Send screensaver notification to NSPanel\n` +
        `script:\n` +
        `  send_nspanel_screensaver_notification:\n` +
        `    alias: "NSPanel Screensaver Notification"\n` +
        `    sequence:\n` +
        `      - service: mqtt.publish\n` +
        `        data:\n` +
        `          topic: "YOUR_PANEL_RECV_TOPIC"\n` +
        `          payload: "screensaverNotification~${n.heading}~${n.text}"\n` +
        buzzerBlock
      );
    }
  }

  private async _copyYaml() {
    const yaml = this._generateYaml();
    try {
      await navigator.clipboard.writeText(yaml);
    } catch {
      // Fallback for browsers that don't support the Clipboard API (legacy)
      const ta = document.createElement("textarea");
      ta.value = yaml;
      document.body.appendChild(ta);
      ta.select();
      document.execCommand("copy");
      document.body.removeChild(ta);
    }
    this._copied = true;
    setTimeout(() => {
      this._copied = false;
    }, 2000);
  }

  render() {
    return html`
      <div class="notif-editor">
        <div class="field-row">
          <div class="field">
            <label>Notification Type</label>
            <select
              .value=${this._type}
              @change=${(e: Event) => {
                this._type = (e.target as HTMLSelectElement)
                  .value as "popup" | "screensaver";
              }}
            >
              <option value="popup" ?selected=${this._type === "popup"}>
                Popup Notification
              </option>
              <option
                value="screensaver"
                ?selected=${this._type === "screensaver"}
              >
                Screensaver Notification
              </option>
            </select>
          </div>
        </div>

        ${this._type === "popup"
          ? this._renderPopupEditor()
          : this._renderScreensaverNotifEditor()}

        <div class="field">
          <label class="checkbox-label">
            <input
              type="checkbox"
              .checked=${this._buzzer}
              @change=${(e: Event) => {
                this._buzzer = (e.target as HTMLInputElement).checked;
              }}
            />
            Include buzzer (3 beeps)
          </label>
        </div>

        <div class="yaml-output">
          <div class="yaml-header">
            <h4>Generated HA Script YAML</h4>
            <button class="btn btn-primary" @click=${this._copyYaml}>
              ${this._copied ? "Copied!" : "Copy YAML"}
            </button>
          </div>
          <pre><code>${this._generateYaml()}</code></pre>
        </div>
      </div>
    `;
  }

  private _renderPopupEditor() {
    const p = this._popup;
    return html`
      <div class="field">
        <label>Heading</label>
        <input
          type="text"
          .value=${p.heading}
          @input=${(e: Event) =>
            this._updatePopup(
              "heading",
              (e.target as HTMLInputElement).value
            )}
        />
      </div>
      <div class="field">
        <label>Message Text</label>
        <textarea
          rows="3"
          .value=${p.text}
          @input=${(e: Event) =>
            this._updatePopup(
              "text",
              (e.target as HTMLTextAreaElement).value
            )}
        ></textarea>
      </div>
      <div class="field-row">
        <div class="field">
          <label>Left Button (optional)</label>
          <input
            type="text"
            .value=${p.buttonLeft}
            @input=${(e: Event) =>
              this._updatePopup(
                "buttonLeft",
                (e.target as HTMLInputElement).value
              )}
          />
        </div>
        <div class="field">
          <label>Right Button (optional)</label>
          <input
            type="text"
            .value=${p.buttonRight}
            @input=${(e: Event) =>
              this._updatePopup(
                "buttonRight",
                (e.target as HTMLInputElement).value
              )}
          />
        </div>
      </div>
      <div class="field-row">
        <div class="field">
          <label>Font (0–5)</label>
          <input
            type="number"
            min="0"
            max="5"
            .value=${String(p.font)}
            @input=${(e: Event) =>
              this._updatePopup(
                "font",
                parseInt((e.target as HTMLInputElement).value) || 0
              )}
          />
        </div>
        <div class="field">
          <label>Icon (optional)</label>
          <input
            type="text"
            .value=${p.icon}
            placeholder="e.g. alert-outline"
            @input=${(e: Event) =>
              this._updatePopup(
                "icon",
                (e.target as HTMLInputElement).value
              )}
          />
        </div>
      </div>
      ${this._renderRgb565Picker(
        "headingColor",
        "Heading Color",
        p.headingColor
      )}
      ${this._renderRgb565Picker("textColor", "Text Color", p.textColor)}
      ${this._renderRgb565Picker(
        "backgroundColor",
        "Background Color",
        p.backgroundColor
      )}
    `;
  }

  private _renderScreensaverNotifEditor() {
    const n = this._screensaverNotif;
    return html`
      <div class="field">
        <label>Heading</label>
        <input
          type="text"
          .value=${n.heading}
          @input=${(e: Event) => {
            this._screensaverNotif = {
              ...n,
              heading: (e.target as HTMLInputElement).value,
            };
          }}
        />
      </div>
      <div class="field">
        <label>Message Text</label>
        <textarea
          rows="3"
          .value=${n.text}
          @input=${(e: Event) => {
            this._screensaverNotif = {
              ...n,
              text: (e.target as HTMLTextAreaElement).value,
            };
          }}
        ></textarea>
      </div>
    `;
  }

  private _renderRgb565Picker(
    field: "headingColor" | "textColor" | "backgroundColor",
    label: string,
    color: Rgb565Picker
  ) {
    const rgb565 = rgbToRgb565(color.r, color.g, color.b);
    return html`
      <div class="color-picker">
        <div class="color-label">
          <label>${label}</label>
          <span class="rgb565-value">RGB565: ${rgb565}</span>
          <div
            class="color-swatch"
            style="background: rgb(${color.r},${color.g},${color.b})"
          ></div>
        </div>
        <div class="rgb-row">
          ${(["r", "g", "b"] as const).map(
            (ch) => html`
              <label>${ch.toUpperCase()}</label>
              <input
                type="number"
                min="0"
                max="255"
                .value=${String(color[ch])}
                @input=${(e: Event) =>
                  this._updatePopupColor(
                    field,
                    ch,
                    parseInt((e.target as HTMLInputElement).value) || 0
                  )}
              />
            `
          )}
        </div>
      </div>
    `;
  }

  static styles = css`
    :host {
      display: block;
    }
    .notif-editor {
      display: flex;
      flex-direction: column;
      gap: 12px;
    }
    .field {
      display: flex;
      flex-direction: column;
      gap: 4px;
    }
    .field label {
      font-size: 12px;
      font-weight: 500;
      color: var(--secondary-text-color);
    }
    .field input[type="text"],
    .field input[type="number"],
    .field select,
    .field textarea {
      padding: 8px;
      border: 1px solid var(--divider-color, #e0e0e0);
      border-radius: 4px;
      background: var(--card-background-color, white);
      color: var(--primary-text-color);
      font-size: 14px;
      font-family: inherit;
    }
    .field-row {
      display: flex;
      gap: 12px;
    }
    .field-row .field {
      flex: 1;
    }
    .checkbox-label {
      display: flex;
      align-items: center;
      gap: 8px;
      cursor: pointer;
      font-size: 14px;
      color: var(--primary-text-color);
    }
    .checkbox-label input[type="checkbox"] {
      width: 16px;
      height: 16px;
    }
    .color-picker {
      border: 1px solid var(--divider-color, #e0e0e0);
      border-radius: 6px;
      padding: 10px;
    }
    .color-label {
      display: flex;
      align-items: center;
      gap: 8px;
      margin-bottom: 6px;
    }
    .color-label label {
      font-size: 13px;
      font-weight: 500;
      flex: 1;
    }
    .rgb565-value {
      font-size: 11px;
      color: var(--secondary-text-color);
      font-family: monospace;
    }
    .color-swatch {
      width: 24px;
      height: 24px;
      border-radius: 4px;
      border: 1px solid var(--divider-color);
      flex-shrink: 0;
    }
    .rgb-row {
      display: flex;
      align-items: center;
      gap: 4px;
    }
    .rgb-row label {
      font-size: 11px;
      font-weight: 500;
      min-width: 14px;
    }
    .rgb-row input {
      width: 54px;
      padding: 4px 6px;
      font-size: 12px;
      border: 1px solid var(--divider-color);
      border-radius: 4px;
      background: var(--card-background-color, white);
      color: var(--primary-text-color);
    }
    .yaml-output {
      border: 1px solid var(--divider-color, #e0e0e0);
      border-radius: 8px;
      overflow: hidden;
    }
    .yaml-header {
      display: flex;
      justify-content: space-between;
      align-items: center;
      padding: 10px 16px;
      background: var(--secondary-background-color, #f5f5f5);
    }
    .yaml-header h4 {
      margin: 0;
      font-size: 13px;
    }
    .btn {
      padding: 6px 12px;
      border: 1px solid var(--divider-color);
      border-radius: 4px;
      background: var(--card-background-color, white);
      color: var(--primary-text-color);
      cursor: pointer;
      font-size: 13px;
    }
    .btn-primary {
      background: var(--primary-color, #03a9f4);
      color: white;
      border-color: var(--primary-color, #03a9f4);
    }
    pre {
      margin: 0;
      padding: 12px 16px;
      background: var(--card-background-color, white);
      overflow: auto;
      max-height: 300px;
      font-size: 12px;
      line-height: 1.5;
      white-space: pre-wrap;
      word-break: break-word;
    }
    code {
      font-family: "Fira Code", "Consolas", monospace;
      color: var(--primary-text-color);
    }
  `;
}

declare global {
  interface HTMLElementTagNameMap {
    "nsp-notification-editor": NspNotificationEditor;
  }
}
