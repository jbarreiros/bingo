import { LitElement, html, css } from 'lit-element';
import store from '../store/index';

class BingoBoard extends LitElement {
  static get properties() {
    return {
      active: Boolean
    };
  }

  static get styles() {
    return css`
      :host {
        grid-template-columns: repeat(5, 1fr);
        grid-template-rows: repeat(5, 1fr);
      }
    `;
  }

  constructor() {
    super();
    this.active = true;
    store.subscribe(state => { this.active = state.app.page === 'board' });
  }

  render() {
    return html`
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
