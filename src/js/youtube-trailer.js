import axios from 'axios';

const apiKey = '9e4f0ad78cbe1148a9d4c0c8389afc83';
const movieId = '726759';

const trailerButton = document.querySelector('.trailer');
const trailerContainer = document.querySelector('.trailer-container');

trailerButton.addEventListener('click', async () => {
  try {
    const response = await axios.get(
      `https://api.themoviedb.org/3/movie/${movieId}/videos?api_key=${apiKey}`
    );

    const videos = response.data.results;
    console.log(videos);
    const trailerKey = videos.find(video => video.type === 'Trailer')?.key;

    const iframe = document.createElement('iframe');
    iframe.src = `https://www.youtube.com/embed/${trailerKey}`;
    iframe.width = '560';
    iframe.height = '315';
    iframe.allowFullscreen = true;

    trailerContainer.innerHTML = '';
    trailerContainer.appendChild(iframe);
  } catch (error) {
    console.error(error);
  }
});
