import "../CardGame/cardGame.scss";
import { Link } from "react-router-dom";

const CardGame = ({ game }) => {
  return (
    <div className="card-game">
      <Link to={`game/${game.slug}`}>
        <h4>{game.name}</h4>
        <img className="card-img" src={game.background_image} alt="" />
      </Link>
    </div>
  );
};

export default CardGame;
