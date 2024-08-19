var voters = document.querySelectorAll(".voter");
var actions = document.querySelectorAll(".action");

voters.forEach(function each(item) {
  item.addEventListener("click", function click(evt) {
    evt.preventDefault();
    console.log("parent clicked");
  });
});

actions.forEach(function each(item) {
  item.addEventListener("click", function click(evt) {
    if (!evt) var evt = window.event;
    evt.cancelBubble = true;
    if (evt.stopPropagation) evt.stopPropagation();
    evt.preventDefault();

    console.log("child clicked");
  });
});
