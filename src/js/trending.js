import { genresArray, getGenres } from './genres';
import { fetchMovies, prePoster, galleryEl } from './API';

export async function galleryRender(page) {
  const results = await fetchMovies(page);

  const markup = results.results
    .map(
      ({
        id,
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
        return `<li class="gallery-item list" data-id="${id}"><img src="${prePoster}${poster_path}" class = "item-backdrop"/><div class="card"><h2 class="card-title">${movieName}</h2><div class="sub-card"><p class="card-genres">${genres}</p><p class = "date">${date}</p></div></div></li>
              `;
      }
    )
    .join('');
  galleryEl.insertAdjacentHTML('beforeend', markup);
}
