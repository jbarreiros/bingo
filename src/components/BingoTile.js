import { LitElement, html, css, unsafeCSS } from 'lit-element';
import { Store } from '../store/Store';
import store from '../store/index';

class BingoTile extends LitElement {
  static get properties() {
    return {
      store: Store,
      idx: Number,
      label: String,
      selected: Boolean
    };
  }

  static get styles() {
    return css`
      :host {
        display: block;
        border: 1px solid #000;
        padding: 1rem;
        text-transform: uppercase;
      }
      //:host(.on) {}
    `;
  }

  constructor() {
    super();
    this.store = store;
    this.idx = null;
    this.label = '';
    this.selected = false;
    this.addEventListener('click', this.clickHandler);
  }

  render() {
    return html`
      <style>
      :host {
        background-color: ${this.selected ? 'blue' : '#fff'};
        color: ${this.selected ? '#fff' : '#000'};
      }
      </style>
      ${this.label}
    `;
  }

  clickHandler(e) {
    this.selected = !this.selected;

    if (this.selected) {
      store.dispatch('tileSelected', this.idx);
    } else {
      store.dispatch('tileUnselected', this.idx);
    }

    store.dispatch('updatePlayer', store.state.current);
  }
}

customElements.define('bingo-tile', BingoTile);
