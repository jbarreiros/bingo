// https://css-tricks.com/build-a-state-management-system-with-vanilla-javascript/
export class Store {
  constructor(params) {
    this.actions = {};
    this.mutations = {};
    this.state = {};
    this.callbacks = [];

    if(params.hasOwnProperty('actions')) {
      this.actions = params.actions;
    }

    if(params.hasOwnProperty('mutations')) {
      this.mutations = params.mutations;
    }

    this.state = params.state;
    this.processCallbacks();

    this.state = new Proxy((params.state || {}), {
      set: (state, key, value) => {
        state[key] = value;

        console.log('Do not mutate state!', key);

        return true;
      }
    });
  }

  dispatch(actionKey, payload) {
    if(typeof this.actions[actionKey] !== 'function') {
      console.error(`Action "${actionKey} doesn't exist.`);
      return;
    }

    console.group(`dispatching ACTION: ${actionKey}`);

    this.actions[actionKey](this, payload);

    console.groupEnd();
  }

  commit(mutationKey, payload) {
    if(typeof this.mutations[mutationKey] !== 'function') {
      console.log(`Mutation "${mutationKey}" doesn't exist`);
      return;
    }

    console.log('state change:', mutationKey, payload);

    const newState = this.mutations[mutationKey](this.state, payload);
    this.state = newState;

    this.processCallbacks(this.state);
  }

  subscribe(callback) {
    if(typeof callback !== 'function') {
        console.error('You can only subscribe to Store changes with a valid function');
        return;
    }

    this.callbacks.push(callback);
  }

  processCallbacks(data) {
    if(!this.callbacks.length) {
      return;
    }

    this.callbacks.forEach(callback => callback(data));
  }
}
