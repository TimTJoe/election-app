let role = document.getElementById("role");
let spanID = document.getElementById("spanID");

window.onload = function onload() {
  spanID.classList.add("hide");
  role.addEventListener("change", function handler(evt) {
    let choice = Number(role.options[role.selectedIndex].value);
    if (choice === 2) {
      spanID.classList.remove("hide");
    } else {
      spanID.classList.add("hide");
    }
  });
};
