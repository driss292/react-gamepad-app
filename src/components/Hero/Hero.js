import "../Hero/hero.scss";

import SearchInput from "../SearchInput/SearchInput";

const Hero = ({ search, setSearch, gameData }) => {
  return (
    <div className="hero">
      <div>
        <h1>Gamepad</h1>
        <SearchInput search={search} setSearch={setSearch} />
        <p>Search {gameData.count} games</p>
      </div>
    </div>
  );
};

export default Hero;
