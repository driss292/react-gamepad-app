import "./App.scss";
import { useState } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Cookies from "js-cookie";

import Home from "./containers/Home";
import Signup from "./containers/Signup";
import Login from "./containers/Login";
import Favorites from "./containers/Favorites";
import Game from "./containers/Game";
import Review from "./containers/Review";

import Header from "./components/Header/Header";

import { library } from "@fortawesome/fontawesome-svg-core";
import {
  faUser,
  faBookmark,
  faCommenting,
} from "@fortawesome/free-solid-svg-icons";
library.add(faUser, faBookmark, faCommenting);

function App() {
  const [userToken, setUserToken] = useState(Cookies.get("token") || null);
  const [userId, setUserId] = useState(Cookies.get("userId") || null);

  const setConnected = (token) => {
    if (token) {
      setUserToken(token);
      Cookies.set("token", token);
      setUserId(userId);
      Cookies.set("userId", userId);
    } else {
      setUserToken(null);
      Cookies.remove("token");
      setUserId(null);
      Cookies.remove("userId");
    }
  };

  return (
    <Router>
      <Header userToken={userToken} setConnected={setConnected} />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route
          path="/signup"
          element={<Signup setConnected={setConnected} />}
        />
        <Route path="/login" element={<Login setConnected={setConnected} />} />
        <Route path="/collection" element={<Favorites />} />
        <Route path="/game/:id" element={<Game />} />
        <Route path="/review" element={<Review />} />
      </Routes>
    </Router>
  );
}

export default App;