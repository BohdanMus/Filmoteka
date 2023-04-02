import { onOpenModal } from './open-modal';

const refs = {
  queueBtn: document.querySelector('.button-queue'),
  watchedBtn: document.querySelector('.button-watched'),
  librarylist: document.querySelector('.library-list'),
};

const noImageURL = new URL('/src/images/no-foto.jpg', import.meta.url);
const allertImageURL = new URL('/src/images/projector.jpg', import.meta.url);
const prePoster = 'https://image.tmdb.org/t/p/original/';

createQueueList();
createWatchedList();

refs.watchedBtn.addEventListener('click', createWatchedList);
refs.queueBtn.addEventListener('click', createQueueList);
refs.librarylist.addEventListener('click', onOpenModal);

function createWatchedList() {
  refs.watchedBtn.classList.add('active');
  refs.queueBtn.classList.remove('active');

  const savedFilm = JSON.parse(localStorage.getItem('addToWatched')) || [];

  if (!savedFilm.length) {
    console.log('no movie');
    refs.librarylist.innerHTML = `<div class="empty-wrapp">
      <p class="empty-text">
        No movies added. Select a movie on the
        <a href="../index.html" class="homepage">Home</a> page
      </p>
      <img class="film-img" src="${allertImageURL}" alt="hands"/>
    </div>
    `;
    return;
  }
  refs.librarylist.innerHTML = '';
  console.log('savedFilm:', savedFilm);

  libraryMarkup(savedFilm);
}

function createQueueList() {
  refs.queueBtn.classList.add('active');
  refs.watchedBtn.classList.remove('active');

  const savedFilm = JSON.parse(localStorage.getItem('addToQueue')) || [];

  if (!savedFilm.length) {
    console.log('no movie');
    refs.librarylist.innerHTML = `<div class="empty-wrapp">
      <p class="empty-text">
        No movies added. Select a movie on the
        <a href="../index.html" class="homepage">Home</a> page
      </p>
      <img class="film-img" src="${allertImageURL}" alt="" />
    </div>
    `;
    return;
  }
  refs.librarylist.innerHTML = '';
  console.log('savedFilm:', savedFilm);

  libraryMarkup(savedFilm);
}

function libraryMarkup(savedFilm) {
  console.log(savedFilm);
  const markup = savedFilm
    .map(film => {
      return `<li class="film-card" data-id="{id}">
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
