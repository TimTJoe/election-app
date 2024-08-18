var role = document.getElementById("role");
var party = document.getElementById("party");
var positions = document.getElementById("positions");

window.onload = function onload() {
  party.classList.add("hide");
  positions.classList.add("hide");

  /**
   * Handles the change event for the 'role' dropdown menu.
   * When the selected option changes, this function checks the value of the selected option.
   * If the value is 2, it removes the 'hide' class from the party element to make it visible.
   * Otherwise, it adds the 'hide' class to the party element to hide it.
   *
   * @param {Event} evt - The event object representing the change event.
   */
  role.addEventListener("change", function handler(evt) {
    let choice = Number(role.options[role.selectedIndex].value);
    if (choice === 2) {
      party.classList.remove("hide");
      positions.classList.remove("hide");
    } else {
      party.classList.add("hide");
      positions.classList.add("hide");
    }
  });
};
