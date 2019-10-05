import { LitElement, html, css } from 'lit-element';

class PageNav extends LitElement {
  static get properties() {
    return {};
  }

  static get styles() {
    return css`
      nav {
        text-align: center;
        margin-bottom: 2rem;
      }

      ul {
        display: inline-block;
        margin: 0;
        padding-left: 0;
      }

      li {
        display: inline-block;
        margin-left: 1rem;
        margin-right: 1rem;
      }
    `;
  }

  constructor() {
    super();
  }

  render() {
    return html`
      <link rel="stylesheet" href="./normalize.css">
      <nav>
        <ul>
          <li>
            <bingo-page-nav-item key="board" label="My Bingo Board" selected="true">
          </li>
          <li>
            <bingo-page-nav-item key="opponents" label="You Opponents">
          </li>
        </ul>
      </nav>
    `;
  }
}

customElements.define('bingo-page-nav', PageNav);
