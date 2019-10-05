import { LitElement, html, css } from 'lit-element';
import { Store } from '../store/Store';
import store from '../store/index';

class BingoBoard extends LitElement {
  static get properties() {
    return {
      store: Store,
      active: Boolean
    };
  }

  static get styles() {
    return css`
      :host {
        /* display: grid; */
        grid-template-columns: repeat(5, 1fr);
        grid-template-rows: repeat(5, 1fr);
      }
    `;
  }

  constructor() {
    super();
    this.active = true;
    this.store = store;
    this.store.subscribe(state => { this.active = this.store.state.app.page === 'board' });
  }

  render() {
    return html`
      <link rel="stylesheet" href="./normalize.css">
      <style>
      :host {
        display: ${this.active ? 'grid' : 'none'};
      }
      </style>
      ${store.state.current.tiles.map((i, idx) => html`<bingo-tile idx="${idx}" label="${i}"></bingo-title>`)}
    `;
  }
}

customElements.define('bingo-board', BingoBoard);
