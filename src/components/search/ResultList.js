import React, { useState } from "react";
import useHttp from "../hook/useHttp";
import "./ResultList.css";
import MovieDetail from "../movieDetail/MovieDetail";
export default function ResultList(props) {
  console.log(props.keyword);
  // const [isLoading] = useState(false);
  const [isShowMovie, setIsShowMovie] = useState(false);
  const [movieDetail, setMovieDetail] = useState(null);
  const listSearchMovies = useHttp(
    `https://api.themoviedb.org/3/search/movie?query=${props.keyword}&api_key=2acea6a3aace774d433b095e7dbcaba6&language=en-US`
  ).filter((item) => item.poster_path !== null);

  console.log(listSearchMovies);
  const showDetailMovie = (event) => {
    setIsShowMovie(true);
    const movieDetail = listSearchMovies.find(
      (movie) => movie.id === Number(event.target.id)
    );
    setMovieDetail(movieDetail);
  };
  const hideDetailMovie = () => {
    setIsShowMovie(false);
  };

  return (
    <div className="container mt-4">
      <h3 className="text-light text-center">Search Result</h3>
      <div className="result row">
        {listSearchMovies.length === 0 ? (
          <h4 className="text-light text-center mb-4">
            Enter your keyword to find any movie
          </h4>
        ) : (
          listSearchMovies.length !== 0 &&
          listSearchMovies.map((movie) => {
            return (
              <img
                src={`http://image.tmdb.org/t/p/w500${movie.poster_path}`}
                alt={movie.name}
                id={movie.id}
                key={movie.id}
                className="col-2 p-2"
                onClick={!isShowMovie ? showDetailMovie : hideDetailMovie}
              />
            );
          })
        )}
      </div>
      <div className="movie-modal">
        {isShowMovie && (
          <MovieDetail
            data={movieDetail}
            apiKey="2acea6a3aace774d433b095e7dbcaba6"
          />
        )}
      </div>
    </div>
  );
}
