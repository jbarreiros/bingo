import './components/BingoTile';
import './components/BingoBoard';
import './components/Tabs';
import './components/TabItem';
import store from './store/index';

const pageTabs = document.querySelector('.js-app-tabs');
pageTabs.addEventListener('tab-selected', ev => {
  console.log('tab changed');
  console.log(ev);
});

store.dispatch('openWebsocket', store.state.current);
