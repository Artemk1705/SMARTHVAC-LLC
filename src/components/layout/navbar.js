import React, { useRef, useEffect, useState } from "react";
import { useMediaQuery } from "react-responsive";
import { Link, useLocation } from "react-router-dom";
import "../../assets/styles/index.css";
import "../../assets/styles/careers.css";
import Burger from "./burger";
import logoComp from "../../assets/images/logomain.png";
import logoTablet from "../../assets/images/SmartLogoTablet.png";

function Navbar() {
  const isDesktopOrLaptop = useMediaQuery({ minDeviceWidth: 450 });
  const isTabletOrMobile = useMediaQuery({ maxDeviceWidth: 449 });

  const location = useLocation();
  const currentPage = location.pathname;
  const [windowWidth, setWindowWidth] = useState(window.innerWidth);

  useEffect(() => {
    const handleResize = () => {
      setWindowWidth(window.innerWidth);
    };

    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  return (
    <nav className="nav">
      <div className="logos_bar">
        <Link to="/">
          {isDesktopOrLaptop && (
            <div>
              <img src={logoComp} alt="logo" className="logo_photo" />
            </div>
          )}
          {isTabletOrMobile && (
            <div>
              <img src={logoTablet} alt="logo" className="logo_photo" />
            </div>
          )}
        </Link>
      </div>
      <div className="nav_bar">
        {windowWidth <= 1390 ? (
          <Burger />
        ) : (
          <ul>
            <li className="main_bar">
              <Link to="/">MAIN</Link>
            </li>
            <li className="main_bar">
              <Link to="/MaintenancePlan">MAINTENANCE PLAN</Link>
            </li>
            <li className="about_bar">
              <Link to="/about">ABOUT</Link>
            </li>
            <li className="contact_bar">
              <Link to="/contact">CONTACT</Link>
            </li>
            <li className="careers_bar">
              <Link to="/careers">CAREERS</Link>
            </li>
          </ul>
        )}
      </div>
    </nav>
  );
}

export default Navbar;
