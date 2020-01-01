import { LitElement, html, css } from "lit-element";
import store from "../store/index";

class Player extends LitElement {
  static get properties() {
    return {
      name: String
    };
  }

  static get styles() {
    return css`
      :host {
        display: inline-block;
        padding-left: 0.5rem;
        padding-right: 0.5rem;

        text-overflow: ellipsis;
        overflow: hidden;
        white-space: nowrap;

        max-width: 5rem;
        width: auto;
      }

      @media only screen and (min-width: env(--breakpoint)) {
        :host {
          max-width: 10rem;
        }
      }
    `;
  }

  constructor() {
    super();
    this.name = "";

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
      &#128100; ${this.name}
    `;
  }

  onStoreUpdated() {
    this.name = store.state.current.name;
  }
}

customElements.define("bingo-player", Player);
