import { LitElement, html, css } from 'lit-element';

class Tabs extends LitElement {
  static get properties() {
    return {};
  }

  static get styles() {
    return css`
      nav {
        margin-bottom: 2rem;
        border-bottom: 1px solid black;
        text-align: center;
      }

      ul {
        display: inline-block;
        margin: 0;
        padding-left: 0;
        list-style: none;
      }
    `;
  }

  constructor() {
    super();
  }

  render() {
    return html`
      <nav>
        <ul>
          <slot></slot>
        </ul>
      </nav>
    `;
  }
}

customElements.define('bingo-tabs', Tabs);
