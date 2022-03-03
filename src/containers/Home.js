// import Header from "../components/Header/Header";
import Hero from "../components/Hero/Hero";
import CardGame from "../components/CardGame/CardGame";
import axios from "axios";
import { useState, useEffect } from "react";
import Paginate from "../components/Paginate/Paginate";

const Home = () => {
  const [gameData, setGameData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [page, setPage] = useState(1);
  const [numberOfPages, setNumberOfPages] = useState();
  //   const [platforms, setPlatforms] = useState("");

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          `https://api.rawg.io/api/games?dates=2019-09-01%2C2019-09-30&key=d1b2b07ae2794fbe8fbbd25bd05b8936&search=${search}&page=${page}`
        );
        // console.log(response.data);
        setGameData(response.data);
        setNumberOfPages(Math.ceil(response.data.count / 20));
        setIsLoading(false);
      } catch (error) {
        console.log(error.message);
      }
    };

    fetchData();
  }, [search, page]);

  return isLoading ? (
    <p>chargement...</p>
  ) : (
    <div className="block">
      <div className="search">
        <Hero search={search} setSearch={setSearch} gameData={gameData} />
      </div>
      <div className="container">
        {gameData.results.map((game, index) => {
          return (
            <div key={index} className="card-game">
              <CardGame game={game} />
            </div>
          );
        })}
      </div>
      <div className="paginate-container">
        <Paginate numberOfPages={numberOfPages} setPage={setPage} />
      </div>
    </div>
  );
};

export default Home;
