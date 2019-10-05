import './components/BingoTile';
import './components/BingoBoard';
import './components/PageNav';
import './components/PageNavItem';
import store from './store/index';

store.dispatch('openWebsocket', store.state.current);
