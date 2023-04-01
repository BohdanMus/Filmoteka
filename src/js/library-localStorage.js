const refs = {
  queueBtn: document.querySelector('.button-queue'),
  watchedBtn: document.querySelector('.button-watched'),
  librarylist: document.querySelector('.library-list'),
};

if (refs.watchedBtn) {
  refs.watchedBtn.addEventListener('click', createWatchedList);
}

if (refs.queueBtn) {
  refs.queueBtn.addEventListener('click', createQueueList);
}

function createWatchedList() {
  refs.watchedBtn.classList.add('current');
  refs.queueBtn.classList.remove('current');

  refs.librarylist.innerHTML = '';
  refs.librarylist.insertAdjacentHTML('beforeend', getFilmWatched());
}

function createQueueList() {
  refs.queueBtn.classList.add('current');
  refs.watchedBtn.classList.remove('current');
}

function getFilmWatched() {
  const savedFilm = localStorage.getItem('add-to-watch');
  if (!savedFilm) {
    console.log('no movie');
    return ` <div class="empty-wrapp">
    <p class="empty-text">
      No movies added. Select a movie on the
      main page
    </p>
  </div>`;
  }
  console.log('savedFilm:', savedFilm);

  const parseFilm = JSON.parse(savedFilm);
  console.log('parseFilm:', parseFilm);

  libraryMarkup(parseFilm);
}

function libraryMarkup(parseFilm) {
  const markup = parseFilm
    .map(film => {
      console.log(film.poster_path);
      return `<li class="film-card" data-id="${film.id}">
        
          <picture class="film-card__img">
          ${
            film.poster_path
              ? `<source
              srcset="{prePoster}${film.poster_path}"
              loading="lazy"
              media="(min-width: 1280px)"
            />
            <source
              srcset="{prePoster}${film.poster_path}"
              loading="lazy"
              media="(min-width: 768px)"
            />
            <source
              srcset="{prePoster}${film.poster_path}"
              loading="lazy"
              media="(min-width: 320px)"
            />
            <img
              class="film-card__img film-img"
              src="{prePoster}${film.poster_path}"
              alt="Poster for the film"
              width="395"
            />`
              : `            <source
              srcset="{noImageURL}"
              loading="lazy"
              media="(min-width: 1280px)"
            />
            <source
              srcset="{noImageURL}"
              loading="lazy"
              media="(min-width: 768px)"
            />
            <source
              srcset="{noImageURL}"
              loading="lazy"
              media="(min-width: 320px)"
            />
            <img
              class="film-card__img film-img"
              src="{noImageURL}"
              alt="Poster for the film"
              width="395"
            />`
          }

          </picture>
          <h3 class="film-card__title">${film.title}</h3>
          <div class="film-card_info-container">
            <ul class="film-card__caption">
              <li class="film-card__genre">${film.genre_ids.join(', ')}</li>
              <li class="film-card__date">${film.release_date.slice(0, 4)}</li>
            </ul>
          </div>
        
      </li>`;
    })
    .join('');
  return markup;
}
