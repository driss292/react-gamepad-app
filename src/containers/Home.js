import Hero from "../components/Hero/Hero";
import CardGame from "../components/CardGame/CardGame";
import axios from "axios";
import { useState, useEffect } from "react";
import Paginate from "../components/Paginate/Paginate";
import Dropdown from "../components/Dropdown/Dropdown";

const Home = () => {
  const [gameData, setGameData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [page, setPage] = useState(1);
  const [numberOfPages, setNumberOfPages] = useState();
  const [platforms, setPlatforms] = useState("");
  const [genres, setGenres] = useState("");
  const [genresData, setGenresData] = useState("");
  const [platformsData, setPlatformsData] = useState("");
  const [displayPlatforms, setDisplayPlatforms] = useState(false);
  const [displayGenres, setDisplayGenres] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      let urlApi = `https://api.rawg.io/api/games?key=d1b2b07ae2794fbe8fbbd25bd05b8936&search=${search}&page=${page}`;
      if (platforms) {
        urlApi += `&platforms=${String(platforms.id)}`;
      }
      if (genres) {
        urlApi += `&genres=${String(genres.id)}`;
      }
      try {
        const response = await axios.get(urlApi);
        const responsePlatform = await axios.get(
          "https://api.rawg.io/api/platforms?key=d1b2b07ae2794fbe8fbbd25bd05b8936"
        );
        const responseGenre = await axios.get(
          "https://api.rawg.io/api/genres?key=d1b2b07ae2794fbe8fbbd25bd05b8936"
        );

        // console.log(response.data);
        // console.log(responsePlatform.data);
        // console.log(responseGenre.data);
        setGameData(response.data);
        setGenresData(responseGenre.data);
        setPlatformsData(responsePlatform.data);
        setNumberOfPages(Math.ceil(response.data.count / 20));
        setIsLoading(false);
      } catch (error) {
        console.log(error.message);
      }
    };

    fetchData();
    window.scrollTo(0, 0);
  }, [search, page, genres, platforms]);

  return isLoading ? (
    <p>chargement...</p>
  ) : (
    <div className="block">
      <div className="search">
        <Hero search={search} setSearch={setSearch} gameData={gameData} />
      </div>

      <div>
        <Dropdown
          platformsData={platformsData}
          setPlatforms={setPlatforms}
          displayPlatforms={displayPlatforms}
          setDisplayPlatforms={setDisplayPlatforms}
          platforms={platforms}
          genresData={genresData}
          setGenres={setGenres}
          displayGenres={displayGenres}
          setDisplayGenres={setDisplayGenres}
          genres={genres}
        />
        {/* <Dropdown/> */}
      </div>
      <div className="container">
        <div className="title">
          <div className="block">
            {platforms ? (
              <h2>{platforms.name}</h2>
            ) : (
              <h2>Most Relevance Games</h2>
            )}
            {genres && <h2>/ {genres.name}</h2>}
          </div>
        </div>
        <div className="container-card">
          {gameData.results.map((game, index) => {
            return (
              <div key={index} className="card-game">
                <CardGame game={game} />
              </div>
            );
          })}
        </div>
      </div>
      <div className="paginate-container">
        <Paginate numberOfPages={numberOfPages} setPage={setPage} />
      </div>
    </div>
  );
};

export default Home;
