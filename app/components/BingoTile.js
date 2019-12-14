import { LitElement, html, css } from "lit-element";
import store from "../store/index";

class BingoTile extends LitElement {
  static get properties() {
    return {
      tileIndex: Number,
      label: String,
      selected: Boolean
    };
  }

  static get styles() {
    return css`
      :host {
        display: flex;
        align-items: center;
        justify-content: center;
        text-align: center;
        border: 1px solid #c8c9c8;
        text-transform: uppercase;
        overflow: hidden;
        cursor: pointer;
        font-size: 0.8rem;
      }

      @media only screen and (min-width: 750px) {
        :host {
          font-size: 1rem;
        }
      }
    `;
  }

  constructor() {
    super();
    this.tileIndex = null;
    this.label = "";
    this.selected = false;
    ["click", "keypress"].forEach(event =>
      this.addEventListener(event, this.clickHandler)
    );
  }

  render() {
    return html`
      <style>
        :host {
          background-color: ${this.selected ? "#2f3f52" : "#f0f1ec"};
          color: ${this.selected ? "#c35947" : "#252422"};
        }
      </style>
      ${this.label}
    `;
  }

  clickHandler() {
    this.selected = !this.selected;

    if (this.selected) {
      store.dispatch("tileSelected", this.tileIndex);
    } else {
      store.dispatch("tileUnselected", this.tileIndex);
    }

    store.dispatch("updatePlayer", store.state.current);
  }
}

customElements.define("bingo-tile", BingoTile);
