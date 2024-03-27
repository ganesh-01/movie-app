import SearchIcon from "./search-icon.svg";
import { useEffect, useState } from "react";
import "./App.css";
import MovieCard from "./MovieCard";

//SETTING UP API KEY FROM OMDB FREE API
//http://www.omdbapi.com/?i=tt3896198&apikey=57b98dda
const API_URL = "http://www.omdbapi.com/?apikey=57b98dda";

const movie1 = {
  Title: "Italian Spiderman",
  Year: "2007",
  imdbID: "tt2705436",
  Type: "movie",
  Poster: "N/A",
};

const App = () => {
  const [movies, setMovies] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  let resultText = `${movies.length} matches found`;
  const [isClicked, setIsClicked] = useState(0);

  const searchMovies = async (title) => {
    const response = await fetch(`${API_URL}&s=${title}`);
    const data = await response.json();
    console.log(data.Search);
    setMovies(data.Search);
  };

  useEffect(() => {
    searchMovies("marvel");
  }, []);

  return (
    <>
      <div className="app">
        <h1 className="headTitle">CINEMANIA</h1>

        <div className="search">
          <input
            type="text"
            placeholder="Search for movies"
            value={searchTerm}
            onChange={(e) => {
              setSearchTerm(e.target.value);
            }}
          />
          <img
            src={SearchIcon}
            alt="Searchicon"
            onClick={() => {
              searchMovies(searchTerm);
              setIsClicked(1);
              console.log(isClicked);
            }}
          />
        </div>

        <h3>{isClicked == 0 ? "" : resultText}</h3>
        {movies?.length > 0 ? (
          <div className="container">
            {/* FOR SHOWING SINGLE MOVIE CARD */}
            {/* <MovieCard movie1={movies[0]}/> */}

            {/* FOR SHOWING ALL MOVIES IN ARRAY USING MAP */}
            {movies.map((movie) => (
              <MovieCard movie={movie} />
            ))}
          </div>
        ) : (
          <div className="empty">
            <h2>No movies found</h2>
          </div>
        )}
      </div>
    </>
  );
};

export default App;
