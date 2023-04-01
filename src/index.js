import { getGenres, genresArray } from './js/genres';
import { galleryRender } from './js/trending';
import { page } from './js/pagination';
import { showSpinner, hideSpinner } from './js/spinner';
import { onSearchMovieBtnClick } from './js/search-by-keyword';
import './js/scroll-up-btn';
import { onOpenModalTeamClick } from './js/team-modal';

const refs = {
  formRef: document.querySelector('.header-search-form'),
  openModalTeamBtn: document.getElementById('open-modal-btn'),
};

galleryRender(page);

// Запускає пошук фільмів зв ключовим словом
refs.formRef.addEventListener('submit', onSearchMovieBtnClick);

// Обробник події для відкриття модального вікна з командою
refs.openModalTeamBtn.addEventListener('click', onOpenModalTeamClick);
