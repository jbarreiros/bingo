import { LitElement, html, css } from "lit-element";
import { classMap } from "lit-html/directives/class-map";
import store from "../store/index";

class MiniBingoCard extends LitElement {
  static get properties() {
    return {
      playerId: Number,
      player: Object
    };
  }

  static get styles() {
    return css`
      :host {
        display: block;
        margin: 10px;
        width: 100px;
      }

      .bingo-card {
        display: grid;
        grid-template-columns: repeat(5, 20%);
        grid-template-rows: auto repeat(5, 20%);
        justify-content: center;
      }

      .bingo-tile {
        border: 1px solid #c8c9c8;
        height: 20px;
        background-color: #f0f1ec;
      }

      .bingo-tile.selected {
        background-color: #2f3f52;
      }

      .bingo-player {
        text-align: center;
        font-size: 0.8rem;
        text-transform: uppercase;
        padding-top: 0.2rem;
        white-space: nowrap;
        overflow: hidden;
        text-overflow: ellipsis;
      }
    `;
  }

  constructor() {
    super();
    this.playerId = null;
    this.player = null;
  }

  connectedCallback() {
    super.connectedCallback();
    this.player = this.getPlayer(this.playerId);

    store.subscribe(() => {
      const player = this.getPlayer(this.playerId);

      // Don't allow `this.player` being set to "undefined", which would cause
      // a bad re-render.
      if (player) {
        this.player = player;
      }
    });
  }

  render() {
    return html`
      <div class="bingo-card">
        ${this.player.tiles.map(this.renderTile.bind(this))}
      </div>
      <div class="bingo-player">
        ${this.player.name}
      </div>
    `;
  }

  renderTile(tileLabel, tileIndex) {
    const classes = {
      "bingo-tile": true,
      selected: this.isTileSelected(tileIndex, this.player.selectedTiles)
    };

    return html`
      <div class="${classMap(classes)}"></div>
    `;
  }

  getPlayer(playerId) {
    return store.state.players.find(player => player.id === playerId);
  }

  isTileSelected(tileToMatch, tiles) {
    return tiles.find(tile => tile === String(tileToMatch)) !== undefined;
  }
}

customElements.define("bingo-mini-card", MiniBingoCard);
