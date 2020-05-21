const defaultState = {
  isStarted: false,
  banPhaseName: '',
  banList: [],
};

const timeState = {
  timer: 0,
  lastTimerResetTime: Date.now(),
  timeFd: null,
}

const state = {...defaultState, ...timeState};

const reset = () => {
  Object.assign(state, defaultState); // Use Object.assign to handle const state.
  state.banList = [];
};

module.exports = {
  state,
  reset,
};