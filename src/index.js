import { getGenres, genresArray } from './js/genres';
import { galleryRender } from './js/trending';
import { page } from './js/pagination';
import { showSpinner, hideSpinner } from './js/spinner';
import { onSearchMovieBtnClick } from './js/search-by-keyword';

const refs = {
  formRef: document.querySelector('.header-search-form'),
};

galleryRender(page);

refs.formRef.addEventListener('submit', onSearchMovieBtnClick);
