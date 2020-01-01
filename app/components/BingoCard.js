import { LitElement, html, css } from "lit-element";
import store from "../store/index";

class BingoCard extends LitElement {
  static get properties() {
    return {};
  }

  static get styles() {
    return css`
      :host {
        display: grid;
        grid-template-columns: repeat(5, 1fr);
        grid-template-rows: auto repeat(5, 1fr);
        justify-content: center;
      }

      @media only screen and (min-width: env(--breakpoint)) {
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
  }

  render() {
    return html`
      ${[..."bingo"].map(
        i => html`
          <div class="letter">${i}</div>
        `
      )}
      ${store.state.current.tiles.map(
        (tileLabel, tileIndex) => html`
          <bingo-tile
            tileIndex="${tileIndex}"
            label="${tileLabel}"
            tabindex="0"
            aria-role="button"
            aria-pressed="false"
          >
          </bingo-title>
        `
      )}
    `;
  }
}

customElements.define("bingo-card", BingoCard);
