import express from 'express';
import { engine } from 'express-handlebars';
import { loadAllMovies, loadMovie } from './movies.js';
import { kino } from './kinoBuilds.js';
import { marked } from 'marked';
import { loadMovieReviews, postNewReview } from './reviews.js';
import {
  getUpcomingScreenings,
  getUpcomingMovieScreenings,
} from './screenings.js';

const app = express();

app.engine(
  'handlebars',
  engine({
    helpers: {
      markdown: (md) => marked(md),
    },
  })
);
app.set('view engine', 'handlebars');
app.set('views', './templates');

app.get('/', async (request, response) => {
  response.render('index', { kino });
});
app.get('/index', async (request, response) => {
  response.render('index', { kino });
});

app.get('/movies', async (request, response) => {
  const movies = await loadAllMovies();
  response.render('allMovies', { movies, kino });
});

app.get('/movies/:Id', async (request, response) => {
  const movie = await loadMovie(request.params.Id);
  movie
    ? response.render('movie', { movie, kino })
    : response.status(404).render('404', { kino });
});

app.get('/api/movies/:id/reviews', async (request, response) => {
  const movieReviews = await loadMovieReviews(request.params.id);
  response.json(movieReviews);
});

app.get('/api/screenings', async (request, response) => {
  try {
    const screeningsData = await getUpcomingScreenings();
    const jsonObj = {
      data: screeningsData,
    };
    const jsonData = JSON.stringify(jsonObj);
    response.json(JSON.parse(jsonData));
  } catch (error) {
    console.log(error);
  }
});

app.get('/api/screenings/:id', async (request, response) => {
  const data = await getUpcomingMovieScreenings(request.params.id);
  response.json(data);
});

app.use(express.json());
app.post('/api/reviews', async (request, response) => {
  postNewReview(request.body);
  response.end()
});

app.use('/', express.static('./static'));

export default app;
