import "../Dropdown/dropdown.scss";
// import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const Dropdown = ({
  platformsData,
  displayPlatforms,
  setPlatforms,
  platforms,
  setDisplayPlatforms,
  genresData,
  displayGenres,
  setGenres,
  genres,
  setDisplayGenres,
}) => {
  const switchPlatform = (platform) => {
    if (platforms.id === platform.id) {
      setPlatforms("");
    } else {
      setPlatforms(platform);
    }
    setDisplayPlatforms(false);
  };

  // const switchGenre = (genre) => {
  //   if (genres.id === genre.id) {
  //     setGenres("");
  //   } else {
  //     setGenres(genre);
  //   }
  //   setDisplayGenres(false);
  // };

  return (
    <div className="dropdown-block">
      <select className="platforms">
        {platformsData &&
          platformsData.results.map((elem, index) => {
            return (
              <option
                key={index}
                value={elem.name}
                onClick={() => switchPlatform(elem)}
              >
                {elem.name}
              </option>
            );
          })}
      </select>

      {/* {genresData && (
        <div className="dropdown-genres">
          {displayGenres ? (
            <>
              <div
                className="dropdown-content"
                onClick={() => {
                  setGenres("");
                  setDisplayGenres(false);
                }}
              >
                All
              </div>
              <div className="dropdown-content">
                {genresData.results.map((item, index) => {
                  return (
                    <div key={index} onClick={() => switchGenre(item)}>
                      {item.name}
                    </div>
                  );
                })}
              </div>
            </>
          ) : (
            <div
              className="dropdown-content"
              onClick={() => {
                setDisplayGenres(true);
              }}
            >
              {genres ? (
                <div className="dropdown-content">
                  <div>Genre :</div>
                  <div>{genres.name}</div>
                </div>
              ) : (
                <div className="dropdown-content">
                  <div>Genre :</div>
                  <div>All</div>
                </div>
              )}
            </div>
          )}
        </div>
      )} */}
    </div>
  );
};

export default Dropdown;
