import { Link, NavLink } from "react-router-dom";
import { theme } from "../../helper/theme.jsx";

import { logged, userData } from "../../helper/logged.jsx";
import { logout } from "../../helper/logout.jsx";

function setTheme(themeInput) {
  localStorage.setItem("theme", themeInput);
  theme.value = themeInput;
}

function Navbar() {
  // const [user] = useAtom(loggedUser);

  return (
    <div className="navbar bg-base-100">
      <div className="navbar-start">
        <NavLink className="btn btn-ghost text-xl" to="/">
          Medical Census
        </NavLink>
      </div>
      <div className="navbar-center lg:flex">
        <ul className="menu menu-horizontal px-1">
          {logged.value ? (
            <>
              <li>
                <span>Welcome {userData.value.username}</span>
              </li>
              <li>
                <NavLink className="button" to="/form">
                  Create Form
                </NavLink>
              </li>
              <li>
                <NavLink className="button" to="/user-forms">
                  View Previous Forms
                </NavLink>
              </li>
              <li>
                <Link className="button" onClick={()=>logout()} to="/">
                  LogOut
                </Link>
              </li>
            </>
          ) : (
            <>
              <li>
                <NavLink className="button" to="/login">
                  Login
                </NavLink>
              </li>
              <li>
                <NavLink to="/register">Register</NavLink>
              </li>
            </>
          )}
        </ul>
      </div>
      <div className="navbar-end">
        {/* this hidden checkbox controls the state */}

        <button onClick={() => setTheme("dark")} className="m-4">
          Dark
        </button>
        <button onClick={() => setTheme("light")} className="m-4">
          Light
        </button>
        <button onClick={() => setTheme("retro")}>
          <svg
            width="65"
            height="65"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 200 200"
          >
            {/* Body */}
            <rect x="50" y="80" width="100" height="70" fill="#8B4513" />

            {/* Head */}
            <rect x="80" y="40" width="40" height="40" fill="#B0C4DE" />

            {/* Eyes */}
            <circle cx="95" cy="55" r="3" fill="#000" />
            <circle cx="105" cy="55" r="3" fill="#000" />

            {/* Mouth */}
            <rect x="95" y="65" width="10" height="3" fill="#000" />

            {/* Antenna */}
            <rect x="100" y="25" width="3" height="15" fill="#B0C4DE" />
            <circle cx="101.5" cy="20" r="5" fill="#B0C4DE" />
          </svg>
        </button>
      </div>
    </div>
  );
}

export default Navbar;

// Set to a specific theme
// <button data-set-theme="retro" >retro</button>
