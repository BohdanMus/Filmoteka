import axios from 'axios';
const BASE_URL = 'https://api.themoviedb.org/3';
const USER_KEY = '9e4f0ad78cbe1148a9d4c0c8389afc83';
const noImageURL = new URL('/src/images/no-foto.jpg', import.meta.url);
const alertImageURL = new URL('/src/images/movie-time.jpg', import.meta.url);
const prePoster = 'https://image.tmdb.org/t/p/original/';

export const refs = {
  queueBtn: document.querySelector('.button-queue'),
  watchedBtn: document.querySelector('.button-watched'),
  librarylist: document.querySelector('.library-list'),
  libraryBox: document.querySelector('.library-section'),
};

createQueueList();
createWatchedList();

refs.watchedBtn.addEventListener('click', createWatchedList);
refs.queueBtn.addEventListener('click', createQueueList);
//refs.librarylist.addEventListener('click', onOpenModal);

function createWatchedList() {
  refs.watchedBtn.classList.add('active');
  refs.queueBtn.classList.remove('active');

  let savedFilm = JSON.parse(localStorage.getItem('addToWatched')) || [];

  const unicSavedFilm = savedFilm.reduce(
    (savedFilm, film) => (
      savedFilm.find(({ id }) => film.id == id) || savedFilm.push(film),
      savedFilm
    ),
    []
  );
  console.log(unicSavedFilm);

  if (!savedFilm.length) {
    console.log('no movie');
    refs.librarylist.innerHTML = `<div class="empty-wrapp">
      <p class="empty-text">
        No movies added. Select a movie on the
        Home page
      </p>
      <img class="film-img empty-img" src="${alertImageURL}" alt="hands"/>
    </div>
    `;
    return;
  }

  refs.librarylist.innerHTML = '';
  console.log('savedFilm:', savedFilm);

  libraryMarkup(unicSavedFilm);
}

function createQueueList() {
  refs.queueBtn.classList.add('active');
  refs.watchedBtn.classList.remove('active');

  const savedFilm = JSON.parse(localStorage.getItem('addToQueue')) || [];

  const unicSavedFilm = savedFilm.reduce(
    (savedFilm, film) => (
      savedFilm.find(({ id }) => film.id == id) || savedFilm.push(film),
      savedFilm
    ),
    []
  );

  if (!savedFilm.length) {
    console.log('no movie');
    refs.librarylist.innerHTML = `<div class="empty-wrapp">
      <p class="empty-text">
        No movies added. Select a movie on the
        Home page
      </p>
      <img class="film-img empty-img" src="${alertImageURL}" alt="" />
    </div>
    `;
    return;
  }
  refs.librarylist.innerHTML = '';
  console.log('savedFilm:', savedFilm);

  libraryMarkup(unicSavedFilm);
}

function libraryMarkup(unicSavedFilm) {
  const markup = unicSavedFilm
    .map(film => {
      return `<li class="film-card" data-id="${film.id}">
          <picture class="film-card__img">
          ${
            film.poster
              ? `<source
              srcset="${prePoster}${film.poster}"
              loading="lazy"
              media="(min-width: 1280px)"
            />
            <source
              srcset="${prePoster}${film.poster}"
              loading="lazy"
              media="(min-width: 768px)"
            />
            <source
              srcset="${prePoster}${film.poster}"
              loading="lazy"
              media="(min-width: 320px)"
            />
            <img
              class="film-card__img film-img"
              src="${prePoster}${film.poster}"
              alt="Poster for the film"
              width="395"
            />`
              : `            <source
              srcset="${noImageURL}"
              loading="lazy"
              media="(min-width: 1280px)"
            />
            <source
              srcset="${noImageURL}"
              loading="lazy"
              media="(min-width: 768px)"
            />
            <source
              srcset="${noImageURL}"
              loading="lazy"
              media="(min-width: 320px)"
            />
            <img
              class="film-card__img film-img"
              src="${noImageURL}"
              alt="Poster for the film"
              width="395"
            />`
          }

          </picture>
          <h3 class="film-card__title">${film.title}</h3>
          <div class="film-card_info-container">
            <div class="film-card__caption">
              <p class="film-card__genre">${film.genres}</p>
              <p class="film-card__date">${film.releaseDate}</p>
            </div>
          </div>
      </li>`;
    })
    .join('');

  refs.librarylist.innerHTML = markup;
  return markup;
}


import axios from 'axios';
import { getGenres } from './genres';
const backDropEl = document.querySelector('.backdrop');

const gallery = document.querySelector('.library-list');
gallery.addEventListener('click', onOpenModal);



function onModalClose() {
  backDropEl.classList.add('visually-hidden');
  movieToFind = {};
  modalContentEl.innerHTML = '';
  markup = '';
}
const createListCard = document.querySelector('.modal');

function onOpenModal(event) {
  let movieArray = [];
  event.preventDefault();

  if (event.currentTarget === event.target) {
    return;
  }

  const list = event.target.closest('li');
  const listId = list.dataset.id;
  backDropEl.classList.remove('visually-hidden');

  const getMovie = async () => {
    const { data } = await axios.get(
      `${BASE_URL}/movie/${listId}?api_key=${USER_KEY}&language=en-US`
    );
    return data;
  };

  getMovie()
    .then(listData => {
      renderCard(listData);
    })
    .catch(error => console.log(error));

  function renderCard(data) {
    createListCard.innerHTML = '';
    const icon = `<svg
      width="30"
      height="30"
      viewBox="0 0 30 30"
      fill="none"
      xmlns="http://www.w3.org/2000/svg">
      <path d="M8 8L22 22" stroke="black" stroke-width="2" />
      <path d="M8 22L22 8" stroke="black" stroke-width="2" />
    </svg>`;

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

    const markup = `
  
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
             <span class="rating">${vote_average}</span>/<span class="votes">${vote_count}</span>
           </li>
           <li class="value-item popularity">${popularity}</li>
           <li class="value-item movie-title">${original_title}</li>
           <li class="value-item movie-genres">${ganresList}</li>
         </ul>
       </div>
     </div>
     <h2 class="about-film">ABOUT</h2>
     <p class="description-film-info">${overview} 
     </p>
     <div class="btn-block">
       <button type="button" class="modal-button js-watchedBtn">ADD TO WATCHED</button>
       <button type="button" class="modal-button js-queueBtn">ADD TO QUEUE</button>
     </div>
   </div>`;
    createListCard.insertAdjacentHTML('beforeend', markup);
  }

  // window.addEventListener('keydown', onCloseModal);
  // function onCloseModal(event) {
  //   if (event.code !== 'Escape') return;
  //   // instance.close()
  //   window.removeEventListener('keydown', onCloseModal);
  // }
}

// function movieModalRender(movieArray, listId) {
//   modalContentEl.innerHTML='';
//   const movieToFind = movieArray.find(movie => movie.id === Number(listId));

//   const {
//     poster_path,
//     original_title,
//     name,
//     vote_average,
//     vote_count,
//     popularity,
//     genre_ids,
//     release_date = '',
//     first_air_date = '',
//     overview,
//   } = movieToFind;

//   const movieName = original_title ? original_title : name;
//   const date = release_date
//     ? release_date.slice(0, 4)
//     : first_air_date.slice(0, 4);
//   const genres = getGenres(genre_ids);

//   const icon = `<svg
//       width="30"
//       height="30"
//       viewBox="0 0 30 30"
//       fill="none"
//       xmlns="http://www.w3.org/2000/svg"
//     >
//       <path d="M8 8L22 22" stroke="black" stroke-width="2" />
//       <path d="M8 22L22 8" stroke="black" stroke-width="2" />
//     </svg>`;
//   // <button type="button" class="modal-close" data-modal-close>
//   //   ${icon}
//   // </button>;
//   markup = `

//    <button type="button" class="modal-close" data-modal-close>
//     ${icon}
//   </button>
//   <div class="modal-poster"><img
//       class="img-film"
//       src="${prePoster}${poster_path}"
//       alt=""
//     />
//   </div>
//   <div class="modal-description">
//     <h2 class="modal-title">${movieName}</h2>
//     <div class="data-wrapper">
//       <div class="data-keys">
//         <ul class="keys-list">
//           <li class="keys-item">Vote / Votes</li>
//           <li class="keys-item">Popularity</li>
//           <li class="keys-item">Original Title</li>
//           <li class="keys-item">Genre</li>
//         </ul>
//       </div>
//       <div class="data-values">
//         <ul class="values-list">
//           <li class="value-item">
//             <span class="rating">${vote_average}</span>/<span class="votes">${vote_count}</span>
//           </li>
//           <li class="value-item popularity">${popularity}</li>
//           <li class="value-item movie-title">${movieName}</li>
//           <li class="value-item movie-genres">${genres}</li>
//         </ul>
//       </div>
//     </div>
//     <h2 class="about-film">ABOUT</h2>
//     <p class="description-film-info">${overview}
//     </p>
//     <div class="btn-block">
//       <button type="button" class="modal-button js-watchedBtn">ADD TO WATCHED</button>
//       <button type="button" class="modal-button js-queueBtn">ADD TO QUEUE</button>
//     </div>
//   </div>`;

//   modalContentEl.insertAdjacentHTML('afterbegin', markup);
// }
