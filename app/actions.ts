"use server";

import { Movie, Genre } from "../lib/types";

interface MovieResponse {
  results: Movie[];
}

interface GenreResponse {
  genres: Genre[];
}

const TMDB_BASE_URL = "https://api.themoviedb.org/3";
const HEADERS = {
  headers: {
    Authorization: `Bearer ${process.env.TMDB_API_READ_ACCESS_TOKEN}`,
  },
};

export async function getMovies(
  pageIndex = 1,
  airingNow = false
): Promise<Movie[]> {
  return airingNow ? getAiringMovies(pageIndex) : getPopularMovies(pageIndex);
}

async function fetchMoviesWithGenres(
  endpoint: string,
  pageIndex: number
): Promise<Movie[]> {
  try {
    const [moviesResponse, genresResponse] = await Promise.all([
      fetch(`${TMDB_BASE_URL}${endpoint}?page=${pageIndex}`, HEADERS),
      fetch(`${TMDB_BASE_URL}/genre/movie/list`, HEADERS),
    ]);

    const [movies, genresData] = await Promise.all([
      moviesResponse.json() as Promise<MovieResponse>,
      genresResponse.json() as Promise<GenreResponse>,
    ]);

    return enrichMoviesWithGenres(movies.results, genresData.genres);
  } catch (error) {
    console.error("Error fetching movies:", error);
    return [];
  }
}

function enrichMoviesWithGenres(movies: Movie[], genres: Genre[]): Movie[] {
  return movies.map((movie) => ({
    ...movie,
    genre: movie.genre_ids.map(
      (genreId) => genres.find((genre) => genre.id === genreId) as Genre
    ),
  }));
}

async function getAiringMovies(pageIndex: number): Promise<Movie[]> {
  return fetchMoviesWithGenres("/movie/now_playing", pageIndex);
}

async function getPopularMovies(pageIndex: number): Promise<Movie[]> {
  return fetchMoviesWithGenres("/discover/movie", pageIndex);
}
