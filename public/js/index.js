
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

console.log(calculateAge("1995-08-18"));

export function calculateAge(fullDate) {
  const birthYear = new Date(fullDate).getFullYear();
  const currentYear = new Date().getFullYear();
  const currentMonth = new Date().getMonth();
  const birthMonth = new Date(fullDate).getMonth();

  let age = currentYear - birthYear;

  // Adjust age if birthdate has not occurred yet this year
  if (
    currentMonth < birthMonth ||
    (currentMonth === birthMonth &&
      new Date().getDate() < new Date(fullDate).getDate())
  ) {
    age--;
  }

  return age;
}
