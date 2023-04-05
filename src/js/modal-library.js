import axios from 'axios';
import { createWatchedList, libraryMarkup } from './library-localStorage';
import {
  refs,
  createWatchedList,
  createQueueList,
} from './library-localStorage';
export const BASE_URL = 'https://api.themoviedb.org/3';
export const USER_KEY = '9e4f0ad78cbe1148a9d4c0c8389afc83';
export const prePoster = 'https://image.tmdb.org/t/p/original/';
const libraryEl = document.querySelector('.library-list');
const backDropEl = document.querySelector('.backdrop');
const modalContentEl = document.querySelector('.modal');
let markup = '';
libraryEl.addEventListener('click', onOpenModalLibrary);

function getMovieID(event) {
  event.preventDefault();
  if (event.currentTarget === event.target) {
    return;
  }
  const list = event.target.closest('li');
  const listId = list.dataset.id;
  return listId;
}

async function fetchMovie(movie_id) {
  try {
    const { data } = await axios.get(
      `${BASE_URL}/movie/${movie_id}?api_key=${USER_KEY}&language=en-US`
    );
    return data;
  } catch (error) {
    console.log(error.message);
  }
}

async function onButtonWatched(event) {
  const watchedBtn = document.querySelector('.js-watchedBtn');
  const filmId = event.target.dataset.id;
  const watchedStatus = JSON.parse(localStorage.getItem('addToWatched')).find(
    film => film.id === Number(filmId)
  );
  console.log('watched status', watchedStatus);
  if (watchedStatus) {
    watchedBtn.textContent = 'ADD TO WATCHED';
    const watchedStorage = JSON.parse(
      localStorage.getItem('addToWatched')
    ).filter(film => film.id !== Number(filmId));
    localStorage.setItem('addToWatched', JSON.stringify(watchedStorage));
  } else {
    watchedBtn.textContent = 'REMOVE FROM WATCHED';
    const watchedStorage = JSON.parse(localStorage.getItem('addToWatched'));

    const searchedFilmInfo = await fetchMovie(filmId);
    const poster = searchedFilmInfo.poster_path;
    const title = searchedFilmInfo.original_title
      ? searchedFilmInfo.original_title
      : searchedFilmInfo.title;
    const genreList = searchedFilmInfo.genres
      .map(genre => genre.name)
      .join(', ');

    const releaseDate = searchedFilmInfo.release_date.slice(0, 4);
    const id = searchedFilmInfo.id;
    const watchedLibrary = { poster, title, genreList, releaseDate, id };
    watchedStorage.push(watchedLibrary);

    localStorage.setItem('addToWatched', JSON.stringify(watchedStorage));
  }
  refs.watchedBtn.classList.add('active');
  refs.queueBtn.classList.remove('active');
  location.reload();
}

async function onButtonQueue(event) {
  const queueBtn = document.querySelector('.js-queueBtn');
  const filmId = event.target.dataset.id;
  const queueStatus = JSON.parse(localStorage.getItem('addToQueue')).find(
    film => film.id === Number(filmId)
  );

  if (queueStatus) {
    queueBtn.textContent = 'ADD TO QUEUE';
    const queueStorage = JSON.parse(localStorage.getItem('addToQueue')).filter(
      film => film.id !== Number(filmId)
    );
    localStorage.setItem('addToQueue', JSON.stringify(queueStorage));
  } else {
    queueBtn.textContent = 'REMOVE FROM QUEUE';
    const queueStorage = JSON.parse(localStorage.getItem('addToQueue'));

    const searchedFilmInfo = await fetchMovie(filmId);
    const poster = searchedFilmInfo.poster_path;
    const title = searchedFilmInfo.original_title
      ? searchedFilmInfo.original_title
      : searchedFilmInfo.title;
    const genreList = searchedFilmInfo.genres
      .map(genre => genre.name)
      .join(', ');

    const releaseDate = searchedFilmInfo.release_date.slice(0, 4);
    const id = searchedFilmInfo.id;
    const queueLibrary = { poster, title, genreList, releaseDate, id };
    queueStorage.push(queueLibrary);

    localStorage.setItem('addToQueue', JSON.stringify(queueStorage));
  }
  refs.watchedBtn.classList.add('active');
  refs.queueBtn.classList.remove('active');
  location.reload();
}

async function onOpenModalLibrary(event) {
  const filmId = getMovieID(event);
  const filmData = await fetchMovie(filmId);
  const watchedArray = localStorage.getItem('addToWatched');
  const queueArray = localStorage.getItem('addToQueue');

  const watchedStatus = JSON.parse(watchedArray).find(
    film => film.id === Number(filmId)
  );
  const queueStatus = JSON.parse(queueArray).find(
    film => film.id === Number(filmId)
  );
  const watchedButtonContent = watchedStatus
    ? 'REMOVE FROM WATCHED'
    : 'ADD TO WATCHED';

  const queueButtonContent = queueStatus ? 'REMOVE FROM QUEUE' : 'ADD TO QUEUE';

  movieModalLibraryRender(filmData, watchedButtonContent, queueButtonContent);
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
  const watchedBtn = document.querySelector('.js-watchedBtn');
  const queueBtn = document.querySelector('.js-queueBtn');
  watchedBtn.addEventListener('click', onButtonWatched);
  queueBtn.addEventListener('click', onButtonQueue);
}

function onModalClose() {
  backDropEl.classList.add('visually-hidden');
  //movieToFind = {};
  modalContentEl.innerHTML = '';
  markup = '';
}

function movieModalLibraryRender(
  filmData,
  watchedButtonContent,
  queueButtonContent
) {
  modalContentEl.innerHTML = '';
  backDropEl.classList.remove('visually-hidden');

  const {
    poster_path,
    original_title,
    name,
    vote_average,
    vote_count,
    popularity,
    genres,
    release_date = '',
    first_air_date = '',
    overview,
    id,
  } = filmData;

  const movieName = original_title ? original_title : name;
  const date = release_date
    ? release_date.slice(0, 4)
    : first_air_date.slice(0, 4);
  const genreList = genres.map(genre => genre.name).join(', ');

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
          <li class="value-item movie-genres">${genreList}</li>
        </ul>
      </div>
    </div>
    <h2 class="about-film">ABOUT</h2>
    <p class="description-film-info">${overview} 
    </p>
    <div class="btn-block">
      <button type="button" class="modal-button js-watchedBtn" data-id='${id}'>${watchedButtonContent}</button>
      <button type="button" class="modal-button js-queueBtn" data-id='${id}'>${queueButtonContent}</button>
    </div>
  </div>`;

  modalContentEl.insertAdjacentHTML('afterbegin', markup);
}
