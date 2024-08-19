var history = window.history;

export function setState(state) {
  history.pushState({ value: state }, null);
}

export function getState() {
  return history.state.value || null;
}

export function openToaster(text) {
  let toaster = document.getElementById("toaster");
  let toasterText = document.getElementById("toaster-text");
  toaster.classList.remove("hide");
  toaster.classList.add("show");
  setTimeout(() => {
    toaster.classList.add("hide");
    toaster.classList.remove("show");
  }, 3000);
}

export default { setState, getState };
