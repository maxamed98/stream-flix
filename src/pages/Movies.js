import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";

import axios from "axios";

//https://api.themoviedb.org/3/movie/550?
//api_key=29d915ca68e2ae1e0fa4d3f05490510c

const Movies = () => {
  const { id } = useParams();

  const image_link = "https://image.tmdb.org/t/p/w500/";


  const req = `https://api.themoviedb.org/3/movie/${id}?api_key=29d915ca68e2ae1e0fa4d3f05490510c`;

  const [info, setInfo] = useState({});

  const getMovie = async () => {
    const res_raw = await axios.get(req);
    const res = await res_raw.data;
    setInfo(res);
  };

  const convertTime = (time) => {
    const int_time = parseInt(time);
    const hrs = Math.floor(int_time / 60);
    const mins = int_time % 60;
    const ret = String(`${hrs}h ${mins}m`);
    return ret;
  };

  useEffect(() => {
    getMovie();
  }, [id]);

  return (
    <div id="movies">
      <div className="more-info">
        <div className="right">
          <h5>
            {info.title} ({info.release_date?.split("-")[0]})
          </h5>
          <h6>{info.overview}</h6>
          <div className="r-right">
            <div className="mini-left">
              <h6>Duration- {convertTime(info.runtime)} </h6>
              <h6>Original Language- {info.original_language}</h6>
            </div>
            <div className="mini-right">
              <h6>Budget- ${parseInt(info.budget).toLocaleString("en-US")}</h6>
              <h6>
                Revenue- ${parseInt(info.revenue).toLocaleString("en-US")}
              </h6>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Movies;
