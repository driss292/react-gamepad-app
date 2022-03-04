import "../Hero/hero.scss";

import SearchInput from "../SearchInput/SearchInput";

const Hero = ({ search, setSearch, gameData }) => {
  return (
    <div className="hero">
      <div>
        <h1>Gamepad</h1>
        <SearchInput search={search} setSearch={setSearch} />
        {search ? (
          <div>
            <p className="title-search">Search for : "{search}"</p>
            <p className="count">{gameData.count}</p>
          </div>
        ) : (
          <p className="count">Search {gameData.count} games</p>
        )}
      </div>
    </div>
  );
};

export default Hero;
