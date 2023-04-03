export const galleryEl = document.querySelector('.gallery');
import { fetchMovies, prePoster, galleryEl } from './API';
import { fetchResult } from './trending';
galleryEl.addEventListener('click', onClick);

export function onClick(event) {
  event.preventDefault();

  if (event.currentTarget === event.target) {
    return;
  }
  const parent = event.target.closest('li');
  console.log(parent.dataset.id);
  console.log(fetchResult);
  return parent.dataset.id;
}
