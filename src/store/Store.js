// https://css-tricks.com/build-a-state-management-system-with-vanilla-javascript/
export class Store {
  constructor(params) {
    this.actions = {};
    this.mutations = {};
    this.state = {};
    this.status = 'resting';

    this.callbacks = [];

    if(params.hasOwnProperty('actions')) {
      this.actions = params.actions;
    }

    if(params.hasOwnProperty('mutations')) {
      this.mutations = params.mutations;
    }

    this.state = new Proxy((params.state || {}), {
      set: (state, key, value) => {
        state[key] = value;

        console.log(`state change: ${key}: ${value}`);

        this.processCallbacks(this.state);

        return true;
      }
    });
  }

  dispatch(actionKey, payload) {
    if(typeof this.actions[actionKey] !== 'function') {
      console.error(`Action "${actionKey} doesn't exist.`);
      // return false;
      return;
    }

    console.groupCollapsed(`ACTION: ${actionKey}`);

    this.status = 'action';
    this.actions[actionKey](this, payload);
    // this.status = 'resting';

    console.groupEnd();
  }

  commit(mutationKey, payload) {
    if(typeof this.mutations[mutationKey] !== 'function') {
      console.log(`Mutation "${mutationKey}" doesn't exist`);
      // return false;
      return;
    }

    this.status = 'mutation';
    let newState = this.mutations[mutationKey](this.state, payload);
    this.state = newState;
    // this.status = 'resting';

    // return true;
  }

  subscribe(callback) {
    if(typeof callback !== 'function') {
        console.error('You can only subscribe to Store changes with a valid function');
        // return false;
        return;
    }

    // A valid function, so it belongs in our collection
    this.callbacks.push(callback);

    // return true;
  }

  processCallbacks(data) {
    if(!self.callbacks.length) {
        // return false;
        return;
    }

    // We've got callbacks, so loop each one and fire it off
    self.callbacks.forEach(callback => callback(data));

    // return true;
  }
}
