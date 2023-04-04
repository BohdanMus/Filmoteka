import Pagination from 'tui-pagination';
import 'tui-pagination/dist/tui-pagination.css';
import { galleryRender } from './trending';
import { fetchMovies, prePoster, galleryEl } from './API';

export const paginationEl = document.querySelector('.tui-pagination');

const options = {
  totalItems: 500,
  itemsPerPage: 20,
  visiblePages: 5,
  page: 1,
  centerAlign: true,
  firstItemClassName: 'tui-first-child',
  lastItemClassName: 'tui-last-child',
  usageStatistics: false,
  template: {
    page: '<a href="#" class="tui-page-btn">{{page}}</a>',
    currentPage:
      '<strong class="tui-page-btn tui-is-selected">{{page}}</strong>',
    moveButton:
      '<a href="#" class="tui-page-btn tui-{{type}}">' +
      '<span class="tui-ico-{{type}}">{{type}}</span>' +
      '</a>',
    disabledMoveButton:
      '<span class="tui-page-btn tui-is-disabled tui-{{type}}">' +
      '<span class="tui-ico-{{type}}">{{type}}</span>' +
      '</span>',
    moreButton:
      '<a href="#" class="tui-page-btn tui-{{type}}-is-ellip">' +
      '<span class="tui-ico-ellip">...</span>' +
      '</a>',
  },
};

paginationEl.classList.add('visually-hidden');
export const pagination = new Pagination('pagination', options);

export const page = pagination.getCurrentPage();
pagination.on('beforeMove', onPage);

function onPage(event) {
  const currentPage = event.page;
  galleryEl.innerHTML = '';
  galleryRender(currentPage);
}
