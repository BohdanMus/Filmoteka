import axios from 'axios';
const BASE_URL = 'https://api.themoviedb.org/3';
const USER_KEY = '9e4f0ad78cbe1148a9d4c0c8389afc83';
// const gallery = document.querySelector('.gallery-list');
// gallery.addEventListener('click', onOpenModal);

export function onOpenModal(event) {
  event.preventDefault();

  if (event.currentTarget === event.target) {
    return;
  }

  const list = event.target.closest('li');
  const listId = list.dataset.id;

  const getMovie = async () => {
    const { data } = await axios.get(
      `${BASE_URL}/movie/${listId}?api_key=${USER_KEY}`
    );
    return data;
  };

  getMovie()
    .then(listData => console.log(listData))
    .catch(error => console.log(error));

  // window.addEventListener('keydown', onCloseModal);
  // function onCloseModal(event) {
  //   if (event.code !== 'Escape') return;
  //   // instance.close()
  //   window.removeEventListener('keydown', onCloseModal);
  // }
}
