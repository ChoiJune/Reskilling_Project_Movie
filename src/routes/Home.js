import { useEffect, useState } from "react";
import { getMovies } from "../Api";
import Movie from "../components/Movie";
import styles from "./Home.module.css";

function Home() {
  const [loading, setLoading] = useState(true);
  const [order, setOrder] = useState("release_date");
  const [page, setPage] = useState(1);
  const [items, setItems] = useState([]);
  const [search, setSearch] = useState("");

  const sortedItems = items.sort((a, b) => {
    if (order === "release_date") {
      return new Date(b.release_date) - new Date(a.release_date);
    } else if (order === "vote_average") {
      return b.vote_average - a.vote_average;
    } else if (order === "vote_count") {
      return b.vote_count - a.vote_count;
    } else {
      return 0;
    }
  });

  const handleNewestClick = () => setOrder("release_date");
  const handleBestClick = () => setOrder("vote_average");
  const handleBestCountClick = () => setOrder("vote_count");

  const handleLoad = async (options) => {
    setLoading(true);
    const { results } = await getMovies(options);
    if (options.page === 1) {
      setItems(results);
    } else {
      setItems((prevItems) => [...prevItems, ...results]);
    }
    setPage(options.page);
    setLoading(false);
  };

  const handleLoadMore = async () => {
    await handleLoad({ order, page: page + 1, search });
  };

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    const searchValue = e.target["search"].value.trim();
    if (searchValue !== "") {
      setSearch(searchValue);
      setItems([]);
      setPage(1);
      handleLoad({ order, page: 1, search: searchValue });
    } else {
      setSearch("");
      setItems([]);
      setPage(1);
      handleLoad({ order, page: 1, search: "" });
    }
  };

  useEffect(() => {
    handleLoad({ order, page: 1, search });
  }, [order, search]);

  return (
    <div>
      <div className={styles.topbar}>
        <div className={styles.sortnsearch}>
          <div className={styles.sort}>
            <a href="#none" onClick={handleNewestClick}>
              최신순
            </a>
            <a href="#none" onClick={handleBestClick}>
              평점순
            </a>
            <a href="#none" onClick={handleBestCountClick}>
              추천순
            </a>
          </div>
          <form onSubmit={handleSearchSubmit}>
            <input
              name="search"
              placeholder="Search Movie"
              className={styles.searchbar}
            />
            <button type="submit" className={styles.searchbutton}>
              검색
            </button>
          </form>
        </div>
      </div>
      <hr />
      <div className={styles.container}>
        {loading ? (
          <div className={styles.loader}>
            <span>Loading...</span>
          </div>
        ) : (
          <div className={styles.movies}>
            {sortedItems.map((result) => (
              <Movie
                id={result.id}
                key={result.id}
                overview={result.overview}
                backdropPath={result.backdrop_path}
                title={result.title}
                voteAverage={result.vote_average}
                releaseDate={result.release_date}
                voteCount={result.vote_count}
              />
            ))}
          </div>
        )}
      </div>
      <div className={styles.loadingmore}>
        {!loading && (
          <button className={styles.loadingbutton} onClick={handleLoadMore}>
            더 보기
          </button>
        )}
      </div>
    </div>
  );
}

export default Home;
