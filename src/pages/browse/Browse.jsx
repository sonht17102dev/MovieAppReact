import React from 'react';
import Banner from '../../components/banner/Banner';
import Navbar from '../../components/nav/Navbar';
import MovieList from '../../components/listMovie/MovieList';

function Browse() {
	
	const API_KEY = "2acea6a3aace774d433b095e7dbcaba6";
  const domain = "https://api.themoviedb.org/3"
  const requests = {
    fetchTrending: `${domain}/trending/all/week?api_key=${API_KEY}&language=en-US`,
    fetchNetflixOriginals: `${domain}/discover/tv?api_key=${API_KEY}&with_network=123`,
    fetchTopRated: `${domain}/movie/top_rated?api_key=${API_KEY}&language=en-US`,
    fetchActionMovies: `${domain}/discover/movie?api_key=${API_KEY}&with_genres=28`,
    fetchComedyMovies: `${domain}/discover/movie?api_key=${API_KEY}&with_genres=35`,
    fetchHorrorMovies: `${domain}/discover/movie?api_key=${API_KEY}&with_genres=27`,
    fetchRomanceMovies: `${domain}/discover/movie?api_key=${API_KEY}&with_genres=10749`,
    fetchDocumentaries: `${domain}/discover/movie?api_key=${API_KEY}&with_genres=99`,
    fetchSearch: `${domain}/search/movie?api_key=${API_KEY}&language=en-US`,
  };
	
	return (
		<div className="app bg-dark">
			<Navbar />
      <Banner url={requests}/>
      <MovieList url={requests.fetchNetflixOriginals} type={"Original"} apiKey={API_KEY}/>
      <MovieList url={requests.fetchTrending} type={"Trending"} apiKey={API_KEY}/>
      <MovieList url={requests.fetchTopRated} type={"Top rated"} apiKey={API_KEY}/>
      <MovieList url={requests.fetchActionMovies} type={"Action"} apiKey={API_KEY}/>
      <MovieList url={requests.fetchComedyMovies} type={"Comedy"} apiKey={API_KEY}/>
      <MovieList url={requests.fetchHorrorMovies} type={"Horror"} apiKey={API_KEY}/>
      <MovieList url={requests.fetchRomanceMovies} type={"Romance"} apiKey={API_KEY}/>
      <MovieList url={requests.fetchDocumentaries} type={"Documentaries"} apiKey={API_KEY}/> 
  
		</div>
	);
}

export default Browse;

