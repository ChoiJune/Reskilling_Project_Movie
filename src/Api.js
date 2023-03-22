export async function getMovies({
  order = "release_date.desc",
  page = 1,
  search = "",
}) {
  const API_KEY = "0ba75f8c15f366b3d16d707236c773db";
  let queryString = `&order=${order}&page=${page}`;
  if (search !== "") {
    queryString += `&query=${search}`;
  } else {
    queryString += "&discover=true";
  }
  const response = await fetch(
    `https://api.themoviedb.org/3/${
      search !== "" ? "search" : "discover"
    }/movie?api_key=${API_KEY}&language=ko&include_adult=false&include_video=false${queryString}`
  );
  const result = await response.json();
  return result;
}
