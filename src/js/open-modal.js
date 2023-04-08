import axios from 'axios'
import {genresArray, getGenres} from './genres'
import {fetchMovies, prePoster, galleryEl} from './API'
import {noImageURL} from './search-by-keyword'
import {movieData} from './trending'
import {searchResult} from './search-by-keyword'
import {onAddToWatchedList, onAddToQueueList} from './set-to-local-storage'
import {modalCloseBtn, modalWindow} from './modal-close'
import {getMovieTrailer} from "./youtube-trailer"

const gallery = document.querySelector('.gallery-list')
const modalEl = document.querySelector('.modal')
const backDropEl = document.querySelector('.backdrop')
const modalContentEl = document.querySelector('.modal')
const testContainerEl = document.querySelector('.test-container')
let markup = ''
let movieID = ''
gallery.addEventListener('click', onOpenModal)

function onModalClose() {
  backDropEl.classList.add('visually-hidden')
  //let movieToFind = {};
  modalContentEl.innerHTML = ''
  markup = ''
}

const createListCard = document.querySelector('.card')

export function onOpenModal(event) {
  let movieArray = []
  event.preventDefault()
  if (event.currentTarget === event.target) {
    return
  }

  const list = event.target.closest('li')
  movieID = list.dataset.id
  backDropEl.classList.remove('visually-hidden')

  movieArray = searchResult.length > 0 ? searchResult[1] : movieData

  movieModalRender(movieArray, movieID)
  //-------------------------------------------------------------------------------------------
  const watchedBtn = document.querySelector('.js-watchedBtn')
  if (localStorage.getItem('addToWatched')) {
    const watchedStatus = JSON.parse(localStorage.getItem('addToWatched')).find(
      film => film.id === Number(movieID)
    )
    if (watchedStatus) {
      watchedBtn.textContent = 'REMOVE FROM WATCHED'
    }
  }
  //---------------------------------------------------------------------------------------------
  const queueBtn = document.querySelector('.js-queueBtn')
  const trailerBtn = document.querySelector('.js-trailerBtn')
  if (localStorage.getItem('addToWatched')) {
    const watchedStatus = JSON.parse(localStorage.getItem('addToWatched')).find(
      film => film.id === Number(movieID)
    )
    if (watchedStatus) {
      watchedBtn.textContent = 'REMOVE FROM WATCHED'
    }
  }
  //---------------------------------------------------------------------------------------------

  if (localStorage.getItem('addToQueue')) {
    const queueStatus = JSON.parse(localStorage.getItem('addToQueue')).find(
      film => film.id === Number(movieID)
    )
    if (queueStatus) {
      queueBtn.textContent = 'REMOVE FROM QUEUE'
    }
  }
  //---------------------------------------------------------------------------------------------
  const closeBtnEl = document.querySelector('.modal-close')
  closeBtnEl.addEventListener('click', onModalClose)
  document.addEventListener('keydown', e => {
    if (e.keyCode === 27) {
      onModalClose()
    }
  })
  backDropEl.addEventListener('click', e => {
    if (e.target === e.currentTarget) {
      onModalClose()
    }
  })
  //---------------------Лістенери інших функцій на кнопки модалки фільма ---- вмикаються при відкритті вікна!------
  //-------modal-close.js-------------
  closeBtnEl.addEventListener('click', () => {
    onModalClose()
  })

  modalContentEl.addEventListener('click', e => {
    if (e.target === modalWindow) {
      onModalClose()
    }
  })
  document.addEventListener('keydown', e => {
    if (e.code === 'Escape') {
      onModalClose()
    }
  })
  //-------modal-close.js-------------
  // const watchedBtn = document.querySelector('.js-watchedBtn');
  // const queueBtn = document.querySelector('.js-queueBtn');
  watchedBtn.addEventListener('click', onAddToWatchedList)
  queueBtn.addEventListener('click', onAddToQueueList)
  trailerBtn.addEventListener('click', () => {
    getMovieTrailer(movieID)
  })
}

function movieModalRender(movieArray, listId) {
  modalContentEl.innerHTML = ''
  const movieToFind = movieArray.find(movie => movie.id === Number(listId))

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
  } = movieToFind

  const movieName = original_title ? original_title : name
  const date = release_date
    ? release_date.slice(0, 4)
    : first_air_date.slice(0, 4)
  const genres = getGenres(genre_ids)

  const icon = `<svg
  width="30"
  height="30"
  viewBox="0 0 30 30"
  fill="none"
  xmlns="http://www.w3.org/2000/svg"
  >
  <path d="M8 8L22 22" stroke="black" stroke-width="2" />
  <path d="M8 22L22 8" stroke="black" stroke-width="2" />
  </svg>`
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
        <button type="button" class="modal-button js-trailerBtn">Watch Trailer</button>
    </div>
    <div class="trailerContainer"></div>
  </div>`

  modalContentEl.insertAdjacentHTML('afterbegin', markup)

  //       </div>
  //       </div>`;

  //       modalContentEl.insertAdjacentHTML('afterbegin', markup);
  //     }
  //     //<div class="btn-block">
  //     //<button type="button" class="modal-button js-watchedBtn">
  //     //ADD TO WATCHED
  //     //</button>
  //     //<button type="button" class="modal-button js-queueBtn">
  //     //ADD TO QUEUE
  // //</button>
  // //</div>;
}
