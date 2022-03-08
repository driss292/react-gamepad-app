import "../scss/login.scss";
import axios from "axios";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const Login = ({ setConnected }) => {
  const [email, setEmail] = useState();
  const [password, setPassword] = useState();
  const [errorMessage, setErrorMessage] = useState();

  const navigate = useNavigate();

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (email && password) {
      try {
        const response = await axios.post("http://localhost:3000/user/login", {
          email: email,
          password: password,
        });

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
    <section>
      <div className="login-container">
        <div className="left">
          <h2>How it works ?</h2>
          <div className="info">
            <FontAwesomeIcon icon="user" />
            <p>
              Log in to your free account to be able to get all features of
              Gamepad
            </p>
          </div>
          <div className="info">
            <FontAwesomeIcon icon="bookmark" />
            <p>Add a game to your collection</p>
          </div>
          <div className="info">
            <FontAwesomeIcon icon="commenting" />
            <p>Leave a review for a game</p>
          </div>
        </div>
        <div className="right">
          <h2>Login</h2>
          <form onSubmit={handleSubmit}>
            <input
              type="text"
              placeholder="email"
              onChange={(event) => {
                setEmail(event.target.value);
              }}
            />
            <input
              type="password"
              placeholder="password"
              onChange={(event) => {
                setPassword(event.target.value);
              }}
            />
            <input type="submit" value="connexion" />
          </form>
          <div>
            <Link to="/signup">Don't have an account ? Sign up</Link>
            <div>{errorMessage}</div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Login;
