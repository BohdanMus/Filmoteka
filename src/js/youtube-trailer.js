
import axios from 'axios';
import { Notify } from 'notiflix';
import {BASE_URL, USER_KEY} from "./API"

const gallery = document.querySelector('.gallery-list');
// const trailerContainer = document.querySelector('.trailer-container');
// trailerButton.addEventListener('click', getMovieTrailer);
// gallery.addEventListener('click', getMovieId);

export async function getMovieTrailer(movieID) {
  try {
    const response = await axios.get(
      `${BASE_URL}/movie/${movieID}/videos?api_key=${USER_KEY}`
    );

    const videos = response.data.results;
    console.log(videos);
    const trailerKey = videos.find(video => video.type === 'Trailer')?.key;
    if (trailerKey) {
      renderVideoFrame(trailerKey);
    } else {
      Notify.info('Sorry, trailer not found!');
    }
  } catch (error) {
    console.error(error);
  }
}


function renderVideoFrame(trailerKey) {
  const iframe = document.createElement('iframe');
  iframe.src = `https://www.youtube.com/embed/${trailerKey}`;
  iframe.width = '500';
  iframe.height = '315';
  iframe.allowFullscreen = true;
   const trailerContainer = document.querySelector('.trailerContainer')
  trailerContainer.innerHTML = '';
  trailerContainer.appendChild(iframe);
}