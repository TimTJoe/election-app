
export function openToaster(text) {
  let toaster = document.getElementById("toaster");
  document.getElementById("toaster-text").innerText = text;
  toaster.classList.remove("hide");
  toaster.classList.add("show");
  setTimeout(() => {
    toaster.classList.add("hide");
    toaster.classList.remove("show");
  }, 2000);
}
