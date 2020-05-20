const defaultState = {
  isStarted: false,
  banPhaseName: '',
  banList: [],
};

const state = Object.assign({}, defaultState);

const reset = () => {
  Object.assign(state, defaultState);
  state.banList = [];
};

module.exports = {
  state,
  reset,
};