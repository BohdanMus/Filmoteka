import axios from 'axios';
import { genresArray, getGenres } from './genres';
import { fetchMovies, prePoster, galleryEl } from './API';
import { noImageURL } from './search-by-keyword';
import { movieData } from './trending';
import { searchResult } from './search-by-keyword';
import {
  refs,
  onAddToWatchedList,
  onAddToQueueList,
} from './set-to-local-storage';
import { modalCloseBtn, modalWindow } from './modal-close';
import {
  trailerKey,
  trailerContainer,
  getMovieTrailer,
  renderVideoFrame,
} from './youtube-trailer';
const BASE_URL = 'https://api.themoviedb.org/3';
const USER_KEY = '9e4f0ad78cbe1148a9d4c0c8389afc83';
const gallery = document.querySelector('.gallery-list');
const modalEl = document.querySelector('.modal');
const backDropEl = document.querySelector('.backdrop');
export const modalContentEl = document.querySelector('.modal');
const testContainerEl = document.querySelector('.test-container');
let markup = '';
export let movieId = '';

gallery.addEventListener('click', onOpenModal);

function onModalClose() {
  backDropEl.classList.add('visually-hidden');
  movieToFind = {};
  modalContentEl.innerHTML = '';
  markup = '';
}
const createListCard = document.querySelector('.card');

export function onOpenModal(event) {
  let movieArray = [];
  event.preventDefault();
  if (event.currentTarget === event.target) {
    return;
  }

  const list = event.target.closest('li');
  const listId = list.dataset.id;
  movieId = listId;
  backDropEl.classList.remove('visually-hidden');

  movieArray = searchResult.length > 0 ? searchResult[1] : movieData;

  movieModalRender(movieArray, listId);
  const closeBtnEl = document.querySelector('.modal-close');
  closeBtnEl.addEventListener('click', onModalClose);
  document.addEventListener('keydown', e => {
    if (e.keyCode === 27) {
      onModalClose();
    }
  });
  backDropEl.addEventListener('click', e => {
    if (e.target === e.currentTarget) {
      onModalClose();
    }
  });
  //---------------------Лістенери інших функцій на кнопки модалки фільма ---- вмикаються при відкритті вікна!------
  //-------modal-close.js-------------
  closeBtnEl.addEventListener('click', () => {
    onModalClose();
  });

  modalContentEl.addEventListener('click', e => {
    if (e.target === modalWindow) {
      onModalClose();
    }
  });
  document.addEventListener('keydown', e => {
    if (e.code === 'Escape') {
      onModalClose();
    }
  });
  //-------modal-close.js-------------
  const watchedBtn = document.querySelector('.js-watchedBtn');
  const queueBtn = document.querySelector('.js-queueBtn');
  const trailerButton = document.querySelector('.trailer');
  watchedBtn.addEventListener('click', onAddToWatchedList);
  queueBtn.addEventListener('click', onAddToQueueList);
  trailerButton.addEventListener('click', getMovieTrailer);
}

function movieModalRender(movieArray, listId) {
  modalContentEl.innerHTML = '';
  const movieToFind = movieArray.find(movie => movie.id === Number(listId));

  const {
    poster_path,
    original_title,
    name,
    vote_average,
    vote_count,
    popularity,
    genre_ids,
    release_date = '',
    first_air_date = '',
    overview,
  } = movieToFind;

  const movieName = original_title ? original_title : name;
  const date = release_date
    ? release_date.slice(0, 4)
    : first_air_date.slice(0, 4);
  const genres = getGenres(genre_ids);

  const icon = `<svg
      width="30"
      height="30"
      viewBox="0 0 30 30"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path d="M8 8L22 22" stroke="black" stroke-width="2" />
      <path d="M8 22L22 8" stroke="black" stroke-width="2" />
    </svg>`;
  // <button type="button" class="modal-close" data-modal-close>
  //   ${icon}
  // </button>;
  markup = `
  
   <button type="button" class="modal-close" data-modal-close>
    ${icon}
  </button>
  <div class="modal-poster"><img
      class="img-film"
      src="${prePoster}${poster_path}"
      alt=""
    />
  </div>
  <div class="modal-description">
    <h2 class="modal-title">${movieName}</h2>
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
            <span class="rating">${vote_average}</span>/<span class="votes">${vote_count}</span>
          </li>
          <li class="value-item popularity">${popularity}</li>
          <li class="value-item movie-title">${movieName}</li>
          <li class="value-item movie-genres">${genres}</li>
        </ul>
      </div>
    </div>
    <h2 class="about-film">ABOUT</h2>
    <p class="description-film-info">${overview} 
    </p>
    <div class="btn-block">
      <button type="button" class="modal-button js-watchedBtn">ADD TO WATCHED</button>
      <button type="button" class="modal-button js-queueBtn">ADD TO QUEUE</button>
      <button type="button" class="modal-button trailer">WATCH TRAILER</button>
    </div>
    <div class="trailer-container"></div>
  </div>`;
  modalContentEl.insertAdjacentHTML('afterbegin', markup);
  const trailerContainer = document.querySelector('.trailer-container');
  const iframe = document.createElement('iframe');
  iframe.src = `https://www.youtube.com/embed/${trailerKey}`;
  iframe.width = '300';
  iframe.height = '200';
  iframe.allowFullscreen = true;

  trailerContainer.innerHTML = '';
  trailerContainer.appendChild(iframe);
}
//<div class="btn-block">
//<button type="button" class="modal-button js-watchedBtn">
//ADD TO WATCHED
//</button>
//<button type="button" class="modal-button js-queueBtn">
//ADD TO QUEUE
//</button>
//</div>;
