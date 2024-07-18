import { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

//api key 29d915ca68e2ae1e0fa4d3f05490510c
//format in url ?api_key=29d915ca68e2ae1e0fa4d3f05490510c
//full format example https://api.themoviedb.org/3/movie/550?
//api_key=29d915ca68e2ae1e0fa4d3f05490510c
//image poster link https://image.tmdb.org/t/p/w500/example.jpg

const Search = ({ setSearchClicked }) => {
  const [query, setQuery] = useState("");
  const [movies, setMovies] = useState([]);
  const [tv, setTv] = useState([]);
  const [results, setResults] = useState([]);
  const nav = useNavigate();

  const img_path = "https://image.tmdb.org/t/p/w500/";

  const movie_req =
    " https://api.themoviedb.org/3/search/movie?api_key=29d915ca68e2ae1e0fa4d3f05490510c&include_adult=false&query=";

  const tv_req =
    " https://api.themoviedb.org/3/search/tv?api_key=29d915ca68e2ae1e0fa4d3f05490510c&include_adult=false&query=";

  const getMovies = async () => {
    if (query) {
      const mov = await axios.get(`${movie_req}${query}`);
      const mov_final = await mov.data.results;
      //   mov_final.filter((movie) => movie.poster_path !== null);
      setMovies(mov_final);

      //   console.log(mov_final);
    }
  };

  const getTv = async () => {
    if (query) {
      const tv = await axios.get(`${tv_req}${query}`);
      const tv_final = await tv.data.results;
      //   tv_final.filter((show) => show.poster_path !== null);
      setTv(tv_final);
      //   console.log(tv_final);
    }
  };

  const handleClick = (item) => {
    if (item.release_date) {
      nav(`/movies/${item.id}`);
    } else {
      nav(`/tv/select/${item.id}`);
    }
    setSearchClicked(false);
  };

  useEffect(() => {
    document.getElementById("search").focus();
  }, []);

  useEffect(() => {
    setResults([]);
    getMovies();
    getTv();

    const temp = movies.concat(tv);
    const temp2 = temp.filter((item) => {
      return item.poster_path;
    });
    temp2.sort((a, b) => {
      if (a.popularity > b.popularity) {
        return -1;
      } else if (a.popularity > b.popularity) {
        return 1;
      } else {
        return 0;
      }
    });
    // console.log(temp2);

    setResults(temp2);

    // console.log(results);
  }, [query]);

  return (
    <div id="search-cont">
      <header>
        <input
          type="text"
          value={query}
          onChange={(e) => {
            setQuery(e.target.value);
          }}
          id="search"
          autoComplete="off"
        />
        <h5
          id="x"
          onClick={() => {
            setSearchClicked(false);
          }}
        >
          X
        </h5>
      </header>
      <div className="results-cont">
        {results.map((item) => (
          <div
            className="card"
            key={item.id}
            onClick={() => {
              handleClick(item);
            }}
          >
            <img
              src={`${img_path}${item.poster_path}`}
              alt={item.title || item.name}
            />
            <div className="info">
              <p>{item.title || item.name}</p>
              <p>{item.first_air_date ? "Tv Show" : "Movie"}</p>
              <p>
                {item.first_air_date
                  ? `First Air:  ${item.first_air_date}`
                  : `Release Date: ${item.release_date}`}
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Search;
