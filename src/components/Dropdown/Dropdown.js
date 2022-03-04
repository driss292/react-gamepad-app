import "../Dropdown/dropdown.scss";

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

  const switchGenre = (genre) => {
    if (genres.id === genre.id) {
      setGenres("");
    } else {
      setGenres(genre);
    }
    setDisplayGenres(false);
  };

  return (
    <div className="dropdown-container">
      {displayPlatforms ? (
        <div>
          <div
            className="platforms"
            onClick={() => {
              setPlatforms("");
              setDisplayPlatforms(false);
            }}
          >
            All
          </div>
          {platformsData.results.map((item, index) => {
            return (
              <div key={index} onClick={() => switchPlatform(item)}>
                {item.name}
              </div>
            );
          })}
        </div>
      ) : (
        <div
          className="platforms-flex"
          onClick={() => {
            setDisplayPlatforms(true);
          }}
        >
          {platforms ? (
            <div className="platforms-flex">
              <div>Platform :</div>
              <div>{platforms.name}</div>
            </div>
          ) : (
            <div className="platforms-flex">
              <div>Platform :</div>
              <div>All</div>
            </div>
          )}
        </div>
      )}
      {displayGenres ? (
        <div>
          <div
            className="platforms"
            onClick={() => {
              setGenres("");
              setDisplayGenres(false);
            }}
          >
            All
          </div>
          {genresData.results.map((item, index) => {
            return (
              <div key={index} onClick={() => switchGenre(item)}>
                {item.name}
              </div>
            );
          })}
        </div>
      ) : (
        <div
          className="platforms-flex"
          onClick={() => {
            setDisplayGenres(true);
          }}
        >
          {genres ? (
            <div className="platforms-flex">
              <div>Genre :</div>
              <div>{genres.name}</div>
            </div>
          ) : (
            <div className="platforms-flex">
              <div>Genre :</div>
              <div>All</div>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default Dropdown;
