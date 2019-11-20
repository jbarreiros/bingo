import { LitElement, html, css } from 'lit-element';

class Modal extends LitElement {
  static get properties() {
    return {
      modalTitle: String,
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
        box-sizing: border-box;
        position: fixed;
        z-index: 1010;

        top: 20%;
        left: 5vw;
        width: 90vw;

        background-color: #F0F1EC;
        border-radius: 4px;
        padding: 2rem;
      }

      @media only screen and (min-width: 35em) {
        .modal {
          top: 50%;
          left: 50%;
          transform: translate(-50%, -50%);
          width: auto;
        }
      }

      h1 {
        margin-top: 0;
      }

      footer {
        margin-top: 1rem;
      }

      button {
        border: 0;
        border-radius: 0.2rem;
        font-size: 1rem;
        padding: 0.8rem;
        background-color: lightgreen;
      }

      button:hover,
      button:focus {
        background-color: #00ff00;
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
          <h1>${this.modalTitle}</h1>
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
