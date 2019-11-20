import './components/BingoTile';
import './components/BingoCard';
import './components/Tabs';
import './components/TabItem';
import './components/BingoOpponents';
import './components/Modal';
import './components/RegisterModal';
import './components/BingoPlayer';
import store from './store/index';

const registerModal = document.createElement('bingo-register-modal');
registerModal.addEventListener('bingo-modal-close', ev => {
  store.dispatch('openWebsocket', store.state.current);
});

document.querySelector('body').appendChild(registerModal);
