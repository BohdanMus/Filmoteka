import axios from 'axios';
import 'tui-pagination/dist/tui-pagination.css';
import Pagination from 'tui-pagination';

const BASE_URL = 'https://api.themoviedb.org/3';
const USER_KEY = '9e4f0ad78cbe1148a9d4c0c8389afc83';
const prePoster = 'https://image.tmdb.org/t/p/original/';
const container = document.getElementById('pagination');
export const noImageURL = new URL('/src/images/no-foto.jpg', import.meta.url);
export let searchResult = []; //------------------------------------------------------------------------------
const refs = {
  formRef: document.querySelector('.header-search-form'),
  galleryRef: document.querySelector('.gallery-list'),
};

refs.formRef.addEventListener('submit', onSearchMovieBtnClick);

export function onSearchMovieBtnClick(e) {
  e.preventDefault();
  const keyWord = e.target.elements.search.value.trim();

  getMovie(keyWord).then(data => {
    searchResult = data; //----------------------------------------------------------------------------
    // Перевіряємо чи масив з фільмами не пустий
    if (data[1].length > 0) {
      // Очищуєм розмітку з популярними фільмами
      refs.galleryRef.innerHTML = '';

      // по data[0] малюєм пагінацію
      const instanceFind = new Pagination(container, {
        totalItems: data[0],
        itemsPerPage: 20,
        visiblePages: 5,
      });

      // по data[1] малюєм картку
      refs.galleryRef.insertAdjacentHTML('beforeend', galleryMarkup(data[1]));

      // console.log('масив на 1й сторінці', data[1]);

      // Вішаємо слухача на пагінацію
      instanceFind.on('beforeMove', event => {
        const currentPage = event.page;

        // Робимо запит по тому самому keyWord тільки змінюємо сторінки
        getMovie(keyWord, currentPage).then(data => {
          refs.galleryRef.innerHTML = '';
          refs.galleryRef.insertAdjacentHTML(
            'beforeend',
            galleryMarkup(data[1])
          );
          // console.log('масив на вибраній сторінці', data[1]);
        });
      });
    }
  });
}

async function getMovie(name, page = 1) {
  try {
    // Створюєм запит по ключовому слову на сервер
    const movies = await axios.get(
      `${BASE_URL}/search/movie?api_key=${USER_KEY}&language=en-US&page=${page}&include_adult=false&query=${name}`
    );

    // Створюєм запит на сервер для отримання всіх жанрів
    const genres = await axios.get(
      `${BASE_URL}//genre/movie/list?api_key=${USER_KEY}&language=en-US`
    );

    // Масиви з кінами та жанрами
    const movieArr = movies.data.results;
    const genresArr = genres.data.genres;

    // перебираємо масив фільмів, підставляємо в масив з жанрами замість чисел - відповідні їм жанри
    const updatedMovies = movieArr.map(movie => {
      const updatedGenreName = movie.genre_ids.map(genreId => {
        const genre = genresArr.find(genre => genre.id === genreId);
        return genre.name;
      });

      return {
        ...movie,
        genre_ids: updatedGenreName,
      };
    });

    // // console.log('мап', updatedMovies);
    // console.log('чистий бекенд', movies.data);
    // console.log('масив з кінами', movieArr);
    // console.log('масив з жанрами', genresArr);

    return [movies.data.total_results, updatedMovies];
  } catch (error) {
    console.error(error);
  }
}

function galleryMarkup(data) {
  const dataMarkup = data
    .map(item => {
      return `<li class="film-card" data-id="${item.id}">
          <picture class="film-card__img">
          ${
            item.poster_path
              ? `<source
              srcset="${prePoster}${item.poster_path}"
              loading="lazy"
              media="(min-width: 1280px)"
            />
            <source
              srcset="${prePoster}${item.poster_path}"
              loading="lazy"
              media="(min-width: 768px)"
            />
            <source
              srcset="${prePoster}${item.poster_path}"
              loading="lazy"
              media="(min-width: 320px)"
            />
            <img
              class="film-card__img film-img"
              src="${prePoster}${item.poster_path}"
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
          <h3 class="film-card__title">${item.title}</h3>
          <div class="film-card_info-container">
            <ul class="film-card__caption">
            ${
              item.genre_ids.length === 0
                ? `<li class="film-card__genre">Genre Unavailable</li>`
                : `<li class="film-card__genre">${item.genre_ids.join(
                    ', '
                  )}</li>`
            }
            ${
              item.release_date
                ? `<li class="film-card__date">${item.release_date.slice(
                    0,
                    4
                  )}</li>`
                : `<li class="film-card__genre">Date Unavailable</li>`
            }
            </ul>
          </div>
      </li>`;
    })
    .join('');

  return dataMarkup;
}
