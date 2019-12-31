import { LitElement, html, css } from "lit-element";
import store from "../store/index";

class TabContainer extends LitElement {
  static get properties() {
    return {
      key: String,
      active: Boolean
    };
  }

  constructor() {
    super();
    this.key = "";
    this.active = false;

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
      <style>
        :host {
          display: ${this.active ? "block" : "none"};
        }
      </style>
      <slot></slot>
    `;
  }

  onStoreUpdated() {
    this.active = this.key === store.state.app.page;
  }
}

customElements.define("bingo-tab-container", TabContainer);
