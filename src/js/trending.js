import { genresArray, getGenres } from './genres';
import { fetchMovies, prePoster, galleryEl } from './API';
import { noImageURL } from './search-by-keyword';

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
        return `<li class="film-card" data-id="${id}">
        <a href="" class="film-card_link">
          <picture class="film-card__img">
          ${
            poster_path
              ? `<source
              srcset="${prePoster}${poster_path}"
              loading="lazy"
              media="(min-width: 1280px)"
            />
            <source
              srcset="${prePoster}${poster_path}"
              loading="lazy"
              media="(min-width: 768px)"
            />
            <source
              srcset="${prePoster}${poster_path}"
              loading="lazy"
              media="(min-width: 320px)"
            />
            <img
              class="film-card__img film-img"
              src="${prePoster}${poster_path}"
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
          <h3 class="film-card__title">${movieName}</h3>
          <div class="film-card_info-container">
            <ul class="film-card__caption">
              <li class="film-card__genre">${genres}</li>
              <li class="film-card__date">${date}</li>
            </ul>
          </div>
        </a>
      </li>`;
      }
    )
    .join('');
  galleryEl.insertAdjacentHTML('beforeend', markup);
}
