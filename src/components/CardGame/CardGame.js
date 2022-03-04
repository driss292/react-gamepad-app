import "../CardGame/cardGame.scss";
import { Link } from "react-router-dom";

const CardGame = ({ game }) => {
  return (
    <div className="card-game">
      <Link to={`game/${game.slug}`}>
        <h2>{game.name}</h2>
        <img className="card-img" src={game.background_image} alt="" />
      </Link>
    </div>
  );
};

export default CardGame;
