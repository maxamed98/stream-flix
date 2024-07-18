import axios from "axios";
import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";

const SelectSeason = () => {
  const { id } = useParams();
  const [seasons, setSeasons] = useState([]);
  const query = `https://api.themoviedb.org/3/tv/${id}?api_key=29d915ca68e2ae1e0fa4d3f05490510c`;
  const img_path = "https://image.tmdb.org/t/p/w500";
  const nav = useNavigate();

  //image poster link https://image.tmdb.org/t/p/w500/example.jpg

  const getSeasons = async () => {
    const szns = await axios.get(query);
    const szns_data = await szns.data.seasons;

    // console.log(szns);
    // console.log(szns_data);
    const new_szns = szns_data.filter((szn) => szn.name !== "Specials");
    setSeasons(new_szns);
  };

  const handleClick = (szn, index) => {
    nav(`/tv/select/${id}/${szn.season_number}/${szn.episode_count}`);
  };

  useEffect(() => {
    getSeasons();
  }, [id]);

  return (
    <div id="seasons-cont">
      <h1>Select Season</h1>
      <div className="results-cont szns-cont">
        {seasons.map((szn, index) => (
          <div
            key={szn.id}
            onClick={() => {
              handleClick(szn, index);
            }}
            className="szn-num-cont"
          >
            <h5>s{szn.season_number}</h5>
            <img src={`${img_path}${szn.poster_path}`} alt="" />
          </div>
        ))}
      </div>
    </div>
  );
};

export default SelectSeason;
