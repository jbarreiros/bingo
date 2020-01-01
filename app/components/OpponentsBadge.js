import { LitElement, html, css } from "lit-element";
import store from "../store/index";

class OpponentsBadge extends LitElement {
  static get properties() {
    return {
      numOpponents: Number
    };
  }

  static get styles() {
    return css`
      .badge {
        background-color: #f0f1ec;
        border-radius: 50%;
        font-size: 60%;
        padding: 0.2rem 0.4rem;
        position: relative;
        top: -0.5rem;
        margin-left: -0.5rem;
      }
    `;
  }

  constructor() {
    super();
    this.numOpponents = 0;

    // prebind store callback
    this.onStoreUpdated = this.onStoreUpdated.bind(this);
  }

  connectedCallback() {
    super.connectedCallback();
    store.subscribe(this.onStoreUpdated);
  }

  disconnectedCallback() {
    store.unsubscribe(this.onStoreUpdated);
    super.disconnectedCallback();
  }

  render() {
    return html`
      <span class="badge">${this.numOpponents}</span>
    `;
  }

  onStoreUpdated() {
    const players = store.state.players.length - 1; // subtract current player
    this.numOpponents = players > -1 ? players : 0;
  }
}

customElements.define("bingo-opponents-badge", OpponentsBadge);
