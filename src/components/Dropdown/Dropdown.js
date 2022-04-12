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

  const switchGenre = (genre) => {
    if (genres.id === genre.id) {
      setGenres("");
    } else {
      setGenres(genre);
    }
    setDisplayGenres(false);
  };

  return (
    <div className="dropdown-block">
      {/* <select
        className="platforms"

        // onChange={(event) => {
        //   console.log(event);
        // }}
      >
        {platformsData &&
          platformsData.results.map((elem, index) => {
            return (
              <option
                key={index}
                value={elem.name}
                onChange={(option) => {
                  switchPlatform(option);
                }}
              >
                {elem.name}
              </option>
            );
          })}
      </select> */}

      {/* <div className="dropdown">
        <button
          className="btn"
          onClick={() => {
            console.log("coucou");
          }}
        >
          Platforms
        </button>
        <div className="block-items">
          <ul>
            {platformsData &&
              platformsData.results.map((elem, index) => {
                return (
                  <li
                    key={index}
                    onClick={() => {
                      setPlatforms(elem);
                    }}
                  >
                    {elem.name}
                  </li>
                );
              })}
          </ul>
        </div>
      </div> */}
      {platformsData && (
        <div className="dropdown-items">
          {displayPlatforms ? (
            <>
              <div
                className="dropdown-content"
                onClick={() => {
                  setPlatforms("");
                  setDisplayPlatforms(false);
                }}
              >
                All
              </div>
              <div className="dropdown-content">
                {platformsData.results.map((item, index) => {
                  return (
                    <div key={index} onClick={() => switchPlatform(item)}>
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
                setDisplayPlatforms(true);
              }}
            >
              {platforms ? (
                <div className="dropdown-content">
                  <div className="content">
                    <div>Platformes :</div>
                    <div>{platforms.name}</div>
                  </div>
                </div>
              ) : (
                <div className="dropdown-content">
                  <div className="content">
                    <div>Platformes :</div>
                    <div>All</div>
                  </div>
                </div>
              )}
            </div>
          )}
        </div>
      )}

      {genresData && (
        <div className="dropdown-items">
          {displayGenres ? (
            <div>
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
            </div>
          ) : (
            <div
              className="dropdown-content"
              onClick={() => {
                setDisplayGenres(true);
              }}
            >
              {genres ? (
                <div className="dropdown-content">
                  <div className="content">
                    <div>Genre :</div>
                    <div>{genres.name}</div>
                  </div>
                </div>
              ) : (
                <div className="dropdown-content">
                  <div className="content">
                    <div>Genre :</div>
                    <div>All</div>
                  </div>
                </div>
              )}
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default Dropdown;
