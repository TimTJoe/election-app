let role = document.getElementById("role");
let spanID = document.getElementById("spanID");

window.onload = function onload() {
  spanID.classList.add("hide");
  role.addEventListener("change", function handler(evt) {
      console.log(evt);
  });
};
