import { LitElement, html, css } from 'lit-element';
import store from '../store/index';

class BingoTile extends LitElement {
  static get properties() {
    return {
      idx: Number,
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
        border: 1px solid #000;
        text-transform: uppercase;
        margin-right: -1px;
        margin-bottom: -1px;
        overflow: hidden;
        cursor: pointer;
        font-size: 0.8rem;
      }

      @media only screen and (min-width: 35em) {
        :host {
          min-height: 5rem;
          font-size: 1rem;
        }
      }

      :host(:hover),
      :host(:focus) {
        background-color: lightskyblue;
      }
    `;
  }

  constructor() {
    super();
    this.store = store;
    this.idx = null;
    this.label = '';
    this.selected = false;
    this.addEventListener('click', this.clickHandler);
  }

  render() {
    return html`
      <style>
      :host {
        background-color: ${this.selected ? 'blue' : 'white'};
        color: ${this.selected ? 'white' : 'black'};
      }
      </style>
      ${this.label}
    `;
  }

  clickHandler(e) {
    this.selected = !this.selected;

    if (this.selected) {
      store.dispatch('tileSelected', this.idx);
    } else {
      store.dispatch('tileUnselected', this.idx);
    }

    store.dispatch('updatePlayer', store.state.current);
  }
}

customElements.define('bingo-tile', BingoTile);
