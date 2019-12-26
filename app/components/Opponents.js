import { LitElement, html, css } from "lit-element";
import store from "../store/index";

class Opponents extends LitElement {
  static get properties() {
    return {
      players: Array
    };
  }

  static get styles() {
    return css`
      :host {
        display: flex;
        flex-wrap: wrap;
        justify-content: center;
      }

      @media only screen and (min-width: env(--breakpoint)) {
        :host {
          margin: 0 auto;
          width: env(--breakpoint);
        }
      }
    `;
  }

  constructor() {
    super();
    this.players = store.state.players;
    store.subscribe(state => (this.players = state.players));
  }

  render() {
    const players = Object.values(this.players).filter(
      i => i.id !== store.state.current.id
    );

    if (players.length === 0) {
      return html`
        No one has joined yet!
      `;
    }

    return html`
      ${players.map(
        player => html`
          <bingo-mini-card playerId="${player.id}"></bingo-mini-card>
        `
      )}
    `;
  }
}

customElements.define("bingo-opponents", Opponents);
