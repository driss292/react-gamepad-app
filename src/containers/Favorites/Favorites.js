import axios from "axios";
import { useState, useEffect } from "react";

import CardGame from "../../components/CardGame/CardGame";
import "../Favorites/favorites.scss";

const Favorites = ({ userToken }) => {
  const [data, setData] = useState();
  const [isLoading, setIsLoading] = useState(true);
  const [reload, setReload] = useState();
  // const [favoriteData, setFavoriteData] = useState();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          "https://my-gamepad-backend-api.herokuapp.com/favorites",
          {
            headers: {
              Authorization: `Bearer ${userToken}`,
            },
          }
        );

        // console.log(response.data);
        setData(response.data);
        setIsLoading(false);
      } catch (error) {
        console.log(error.message);
      }
    };
    fetchData();
  }, [userToken, reload]);

  const removeFavorite = async (slugToRemove) => {
    // console.log(slugToRemove);

    const responseRemove = await axios.post(
      "http://localhost:3000/favorite/delete",
      { game: slugToRemove },
      {
        headers: {
          Authorization: `Bearer ${userToken}`,
        },
      }
    );
    if (responseRemove) {
      console.log("removed");
    }
    setReload({});
  };
  return isLoading ? (
    <p>chargement...</p>
  ) : (
    <div className="wrapper">
      <div className="collection-title">
        <h1>My collection</h1>
      </div>
      <div className="collection-container">
        {data &&
          data.favorite.map((elem, index) => {
            return (
              <CardGame
                elem={elem}
                key={index}
                removeFavorite={removeFavorite}
              />
            );
          })}
      </div>
    </div>
  );
};

export default Favorites;
