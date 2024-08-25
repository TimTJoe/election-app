document.addEventListener('DOMContentLoaded', function () {
    const selects = document.querySelectorAll('.select');
  
    selects.forEach(select => {
      select.querySelectorAll('option').forEach(option => {
        option.classList.add('option-custom');
      });
    });
  });
  
  console.log("index.js")