import axios from 'axios';
import { Notify } from 'notiflix';

const BASE_URL = 'https://api.themoviedb.org/3';
const USER_KEY = '9e4f0ad78cbe1148a9d4c0c8389afc83';

let trailerKey = '';

const gallery = document.querySelector('.gallery-list');
const trailerButton = document.querySelector('.trailer');
const trailerContainer = document.querySelector('.trailer-container');

trailerButton.addEventListener('click', getMovieTrailer);
gallery.addEventListener('click', getMovieId);

async function getMovieTrailer(movieId) {
  try {
    const response = await axios.get(
      `${BASE_URL}/movie/${movieId}/videos?api_key=${USER_KEY}`
    );

    const videos = response.data.results;
    console.log(videos);
    trailerKey = videos.find(video => video.type === 'Trailer')?.key;
    if (videos.length > 0) {
      renderVideoFrame();
    } else {
      Notify.info('Sorry, trailer not found!');
    }
  } catch (error) {
    console.error(error);
  }
}

function getMovieId(event) {
  trailerContainer.innerHTML = '';

  const movie = event.target.closest('li');
  const movieId = movie.dataset.id;
  console.log(movieId);
  getMovieTrailer(movieId);
}

function renderVideoFrame() {
  const iframe = document.createElement('iframe');
  iframe.src = `https://www.youtube.com/embed/${trailerKey}`;
  iframe.width = '560';
  iframe.height = '315';
  iframe.allowFullscreen = true;

  trailerContainer.innerHTML = '';
  trailerContainer.appendChild(iframe);
}
