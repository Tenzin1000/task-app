import React, { useContext, useEffect, useState } from "react";
import "../css/viewtitle.css";
import BurgerContext from "../context/burgerbutton/BurgerContext.jsx";

export default function Viewtitle() {
  const { btnClicked } = useContext(BurgerContext);
  const [pageTitle, setPageTitle] = useState("");

  const setTitle = () => {
    switch (location.pathname) {
      case "/":
        setPageTitle("Menu");
        break;
      case "/user":
        setPageTitle("User List");
        break;
      default:
        setPageTitle("Dashboard");
        break;
    }
  };
  useEffect(() => {
    setTitle(); // Set title on component mount
  }, [location.pathname]);
  return (
    <div className="main-title">
      <div className="title-container">
        <div>{pageTitle}</div>
        <div className="barBtn" id="barBtn" onClick={btnClicked}>
          <i className="fa-solid fa-bars"></i>
        </div>
      </div>
    </div>
  );
}
