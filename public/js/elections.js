var electionSelect = document.getElementById("elections-select");
var electionTabs = document.getElementById("elections-tabs");
var electionName = document.getElementById("election-name");

window.onload = function onload() {
  electionSelect.addEventListener("change", function handler(evt) {
    let choice = electionSelect.options[electionSelect.selectedIndex].innerText;
    electionName.innerText = choice;
  });

  document.querySelectorAll(".tab").forEach(function each(tab) {
    tab.addEventListener("click", function click(evt) {
      removeClass("tab", "active");
      evt.target.classList.add("active");
    });
  });
};

function removeClass(targetElem, classToRemove) {
  document.querySelectorAll("." + targetElem).forEach(function remove(item) {
    item.classList.remove(classToRemove);
  });
}

// document.querySelectorAll(".tabitem").forEach((items) => {
//   items.classList.remove("active");
// });
// electionTabs.addEventListener("click", function tabs(evt) {
//   document.querySelectorAll(".tabitem").forEach((items) => {
//     items.classList.remove("active");
//   });
//   evt.target.classList.add("active");
// });
