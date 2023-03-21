export async function getMovies({
  order = "release_date",
  search = "",
  offset = 0,
  limit = 10,
}) {
  const query = `order=${order}&offset=${offset}&limit=${limit}&search=${search}`;
  const response = await fetch(
    `https://api.themoviedb.org/3/discover/movie?api_key=0ba75f8c15f366b3d16d707236c773db&language=ko&sort_by=popularity.desc&include_adult=false&include_video=false&page=1&with_watch_monetization_types=flatrate${query}`
  );
  if (!response.ok) {
    throw new Error("영화정보를 불러오는데 실패했습니다.");
  }

  const result = await response.json();
  return result;
}
