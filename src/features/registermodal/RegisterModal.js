import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { setCurrentPlayerName } from '../../app/appSlice';
import { Modal } from '../modal/Modal';
import { RegisterForm } from './RegisterForm';

export function RegisterModal(props) {
  const dispatch = useDispatch();
  const [playerName, setPlayerName] = useState('');
  const [showModal, setShowModal] = useState(true);

  function handleSubmit(ev) {
    dispatch(setCurrentPlayerName(playerName));
    setShowModal(false);
  }

  return (
    <Modal
      modalTitle="Announce Thyself!"
      submitText="Join the Game!"
      showModal={showModal}
      onSubmit={handleSubmit}
    >
      <RegisterForm
        setPlayerName={e => setPlayerName(e)}
        onSubmit={handleSubmit}
      />
    </Modal>
  );
}
