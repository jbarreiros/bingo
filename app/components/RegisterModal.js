import { LitElement, html, css } from "lit-element";
import store from "../store/index";

class RegisterModal extends LitElement {
  static get properties() {
    return {};
  }

  static get styles() {
    return css`
      label {
        font-weight: bold;
      }

      input {
        box-sizing: border-box;
        display: block;
        font-size: 1rem;
        width: 100%;
      }
    `;
  }

  constructor() {
    super();
  }

  render() {
    return html`
      <bingo-modal
        modalTitle="Announce Thyself!"
        submitText="Join the Game!"
        @bingo-modal-submit="${this.onSubmit}"
      >
        <div slot="modal-content">
          <form @submit="${this.onSubmit}">
            <label id="player-name">Your Name:</label>
            <input
              type="text"
              name="player-name"
              id="player-name"
              required
              autofocus
            />
          </form>
        </div>
      </bingo-modal>
    `;
  }

  onSubmit() {
    const form = this.shadowRoot.querySelector("form");

    if (!form.checkValidity()) {
      form.reportValidity();
      return;
    }

    const formData = new FormData(form);

    store.dispatch("setPlayerName", formData.get("player-name"));

    const modal = this.shadowRoot.querySelector("bingo-modal");
    const event = new CustomEvent("bingo-modal-close", {
      bubbles: true,
      composed: true
    });
    modal.dispatchEvent(event);
  }
}

customElements.define("bingo-register-modal", RegisterModal);
