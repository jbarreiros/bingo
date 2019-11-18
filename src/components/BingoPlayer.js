import { LitElement, html, css } from 'lit-element';
import store from '../store/index';

class BingoPlayer extends LitElement {
  static get properties() {
    return {
      name: String
    };
  }

  static get styles() {
    return css`
    `;
  }

  constructor() {
    super();
    this.name = '';
    store.subscribe(state => { this.name = state.current.name });
  }

  render() {
    return html`
      &#128100; ${this.name}
    `;
  }
}

customElements.define('bingo-player', BingoPlayer);
