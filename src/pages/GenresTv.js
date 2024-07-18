import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";

//full format example https://api.themoviedb.org/3/movie/550?           api_key=29d915ca68e2ae1e0fa4d3f05490510c
//image poster link https://image.tmdb.org/t/p/w500/example.jpg

const GenresTv = () => {
  const { genreName, genreId } = useParams();
  const nav = useNavigate();
  const [page, setPage] = useState(1);
  const [tv, setTv] = useState([]);

  const req = `https://api.themoviedb.org/3/discover/tv?with_genres=${genreId}&page=${page}&api_key=29d915ca68e2ae1e0fa4d3f05490510c`;

  const img_path = "https://image.tmdb.org/t/p/w500/";

  const getTv = async () => {
    const r_tv = await axios.get(req);
    const tv_1 = await r_tv.data.results;
    // console.log(tv_1);
    setTv(tv_1);
  };

  useEffect(() => {
    getTv();
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
        {tv.map((tv) => (
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
  );
};

export default GenresTv;
