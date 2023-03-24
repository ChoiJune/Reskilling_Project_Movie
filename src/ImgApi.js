export async function getMovieImages(movieId) {
  const API_KEY = "0ba75f8c15f366b3d16d707236c773db";
  const imgURL = "https://image.tmdb.org/t/p/original/";

  const response = await fetch(
    `https://api.themoviedb.org/3/movie/${movieId}/images?api_key=${API_KEY}`
  );

  const result = await response.json();
  const posterPath = result.posters[0]?.file_path || "";
  return `${imgURL}${posterPath}`;
}
