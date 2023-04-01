// Отримати кнопку відкриття модального вікна
var openModalBtn = document.getElementById("open-modal-btn");

// Отримати модальне вікно
var modal = document.getElementById("modal");

// Отримати кнопку закриття
var closeBtn = document.getElementsByClassName("close")[0];

// Обробник події для відкриття модального вікна
openModalBtn.onclick = function () {
  modal.style.display = "block";
}

// Обробник події для закриття модального вікна
closeBtn.onclick = function() {
  modal.style.display = "none";
}

// Обробник події для закриття модального вікна, якщо користувач клікне поза ним
window.onclick = function(event) {
  if (event.target == modal) {
    modal.style.display = "none";
  }
}