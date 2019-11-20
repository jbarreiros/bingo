import { LitElement, html, css } from 'lit-element';
import store from '../store/index';

class BingoCard extends LitElement {
  static get properties() {
    return {
      active: Boolean
    };
  }

  static get styles() {
    return css`
      :host {
        grid-template-columns: repeat(5, 20%);
        grid-template-rows: auto repeat(5, 20%);
        justify-content: center;
      }

      @media only screen and (min-width: 35em) {
        :host {
          grid-template-columns: repeat(5, 150px);
          grid-template-rows: auto repeat(5, 150px);
        }
      }

      .letter {
        text-align: center;
        text-transform: uppercase;
        font-size: 2rem;
        font-weight: 900;
      }
    `;
  }

  constructor() {
    super();
    this.active = true;
    store.subscribe(state => { this.active = state.app.page === 'card' });
  }

  render() {
    return html`
      <style>
      :host {
        display: ${this.active ? 'grid' : 'none'};
      }
      </style>
      ${[...'bingo'].map(i => html`<div class="letter">${i}</div>`)}
      ${store.state.current.tiles
          .map((tileLabel, idx) => html`
            <bingo-tile
              idx="${idx}"
              label="${tileLabel}"
              tabindex="0"
              aria-role="button"
              aria-pressed="false">
            </bingo-title>`
          )}
    `;
  }
}

customElements.define('bingo-card', BingoCard);
