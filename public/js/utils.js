var history = window.history;

export function setState(state) {
  history.pushState({ value: state }, null);
}

export function getState() {
  return history.state.value || null;
}

export default { setState, getState };
