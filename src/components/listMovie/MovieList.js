import React, { useState } from "react";
import "./MovieList.css";
import useHttp from "../hook/useHttp";
import MovieDetail from "../movieDetail/MovieDetail";

const MovieList = (props) => {
  const [isLoading] = useState(false);
  const [isShowMovie, setIsShowMovie] = useState(false);
  const [movieDetail, setMovieDetail] = useState(null);
  const [movieDetailId, setMovieDetailId] = useState(0);
  const listMovies = useHttp(props.url);
  // console.log(listMovies);

  // Hàm xử lý show/hide movieDetail
  const showDetailMovie = (event) => {
    setIsShowMovie(true);
    const movieDetail = listMovies.find(
      (movie) => movie.id === Number(event.target.id)
    );
    setMovieDetailId(movieDetail.id);
    if (Number(event.target.id) === movieDetailId) {
      setIsShowMovie(false);
    } else {
      setMovieDetailId(Number(event.target.id));
      setIsShowMovie(true);
    }
    setMovieDetail(movieDetail);
  };
  return (
    <section className="listContainer bg-dark pt-4">
      <div
        className={`${props.type === "Original" ? "oriMovie" : "typeMovie"}`}
      >
        <h3 className="text-light">{props.type}</h3>
        <div className="typeMovie-image">
          {listMovies.length === 0 ? (
            <div className="d-flex justify-content-center text-center">
              <div
                id="loading-icon"
                style={{ display: !isLoading ? "block" : "none" }}
              ></div>
            </div>
          ) : (
            listMovies.length !== 0 &&
            listMovies.map((movie) => {
              return (
                <img
                  src={`http://image.tmdb.org/t/p/w500${
                    props.type === "Original"
                      ? movie.poster_path
                      : movie.backdrop_path ?? movie.poster_path
                  }`}
                  alt={movie.name}
                  id={movie.id}
                  key={movie.id}
                  onClick={showDetailMovie}
                />
              );
            })
          )}
        </div>
      </div>
      <div className="movie-modal">
        {isShowMovie && (
          <MovieDetail data={movieDetail} apiKey={props.apiKey} />
        )}
      </div>
    </section>
  );
};
export default React.memo(MovieList);
