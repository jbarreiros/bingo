import './components/BingoTile';
import './components/BingoBoard';
import './components/Tabs';
import './components/TabItem';
import './components/BingoOpponents';
import './components/Modal';
import './components/RegisterModal';
import './components/BingoPlayer';
import store from './store/index';

const pageTabs = document.querySelector('.js-app-tabs');
pageTabs.addEventListener('tab-selected', ev => {
  console.log('tab changed');
  console.log(ev);
});

const registerModal = document.createElement('bingo-register-modal');
document.querySelector('body').appendChild(registerModal);

store.dispatch('openWebsocket', store.state.current);
