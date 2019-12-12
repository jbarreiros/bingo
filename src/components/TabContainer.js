import { LitElement, html, css } from 'lit-element';
import store from '../store/index';

class TabContainer extends LitElement {
  static get properties() {
    return {
      key: String,
      active: Boolean
    };
  }

  static get styles() {
    return css``;
  }

  constructor() {
    super();
    this.key = '';
    this.active = false;
    store.subscribe(state => { this.active = this.key === state.app.page });
  }

  render() {
    return html`
      <style>
      :host {
        display: ${this.active ? 'block' : 'none'}
      }
      </style>
      <slot></slot>
    `;
  }
}

customElements.define('bingo-tab-container', TabContainer);
