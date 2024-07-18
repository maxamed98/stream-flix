import { useState } from "react";
import { useNavigate } from "react-router-dom";

const Sidebar = ({ setGenreClicked }) => {
  const nav = useNavigate();

  const [clicked, setClicked] = useState("movie");

  const [m_genres, setM_Genres] = useState([
    { name: "Action", id: 28 },
    { name: "Adventure", id: 12 },
    { name: "Animation", id: 16 },
    { name: "Comedy", id: 35 },
    { name: "Crime", id: 80 },
    { name: "Documentary", id: 99 },
    { name: "Drama", id: 18 },
    { name: "Family", id: 10751 },
    { name: "Fantasy", id: 14 },
    { name: "History", id: 36 },
    { name: "Horror", id: 27 },
    { name: "Music", id: 10402 },
    { name: "Mystery", id: 9648 },
    { name: "Romance", id: 10749 },
    { name: "Science-Fiction", id: 878 },
    { name: "Tv Movie", id: 10770 },
    { name: "Thriller", id: 53 },
    { name: "War", id: 10752 },
    { name: "Western", id: 37 },
  ]);
  const [t_genres, setT_Genres] = useState([
    { name: "Action and Adventure", id: 10759 },
    { name: "Animation", id: 16 },
    { name: "Comedy", id: 35 },
    { name: "Crime", id: 80 },
    { name: "Documentary", id: 99 },
    { name: "Drama", id: 18 },
    { name: "Family", id: 10751 },
    { name: "Kids", id: 10762 },
    { name: "Mystery", id: 9648 },
    { name: "News", id: 10763 },
    { name: "Reality", id: 10764 },
    { name: "Sci-Fi and Fantasy", id: 10765 },
    { name: "Soap", id: 10766 },
    { name: "Talk", id: 10767 },
    { name: "War and Politics", id: 10768 },
    { name: "Western", id: 37 },
  ]);



  return (
    <div id="sidebar">
      {/* <h2>Genres</h2> */}
      <h6
        onClick={() => {
          setGenreClicked(false);
        }}
      >
        X
      </h6>
      <div className="options">
        <h3
          className={clicked == "movie" ? "active" : undefined}
          onClick={() => {
            setClicked("movie");
          }}
        >
          Movie
        </h3>
        <h3
          className={clicked == "tv" ? "active" : undefined}
          onClick={() => {
            setClicked("tv");
          }}
        >
          Tv
        </h3>
      </div>
      <div className="sidebar-cont">
        {clicked == "movie"
          ? m_genres.map((genre) => (
              <div
                className="genres-list"
                key={genre.id}
                onClick={() => {
                  nav(`/genres/movie/${genre.name}/${genre.id}`);
                  setGenreClicked(false);
                }}
              >
                <h4>{genre.name}</h4>
              </div>
            ))
          : t_genres.map((genre) => (
              <div
                className="genres-list"
                key={genre.id}
                onClick={() => {
                  nav(`/genres/tv/${genre.name}/${genre.id}`);
                  setGenreClicked(false);
                }}
              >
                <h4>{genre.name}</h4>
              </div>
            ))}
      </div>
    </div>
  );
};

export default Sidebar;
