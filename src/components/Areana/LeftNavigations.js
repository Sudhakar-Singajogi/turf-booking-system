import React, { useEffect, useState } from "react";
import VerticalMenu from "./VerticalMenu";
import { is } from "date-fns/locale";

function LeftNavigation({ setAdjustrightcontent }) {
  const [isFullMenu, setIsFullMenu] = useState(true);

  useEffect(() => {
    isFullMenu ? setAdjustrightcontent("") : setAdjustrightcontent("move-to-right");
  }, [isFullMenu, setAdjustrightcontent]);

  const toggleMenu = () => {
    setIsFullMenu(!isFullMenu);
  };

  return (
    <div
      className={`bgblack  left-navigation ${
        isFullMenu ? "full-menu flex-1" : "icon-menu"
      }`}
    >
      <div className="hambuger-parent">
        <div
          className={`hamburger ${isFullMenu ? "" : "remove-left"}`}
          onClick={toggleMenu}
        >
          <div className="bar"></div>
          <div className="bar"></div>
          <div className="bar"></div>
        </div>

        <span class="site-title">{isFullMenu ? "Spyro" : null}</span>
      </div>

      <div className={`MenuItems ${isFullMenu ? "" : "top-2-6rem"}`}>
        {/* {isFullMenu ? <>Menu items</> : <>Icon menus</>} */}
        <VerticalMenu isFullMenu={isFullMenu} />
      </div>
    </div>
  );
}

export default LeftNavigation;
