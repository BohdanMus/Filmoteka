// <form class="search-form" id="search-form">
//   <input
//     type="text"
//     name="searchQuery"
//     autocomplete="off"
//     placeholder="Search images..."
//   />
//   <button type="submit">Search</button>
// </form>

// <div id="tui-pagination-container" class="tui-pagination"></div>
//------------------------------------------------------------------------------------------------
import axios from 'axios';
const BASE_URL = 'https://api.themoviedb.org/3';
const USER_KEY = '9e4f0ad78cbe1148a9d4c0c8389afc83';
export const prePoster = 'https://image.tmdb.org/t/p/original/';
export const galleryEl = document.querySelector('.gallery-list');
//------------------------------------------------------------------------------------------------
import Pagination from 'tui-pagination';

const refs = {
  formRef: document.getElementById('search-form'),
  galleryRef: document.querySelector('.gallery'),
};

refs.formRef.addEventListener('submit', onSubmitBtn);

const container = document.getElementById('tui-pagination-container');

function onSubmitBtn(e) {
  e.preventDefault();
  const keyWord = e.target.elements.searchQuery.value.trim();

  // getMovieByName(keyWord);
  getMovie(keyWord).then(data => {
    // по даті 0 малюєм пагінацію
    const instance = new Pagination(container, {
      totalItems: data[0],
      itemsPerPage: 20,
      visiblePages: 5,
    });

    refs.galleryRef.insertAdjacentHTML('beforeend', galleryMarkup(data[1]));
    // по даті 1 малюєм картку
    console.log('масив на 1й сторінці', data[1]);

    // слухач на пагінацію
    instance.on('beforeMove', event => {
      const currentPage = event.page;

      // робимо запит мо тому самому keyWord тільки змінюємо сторінки
      getMovie(keyWord, currentPage).then(data => {
        console.log('масив на вибраній сторінці', data);
      });
    });
  });
}

async function getMovie(name, page = 1) {
  try {
    // Створюєм запит по ключовому слову на сервер
    const movies = await axios.get(
      `${BASE_URL}/search/movie?api_key=$USER_KEY}&language=en-US&page=${page}&include_adult=false&query=${name}`
    );

    // Створюєм запит на сервер для отримання всіх жанрів
    const genres = await axios.get(
      `${BACE_URL}//genre/movie/list?api_key=${USER_KEY}&language=en-US`
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

    // console.log('мап', updatedMovies);
    console.log('чистий бекенд', movies.data);
    console.log('масив з кінами', movieArr);
    console.log('масив з жанрами', genresArr);

    // Якщо це перший пошук - повертаємо кількість знайдених результатів та оновлений масив в фільмами для 1ї сторінки
    if (page === 1) {
      return [movies.data.total_results, updatedMovies];
    }
    // Якщо запит по пагінації - повертаємо тільки масив з фільмами для конкретної сторінки
    else {
      return updatedMovies;
    }
  } catch (error) {
    console.error(error);
  }
}

function galleryMarkup(data) {
  const dataMarkup = data
    .map(item => {
      return `<li class="gallery-item list">
                <img src="https://image.tmdb.org/t/p/original/${item.poster_path}" class = "item-backdrop"/>
                <div class="card>
                  <h2 class="card-title">${movieName}</h2>
                  <div class="sub-card">
                    <p class="card-genres">${genres}</p>
                    <p>${date}</p>
                  </div>
                </div>
              </li>`;
    })
    .join('');

  return dataMarkup;
}
