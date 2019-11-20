import { LitElement, html, css } from 'lit-element';
import store from '../store/index';

class BingoOpponents extends LitElement {
  static get properties() {
    return {
      players: Array
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
    this.players = store.state.players;
    store.subscribe(state => this.players = state.players);
  }

  render() {
    return html`
      ${Object.values(this.players).filter(/*todo filter by store.state.current.id */).map((i, idx) => html`${i.id}`)}
    `;
  }
}

customElements.define('bingo-opponents', BingoOpponents);
