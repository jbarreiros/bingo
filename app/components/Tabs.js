import { LitElement, html, css } from "lit-element";

class Tabs extends LitElement {
  static get properties() {
    return {};
  }

  static get styles() {
    return css`
      :host {
        display: inline-block;
      }

      .tabs {
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
        <ul class="tabs">
          <slot></slot>
        </ul>
      </nav>
    `;
  }
}

customElements.define("bingo-tabs", Tabs);
