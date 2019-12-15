/**
 * Homegrown state-management... because, why not!?
 * Inspired by https://css-tricks.com/build-a-state-management-system-with-vanilla-javascript/
 */
export class Store {
  /**
   * @param {object} params
   * @property {object} params.actions
   * @property {object} params.mutations
   * @property {object} params.state
   */
  constructor(params) {
    this.actions = params.actions || {};
    this.mutations = params.mutations || {};
    this.state = params.state || {};
    this.callbacks = [];

    this.state = new Proxy(this.state, {
      set: (state, key, value) => {
        state[key] = value;
        console.warning("Do not mutate state!", key);

        return true;
      }
    });
  }

  /**
   * @param {string} actionKey The action's function name
   * @param {object} payload
   */
  dispatch(actionKey, payload) {
    if (typeof this.actions[actionKey] !== "function") {
      console.error(`Action "${actionKey} doesn't exist.`);
      return;
    }

    console.info("Dispatching action", actionKey, payload);
    this.actions[actionKey](this, payload);
  }

  /**
   * @param {string} mutationKey - The mutation function's name
   * @param {object} payload
   */
  commit(mutationKey, payload) {
    if (typeof this.mutations[mutationKey] !== "function") {
      console.error(`Mutation "${mutationKey}" doesn't exist`);
      return;
    }

    console.info("Committing state change", mutationKey, payload);

    const newState = this.mutations[mutationKey](this.state, payload);
    this.state = newState;

    // notify all subscribers
    this.processCallbacks(this.state);
  }

  /**
   * @param {Function} callback
   */
  subscribe(callback) {
    if (typeof callback !== "function") {
      console.error(
        "You can only subscribe to Store changes with a valid function"
      );
      return;
    }

    this.callbacks.push(callback);
  }

  /**
   * @param {object} state
   */
  processCallbacks(state) {
    if (!this.callbacks.length) {
      return;
    }

    this.callbacks.forEach(callback => callback(state));
  }
}
