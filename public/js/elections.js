var electionSelect = document.getElementById("elections-select");
var electionTabs = document.getElementById("elections-tabs");

window.onload = function onload() {
  document.querySelectorAll(".tabitem").forEach((items) => {
    items.classList.remove("active");
  });

  electionSelect.addEventListener("change", function handler(evt) {
    let choice = Number(
      electionSelect.options[electionSelect.selectedIndex].value
    );
    console.log(choice);
  });

  electionTabs.addEventListener("click", function tabs(evt) {
    document.querySelectorAll(".tabitem").forEach((items) => {
      items.classList.remove("active");
    });
    evt.target.classList.add("active");
  });
};
