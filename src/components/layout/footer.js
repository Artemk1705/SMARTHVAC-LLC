import { Link } from "react-router-dom";
import React from "react";
import LogoFooter from "../../assets/images/logoFooter.png";
import gmail from "../../assets/images/LogoFooter/Gmail.png";
import faceb from "../../assets/images/LogoFooter/Facebook.png";
import insta from "../../assets/images/LogoFooter/Instagram.png";
import phone from "../../assets/images/LogoFooter/phone.png";

function Footer() {
  return (
    <div className="footer_block">
      <div className="footer_icons">
        <a href="mailto:SmartHvacUS@gmail.com">
          <img className="gmail" src={gmail} alt="Gmail" />
        </a>
        <a href="tel:+13609213233">
          <div className="contact">
            <img className="phone" src={phone} alt="Phone" />
          </div>
        </a>
        <a href="https://www.instagram.com/smart_hvac_us/">
          <img className="instagram" src={insta} alt="Instagramm" />
        </a>
        <a href="https://www.facebook.com/profile.php?id=100090354312907">
          <img className="facebook" src={faceb} alt="Facebook" />
        </a>
      </div>

      <div className="logo_block">
        <img src={LogoFooter} className="logo_footer" alt="Logo" />
        <div className="auth_licence_block">
          <div className="footer_author">© 2024 SMART HVAC LLC</div>
          <div className="footer_licenses">
            WA ID# SMARTHL78J7 | OR ID# 250660
          </div>
        </div>
      </div>
      <div className="footer_page_navigation">
        <div className="footer_page_navigation_title">Page Navigation</div>
        <a href="https://book.housecallpro.com/book/Smart-HVAC-LLC/873f1cd3570a4061a22cdf1c843d46ea?v2=true">
          <div className="sch_foot">GET SCHEDULE</div>
        </a>
        <Link to="/">
          <div className="main_foot">MAIN</div>
        </Link>
        <Link to="/MaintenancePlan">
          <div className="main_foot">MAINTENANCE PLAN</div>
        </Link>
        {/*
        <Link to="/schedule">
          <div className="sch_foot">GET SCHEDULE</div>
        </Link>
  */}
        <Link to="/about">
          <div className="about_foot">ABOUT</div>
        </Link>
        <Link to="/contact">
          <div className="contact_foot">CONTACT</div>
        </Link>
        <Link to="/contact">
          <div className="contact_foot">CAREERS</div>
        </Link>
      </div>
    </div>
  );
}

export default Footer;
