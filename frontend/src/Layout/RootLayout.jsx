import { Outlet } from "react-router-dom";
import Sidebar from "../view/Sidebar";
import Viewtitle from "../components/Viewtitle";
import { useState } from "react";
import BurgerContext from "../context/burgerbutton/BurgerContext.jsx";

function RootLayout() {
  const [burgerButton, setBurgerButton] = useState(true);
  const btnClicked = () => {
    setBurgerButton(!burgerButton);
  };

  return (
    <div className="App">
      <BurgerContext.Provider value={{ burgerButton, btnClicked }}>
        <div className="main-container">
          <div className={`sidebar ${burgerButton ? "" : "sidebarTab"}`}>
            <Sidebar />
          </div>
          <div className={`view ${burgerButton ? "" : "viewTab"}`}>
            <Viewtitle />
            {/* route section */}
            <Outlet />
          </div>
        </div>
      </BurgerContext.Provider>
    </div>
  );
}

export default RootLayout;
