import React, { useState, useRef } from 'react';
import { useDispatch } from 'react-redux';
import { registerPlayer } from '../../app/appSlice';
import { Modal } from '../modal/Modal';
import { RegisterForm } from './RegisterForm';

export function RegisterModal(props) {
  const dispatch = useDispatch();
  const [playerName, setPlayerName] = useState('');
  const [showModal, setShowModal] = useState(true);
  const formRef = useRef(null);

  function handleSubmit(ev) {
    const form = formRef.current;

    if (!form.checkValidity()) {
      form.reportValidity();
      return;
    }

    dispatch(registerPlayer(playerName));
    setShowModal(false);
  }

  return (
    <Modal
      modalTitle="Announce Thyself!"
      submitText="Join the Game!"
      showModal={showModal}
      onSubmit={handleSubmit}
    >
      <form ref={formRef} onSubmit={handleSubmit}>
        <RegisterForm
          setPlayerName={e => setPlayerName(e)}
        />
      </form>
    </Modal>
  );
}
