import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import styles from "./Movie.module.css";

function Movie({
  backdropPath,
  title,
  id,
  overview,
  voteAverage,
  releaseDate,
  voteCount,
}) {
  return (
    <div className={styles.movie}>
      <img
        src={`https://image.tmdb.org/t/p/original/${backdropPath}`}
        alt={title}
        className={styles.movie__img}
      />
      <div>
        <h2 className={styles.movie__title}>
          <Link to={`/movie/${id}`}>{title}</Link>
        </h2>
        <h3 className={styles.movie__date}>{releaseDate}</h3>
        <p>{overview}</p>
        <p className={styles.movie__vote}>평점 : {voteAverage}</p>
        <p className={styles.movie__vote}>추천수 : {voteCount}</p>
      </div>
    </div>
  );
}

export default Movie;
