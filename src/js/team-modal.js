// Отримати модальне вікно
const modal = document.getElementById('modal-team');

// Отримати кнопку закриття
const closeBtn = document.querySelector('.close');

export function onOpenModalTeamClick() {
  modal.classList.remove('is-hidden');

  closeBtn.addEventListener('click', e => {
    modal.classList.add('is-hidden');
  });
}

// Обробник події для закриття модального вікна, якщо користувач клікне поза ним
window.onclick = function (event) {
  if (event.target == modal) {
    modal.classList.add('is-hidden');
  }
};

// // Отримати кнопку відкриття модального вікна
// var openModalBtn = document.getElementById('open-modal-btn');

// // Отримати модальне вікно
// var modal = document.getElementById('modal');

// // Отримати кнопку закриття
// var closeBtn = document.getElementsByClassName('close')[0];

// // Обробник події для відкриття модального вікна
// openModalBtn.onclick = function () {
//   modal.style.display = 'block';
// };

// // Обробник події для закриття модального вікна
// closeBtn.onclick = function () {
//   modal.style.display = 'none';
// };
