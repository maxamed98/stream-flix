import "./App.css";
import { useState } from "react";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import Home from "./pages/Home";
import PNF from "./pages/PNF";
import Movies from "./pages/Movies";
import Search from "./components/Search";
import Series from "./pages/Series";
import SelectSeason from "./pages/SelectSeason";
import SelectEpisode from "./pages/SelectEpisode";
import Sidebar from "./components/Sidebar";
import GenresTv from "./pages/GenresTv";
import GenresMovie from "./pages/GenresMovie";

function App() {
  const [searchClicked, setSearchClicked] = useState(false);
  const [genreClicked, setGenreClicked] = useState(false);
  return (
    <Router>
      <div id="main-cont">
        <Link id="title" to="/">
          StreamFlix
        </Link>
        <div className="btns">
          <h3
            onClick={() => {
              setSearchClicked((prev) => !prev);
            }}
            id="search-btn"
          >
            Search
          </h3>
          <h3
            onClick={() => {
              setGenreClicked((prev) => !prev);
            }}
          >
            Genres
          </h3>
        </div>
      </div>
      {searchClicked && <Search setSearchClicked={setSearchClicked} />}

      {genreClicked && <Sidebar setGenreClicked={setGenreClicked} />}

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/movies/:id" element={<Movies />} />
        <Route path="/tv/:id/:series/:episode/:total" element={<Series />} />
        <Route path="/tv/select/:id" element={<SelectSeason />} />
        <Route
          path="/tv/select/:id/:series/:episode"
          element={<SelectEpisode />}
        />

        <Route
          path="/genres/movie/:genreName/:genreId"
          element={<GenresMovie />}
        />
        <Route path="/genres/tv/:genreName/:genreId" element={<GenresTv />} />
        <Route path="*" element={<PNF />} />
      </Routes>
    </Router>
  );
}

export default App;
