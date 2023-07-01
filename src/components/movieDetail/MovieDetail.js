import React, { useEffect, useState, useCallback } from "react";
import axios from "axios";
const MovieDetail = (props) => {
  const [movieDetail, setMovieDetail] = useState({});
  const [isError, setIsError] = useState(false);
  // console.log(props.data);
  const getDatas = useCallback(() => {
    axios
      .get(
        `https://api.themoviedb.org/3/movie/${props.data.id}/videos?api_key=${props.apiKey}&language=en-US`
      )
      .then((response) => {
        const movieFilter =
          response.data.results.find(
            (item) =>
              item.name === props.data.name ||
              item.site === "Youtube" ||
              item.type === "Trailer" ||
              item.type === "Teaser"
          ) ?? response.data.results[0];
        // console.log(movieFilter);
        setIsError(false);
        setMovieDetail(movieFilter);
      })
      .catch((error) => {
        if (error) {
          setIsError(true);
        } else {
          const movieFilter = props.data.results.find(
            (item) =>
              item.name === props.data.name ||
              (item.site === "Youtube" &&
                (item.type === "Trailer" || item.type === "Teaser"))
          );
          // console.log(movieFilter);
          setIsError(false);
          setMovieDetail(movieFilter);
        }
      });
  }, [props]);

  useEffect(() => {
    getDatas();
  }, [getDatas]);
  return (
    <div className="container">
      <div className="row">
        <div className="col-6 movie-detail-content text-light">
          <h3>{props.data.title ?? props.data.name}</h3>
          <hr />
          <p>{props.data.release_date ?? props.data.first_air_date}</p>
          <p>Vote: {props.data.vote_average} / 10</p>
          <p>{props.data.overview}</p>
        </div>
        <div className="col-6 movie-detail-trailer">
          {isError && (
            <img
              height="400"
              width="100%"
              src={`http://image.tmdb.org/t/p/w500${
                props.data.backdrop_path ?? props.data.poster_path
              }`}
              alt=""
            />
          )}
          {!isError &&
            (movieDetail ? (
              <iframe
                height="400"
                width="100%"
                title={movieDetail.id}
                src={`https://www.youtube.com/embed/${movieDetail.key}`}
              ></iframe>
            ) : (
              <img
                height="400"
                width="100%"
                src={`http://image.tmdb.org/t/p/w500${
                  props.data.backdrop_path ?? props.data.poster_path
                }`}
                alt=""
              />
            ))}
        </div>
      </div>
    </div>
  );
};

export default React.memo(MovieDetail);
