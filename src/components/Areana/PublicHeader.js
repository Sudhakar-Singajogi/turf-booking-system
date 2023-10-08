import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import MUIDrawer from "../MUI/MUIDrawer";
import LoginDrawerComponent from "./LoginDrawerComponent";
import { useDrawerCloseContext } from "../../contexts/DrawerCloseBtn";

function PublicHeader() {
  const [mobileNavActive, setMobileNavActive] = useState(false);
  const [modalOpen, setModalOpen] = useState(false);
  const { closeDrawer } = useDrawerCloseContext();

  console.log('mobileNavActive: ', mobileNavActive)

  const toggleMobileNav = () => {
    setMobileNavActive(!mobileNavActive);
  };
  const currentUrl = window.location.href;

  useEffect(() => {
    setMobileNavActive(false);
    if (
      currentUrl === "http://localhost:3000/arena-login" ||
      currentUrl === "http://192.168.0.111:3000/arena-login" ||
      currentUrl.includes("/arena-login")
    ) {
      closeDrawer(true);
      setMobileNavActive(true);
    }
    if (
      currentUrl === "http://localhost:3000/arena-register" ||
      currentUrl === "http://192.168.0.111:3000/arena-register" ||
      currentUrl.includes("/arena-register")
      
    ) {
      setMobileNavActive(true);
      closeDrawer(true);
    }

    const parallax = document.querySelector(".hero");
    window.addEventListener("scroll", () => {
      const offset = window.scrollY;
      parallax.style.backgroundPositionY = -offset * 0.5 + "px";
      if (mobileNavActive) {
        toggleMobileNav();
      }
    });
  }, []);

  return (
    <>
      <div className="header sticky top-0 z-50 bgblack">
        <div className="flex justify-between items-center py-3 px-5 w100">
          <div className="logo">
            <Link to="/" style={{ color: "#fff", textDecoration: "none" }}>
              PyroSports
            </Link>
          </div>
          <nav className="navbar">
            <ul className="menu ">
              <li>
                <Link path="">Home</Link>
              </li>
              <li>
                <Link path="">Sports</Link>
              </li>
              <li>
                <Link path="">Venues</Link>
              </li>
              {/* <li>
                <Link path="" onClick={() => closeDrawer(true)}>
                  SignIn
                </Link>
              </li> */}
              <li>
                <Link path="">Contact</Link>
              </li>
            </ul>
          </nav>
          <div
            className={`hamburger ${mobileNavActive ? "active" : "disp-none"}`}
            onClick={toggleMobileNav}
          >
            <div className="bar"></div>
            <div className="bar"></div>
            <div className="bar"></div>
          </div>
        </div>
      </div>

      <div className={`mobile-nav ${mobileNavActive ? "active" : ""}`}>
        <ul>
          <li>
            <Link path="">Home</Link>
          </li>
          <li>
            <Link path="">Sports</Link>
          </li>
          <li>
            <Link path="">Venues</Link>
          </li>
          {/* <li>
            <Link path="" onClick={() => closeDrawer(true)}>
              SignIn
            </Link>
          </li> */}
          <li>
            <Link path="">Contact</Link>
          </li>
        </ul>
      </div>
      {/* <MUIDrawer
        onClick={toggleDrawer("right", false)}
        onClose={toggleDrawer("right", false)}
        open={drawer["right"]}
        component={<ComponentToDisplay />}
      /> */}

      <MUIDrawer open={mobileNavActive} component={<LoginDrawerComponent />} />
    </>
  );
}

export default PublicHeader;
