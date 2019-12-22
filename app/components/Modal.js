import { LitElement, html, css } from "lit-element";

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

        background-color: #f0f1ec;
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

      .modal__title {
        margin-top: 0;
      }

      .modal__footer {
        margin-top: 1rem;
      }

      .modal__submit {
        border: 0;
        border-radius: 0.2rem;
        font-size: 1rem;
        padding: 0.8rem;
        background-color: lightgreen;
      }

      .modal__submit:hover,
      .modal__submit:focus {
        background-color: #00ff00;
      }
    `;
  }

  constructor() {
    super();
    this.addEventListener("bingo-modal-close", this.onClose);
  }

  render() {
    return html`
      <section class="modal">
        <header class="modal__header">
          <h1 class="modal__title">${this.modalTitle}</h1>
        </header>
        <div class="modal__content">
          <slot name="modal-content"></slot>
        </div>
        <footer class="modal__footer">
          <button type="button" class="modal__submit" @click="${this.onSubmit}">
            ${this.submitText}
          </button>
        </footer>
      </section>
      <div class="modal-overlay"></div>
    `;
  }

  onSubmit() {
    const event = new CustomEvent("bingo-modal-submit", {});
    this.dispatchEvent(event);
  }

  onClose() {
    this.remove();
  }
}

customElements.define("bingo-modal", Modal);
