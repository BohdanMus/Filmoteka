import axios from 'axios';
export const BASE_URL = 'https://api.themoviedb.org/3';
export const USER_KEY = '9e4f0ad78cbe1148a9d4c0c8389afc83';
const PARAMETERS_TRENDING = '/trending/all/day';
export const prePoster = 'https://image.tmdb.org/t/p/original/';
export const galleryEl = document.querySelector('.gallery-list');

export async function fetchMovies(page) {
  try {
    const { data } = await axios.get(
      `${BASE_URL}${PARAMETERS_TRENDING}?api_key=${USER_KEY}&page=${page}`
    );
    return data;
  } catch (error) {
    console.log(error.message);
  }
}
