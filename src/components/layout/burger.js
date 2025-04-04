import React, { useState } from "react";
import { Link } from "react-router-dom";

const Burger = () => {
  const [isBurgerOpen, setIsBurgerOpen] = useState(false);

  const handleBurgerClick = () => {
    setIsBurgerOpen(!isBurgerOpen);
  };

  const handleBurgerClose = () => {
    setIsBurgerOpen(false);
  };

  return (
    <div className={`burger ${isBurgerOpen ? "open" : "closed"}`}>
      <div className="burger-lines" onClick={handleBurgerClick}>
        <div className="burger-line" />
        <div className="burger-line" />
        <div className="burger-line" />
      </div>
      <div className="burger-menu">
        <div className="burger-close" onClick={handleBurgerClose}>
          Close
        </div>
        <div className="bur_links_container">
          <Link to="/" onClick={handleBurgerClick}>
            <div className="bur_main">Main</div>
          </Link>
          <Link to="/MaintenancePlan" onClick={handleBurgerClick}>
            <div className="bur_about">Maintenance Plan</div>
          </Link>
          <Link to="/EquipmentPage" onClick={handleBurgerClick}>
            <div className="bur_about">Equipment</div>
          </Link>
          <Link to="/about" onClick={handleBurgerClick}>
            <div className="bur_about">About</div>
          </Link>
          <Link to="/contact" onClick={handleBurgerClick}>
            <div className="bur_contact">Contact</div>
          </Link>
          <Link to="/careers" onClick={handleBurgerClick}>
            <div className="bur_careers">Careers</div>
          </Link>
          <Link to="/Cart" onClick={handleBurgerClick}>
            <div className="bur_careers">Cart</div>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Burger;
