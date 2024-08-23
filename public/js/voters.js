var role = document.getElementById("role");
var party = document.getElementById("parties");
var position = document.getElementById("positions");

window.onload = () => {
  hide(party);
  hide(position);
};

role.addEventListener("change", function (evt) {
  let choice = Number(role.options[role.selectedIndex].value);
  if (choice === 2) {
    show(party);
    show(position);
  } else {
    hide(party);
    hide(position);
  }
});

function hide(elem) {
  elem.style.display = "none";
}

function show(elem) {
  elem.style.display = "block";
}
