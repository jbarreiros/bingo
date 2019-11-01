import { LitElement, html, css } from 'lit-element';
import { classMap } from 'lit-html/directives/class-map';
import { Store } from '../lib/Store';
import store from '../store/index';

class TabItem extends LitElement {
  static get properties() {
    return {
      store: Store,
      key: String,
      label: String,
      selected: Boolean
    };
  }

  static get styles() {
    return css`
      :host {}

      li {
        display: inline-block;
        border: 1px solid black;
        border-bottom-color: black;
        margin-bottom: -1px;
      }

      button {
        border: none;
        background: white;
        cursor: pointer;
        padding: .5rem 1rem;
      }

      .selected {
        border-top: .15rem solid blue;
        border-bottom-color: white;
      }
    `;
  }

  constructor() {
    super();
    this.store = store;
    this.key = '';
    this.label = '';
    this.selected = false;
    this.store.subscribe(state => { this.selected = this.key === this.store.state.app.page });
  }

  render() {
    const classes = { selected: this.selected };

    return html`
      <li class="${classMap(classes)}">
        <button type="button" @click="${this.onClickHandler}">
          ${this.label}
        </button>
      </li>
    `;
  }

  onClickHandler(ev) {
    console.log('navigate to new page', this.key);

    if (this.selected) {
      // nothing to do
      console.log('already on this page');
      return;
    }

    store.dispatch('changePage', this.key);
  }
}

customElements.define('bingo-tab-item', TabItem);
