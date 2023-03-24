export async function getMovieDetails(movieId) {
  const API_KEY = "0ba75f8c15f366b3d16d707236c773db";
  const response = await fetch(
    `https://api.themoviedb.org/3/movie/${movieId}?api_key=${API_KEY}&language=ko`
  );
  const result = await response.json();
  return result;
}

export async function getMovieProduction(movieId) {
  const API_KEY = "0ba75f8c15f366b3d16d707236c773db";
  const response = await fetch(
    `https://api.themoviedb.org/3/movie/${movieId}/production_companies?api_key=${API_KEY}`
  );
  const result = await response.json();
  return result;
}

export async function getMovieLanguages(movieId) {
  const API_KEY = "0ba75f8c15f366b3d16d707236c773db";
  const response = await fetch(
    `https://api.themoviedb.org/3/movie/${movieId}?api_key=${API_KEY}&append_to_response=language`
  );
  const result = await response.json();
  return result.spoken_languages;
}
