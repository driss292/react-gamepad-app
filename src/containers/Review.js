import { useState } from "react";
import axios from "axios";
import { useLocation, useNavigate } from "react-router-dom";

const Review = ({ userToken }) => {
  const [title, setTitle] = useState("");
  const [text, setText] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  const location = useLocation();
  // console.log(location);
  const navigate = useNavigate();

  let gameData = 0;
  // console.log("gameData======>", location);

  if (location.state) {
    gameData = location.state.gameData;
  }

  const handleSubmit = async (event) => {
    try {
      event.preventDefault();
      const response = await axios.post(
        "https://my-gamepad-backend-api.herokuapp.com/review/create",
        {
          text,
          title,
          gameData,
        },
        {
          headers: {
            Authorization: `Bearer ${userToken}`,
          },
        }
      );
      console.log(response.data);
      if (response) {
        navigate(-1);
      }
    } catch (error) {
      console.log(error.message);
      console.log(error.response.data);
      setErrorMessage("NOOOOOOO");
    }
  };

  return userToken ? (
    <div className="review">
      <form onSubmit={handleSubmit}>
        <div>
          <h2>Write a review</h2>
        </div>
        <div className="title-review">
          <input
            type="text"
            placeholder="title"
            onChange={(event) => {
              setTitle(event.target.value);
            }}
          />
        </div>
        <div className="review-text">
          <textarea
            cols="30"
            rows="10"
            placeholder="review text"
            onChange={(event) => {
              setText(event.target.value);
            }}
          />
        </div>
        <div className="review-publish">
          <button type="submit">publish</button>
        </div>
        <div className="review-error">
          <p>{errorMessage}</p>
        </div>
      </form>
    </div>
  ) : (
    navigate("/login")
  );
};

export default Review;
