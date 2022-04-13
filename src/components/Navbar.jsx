import React, { useState } from "react";
import { Link } from "react-router-dom";
import DarkModeToggle from "react-dark-mode-toggle";
import { useDispatch, useSelector } from "react-redux";
import { darkThemeActions } from "../store/darkTheme-slicer";

const Navbar = () => {
  const [isDarkMode, setIsDarkMode] = useState(() => true);
  const darkThemeSlice = useSelector((state) => state.theme);
  const dynamicTheme = darkThemeSlice === "dark" ? null : "rgb(71, 181, 232)";
  const darkThemeToggler = () => dispatch(darkThemeActions.toggleTheme());
  const dispatch = useDispatch();

  const toggler = (e) => {
    darkThemeToggler();
    setIsDarkMode(e);
  };
  return (
    <div>
      <div
        style={{
          backgroundColor:
            darkThemeSlice === "dark" ? null : "rgb(171, 173, 173)",
          transition: "1s",
        }}
      >
        <div
          style={{
            backgroundColor:
              darkThemeSlice === "dark" ? null : "rgb(190, 230, 245)",
            transition: "1s",
          }}
        >
          <div className="site-header">
            <div className="container aclass">
              <div
                style={{ paddingLeft: "1rem", paddingTop: "1rem" }}
                className="branding"
              >
                <img src="icons/icon-11.svg" alt="" className="logo" />
                <div className="logo-type">
                  <h1
                    className="site-title"
                    style={{ color: dynamicTheme, fontSize: "2rem" }}
                  >
                    Wheather app
                  </h1>
                </div>
              </div>
              <div className="main-navigation">
                <ul className="menu">
                  <li className="menu-item current-menu-item">
                    <Link to="/">Home</Link>
                  </li>
                  <li className="menu-item current-menu-item">
                    <Link to="/favorites">Favorits</Link>
                  </li>
                  <li className="menu-item">
                    <DarkModeToggle
                      onChange={toggler}
                      checked={isDarkMode}
                      size={60}
                    />
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
