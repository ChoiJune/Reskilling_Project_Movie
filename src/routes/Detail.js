import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { getMovieImages } from "../ImgApi";
import { getMovieDetails } from "../DetailApi";
import styles from "./Detail.module.css";
import Rating from "../components/Rating";

function Detail() {
  const { id } = useParams();
  const imgURL = "https://image.tmdb.org/t/p/original/";
  const API_KEY = "0ba75f8c15f366b3d16d707236c773db";

  const [movie, setMovie] = useState({});
  const [imgSrc, setImgSrc] = useState("");
  const [genres, setGenres] = useState([]);

  useEffect(() => {
    async function fetchData() {
      const movieData = await getMovieDetails(id);
      const posterPath = await getMovieImages(id);
      setMovie(movieData);
      setImgSrc(posterPath);

      const genreList = await Promise.all(
        movieData.genres.map(async (genre) => {
          const response = await fetch(
            `https://api.themoviedb.org/3/genre/movie/list?api_key=${API_KEY}&language=ko`
          );
          const result = await response.json();
          const genreData = result.genres.find((g) => g.id === genre.id);
          return genreData.name;
        })
      );
      setGenres(genreList);
    }
    fetchData();
  }, [id]);

  return (
    <div className={styles.background}>
      <img
        src={`${imgURL}${movie.backdrop_path}`}
        alt="background"
        className={styles.backgroundImage}
      />
      <div className={styles.overlay}>
        <div className={styles.container}>
          <div className={styles.detail}>
            <img src={imgSrc} alt="poster" className={styles.images} />
            <div>
              <h1>{movie.title}</h1>
              <div className={styles.inline}>
                <p className={styles.padding}>{movie.release_date} </p>
                <p className={styles.padding}>개봉</p>
              </div>
              <div className={styles.inline}>
                <p className={styles.padding}>{genres.join(", ")}</p>
              </div>
              <hr />
              <div className={styles.overview}>
                <div>
                  <h4>[줄거리]</h4>
                  <h4>{movie.overview}</h4>
                </div>
              </div>
              <hr />
              <div className={styles.vote}>
                <div className={styles.inline}>
                  <p className={styles.padding}>관람객 평점</p>
                  <Rating
                    className={styles.padding}
                    value={Math.round(Number(movie.vote_average) / 2)}
                  />
                  <h4 className={styles.padding}>
                    {Number(movie.vote_average).toFixed(2)}
                  </h4>
                </div>
                <div className={styles.like_box}>
                  <div className={styles.inline}>
                    <p className={styles.padding}>💗</p>
                    <p className={(styles.alignRight, styles.padding)}>
                      {movie.vote_count}
                    </p>
                  </div>
                </div>
              </div>
              <div className={styles.producnlan}>
                <div>
                  <p className={styles.padding}>언어</p>
                  <ul>
                    {movie.spoken_languages?.map((lang) => (
                      <li key={lang.iso_639_1}>
                        {lang.english_name}({lang.name})
                      </li>
                    ))}
                  </ul>
                </div>
                <div>
                  <p className={styles.padding}>제작</p>
                  <ul>
                    {movie.production_companies?.map((company) => (
                      <li key={company.id}>{company.name}</li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Detail;
