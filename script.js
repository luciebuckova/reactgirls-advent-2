const API_URL =
  'https://api.themoviedb.org/3/discover/movie?&page=1&sort_by=popularity.desc&api_key=6c3cf8b7266b7efd0fb0cc854e1578bc';

const IMG_PATH = 'https://image.tmdb.org/t/p/w1280';

const SEARCH_API =
  'https://api.themoviedb.org/3/search/movie?api_key=6c3cf8b7266b7efd0fb0cc854e1578bc&query="';

const main = document.getElementById('main');
const search = document.getElementById('search');

// Get initial movies

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
    movieEl.classList.add('movie');

    movieEl.innerHTML = `<img onClick="getMovie(${id})" src="${
      IMG_PATH + poster_path
    }" alt="${title}">`;
    main.appendChild(movieEl);
  });
}

async function getMovie(id) {
  const movieDetailsURL = `https://api.themoviedb.org/3/movie/${id}?api_key=6c3cf8b7266b7efd0fb0cc854e1578bc`;

  try {
    const response = await fetch(movieDetailsURL);
    const movieDetails = await response.json();

    // Extract relevant information from movieDetails and display it on the page
    const { title, overview, release_date, vote_average, poster_path } =
      movieDetails;

    main.innerHTML = `
      <div class="movie-info">
      <div>
      <img onClick="getMovie(${id})" src="${
      IMG_PATH + poster_path
    }" alt="${title}">
    </div>
    <div>
      <h2>${title}</h2>
      <p>${overview}</p>
      <p>Release Date: ${release_date}</p>
      <p>Vote Average: ${vote_average}</p>
      <button onClick="goToHome()">Back to Home</button>
      </div>
      </div>  
    `;
    main.classList.add('one-movie');
  } catch (error) {
    console.error('Error fetching movie details:', error);
    // Handle the error or provide feedback to the user
  }
}

function goToHome() {
  window.location.reload(); // You can adjust this based on your actual home screen logic
}

search.addEventListener('input', () => {
  const searchTerm = search.value;

  if (searchTerm && searchTerm !== '') {
    getMovies(SEARCH_API + searchTerm);
  } else {
    window.location.reload();
  }
});
