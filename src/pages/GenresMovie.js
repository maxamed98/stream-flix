import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";

//full format example https://api.themoviedb.org/3/movie/550?           api_key=29d915ca68e2ae1e0fa4d3f05490510c
//image poster link https://image.tmdb.org/t/p/w500/example.jpg

const GenresMovie = () => {
  const { genreName, genreId } = useParams();
  const nav = useNavigate();
  const [page, setPage] = useState(1);
  const [movies, setMovies] = useState([]);

  const req = `https://api.themoviedb.org/3/discover/movie?with_genres=${genreId}&page=${page}&include_adult=false&api_key=29d915ca68e2ae1e0fa4d3f05490510c`;

  const img_path = "https://image.tmdb.org/t/p/w500/";

  const getMovies = async () => {
    const r_mov = await axios.get(req);
    const mov = await r_mov.data.results;
    // console.log(mov);
    setMovies(mov);
  };

  useEffect(() => {
    getMovies();
  }, [genreId, page]);

  return (
    <div id="genres-container">
      <h2>{genreName}</h2>
      <div className="paging">
        <h6
          onClick={() => {
            setPage((prev) => {
              if (prev > 1) {
                return prev - 1;
              } else {
                return prev;
              }
            });
          }}
        >
          {"<=="}
        </h6>

        <h6 id="current-page">{page}</h6>

        <h6
          onClick={() => {
            setPage((prev) => {
              if (prev < 1000) {
                return prev + 1;
              } else {
                return prev;
              }
            });
          }}
        >
          {"==>"}
        </h6>
      </div>
      <div className="results-cont">
        {movies.map((movie) => (
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
  );
};

export default GenresMovie;
