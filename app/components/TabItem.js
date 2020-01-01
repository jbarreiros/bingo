import { LitElement, html, css } from "lit-element";
import { classMap } from "lit-html/directives/class-map";
import store from "../store/index";

class TabItem extends LitElement {
  static get properties() {
    return {
      key: String,
      label: String,
      active: Boolean
    };
  }

  static get styles() {
    return css`
      :host {
        display: inline-block;
      }

      .tab {
        display: inline-block;
      }

      .tab__button {
        border: none;
        background: transparent;
        cursor: pointer;
        padding: 0.5rem;
        font-size: 0.9rem;
        font-weight: bold;
      }

      .tab:hover,
      .tab--selected {
        border-bottom: 0.2rem solid #d26d80;
      }

      @media only screen and (min-width: env(--breakpoint)) {
        .tab__button {
          padding: 0.5rem 1rem;
          font-size: 1.1rem;
        }
      }
    `;
  }

  constructor() {
    super();
    this.key = "";
    this.label = "";
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
    const classes = { tab: true, "tab--selected": this.active };

    return html`
      <li class="${classMap(classes)}">
        <button
          type="button"
          class="tab__button"
          @click="${this.onClickHandler}"
        >
          ${this.label}
          <slot name="badge"></slot>
        </button>
      </li>
    `;
  }

  onClickHandler() {
    if (this.active) {
      // nothing to do
      return;
    }

    store.dispatch("changePage", this.key);
  }

  onStoreUpdated() {
    this.active = this.key === store.state.app.page;
  }
}

customElements.define("bingo-tab-item", TabItem);
