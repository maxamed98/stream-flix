import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";

const Series = () => {
  const { id, series, episode, total } = useParams();
  const nav = useNavigate();

  const next_ep = () => {
    nav(`/tv/${id}/${series}/${String(parseInt(episode) + 1)}/${total}`);
  };

  const prev_ep = () => {
    nav(`/tv/${id}/${series}/${String(parseInt(episode) - 1)}/${total}`);
  };

  const image_link = "https://image.tmdb.org/t/p/w500/";

  const req = `https://api.themoviedb.org/3/tv/${id}/season/${series}/episode/${episode}?api_key=29d915ca68e2ae1e0fa4d3f05490510c`;

  const [info, setInfo] = useState({});

  const getEpisode = async () => {
    const res_raw = await axios.get(req);
    const res = await res_raw.data;
    setInfo(res);
  };

  useEffect(() => {
    getEpisode();
  }, [episode]);

  return (
    <div id="movies">
      <div className="prev-next-cont">
        {parseInt(episode) > 1 && (
          <h2 onClick={() => prev_ep()} id="prev-ep">
            Previous Episode
          </h2>
        )}
        {parseInt(episode) < total && (
          <h2 onClick={() => next_ep()} id="next-ep">
            Next Episode
          </h2>
        )}
      </div>
      <div className="more-info">
        <div className="right">
          <h5>
            Season {series} Episode {episode}:{" "}
            <span id="ep-name">{info.name}</span>
          </h5>
          <h6>{info.overview}</h6>
        </div>
      </div>
    </div>
  );
};

export default Series;
