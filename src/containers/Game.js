// import axios from "axios";
// import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";

const Game = () => {
  const { id } = useParams();
  // console.log(id);

  // const [data, setData] = useState();
  // const [isLoading, setIsLoading] = useState(true);

  // useEffect(() => {
  //   const fetchData = async () => {
  //     const response = await axios.get(
  //       `https://api.rawg.io/api/games?dates=2019-09-01%2C2019-09-30&key=d1b2b07ae2794fbe8fbbd25bd05b8936&game=${id}`
  //     );
  //     console.log(response.data);
  //   };
  //   fetchData();
  // }, []);

  return (
    <div>
      <h1>hello from Game</h1>
      <p>{id}</p>
    </div>
  );
};

export default Game;
