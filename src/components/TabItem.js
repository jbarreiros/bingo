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
      .selected {
        outline: 6px solid #000;
      }
    `;
  }

  constructor() {
    super();
    this.store = store;
    // this.key = '';
    // this.label = '';
    // this.selected = false;
    this.store.subscribe(state => { this.selected = this.key === this.store.state.app.page });
  }

  render() {
    const classes = { selected: this.selected };

    return html`
      <li>
        <link rel="stylesheet" href="./normalize.css">
        <button type="button" class="${classMap(classes)}" @click="${this.onClickHandler}">
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
