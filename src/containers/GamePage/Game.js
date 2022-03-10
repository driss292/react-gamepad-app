import "../GamePage/game.scss";
import axios from "axios";
import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import CardGame from "../../components/CardGame/CardGame";
import Review from "../../components/ReviewCpt/Review";

const Game = ({ userToken, userId }) => {
  const params = useParams();
  const { slug } = params;
  const navigate = useNavigate();
  // console.log(slug);

  const [data, setData] = useState();
  const [isLoading, setIsLoading] = useState(true);
  const [gameSeriesData, setGameSeriesData] = useState();
  const [reviewsData, setReviewsData] = useState();
  const [favoriteData, setFavoriteData] = useState();
  const [reload, setReload] = useState(0);

  useEffect(() => {
    const fetchData = async () => {
      const response = await axios.get(
        `https://api.rawg.io/api/games/${slug}?key=d1b2b07ae2794fbe8fbbd25bd05b8936`
      );
      const responseGameSeries = await axios.get(
        `https://api.rawg.io/api/games/${slug}/game-series?key=d1b2b07ae2794fbe8fbbd25bd05b8936`
      );
      const responseReviews = await axios.post(
        "http://localhost:3000/reviews",
        {
          slug,
        }
      );
      if (userToken) {
        const responseFavorites = await axios.get(
          "http://localhost:3000/favorites",
          {
            headers: {
              Authorization: `Bearer ${userToken}`,
            },
          }
        );
        // console.log(responseFavorites.data);
        setFavoriteData(responseFavorites.data);
      }

      setData(response.data);
      setGameSeriesData(responseGameSeries.data);
      setReviewsData(responseReviews.data);
      setIsLoading(false);
    };
    fetchData();
  }, [slug, userToken, reload]);

  const checkReview = () => {
    if (reviewsData.length > 0) {
      if (userId) {
        for (let i = 0; i < reviewsData.length; i++) {
          if (reviewsData[i].user.id === userId) {
            return true;
          }
        }
      }
    }
  };

  const checkFavorite = () => {
    if (favoriteData) {
      for (let i = 0; i < favoriteData.favorite.length; i++) {
        if (favoriteData.favorite[i].gameData.slug === slug) {
          return true;
        }
      }
    }
  };

  const handleReview = () => {
    if (userToken) {
      navigate("/review", { state: { gameData: data } });
    } else {
      navigate("/login");
    }
  };

  const switchFavorite = async () => {
    if (userToken) {
      if (!checkFavorite()) {
        const response = await axios.post(
          "http://localhost:3000/favorite/create",
          { game: data },
          {
            headers: {
              Authorization: `Bearer ${userToken}`,
            },
          }
        );
        if (response) {
          console.log("Added");
        }
      } else {
        const response = await axios.post(
          "http://localhost:3000/favorite/delete",
          { game: data },
          {
            headers: {
              Authorization: `Bearer ${userToken}`,
            },
          }
        );
        if (response) {
          console.log("Removed");
        }
      }

      setReload({});
    } else {
      navigate("/login");
    }
  };

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
    <div className="wrapper">
      <div className="game-title">
        <h1>{data.name}</h1>
      </div>
      <div className="game-container">
        <div className="left">
          <div className="card-image">
            <img src={data.background_image} alt={data.name} />
          </div>
        </div>
        <div className="right">
          <div className="main-block">
            <div className="fav-review">
              <div
                className="btn"
                onClick={() => {
                  switchFavorite();
                }}
              >
                {checkFavorite()
                  ? "Added to your collection"
                  : "Add to your collection"}
              </div>
              <div
                className="btn"
                onClick={() => {
                  handleReview();
                }}
              >
                {checkReview() ? "Review added" : "Add a review"}
              </div>
            </div>
            <div className="description-container">
              <div className="description-block">
                <div className="block-1">
                  <div className="description-item">
                    <p>Platform :</p>
                    <p>{platforms}</p>
                  </div>
                  <div className="description-item">
                    <p>genre :</p>
                    <p>{genres}</p>
                  </div>
                </div>
                <div className="block-2">
                  <div className="description-item">
                    <p>Released date :</p>
                    <p>{data.released}</p>
                  </div>
                  <div className="description-item">
                    <p>Developer :</p>
                    <p>{developers}</p>
                  </div>
                </div>
                <div className="block-3">
                  <div className="description-item">
                    <p>Publisher :</p>
                    <p>{publishers}</p>
                  </div>
                  <div className="description-item">
                    <p>Age rating :</p>
                    <p>{data.esrb_rating ? data.esrb_rating.name : "None"}</p>
                  </div>
                </div>
                <div className="description-footer">
                  <p className="text1">ABOUT</p>
                  <p className="text2">
                    {data.description.replace(/<[^>]+>/gi, "")}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="games-like-container">
        <div className="title-game">
          <h2>Games like {data.name}</h2>
        </div>
        <div className="games-like">
          {gameSeriesData &&
            gameSeriesData.results.map((item, index) => {
              return <CardGame item={item} key={index} />;
            })}
        </div>
      </div>

      <div className="review-list">
        <div className="review-title">
          <p>
            Review<sup>{reviewsData.length}</sup>
          </p>
        </div>
        {!checkReview() ? (
          <p>Most relevant reviews :</p>
        ) : (
          <p>No review for this game</p>
        )}
        {reviewsData &&
          reviewsData.map((item, index) => {
            return <Review item={item} key={index} />;
          })}
      </div>
    </div>
  );
};

export default Game;
