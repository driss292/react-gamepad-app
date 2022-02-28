const CardGame = ({ game }) => {
  return (
    <div>
      <h2>{game.name}</h2>
      <img className="card-img" src={game.background_image} alt="" />
    </div>
  );
};

export default CardGame;
