import "../scss/signup.scss";
import axios from "axios";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import logo from "../assets/images/gampad-logo.png";

const Signup = ({ setConnected }) => {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [avatar, setAvatar] = useState(null);
  const [errorMessage, setErrorMessage] = useState("");

  const navigate = useNavigate();

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (password === confirmPassword) {
      if (email && username && password && confirmPassword && avatar) {
        try {
          const formData = new FormData();

          formData.append("email", email);
          formData.append("username", username);
          formData.append("password", password);
          formData.append("confirmPassword", confirmPassword);
          formData.append("avatar", avatar);

          const response = await axios.post(
            "https://my-gamepad-backend-api.herokuapp.com/user/signup",
            formData
          );
          // console.log(response.data.token);
          if (response.data.token) {
            setConnected(response.data.token, response.data.username);
            navigate("/");
          }
        } catch (error) {
          if (error.response.status === 409 || error.response.status === 400) {
            setErrorMessage("This email is already used.");
            console.log(error.message);
          }
          console.log(error.response.data.error.message);
        }
      } else {
        setErrorMessage("tous les champs doivent être remplis");
      }
    } else {
      setErrorMessage("les mots de passe ne sont pas identiques");
    }
  };

  return (
    <div className="login-wrapper">
      <div className="part-left">
        <img className="login-logo" src={logo} alt="logo" />
        <h1 className="left-title">How it works ?</h1>
        <div className="list-wrapper">
          <div className="element-list">
            <FontAwesomeIcon
              className="icon-lis fa-xl"
              icon="fa-regular fa-user"
            />
            <p className="text">
              Log un to your free account to be able to get all features of
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
          <h2 className="right-title">Sign up</h2>
          <div className="username">
            <input
              type="text"
              placeholder="Username"
              value={username}
              onChange={(event) => setUsername(event.target.value)}
            />
          </div>
          <div className="email">
            <input
              type="email"
              placeholder="Email"
              value={email}
              onChange={(event) => setEmail(event.target.value)}
            />
          </div>
          <div className="passwords-wrapper">
            <input
              className="space-passwords"
              name="password"
              type="password"
              placeholder="Password..."
              value={password}
              onChange={(event) => setPassword(event.target.value)}
            />
            <input
              type="password"
              placeholder="Confirm Password..."
              value={confirmPassword}
              onChange={(event) => setConfirmPassword(event.target.value)}
            />
          </div>
          {/* <div className="input-file">
            <label
              htmlFor="photo"
              className="inputfile"
              onClick={(event) => {
                inputRef.current.dispatchEvent(
                  new MouseEvent("click", {
                    bubbles: false,
                    cancelable: true,
                    view: window,
                  })
                );
              }}
              value={picture}
            >
              <input
                type="file"
                name="photo"
                ref={inputRef}
                onChange={(event) => setPicture(event.target.files[0])}
              />
              Add a photo
              <FontAwesomeIcon
                className="icon-upload"
                icon="fa-solid fa-arrow-up-from-bracket"
              />
            </label>
          </div> */}
          <input className="login-btn" type="submit" />
          <p className="little-undertext">Don't have an account yet ?</p>
        </form>
      </div>
    </div>
    // <div className="login-wrapper">
    //   <div className="part-left">
    //     <h1 className="left-title">How it works ?</h1>
    //     <div className="list-wrapper">
    //       <div className="element-list">
    //         <FontAwesomeIcon
    //           className="icon-lis fa-xl"
    //           icon="fa-regular fa-user"
    //         />
    //         <p className="text">
    //           Log in to your free account to be able to get all features of
    //           Gamepad
    //         </p>
    //       </div>
    //       <div className="element-list">
    //         <FontAwesomeIcon
    //           className="icon-list fa-xl"
    //           icon="fa-regular fa-bookmark"
    //         />
    //         <p className="text">Add a game to your collection</p>
    //       </div>
    //       <div className="element-list">
    //         <FontAwesomeIcon
    //           className="icon-list fa-xl"
    //           icon=" fa-regular fa-message"
    //         />
    //         <p className="text">Leave a review for a game</p>
    //       </div>
    //     </div>
    //   </div>
    //   <div className="part-right">
    //     <form className="login-form" onSubmit={handleSubmit}>
    //       <h2 className="right-title">Signup</h2>
    //       <div className="email">
    //         <input
    //           type="email"
    //           placeholder="Email..."
    //           value={email}
    //           onChange={(event) => setEmail(event.target.value)}
    //         />
    //       </div>
    //       <div className="password">
    //         <input
    //           type="password"
    //           placeholder="Password..."
    //           value={password}
    //           onChange={(event) => setPassword(event.target.value)}
    //         />
    //       </div>
    //       <input className="login-btn" type="submit" />
    //       <p className="little-undertext" onClick={() => navigate("/login")}>
    //         Already have an accout ? Log in
    //       </p>
    //     </form>
    //   </div>
    // </div>

    // <section>
    //   <div className="signup-container">
    //     <div className="left">
    //       <h2>How it works ?</h2>
    //       <div className="info">
    //         <FontAwesomeIcon icon="user" />
    //         <p>
    //           Log in to your free account to be able to get all features of
    //           Gamepad
    //         </p>
    //       </div>
    //       <div className="info">
    //         <FontAwesomeIcon icon="bookmark" />
    //         <p>Add a game to your collection</p>
    //       </div>
    //       <div className="info">
    //         <FontAwesomeIcon icon="commenting" />
    //         <p>Leave a review for a game</p>
    //       </div>
    //     </div>

    //     <div className="right">
    //       <h2>Sign up</h2>
    //       <form onSubmit={handleSubmit}>
    //         <input
    //           type="text"
    //           placeholder="username"
    //           value={username}
    //           onChange={(event) => {
    //             setUsername(event.target.value);
    //           }}
    //         />
    //         <input
    //           type="email"
    //           placeholder="email"
    //           value={email}
    //           onChange={(event) => {
    //             setEmail(event.target.value);
    //           }}
    //         />
    //         <input
    //           type="password"
    //           placeholder="password"
    //           value={password}
    //           onChange={(event) => {
    //             setPassword(event.target.value);
    //           }}
    //         />
    //         <input
    //           type="password"
    //           placeholder="confirm password"
    //           value={confirmPassword}
    //           onChange={(event) => {
    //             setConfirmPassword(event.target.value);
    //           }}
    //         />
    //         <input
    //           type="file"
    //           placeholder="Add a photo"
    //           onChange={(event) => {
    //             setAvatar(event.target.files[0]);
    //           }}
    //         />

    //         <input type="submit" value="connexion" />
    //       </form>
    //       <div>
    //         <Link to="/login">Already have an accout ? Log in </Link>
    //         <div>{errorMessage}</div>
    //       </div>
    //     </div>
    //   </div>
    // </section>
  );
};

export default Signup;
