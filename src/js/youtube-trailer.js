import axios from 'axios';
import { Notify } from 'notiflix';
import { movieId, trailerContainer } from './open-modal';

const BASE_URL = 'https://api.themoviedb.org/3';
const USER_KEY = '9e4f0ad78cbe1148a9d4c0c8389afc83';
const movieId = '';
export let trailerKey = '';
let trailerContainer;
// console.log(trailerContainer);

const gallery = document.querySelector('.gallery-list');
// const trailerContainer = document.querySelector('.trailer-container');
// trailerButton.addEventListener('click', getMovieTrailer);
// gallery.addEventListener('click', getMovieId);

export async function getMovieTrailer() {
  try {
    const response = await axios.get(
      `${BASE_URL}/movie/${movieId}/videos?api_key=${USER_KEY}`
    );

    const videos = response.data.results;
    console.log(videos);
    trailerKey = videos.find(video => video.type === 'Trailer')?.key;
    if (videos.length > 0) {
      renderVideoFrame;
    } else {
      Notify.info('Sorry, trailer not found!');
    }
  } catch (error) {
    console.error(error);
  }
}

// function getMovieId(event) {
//   trailerContainer.innerHTML = '';

//   const movie = event.target.closest('li');
//   const movieId = movie.dataset.id;
//   console.log(movieId);
//   getMovieTrailer;
// }

function renderVideoFrame() {
  const iframe = document.createElement('iframe');
  iframe.src = `https://www.youtube.com/embed/${trailerKey}`;
  iframe.width = '500';
  iframe.height = '315';
  iframe.allowFullscreen = true;

  trailerContainer.innerHTML = '';
  trailerContainer.appendChild(iframe);
}
