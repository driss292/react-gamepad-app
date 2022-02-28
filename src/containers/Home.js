import Header from "../components/Header";
import Hero from "../components/Hero";
import CardGame from "../components/CardGame";
import axios from "axios";
import { useState, useEffect } from "react";

const Home = () => {
  const [gameData, setGameData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [search, setSearch] = useState("");
  //   const [page, setPage] = useState(1);
  //   const [numberOfPages, setNumberOfPages] = useState();

  //   const [platforms, setPlatforms] = useState("");

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          `https://api.rawg.io/api/games?dates=2019-09-01%2C2019-09-30&key=d1b2b07ae2794fbe8fbbd25bd05b8936&search=${search}`
        );
        // console.log(response.data);
        setGameData(response.data);
        setIsLoading(false);
      } catch (error) {
        console.log(error.message);
      }
    };

    fetchData();
  }, [search]);

  return isLoading ? (
    <p>chargement...</p>
  ) : (
    <div className="block">
      <div className="header">
        <Header />
      </div>
      <div className="search">
        <h1>GAMEPAD</h1>
        <Hero search={search} setSearch={setSearch} gameData={gameData} />
      </div>
      <div className="container">
        {gameData.results.map((game, index) => {
          return (
            <div key={index} className="card-game">
              <CardGame game={game} />;
            </div>
          );
        })}
      </div>
      <div className="pagination">prout</div>
    </div>
  );
};

export default Home;
