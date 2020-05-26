const defaultState = {
  isStarted: false,
  timeoutObj: null,
  timeoutValue: 0,
};

const state = {...defaultState};

const reset = () => {
  if (state.timeoutObj) {
    clearTimeout(state.timeoutObj);
  }
  Object.assign(state, defaultState); // Use Object.assign to handle const state.
};

module.exports = {
  state,
  reset,
};
