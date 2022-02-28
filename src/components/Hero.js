import SearchInput from "./SearchInput";

const Hero = ({ search, setSearch, gameData }) => {
  return (
    <div className="hero">
      <SearchInput search={search} setSearch={setSearch} />
      <p>Search {gameData.count} games</p>
    </div>
  );
};

export default Hero;
