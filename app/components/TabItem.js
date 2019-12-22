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
        padding: 0.5rem 1rem;
        font-size: 1.1rem;
        font-weight: bold;
      }

      .tab:hover,
      .tab--selected {
        border-bottom: 0.2rem solid #d26d80;
      }
    `;
  }

  constructor() {
    super();
    this.key = "";
    this.label = "";
    this.active = false;
    store.subscribe(state => {
      this.active = this.key === state.app.page;
    });
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
}

customElements.define("bingo-tab-item", TabItem);
