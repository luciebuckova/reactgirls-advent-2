const API_URL =
  'https://api.themoviedb.org/3/movie/top_rated?language=en-US&page=1&api_key=6c3cf8b7266b7efd0fb0cc854e1578bc';

const IMG_PATH = 'https://image.tmdb.org/t/p/w1280';

const SEARCH_API =
  'https://api.themoviedb.org/3/search/movie?api_key=6c3cf8b7266b7efd0fb0cc854e1578bc&query="';

const main = document.querySelector('.main__content');
const search = document.getElementById('search');

getMovies(API_URL);

async function getMovies(url) {
  const res = await fetch(url);
  const data = await res.json();

  showMovies(data.results);
}

function showMovies(movies) {
  main.innerHTML = '';

  movies.forEach((movie) => {
    const { title, poster_path, id } = movie;

    const movieEl = document.createElement('div');
    movieEl.classList.add('movie__card');

    movieEl.innerHTML = `<img onClick="getMovie(${id})" src="${
      IMG_PATH + poster_path
    }" alt="${title}" class="movie__image">`;
    main.appendChild(movieEl);
  });
}

async function getMovie(id) {
  const movieDetailsURL = `https://api.themoviedb.org/3/movie/${id}?api_key=6c3cf8b7266b7efd0fb0cc854e1578bc`;

  try {
    const response = await fetch(movieDetailsURL);
    const movieDetails = await response.json();

    const { title, overview, release_date, vote_average, poster_path } =
      movieDetails;

    const releaseYear = new Date(release_date).getFullYear();
    const roundedVoteAverage = vote_average.toFixed(1);

    main.innerHTML = `
      <div class="movie-overview">
        <div class="movie-overview__image">
          <img onClick="getMovie(${id})" src="${
      IMG_PATH + poster_path
    }" alt="${title}">
    <div class="vote-flag">${roundedVoteAverage}</div>
        </div>
        <div class="movie-overview__text">
          <div>
            <p class="overview">${overview}</p>
            <p><span class="bold-text">Release Date:</span> ${releaseYear}</p>
          </div>
          <div><button class="movie-overview__btn" onClick="goToHome()">Back to Home</button></div>
        </div>
      </div>  
    `;

    const mainHeading = document.querySelector('.main__heading');
    if (mainHeading) {
      mainHeading.innerText = title;
    }

    main.classList.add('one-movie');
    search.style.display = 'none';
  } catch (error) {
    console.error('Error fetching movie details:', error);
  }
}

function goToHome() {
  window.location.reload();
}

search.addEventListener('input', () => {
  const searchTerm = search.value;

  if (searchTerm && searchTerm !== '') {
    getMovies(SEARCH_API + searchTerm);
  } else {
    window.location.reload();
  }
});
