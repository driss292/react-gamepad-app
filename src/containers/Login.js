import "../scss/login.scss";
import axios from "axios";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import logo from "../assets/images/gampad-logo.png";

const Login = ({ setConnected }) => {
  const [email, setEmail] = useState();
  const [password, setPassword] = useState();
  const [errorMessage, setErrorMessage] = useState();

  const navigate = useNavigate();

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (email && password) {
      try {
        const response = await axios.post(
          "https://my-gamepad-backend-api.herokuapp.com/user/login",
          {
            email: email,
            password: password,
          }
        );

        if (response.data.token) {
          setConnected(response.data.token, response.data.username);
          navigate("/");
        }
      } catch (error) {
        console.log(error.message);
      }
    } else {
      setErrorMessage("tous les champs doivent être remplis");
    }
  };

  return (
    <div className="login-wrapper">
      <div className="part-left">
        <img
          className="login-logo"
          src={logo}
          alt="logo"
          onClick={() => navigate("/")}
        />

        <h1 className="left-title">How it works ?</h1>
        <div className="list-wrapper">
          <div className="element-list">
            <FontAwesomeIcon
              className="icon-lis fa-xl"
              icon="fa-regular fa-user"
            />
            <p className="text">
              Log in to your free account to be able to get all features of
              Gamepad
            </p>
          </div>
          <div className="element-list">
            <FontAwesomeIcon
              className="icon-list fa-xl"
              icon="fa-regular fa-bookmark"
            />
            <p className="text">Add a game to your collection</p>
          </div>
          <div className="element-list">
            <FontAwesomeIcon
              className="icon-list fa-xl"
              icon=" fa-regular fa-message"
            />
            <p className="text">Leave a review for a game</p>
          </div>
        </div>
      </div>
      <div className="part-right">
        <form className="login-form" onSubmit={handleSubmit}>
          <h2 className="right-title">Login</h2>
          <div className="email">
            <input
              type="email"
              placeholder="Email..."
              value={email}
              onChange={(event) => setEmail(event.target.value)}
            />
          </div>
          <div className="password">
            <input
              type="password"
              placeholder="Password..."
              value={password}
              onChange={(event) => setPassword(event.target.value)}
            />
          </div>
          <input className="login-btn" type="submit" />
          <p className="little-undertext" onClick={() => navigate("/signup")}>
            Don't have an account yet ?
          </p>
        </form>
        <div className="error-msg">{errorMessage}</div>
      </div>
    </div>
  );
};

export default Login;
