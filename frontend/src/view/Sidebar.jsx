import React, { useContext } from "react";
import logo from "../assets/react.svg";
import "../css/sidebar.css";
import { NavLink } from "react-router-dom";
import BurgerContext from "../context/burgerbutton/BurgerContext.jsx";

const Sidebar = () => {
  const { burgerButton, btnClicked } = useContext(BurgerContext);

  return (
    <div className="main-sidebar">
      <div className="logo-container">
        <div className="logo">
          <img
            src={logo}
            alt="logo"
            className={`logo-img ${burgerButton ? "" : "imgsmall"}`}
          />
        </div>
        <div className={`logo-title ${burgerButton ? "" : "nav-linkNone"}`}>
          Simple Dashboard UI
        </div>
      </div>

      <ul className="menu-container">
        <li
          className="nav-item"
          style={{ textAlign: burgerButton ? "left" : "center" }}>
          <NavLink to="/" className="menu-li" onClick={btnClicked}>
            <i className="fa-solid fa-table-columns nav-icon"></i>
            <span className={`${burgerButton ? "" : "nav-linkNone"}`}>
              Menu
            </span>
          </NavLink>
        </li>
        <li
          className="nav-item"
          style={{ textAlign: burgerButton ? "left" : "center" }}>
          <NavLink to="/user" className="menu-li" onClick={btnClicked}>
            <i className="fa-solid fa-list nav-icon"></i>
            <span className={`${burgerButton ? "" : "nav-linkNone"}`}>
              Users List
            </span>
          </NavLink>
        </li>
      </ul>
    </div>
  );
};

export default Sidebar;
