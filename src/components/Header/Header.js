import "./header.scss";
import logo from "../../assets/images/gampad-logo.png";
import { useNavigate, Link } from "react-router-dom";

const Header = ({ userToken, setConnected }) => {
  const navigate = useNavigate();
  return (
    <header className="header">
      <div className="logo-container" onClick={() => navigate("/")}>
        <img src={logo} alt="" className="logo" />
        <h2>Gamepad</h2>
      </div>
      {userToken ? (
        <div>
          <button
            onClick={() => {
              setConnected(null);
              navigate("/");
            }}
          >
            Logout
          </button>
          <div className="collection" onClick={() => navigate("/favorites")}>
            <p>My Collection</p>
          </div>
        </div>
      ) : (
        <div className="connection-container">
          <div className="collection" onClick={() => navigate("/favorites")}>
            <p>My Collection</p>
          </div>
          <div className="login-signup">
            <Link to="/login">
              <button>Login</button>
            </Link>
            <Link to="/signup">
              <button>Signup</button>
            </Link>
          </div>
        </div>
      )}
    </header>
  );
};

// header {
//   display: flex;
// }

// .header-container {
//   display: flex;
//   width: 1120px;
//   margin: 0 auto;
//   justify-content: space-between;
//   background-color: #1f2023;
//   border-bottom: 2px solid #eb565b;
//   height: 5rem;
// }

// .header-logo-container,
// .header-connect-container {
//   display: flex;
//   height: 100%;
//   align-items: center;
//   padding: 1rem;
// }
// .header-logo-container {
//   margin-left: 1rem;
// }

// .header-logo-container p {
//   font-size: 1.5rem;
//   cursor: pointer;
// }

// .header-logo {
//   height: 60%;
//   cursor: pointer;
// }

// .header-connect-container {
//   margin-right: 1rem;
// }

// .header-connect-container p {
//   cursor: pointer;
// }

// .header-connect-container button {
//   border: none;
//   border-radius: 5px;
//   padding: 0.5rem 1rem;
//   margin: 1rem;
// }
export default Header;
