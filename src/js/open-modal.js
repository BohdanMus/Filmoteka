import axios from 'axios';
import { BASE_URL, USER_KEY, prePoster } from './API';
import { getGenres } from './genres';

const gallery = document.querySelector('.gallery-list');
const createListCard = document.querySelector('.card');
gallery.addEventListener('click', onOpenModal);

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
    .then(listData => {
      renderCard(listData);
    })
    .catch(error => console.log(error));

  function renderCard(data) {
    const {
      backdrop_path,
      id,
      genres,
      original_title,
      popularity,
      poster_path,
      overview,
      title,
      vote_average,
      vote_count,
    } = data;
    const genresId = [];

    for (const genre of genres) {
      genresId.push(genre.id);
    }

    const ganresList = getGenres(genresId);
   
    const markup = `<div class="modal-poster">
    <img
      class="img-film"
      src="${prePoster}${poster_path}"
      alt=""
    />
    </div>
    <div class="modal-description">
    <h2 class="modal-title">${title}</h2>
    <div class="data-wrapper">
      <div class="data-keys">
        <ul class="keys-list">
          <li class="keys-item">Vote / Votes</li>
          <li class="keys-item">Popularity</li>
          <li class="keys-item">Original Title</li>
          <li class="keys-item">Genre</li>
        </ul>
      </div>
      <div class="data-values">
        <ul class="values-list">
          <li class="value-item">
            <span class="rating"> ${vote_average} </span>/<span class="votes"> ${vote_count}</span>
          </li>
          <li class="value-item popularity">${popularity}</li>
          <li class="value-item movie-title">${original_title}</li>
          <li class="value-item movie-genres">${ganresList}</li>
        </ul>
      </div>
    </div>
    <h2 class="about-film">ABOUT</h2>
    <p class="description-film-info">
      ${overview}
    </p>`;
    createListCard.insertAdjacentHTML('beforeend', markup);
  }


  // window.addEventListener('keydown', onCloseModal);
  // function onCloseModal(event) {
  //   if (event.code !== 'Escape') return;
  //   // instance.close()
  //   window.removeEventListener('keydown', onCloseModal);
  // }
}
