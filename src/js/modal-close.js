const modalTrigger = document.querySelectorAll('[data-modal]'),
  modalCloseBtn = document.querySelector('[data-modal-close]'),
  modalWindow = document.querySelector('.modal');

function onModalClose() {
  modalWindow.classList.toggle('is-hidden');
  document.body.style.overflow = '';
}

// modalCloseBtn.addEventListener('click', () => {
//     onModalClose();
// });

// modalWindow.addEventListener('click', e => {
//   if (e.target === modalWindow) {
//     onModalClose();
//   }
// });
// document.addEventListener('keydown', e => {
//   if (e.code === 'Escape') {
//     onModalClose();
//   }
// });
