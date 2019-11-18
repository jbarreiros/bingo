import { LitElement, html, css } from 'lit-element';

class Modal extends LitElement {
  static get properties() {
    return {
      title: String,
      submitText: String
    };
  }

  static get styles() {
    return css`
      .modal-overlay {
        background-color: rgba(0, 0, 0, 0.7);
        z-index: 1000;
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
      }

      .modal {
        position: fixed;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
        z-index: 1010;

        background-color: #fff;
        padding: 2rem;
      }

      h1 {
        margin-top: 0;
      }

      footer {
        margin-top: 1rem;
      }

      button {
      }
    `;
  }

  constructor() {
    super();
    this.addEventListener('bingo-modal-close', this.onClose);
  }

  render() {
    return html`
      <section class="modal">
        <header>
          <h1>${this.title}</h1>
        </header>
        <div class="modal-content">
          <slot name="modal-content"></slot>
        </div>
        <footer>
          <button type="button" @click="${this.onSubmit}">${this.submitText}</button>
        </footer>
      </section>
      <div class="modal-overlay"></div>
    `;
  }

  onSubmit(e) {
    const event = new CustomEvent('bingo-modal-submit', {});
    this.dispatchEvent(event);
  }

  onClose(e) {
    this.remove();
  }
}

customElements.define('bingo-modal', Modal);
