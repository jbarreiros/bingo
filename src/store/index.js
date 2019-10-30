import actions from './actions';
import mutations from './mutations';
import state from './state';
import { Store } from '../lib/Store';

export default new Store({
  actions,
  mutations,
  state
});
