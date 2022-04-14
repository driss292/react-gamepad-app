import "../CardGame/cardGame.scss";
import { useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const CardGame = ({ game, item, elem, removeFavorite }) => {
  const navigate = useNavigate();
  return (
    <>
      {game && (
        <div
          className="card-game"
          onClick={() => {
            navigate(`game/${game.slug}`);
          }}
        >
          <div className="card-img">
            <img
              className="card-img"
              src={game.background_image}
              alt={game.name}
            />
          </div>
          <div className="card-title">
            <h4>{game.name}</h4>
          </div>
        </div>
      )}
      {item && (
        <div
          className="card-game"
          onClick={() => {
            navigate(`/game/${item.slug}`);
          }}
        >
          <div className="card-img">
            <img
              className="card-img"
              src={item.background_image}
              alt={item.name}
            />
          </div>
          <div className="card-title">
            <h4>{item.name}</h4>
          </div>
        </div>
      )}
      {elem && (
        <div className="card-game">
          <div className="card-img">
            <img
              className="card-img"
              src={elem.gameData.background_image}
              alt={elem.gameData.name}
              onClick={() => {
                navigate(`/game/${elem.gameData.slug}`);
              }}
            />
            <div className="icon-fav">
              {/* <FontAwesomeIcon icon="bookmark" /> */}
            </div>
          </div>
          <div className="card-title">
            <h4>
              {elem.gameData.name}
              <div className="icon-trash">
                <FontAwesomeIcon
                  icon="trash"
                  onClick={() => {
                    removeFavorite(elem.gameData);
                  }}
                />
              </div>
            </h4>
          </div>
        </div>
      )}
    </>
  );
};

export default CardGame;
