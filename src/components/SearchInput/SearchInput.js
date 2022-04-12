import "../SearchInput/searchInput.scss";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const SearchInput = ({ search, setSearch }) => {
  return (
    <div className="search-container">
      <input
        className="input"
        type="text"
        value={search}
        placeholder="Search for a game..."
        onChange={(event) => {
          setSearch(event.target.value);
        }}
      />
      {/* <FontAwesomeIcon className="icon" icon="search" /> */}
    </div>
  );
};

export default SearchInput;
