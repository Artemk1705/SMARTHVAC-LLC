import React, { lazy, Suspense } from "react";
import { useMediaQuery } from "react-responsive";
import { Link } from "react-router-dom";
import "../../../assets/styles/index.css";
import Photob from "../../../assets/images/HvacMainBack.jpg";
import Photob2 from "../../../assets/images/HvacMainBack.jpg";

const SwiperComp = lazy(() => import("./swiper"));
const ReviewBlock = lazy(() => import("./rewies"));
const FormDis = lazy(() => import("./form-discount"));
const PartnersBlock = lazy(() => import("./pratners"));
const Fincaning = lazy(() => import("./financing"));
const Footer = lazy(() => import("../../layout/footer"));

function Main() {
  const isDesktopOrLaptop = useMediaQuery({ minDeviceWidth: 850 });
  const isTabletOrMobile = useMediaQuery({ maxDeviceWidth: 849 });

  return (
    <div className="container">
      <div className="main_content">
        <div className="title_main_page">
          <div className="title_left_side">
            <div className="Head_text">
              <h1 className="head_text1">CREATING COMFORT & </h1>
              <h1 className="head_text2">ENSURING SATISFACTION</h1>
            </div>
            <button className="button_get_sch">
              <a href="https://book.housecallpro.com/book/Smart-HVAC-LLC/873f1cd3570a4061a22cdf1c843d46ea?v2=true">
                GET SCHEDULE
              </a>
            </button>
          </div>
          <div>
            {isDesktopOrLaptop && (
              <img
                className="photo"
                src={Photob}
                alt="conditioning"
                loading="eager"
              />
            )}
            {isTabletOrMobile && (
              <img
                className="photo"
                src={Photob2}
                alt="conditioning"
                loading="eager"
              />
            )}
          </div>
        </div>
        <div className="main_block">
          <div className="main_text">
            <div className="title_welcome">
              <div className="text_welc">WELCOME TO</div>{" "}
              <div className="text_Smart">SMART</div>
              <div className="text_Hvac">HVAC</div>
            </div>{" "}
            <p className="text_i">
              - your trusted partner in air conditioning services! We provide
              high-quality installation, maintenance, repair, and upgrade
              solutions for air conditioning systems. Our team of experienced
              professionals ensures comfort and coziness in your home or office.
              We take pride in our reputation as a reliable company that offers
              personalized attention to each client. Contact us today to embark
              on the journey towards an optimal climate that meets your needs.
            </p>
          </div>
        </div>
        <div className="services_content">
          <h3 className="serv_text">OUR SERVICES</h3>
          <Suspense fallback={<div>Loading...</div>}>
            <SwiperComp />
          </Suspense>
        </div>
        <div className="full_reviews">
          <p className="goog_reviws"> </p>
          <div className="block_reviews">
            <Suspense fallback={<div>Loading...</div>}>
              <ReviewBlock />
            </Suspense>
          </div>
        </div>
        <div>
          <Suspense fallback={<div>Loading...</div>}>
            <PartnersBlock />
          </Suspense>
        </div>
        <div>
          <Suspense fallback={<div>Loading...</div>}>
            <FormDis />
          </Suspense>
        </div>
        <div>
          <Suspense fallback={<div>Loading...</div>}>
            <Fincaning />
          </Suspense>
        </div>
        <div>
          <Suspense fallback={<div>Loading...</div>}>
            <Footer />
          </Suspense>
        </div>
      </div>
    </div>
  );
}

export default Main;
