import axios from "axios";
import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";

const SelectEpisode = () => {
  const { id, series, episode } = useParams();
  const [episodes, setEpisodes] = useState([]);
  const query = `https://api.themoviedb.org/3/tv/${id}/season/${series}?api_key=29d915ca68e2ae1e0fa4d3f05490510c`;
  const img_path = "https://image.tmdb.org/t/p/w500/";
  const nav = useNavigate();

  //image poster link https://image.tmdb.org/t/p/w500/example.jpg

  const getSeasons = async () => {
    const eps = await axios.get(query);
    const eps_data = await eps.data;

    // console.log(eps_data);
    setEpisodes(eps_data.episodes);
  };

  const handleClick = (ep, index) => {
    nav(`/tv/${id}/${series}/${ep.episode_number}/${episode}`);
  };

  useEffect(() => {
    getSeasons();
  }, []);

  return (
    <div id="seasons-cont">
      <h1>Select Episode</h1>
      <div className="results-cont">
        {episodes.map((ep, index) => (
          <div
            key={ep.id}
            onClick={() => {
              handleClick(ep, index);
            }}
            className="episode-box"
          >
            <h4>Ep. {index + 1}</h4>
            {/* <img src={`${img_path}${ep.still_path}`} alt="" /> */}
            <h5>{ep.name}</h5>
          </div>
        ))}
      </div>
    </div>
  );
};

export default SelectEpisode;
