import { LitElement, html, css } from 'lit-element';
import { classMap } from 'lit-html/directives/class-map';
import store from '../store/index';

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
      :host {}

      li {
        display: inline-block;
      }

      button {
        border: none;
        background: transparent;
        cursor: pointer;
        padding: .5rem 1rem;
        font-size: 1.1rem;
        font-weight: bold;
      }

      li:hover,
      .selected {
        border-bottom: 0.2rem solid #D26D80;
      }
    `;
  }

  constructor() {
    super();
    this.key = '';
    this.label = '';
    this.active = false;
    store.subscribe(state => { this.active = this.key === state.app.page });
  }

  render() {
    const classes = { selected: this.active };

    return html`
      <li class="${classMap(classes)}">
        <button type="button" @click="${this.onClickHandler}">
          ${this.label}
        </button>
      </li>
    `;
  }

  onClickHandler(ev) {
    if (this.active) {
      // nothing to do
      return;
    }

    store.dispatch('changePage', this.key);
  }
}

customElements.define('bingo-tab-item', TabItem);
