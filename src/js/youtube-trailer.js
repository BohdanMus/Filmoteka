import axios from 'axios';

const BASE_URL = 'https://api.themoviedb.org/3';
const USER_KEY = '9e4f0ad78cbe1148a9d4c0c8389afc83';
const movieId = '677179';
let trailerKey = '';

const trailerButton = document.querySelector('.trailer');
const trailerContainer = document.querySelector('.trailer-container');

trailerButton.addEventListener('click', getMovieTrailer);

async function getMovieTrailer() {
  try {
    const response = await axios.get(
      `${BASE_URL}/movie/${movieId}/videos?api_key=${USER_KEY}`
    );

    const videos = response.data.results;
    // console.log(videos);
    trailerKey = videos.find(video => video.type === 'Trailer')?.key;
    renderVideoFrame();
  } catch (error) {
    console.error(error);
  }
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
