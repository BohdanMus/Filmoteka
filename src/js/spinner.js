// // Отримати посилання на елемент spinner
// const spinner = document.querySelector('.spinner-container');

// // Включити spinner при початку запиту
// spinner.style.display = 'flex';

// // Вимкнути spinner при завершенні запиту
// fetch(url)
//   .then(response => {
//     // Обробити відповідь від сервера
//     spinner.style.display = 'none';
//   })
//   .catch(error => {
//     // Обробити помилку запиту
//     spinner.style.display = 'none';
//   });

// // Отримати посилання на елемент spinner
// const spinner = document.querySelector('.spinner-container');

// // Включити spinner
// spinner.style.display = 'flex';

// // Вимкнути spinner
// spinner.style.display = 'none';

  const spinner = document.getElementById('spinner-container');
  
  function showSpinner() {
    spinner.style.display = 'flex';
  }

  function hideSpinner() {
    spinner.style.display = 'none';
  }