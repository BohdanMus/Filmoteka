const refs = {
  queueBtn: document.querySelector('.button-queue'),
  watchedBtn: document.querySelector('.button-watched'),
  librarylist: document.querySelector('.library-list'),
};

const noImageURL = new URL('/src/images/no-foto.jpg', import.meta.url);

createQueueList();
createWatchedList();

refs.watchedBtn.addEventListener('click', createWatchedList);
refs.queueBtn.addEventListener('click', createQueueList);

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
      <img class="film-img" src="../images/projector.jpg" alt="hands"/>
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
      <img class="film-img" src="/src/images/projector.jpg" alt="" />
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
      return `<li class="film-card" data-id="${film.id}"> <img
//               class="film-card__img film-img"
//               src="${noImageURL}"
//               alt="Poster for the film"
//               width="395"
//             /></li>`;
    })
    .join('');

  refs.librarylist.innerHTML = markup;
  return markup;
}

// if (refs.watchedBtn) {
//   refs.watchedBtn.addEventListener('click', createWatchedList);
// }

// if (refs.queueBtn) {
//   refs.queueBtn.addEventListener('click', createQueueList);
// }

// function createWatchedList() {
//   refs.librarylist.innerHTML = '';
//   refs.librarylist.insertAdjacentHTML('beforeend', getFilmWatched());
// }

// function createQueueList() {
//   refs.librarylist.innerHTML = '';
//   refs.librarylist.insertAdjacentHTML('beforeend', getFilmQueue());
// }

// function getFilmWatched() {
//   const savedFilm = localStorage.getItem('addToWatched');
//   if (!savedFilm) {
//     console.log('no movie');
//     return ` <div class="empty-wrapp">
//     <p class="empty-text">
//       No movies added. Select a movie on the
//       <a href="${homepage} "class="homepage">Home</a> page
//     </p>
//   </div>`;
//   }
//   console.log('savedFilm:', savedFilm);

//   const parseFilm = JSON.parse(savedFilm);
//   console.log('parseFilm:', parseFilm);

//     libraryMarkup();
// }

// function getFilmQueue() {
//   const savedFilm = localStorage.getItem('addToQueue');
//   if (!savedFilm) {
//     console.log('no movie');
//     return ` <div class="empty-wrapp">
//     <p class="empty-text">
//       No movies added. Select a movie on the
//       <a href="${homepage} "class="homepage">Home</a> page
//     </p>
//   </div>`;
//   }
//   console.log('savedFilm:', savedFilm);

//   const parseFilm = JSON.parse(savedFilm);
//   console.log('parseFilm:', parseFilm);

//     libraryMarkup();
// }

// function libraryMarkup(parseFilm) {
//   const markup = parseFilm
//     .map(film => {
//       console.log(film.title);
//       return `<li class="film-card" data-id="${film.id}">

//           <picture class="film-card__img">
//           ${
//             film.poster_path
//               ? `<source
//               srcset="{prePoster}${film.poster_path}"
//               loading="lazy"
//               media="(min-width: 1280px)"
//             />
//             <source
//               srcset="{prePoster}${film.poster_path}"
//               loading="lazy"
//               media="(min-width: 768px)"
//             />
//             <source
//               srcset="{prePoster}${film.poster_path}"
//               loading="lazy"
//               media="(min-width: 320px)"
//             />
//             <img
//               class="film-card__img film-img"
//               src="{prePoster}${film.poster_path}"
//               alt="Poster for the film"
//               width="395"
//             />`
//               : `            <source
//               srcset="{noImageURL}"
//               loading="lazy"
//               media="(min-width: 1280px)"
//             />
//             <source
//               srcset="{noImageURL}"
//               loading="lazy"
//               media="(min-width: 768px)"
//             />
//             <source
//               srcset="{noImageURL}"
//               loading="lazy"
//               media="(min-width: 320px)"
//             />
//             <img
//               class="film-card__img film-img"
//               src="{noImageURL}"
//               alt="Poster for the film"
//               width="395"
//             />`
//           }
//           </picture>
//           <h3 class="film-card__title">${film.title}</h3>
//           <div class="film-card_info-container">
//             <ul class="film-card__caption">
//               <li class="film-card__genre">${film.genre_ids.join(', ')}</li>
//               <li class="film-card__date">${film.release_date.slice(0, 4)}</li>
//             </ul>
//           </div>

//       </li>`;
//     })
//     .join('');

//   return markup;
// }
