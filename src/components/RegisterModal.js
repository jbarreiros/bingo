import { LitElement, html, css } from 'lit-element';
import store from '../store/index';

class RegisterModal extends LitElement {
  static get properties() {
    return {};
  }

  static get styles() {
    return css`
      input {
        display: block;
      }
    `;
  }

  constructor() {
    super();
  }

  render() {
    return html`
      <bingo-modal
        title="Welcome to Corporate-as-Fuck Bingo!"
        submitText="Synergize Me!"
        @bingo-modal-submit="${this.onSubmit}"
      >
        <div slot="modal-content">
          <form>
            <label id="player-name">Your corporate overlords request your name</name>
            <input type="text" name="player-name" id="player-name" required>
          </form>
        </div>
      </bingo-modal>
    `;
  }

  onSubmit(e) {
    const form = this.shadowRoot.querySelector('form');

    if (!form.checkValidity()) {
      form.reportValidity();
      return;
    }

    const formData = new FormData(form);
    console.log(formData.get('player-name'));

    store.dispatch('setPlayerName', formData.get('player-name'));
    store.dispatch('updatePlayer', store.state.current);

    const modal = this.shadowRoot.querySelector('bingo-modal');
    const event = new CustomEvent('bingo-modal-close', {});
    modal.dispatchEvent(event);
  }
}

customElements.define('bingo-register-modal', RegisterModal);
