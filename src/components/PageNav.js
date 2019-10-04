import { LitElement, html } from 'lit-element';

class PageNav extends LitElement {
  static get properties() {
    return {
      pages: Array,
      activePage: String
    };
  }

  constructor() {
    super();
    this.pages = ['My Bingo Board', 'Other Boards'];
    this.activePage = 'My Bingo Board';
  }

  render() {
    return html`
      <nav>
        <ul>
          ${this.pages.map(label => html`<li><button type="button">${label}</button></li>`)}
        </ul>
      </nav>
    `;
  }
}

customElements.define('bingo-page-nav', PageNav);
