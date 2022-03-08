import "../scss/game.scss";
import axios from "axios";
import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";

const Game = ({ userToken, userId }) => {
  const params = useParams();
  const { slug } = params;
  const navigate = useNavigate();
  // console.log(slug);

  const [data, setData] = useState();
  const [isLoading, setIsLoading] = useState(true);
  const [gameSeriesData, setGameSeriesData] = useState();
  const [reviewsData, setReviewsData] = useState();
  const [favoritesData, setFavoritesData] = useState();

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
      const responseFavorites = await axios.get(
        "http://localhost:3000/favorites",
        {
          headers: {
            Authorization: `Bearer ${userToken}`,
          },
        }
      );

      setData(response.data);
      setGameSeriesData(responseGameSeries.data);
      console.log(responseFavorites.data);
      // setFavoritesData(responseFavorites.data);
      setReviewsData(responseReviews.data);
      setIsLoading(false);
    };
    fetchData();
  }, [slug, userToken]);

  const verifReview = () => {
    if (reviewsData) {
      if (userId) {
        for (let i = 0; i < reviewsData.length; i++) {
          if (reviewsData[i].user.id === userId) {
            return true;
          }
        }
      }
    }
  };

  const verifFavorite = () => {
    if (favoritesData) {
      for (let i = 0; i < favoritesData.favorite.length; i++) {
        if (favoritesData.favorite[i].gameData.slug === slug) {
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

  const handleFavorite = async () => {
    if (userToken) {
      if (!verifFavorite) {
        try {
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
            alert("Added to your collection");
          }
        } catch (error) {
          console.log("ERROR =====>", error.message);
        }
      } else {
        console.log("ERROR 2");
      }
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
            <button
              className="fav-btn"
              onClick={() => {
                handleFavorite();
              }}
            >
              {verifFavorite()
                ? "Added to your collection"
                : "Add to your collection"}
            </button>
            <button
              className="review-btn"
              onClick={() => {
                handleReview();
              }}
            >
              {verifReview() ? "Review added" : "Add a review"}
            </button>
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
      <div className="games-like-container">
        <div className="title-game">
          <h2>Games like {data.name}</h2>
        </div>
        <div className="games-like">
          {gameSeriesData &&
            gameSeriesData.results.map((elem, index) => {
              return (
                <div
                  className="games-list"
                  key={index}
                  onClick={() => {
                    navigate(`/game/${elem.slug}`);
                  }}
                >
                  <img
                    className="card-img"
                    src={elem.background_image}
                    alt={elem.name}
                  />
                  <div className="game-title">
                    <h4>{elem.name}</h4>
                  </div>
                </div>
              );
            })}
        </div>
      </div>
      <div className="reviews">
        <div className="title">
          <h2>Review</h2>
        </div>
        <div className="list">
          {reviewsData &&
            reviewsData.map((item, index) => {
              <p>Most relevant reviews :</p>;
              return (
                <div key={index}>
                  <p>{item.title}</p>
                  <p>{item.text}</p>
                  <p>{item._id}</p>
                </div>
              );
            })}
        </div>
      </div>
    </>
  );
};

export default Game;
