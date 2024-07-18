import { useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import axios from "axios";

//api key 29d915ca68e2ae1e0fa4d3f05490510c
//format in url ?api_key=29d915ca68e2ae1e0fa4d3f05490510c
//full format example https://api.themoviedb.org/3/movie/550?api_key=29d915ca68e2ae1e0fa4d3f05490510c
//image poster link https://image.tmdb.org/t/p/w500/example.jpg

//omdb apikey=4d6bf387
//238 gf1
//240 gf2
//111 sf
//54650 power
//1399 got

const Home = () => {
  const [main, setMain] = useState([]);
  const [tmovies, setTmovies] = useState([]);
  const [ttv, setTtv] = useState([]);

  const nav = useNavigate();

  const getMain = async () => {
    const r_gf1 = await axios.get(
      "https://api.themoviedb.org/3/movie/238?api_key=29d915ca68e2ae1e0fa4d3f05490510c"
    );
    const gf1 = r_gf1.data;

    const r_gf2 = await axios.get(
      "https://api.themoviedb.org/3/movie/240?api_key=29d915ca68e2ae1e0fa4d3f05490510c"
    );
    const gf2 = r_gf2.data;

    const r_sf = await axios.get(
      "https://api.themoviedb.org/3/movie/111?api_key=29d915ca68e2ae1e0fa4d3f05490510c"
    );
    const sf = r_sf.data;

    const r_power = await axios.get(
      "https://api.themoviedb.org/3/tv/54650?api_key=29d915ca68e2ae1e0fa4d3f05490510c"
    );
    const power = r_power.data;

    const r_got = await axios.get(
      "https://api.themoviedb.org/3/tv/1399?api_key=29d915ca68e2ae1e0fa4d3f05490510c"
    );
    const got = r_got.data;

    // console.log(gf1);
    // console.log(gf2);
    // console.log(sf);
    // console.log(power);
    // console.log(got);
    setMain([gf1, gf2, sf, power, got]);
  };

  const get_tmovies = async () => {
    const t_movies = await axios.get(
      "https://api.themoviedb.org/3/trending/movie/week?api_key=29d915ca68e2ae1e0fa4d3f05490510c"
    );
    const tm = await t_movies.data.results;
    // console.log(tm);
    setTmovies(tm);
  };

  const get_ttv = async () => {
    const t_tv = await axios.get(
      "https://api.themoviedb.org/3/trending/tv/week?api_key=29d915ca68e2ae1e0fa4d3f05490510c"
    );
    const tv = await t_tv.data.results;
    // console.log(tv);
    setTtv(tv);
  };

  useEffect(() => {
    getMain();
    get_tmovies();
    get_ttv();
  }, []);

  return (
    <div id="home">
      <div className="results-cont main-movies-tv">
        {main.map((show) => (
          <div
            className="card"
            key={show.id}
            onClick={() => {
              show.title
                ? nav(`/movies/${show.id}`)
                : nav(`/tv/select/${show.id}`);
            }}
          >
            <img
              src={`https://image.tmdb.org/t/p/w500/${show.poster_path}`}
              alt={show.title || show.name}
            />
            <div className="info">
              <p>{show.title || show.name}</p>
              <p>{show.first_air_date ? "Tv Show" : "Movie"}</p>
              <p>
                {show.first_air_date
                  ? `First Air:  ${show.first_air_date}`
                  : `Release Date: ${show.release_date}`}
              </p>
            </div>
          </div>
        ))}
      </div>
      <div className="t-movies">
        <h1>Trending Movies</h1>
        <div className="slider">
          <div className="slide-track">
            {tmovies.map((movie) => (
              <div
                className="card"
                key={movie.id}
                onClick={() => {
                  nav(`/movies/${movie.id}`);
                }}
              >
                <img
                  src={`https://image.tmdb.org/t/p/w500/${movie.poster_path}`}
                  alt=""
                />
                <div className="info">
                  <p>{movie.title || movie.name}</p>
                  <p>{movie.first_air_date ? "Tv Show" : "Movie"}</p>
                  <p>
                    {movie.first_air_date
                      ? `First Air:  ${movie.first_air_date}`
                      : `Release Date: ${movie.release_date}`}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
        <h1>Trending Tv Shows</h1>
        <div className="slider">
          <div className="slide-track">
            {ttv.map((tv) => (
              <div
                className="card"
                key={tv.id}
                onClick={() => {
                  nav(`/tv/select/${tv.id}`);
                }}
              >
                <img
                  src={`https://image.tmdb.org/t/p/w500/${tv.poster_path}`}
                  alt=""
                />
                <div className="info">
                  <p>{tv.title || tv.name}</p>
                  <p>{tv.first_air_date ? "Tv Show" : "Movie"}</p>
                  <p>
                    {tv.first_air_date
                      ? `First Air:  ${tv.first_air_date}`
                      : `Release Date: ${tv.release_date}`}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;
