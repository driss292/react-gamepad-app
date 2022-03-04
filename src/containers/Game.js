import "../scss/game.scss";
import axios from "axios";
import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";

const Game = ({ userToken, userId }) => {
  const { slug } = useParams();
  // console.log(slug);

  const [data, setData] = useState();
  const [isLoading, setIsLoading] = useState(true);
  const [gameSeriesData, setGameSeriesData] = useState();

  useEffect(() => {
    const fetchData = async () => {
      const response = await axios.get(
        `https://api.rawg.io/api/games/${slug}?key=d1b2b07ae2794fbe8fbbd25bd05b8936`
      );
      const responseGameSeries = await axios.get(
        `https://api.rawg.io/api/games/${slug}/game-series?key=d1b2b07ae2794fbe8fbbd25bd05b8936`
      );
      // console.log(response.data);
      // console.log(responseGameSeries.data);

      setData(response.data);
      setIsLoading(false);
      setGameSeriesData(responseGameSeries.data);
    };
    fetchData();
  }, [slug]);

  let platforms = "";
  let genres = "";
  let developers = "";
  let publishers = "";

  if (data) {
    for (let i = 0; i < data.platforms.length; i++) {
      if (platforms) {
        platforms += ", " + data.platforms[i].platform.name;
      } else {
        platforms += data.platforms[i].platform.name;
      }
    }
    for (let i = 0; i < data.genres.length; i++) {
      if (genres) {
        genres += ", " + data.genres[i].name;
      } else {
        genres += data.genres[i].name;
      }
    }
    for (let i = 0; i < data.developers.length; i++) {
      if (developers) {
        developers += ", " + data.developers[i].name;
      } else {
        developers += data.developers[i].name;
      }
    }
    for (let i = 0; i < data.publishers.length; i++) {
      if (publishers) {
        publishers += ", " + data.publishers[i].name;
      } else {
        publishers += data.publishers[i].name;
      }
    }
  }

  return isLoading ? (
    <p>chargement...</p>
  ) : (
    <>
      <div className="title">
        <h1>{data.name}</h1>
      </div>
      <article className="games-container">
        <div className="left">
          <img src={data.background_image} alt={data.name} />
        </div>
        <div className="right">
          <div className="fav-review">
            <div className="fav">FAV</div>
            <div className="review">REVIEW</div>
          </div>
          <div className="description-container">
            <div className="description-up">
              <p>ABOUT</p>
              <p>{data.description.replace(/<[^>]+>/gi, "")}</p>
            </div>
            <div className="description-down">
              <div className="description-item">
                <p>Platform</p>
                <p>{platforms}</p>
              </div>
              <div className="description-item">
                <p>genre</p>
                <p>{genres}</p>
              </div>
              <div className="description-item">
                <p>Released date</p>
                <p>{data.released}</p>
              </div>
              <div className="description-item">
                <p>Developer</p>
                <p>{developers}</p>
              </div>
              <div className="description-item">
                <p>Publisher</p>
                <p>{publishers}</p>
              </div>
              <div className="description-item">
                <p>Age rating</p>
                <p>{data.esrb_rating ? data.esrb_rating.name : "None"}</p>
              </div>
            </div>
          </div>
        </div>
      </article>
    </>
  );
};

export default Game;
