import { Link } from "react-router-dom";
import styles from "./Movie.module.css";
import { getMovieImages } from "../ImgApi";
import { useEffect, useState } from "react";
import best from "../images/best.png";

function Movie({
  backdropPath,
  title,
  id,
  overview,
  voteAverage,
  releaseDate,
  voteCount,
}) {
  const imgURL = "https://image.tmdb.org/t/p/original/";

  const [posterPath, setPosterPath] = useState("");
  useEffect(() => {
    async function fetchData() {
      const path = await getMovieImages(id);
      setPosterPath(path);
    }
    fetchData();
  }, [id]);

  return (
    <div className={styles.movie}>
      <img
        src={posterPath !== "" ? posterPath : `${imgURL}${backdropPath}`}
        alt={title}
        className={styles.movie__img}
      />
      <div>
        <h2 className={styles.movie__title}>
          <Link to={`/movie/${id}`}>{title}</Link>
        </h2>
        <h3 className={styles.movie__date}>{releaseDate}</h3>
        <p>
          {overview.length > 160 ? `${overview.slice(0, 160)} ...` : overview}
        </p>
        {Number(voteAverage) >= 8 ? (
          <div className={styles.best}>
            <p className={styles.movie__best}>평점 : {voteAverage}</p>
            <img src={best} alt="Best" className={styles.bestlogo} />
          </div>
        ) : (
          <p className={styles.movie__vote}>평점 : {voteAverage}</p>
        )}
        <p className={styles.movie__vote}>추천수 : {voteCount}</p>
      </div>
    </div>
  );
}

export default Movie;
