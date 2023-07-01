import React, { useEffect, useState, useCallback } from "react";
import axios from "axios";
import "./Banner.css";
export default function Banner(props) {
  const [movieBanner, setMovieBanner] = useState(null);

  // Hàm call API
  const getDatas = useCallback(async () => {
    const result = await axios.get(props.url.fetchNetflixOriginals);
    // console.log(result.data.results);
    //Xử lý kết quả trả về có bị null không
    const resultHasImage = result.data.results.filter(
      (item) => item.backdrop_path !== null
    );
    // console.log(resultHasImage);
    setMovieBanner(
      resultHasImage[Math.floor(Math.random() * resultHasImage.length - 1)]
    );
  }, [props.url.fetchNetflixOriginals]);

  useEffect(() => {
    getDatas();
  }, [getDatas]);

  return (
    <section className="bannerContainer bg-dark">
      {movieBanner && (
        <div id="banner">
          <img
            src={
              movieBanner.backdrop_path === null
                ? "https://www.salonlfc.com/wp-content/uploads/2018/01/image-not-found-scaled-1150x647.png"
                : `http://image.tmdb.org/t/p/w500${movieBanner.backdrop_path}`
            }
            alt="Movie banner"
            style={{ width: "100%" }}
          />

          <div className="banner-content">
            <div className="banner-title">
              <h1>{movieBanner.name}</h1>
            </div>
            <div className="d-flex flex-row bd-highlight">
              <button className="btn btn-secondary m-2 p-2 bd-highlight">
                Play
              </button>

              <button className="btn btn-secondary m-2 p-2 bd-highlight">
                My List
              </button>
            </div>
            <div className="banner-desc mt-3 w-50">
              {movieBanner.overview && <p>{movieBanner.overview}</p>}
            </div>
          </div>
        </div>
      )}
    </section>
  );
}
