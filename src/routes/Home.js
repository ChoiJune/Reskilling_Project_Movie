import { useEffect, useState } from "react";
import Movie from "../components/Movie";
import styles from "./Home.module.css";
import { getMovies } from "../Api";

const LIMIT = 6;

function Homepage() {
  const [loading, setLoading] = useState(true);
  const [order, setOrder] = useState("createdAt");
  const [offset, setOffset] = useState(0);
  const [items, setItems] = useState([]);
  const [loadingError, setLoadingError] = useState(null);
  const [hasNext, setHasNext] = useState(false);
  const [search, setSearch] = useState("");
  const sortedItems = items.sort((a, b) => b[order] - a[order]);

  const handleNewestClick = () => setOrder("release_date");

  const handleBestClick = () => setOrder("vote_average");

  /*   const handleDelete = (id) => {
    const nextItems = items.filter((item) => item.id !== id);
    setItems(nextItems);
  }; */

  const handleLoad = async (options) => {
    let result;
    try {
      setLoadingError(null);
      setLoading(true);
      result = await getMovies(options);
    } catch (error) {
      setLoadingError(error);
      return;
    } finally {
      setLoading(false);
    }

    const { paging, results } = result;
    if (options.offset === 0) {
      setItems(results);
    } else {
      setItems((prevItems) => [...prevItems, ...results]);
    }
    setOffset(options.offset + options.limit);
    setHasNext(paging.hasNext);
  };

  const handleLoadMore = async () => {
    await handleLoad({ order, offset, limit: LIMIT, search });
  };

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    setSearch(e.target["search"].value);
  };

  useEffect(() => {
    handleLoad({ order, offset: 0, limit: LIMIT, search });
  }, [order, search]);

  return (
    <div>
      <div>
        <button onClick={handleNewestClick}>최신순</button>
        <button onClick={handleBestClick}>베스트순</button>
      </div>
      <form onSubmit={handleSearchSubmit} className={styles.option}>
        <input placeholder="Search Movie" />
        <button type="submit">검색</button>
      </form>
      <div className={styles.container}>
        {loading ? (
          <div className={styles.loader}>
            <span>Loading...</span>
          </div>
        ) : (
          <div className={styles.movies}>
            {items.map((results) => (
              <Movie
                items={sortedItems}
                id={results.id}
                overview={results.overview}
                backdropPath={results.backdrop_path}
                title={results.title}
                voteAverage={results.vote_average}
                releaseDate={results.release_date}
                voteCount={results.vote_count}
              />
            ))}
            {hasNext && (
              <button disabled={loading} onClick={handleLoadMore}>
                더 보기
              </button>
            )}
            {loadingError?.message && <span>{loadingError.message}</span>}
          </div>
        )}
      </div>
    </div>
  );
}

export default Homepage;
