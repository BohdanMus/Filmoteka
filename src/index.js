
import { getGenres, genresArray } from './js/genres';
import { galleryRender } from './js/trending';

async function galleryRender() {
  const results = await fetchMovies();

  const markup = results.results
    .map(
      ({
        poster_path,
        original_title,
        name,
        genre_ids,
        release_date = '',
        first_air_date = '',
      }) => {
        const movieName = original_title ? original_title : name;
        const date = release_date
          ? release_date.slice(0, 4)
          : first_air_date.slice(0, 4);
        const genres = getGenres(genre_ids);
        return `<li class="gallery-item list"><img src="${prePoster}${poster_path}" class = "item-backdrop"/><div class="card><h2 class="card-title">${movieName}</h2><div class="sub-card"><p class="card-genres">${genres}</p><p>${date}</p></div></div></li>
              `;
      }
    )
    .join('');
  galleryEl.insertAdjacentHTML('beforeend', markup);
}

galleryRender();
import { showSpinner, hideSpinner } from './js/spinner';

