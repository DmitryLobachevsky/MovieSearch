/* eslint-disable func-names */
/* eslint-disable no-undef */
/* eslint-disable no-use-before-define */
/* eslint-disable linebreak-style */
/* eslint-disable no-shadow */
// init Value
const API_KEY = '&apikey=efc4ed08&';
const url = 'https://www.omdbapi.com/?s=';
const buttonElement = document.querySelector('#search');
const inputElement = document.querySelector('#inputValue');
const movieSearchable = document.querySelector('#movie-searchable');
const clearInput = document.querySelector('#clearInput');

function movieSection(movies) {
  return movies.map((movie) => {
    if (movie.Poster === 'N/A') {
      return `
            <section id='card_section'>
            <h4 class="movie-title" id=${movie.imdbID}>${movie.Title}</h4>
            <img src = ${'no_Poster.png'}>
            <h4 id="card_year">${movie.Year}</h4>
            </section>`;
    }

    return `
            <section id='card_section'>
            <h4 class="movie-title" id=${movie.imdbID}>${movie.Title}</h4>
            <img src = ${movie.Poster}>
            <h4 id="card_year">${movie.Year}</h4>
            </section>`;
  });
}

function requestMovies(url, onConplete, onError) {
  fetch(url)
    .then((res) => res.json())
    .then(onConplete)
    .catch(onError);
}

function searchMovie(value) {
  const newUrl = url + value + API_KEY;
  requestMovies(newUrl, renderSearchMovies, handleError);
}

function handleError(error) {
  console.log('Error:', error);
}


function createMovieContainer(movies) {
  const movieElement = document.createElement('div');
  movieElement.setAttribute('class', 'movie');


  const movieTemplate = `
        <section class = "section">
            ${movieSection(movies)}
        </section>
    `;

  movieElement.innerHTML = movieTemplate;
  return movieElement;
}

function renderSearchMovies(data) {
  movieSearchable.innerHTML = '';
  const movies = data.Search;
  const movieBlock = createMovieContainer(movies);
  movieSearchable.appendChild(movieBlock);
}

buttonElement.onclick = function (event) {
  event.preventDefault();
  const { value } = inputElement;

  searchMovie(value);
};

clearInput.onclick = function (event) {
  event.preventDefault();
  const search = document.getElementById('inputValue');
  search.value = '';
  setFocus();
};

document.onclick = function (event) {
  const { target } = event;

  if (target.tagName.toLowerCase() === 'h4') {
    const movieId = event.target.id;
    // eslint-disable-next-line no-restricted-globals
    window.open(`https://www.imdb.com/title/${movieId}`);
  }
};

searchMovie('Spider');

function setFocus() {
  document.getElementById('inputValue').focus();
}
setFocus();
