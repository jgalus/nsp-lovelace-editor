import { LitElement, html, css } from "lit";
import { customElement, property, state } from "lit/decorators.js";
import type { HomeAssistant, CardConfig, CardType } from "../models/types";
import { CARD_TYPES, createDefaultCard } from "../models/types";
import "./card-editor";

@customElement("nsp-card-list")
export class NspCardList extends LitElement {
  @property({ attribute: false }) public hass!: HomeAssistant;
  @property({ type: Array }) public cards: CardConfig[] = [];
  @property({ type: Array }) public hiddenCardKeys: string[] = [];
  @property({ type: String }) public label = "Cards";

  @state() private _expandedIndex: number | null = null;
  @state() private _showAddDialog = false;
  @state() private _dragIndex: number | null = null;
  @state() private _pendingDeleteIndex: number | null = null;

  private _fireChanged(cards: CardConfig[]) {
    this.dispatchEvent(
      new CustomEvent("cards-changed", { detail: { cards }, bubbles: true, composed: true })
    );
  }

  private _addCard(type: CardType) {
    const newCards = [...this.cards, createDefaultCard(type)];
    this._showAddDialog = false;
    this._expandedIndex = newCards.length - 1;
    this._fireChanged(newCards);
  }

  private _removeCard(index: number) {
    const newCards = this.cards.filter((_, i) => i !== index);
    this._pendingDeleteIndex = null;
    if (this._expandedIndex === index) this._expandedIndex = null;
    else if (this._expandedIndex !== null && this._expandedIndex > index) this._expandedIndex--;
    this._fireChanged(newCards);
  }

  private _moveCard(from: number, to: number) {
    if (from === to) return;
    const newCards = [...this.cards];
    const [item] = newCards.splice(from, 1);
    newCards.splice(to, 0, item);
    this._pendingDeleteIndex = null;
    if (this._expandedIndex === from) this._expandedIndex = to;
    else if (this._expandedIndex !== null) {
      if (from < this._expandedIndex && to >= this._expandedIndex) this._expandedIndex--;
      else if (from > this._expandedIndex && to <= this._expandedIndex) this._expandedIndex++;
    }
    this._fireChanged(newCards);
  }

  private _updateCard(index: number, card: CardConfig) {
    const newCards = [...this.cards];
    newCards[index] = card;
    this._fireChanged(newCards);
  }

  render() {
    return html`
      <div class="card-list">
        <div class="list-header">
          <h3>${this.label} (${this.cards.length})</h3>
          <button class="btn btn-primary" @click=${() => { this._showAddDialog = true; }}>
            + Add Card
          </button>
        </div>

        ${this._showAddDialog ? this._renderAddDialog() : ""}

        ${this.cards.length === 0
          ? html`<p class="empty">No cards yet. Add one to get started.</p>`
          : this.cards.map((card, i) => this._renderCardItem(card, i))}
      </div>
    `;
  }

  private _renderAddDialog() {
    return html`
      <div class="add-dialog">
        <p>Select card type:</p>
        <div class="type-grid">
          ${CARD_TYPES.map(
            (type) => html`
              <button class="type-btn" @click=${() => this._addCard(type)}>
                ${type}
              </button>
            `
          )}
        </div>
        <button class="btn-sm" @click=${() => { this._showAddDialog = false; }}>Cancel</button>
      </div>
    `;
  }

  private _renderCardItem(card: CardConfig, index: number) {
    const isExpanded = this._expandedIndex === index;
    const entityCount = (card as any).entities?.length ?? ((card as any).entity ? 1 : 0);
    const isDragging = this._dragIndex === index;
    const isDeleting = this._pendingDeleteIndex === index;
    const deleteLabel = `${card.type}${card.title ? ` "${card.title}"` : ""}`;

    return html`
      <div class="card-item ${isDragging ? "dragging" : ""}"
        draggable="true"
        @dragstart=${(e: DragEvent) => {
          this._dragIndex = index;
          e.dataTransfer!.setData("text/plain", String(index));
          e.dataTransfer!.effectAllowed = "move";
        }}
        @dragend=${() => { this._dragIndex = null; }}
        @dragover=${(e: DragEvent) => { e.preventDefault(); e.dataTransfer!.dropEffect = "move"; }}
        @drop=${(e: DragEvent) => {
          e.preventDefault();
          this._dragIndex = null;
          const from = parseInt(e.dataTransfer!.getData("text/plain"));
          this._moveCard(from, index);
        }}>
        <div class="card-header" @click=${() => { this._expandedIndex = isExpanded ? null : index; }}>
          <span class="card-grip">⠿</span>
          <span class="card-type">${card.type}</span>
          ${card.title ? html`<span class="card-title">"${card.title}"</span>` : ""}
          ${card.key ? html`<span class="card-key">[${card.key}]</span>` : ""}
          <span class="card-entities">${entityCount} entit${entityCount === 1 ? "y" : "ies"}</span>
          <span class="spacer"></span>
          <button class="btn-icon expand-btn">${isExpanded ? "▼" : "▶"}</button>
          <button class="btn-icon delete-btn" @click=${(e: Event) => {
            e.stopPropagation();
            this._pendingDeleteIndex = index;
          }}>✕</button>
        </div>
        ${isDeleting ? html`
          <div class="confirm-row">
            <span>Remove ${deleteLabel}?</span>
            <button class="btn-danger-sm" @click=${() => this._removeCard(index)}>Delete</button>
            <button class="btn-sm" @click=${() => { this._pendingDeleteIndex = null; }}>Cancel</button>
          </div>
        ` : ""}
        ${isExpanded ? html`
          <div class="card-body">
            <nsp-card-editor
              .hass=${this.hass}
              .card=${card}
              .hiddenCardKeys=${this.hiddenCardKeys}
              @card-changed=${(e: CustomEvent) => this._updateCard(index, e.detail.card)}
            ></nsp-card-editor>
          </div>
        ` : ""}
      </div>
    `;
  }

  static styles = css`
    :host { display: block; }
    .card-list { display: flex; flex-direction: column; gap: 8px; }
    .list-header { display: flex; justify-content: space-between; align-items: center; margin-bottom: 8px; }
    .list-header h3 { margin: 0; font-size: 16px; }
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
    .add-dialog {
      background: var(--card-background-color, white);
      border: 1px solid var(--divider-color, #e0e0e0);
      border-radius: 8px;
      padding: 16px;
    }
    .add-dialog p { margin: 0 0 12px; font-size: 14px; }
    .type-grid {
      display: grid;
      grid-template-columns: repeat(auto-fill, minmax(140px, 1fr));
      gap: 8px;
      margin-bottom: 12px;
    }
    .type-btn {
      padding: 12px 8px;
      border: 1px solid var(--divider-color, #e0e0e0);
      border-radius: 6px;
      background: var(--secondary-background-color, #f5f5f5);
      cursor: pointer;
      font-size: 13px;
      text-align: center;
      color: var(--primary-text-color);
    }
    .type-btn:hover { background: var(--primary-color); color: white; }
    .btn-sm { padding: 4px 12px; border: 1px solid var(--divider-color); border-radius: 4px; background: none; cursor: pointer; font-size: 12px; color: var(--secondary-text-color); }
    .btn-danger-sm {
      padding: 4px 12px;
      border: 1px solid var(--error-color, #db4437);
      border-radius: 4px;
      background: var(--error-color, #db4437);
      color: white;
      cursor: pointer;
      font-size: 12px;
    }
    .card-item {
      border: 1px solid var(--divider-color, #e0e0e0);
      border-radius: 8px;
      background: var(--card-background-color, white);
      overflow: hidden;
      transition: opacity 0.2s;
    }
    .card-item.dragging { opacity: 0.5; }
    .card-header {
      display: flex;
      align-items: center;
      gap: 8px;
      padding: 12px 16px;
      cursor: pointer;
      user-select: none;
    }
    .card-header:hover { background: var(--secondary-background-color, #f5f5f5); }
    .card-grip { cursor: grab; color: var(--secondary-text-color); }
    .card-type { font-weight: 600; font-size: 14px; }
    .card-title { font-size: 13px; color: var(--secondary-text-color); }
    .card-key { font-size: 12px; color: var(--secondary-text-color); font-family: monospace; }
    .card-entities { font-size: 12px; color: var(--secondary-text-color); }
    .spacer { flex: 1; }
    .btn-icon { background: none; border: none; cursor: pointer; padding: 4px 8px; font-size: 14px; color: var(--secondary-text-color); }
    .delete-btn:hover { color: var(--error-color, #db4437); }
    .confirm-row {
      display: flex;
      align-items: center;
      gap: 8px;
      padding: 8px 16px;
      background: var(--secondary-background-color, #fff3e0);
      border-top: 1px solid var(--divider-color, #e0e0e0);
      font-size: 13px;
      flex-wrap: wrap;
    }
    .confirm-row span { flex: 1; }
    .card-body { padding: 16px; border-top: 1px solid var(--divider-color, #e0e0e0); }
    .empty { text-align: center; color: var(--secondary-text-color); font-size: 14px; padding: 24px; }
  `;
}

declare global {
  interface HTMLElementTagNameMap {
    "nsp-card-list": NspCardList;
  }
}
