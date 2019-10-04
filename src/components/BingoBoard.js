import { LitElement, html, css } from 'lit-element';
import { Store } from '../store/Store';
import store from '../store/index';

class BingoBoard extends LitElement {
  static get properties() {
    return {
      store: Store
    };
  }

  static get styles() {
    return css`
      :host {
        display: grid;
        grid-template-columns: repeat(5, 1fr);
        grid-template-rows: repeat(5, 1fr);
      }
    `;
  }

  constructor() {
    super();
    this.store = store;
  }

  render() {
    return html`
        ${store.state.current.tiles.map((i, idx) => html`<bingo-tile idx="${idx}" label="${i}"></bingo-title>`)}
    `;
  }
}

customElements.define('bingo-board', BingoBoard);
