var role = document.getElementById("role");
var spanID = document.getElementById("spanID");

window.onload = function onload() {
  spanID.classList.add("hide");

  /**
   * Handles the change event for the 'role' dropdown menu.
   * When the selected option changes, this function checks the value of the selected option.
   * If the value is 2, it removes the 'hide' class from the spanID element to make it visible.
   * Otherwise, it adds the 'hide' class to the spanID element to hide it.
   *
   * @param {Event} evt - The event object representing the change event.
   */
  role.addEventListener("change", function handler(evt) {
    let choice = Number(role.options[role.selectedIndex].value);
    if (choice === 2) {
      spanID.classList.remove("hide");
    } else {
      spanID.classList.add("hide");
    }
  });

};
