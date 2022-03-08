import axios from "axios";
import { useState, useEffect } from "react";
import "../scss/favorites.scss";

const Favorites = ({ userToken }) => {
  const [data, setData] = useState();
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get("http://localhost:3000/favorites", {
          headers: {
            Authorization: `Bearer ${userToken}`,
          },
        });

        setData(response.data);
        setIsLoading(false);
      } catch (error) {
        console.log(error.message);
      }
    };
    fetchData();
  }, [userToken]);
  return isLoading ? (
    <p>chargement...</p>
  ) : (
    <section className="collection">
      <h1>My collection</h1>
      <div className="collection-container">
        {data &&
          data.favorite.map((item, index) => {
            return (
              <div key={index}>
                <p>{item.gameData.name}</p>
              </div>
            );
          })}
      </div>
    </section>
  );
};

export default Favorites;
