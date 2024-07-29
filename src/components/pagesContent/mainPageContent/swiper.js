import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination } from "swiper/modules";
import { Link } from "react-router-dom";
import "swiper/css/bundle";
import ACMaintenece from "../../../assets/images/Services/AC Maintenance.png";
import ACRepair from "../../../assets/images/Services/AC Repair.png";
import ACReplace from "../../../assets/images/Services/AC Replace.png";
import MiniInstall from "../../../assets/images/Services/Mini-split install.png";
import MiniPepair from "../../../assets/images/Services/Mini-split repair.png";
import FurnaceRepair from "../../../assets/images/Services/Furnace Repair.png";
import FurnaceInstall from "../../../assets/images/Services/Furnace install.png";
import Maintenence from "../../../assets/images/Services/Reg Maintenance.png";
import EmergencyService from "../../../assets/images/Services/Emergency service.png";

const styles = {
  img: {
    maxWidth: "100%",
    height: "auto",
  },
};

const SwiperComp = () => {
  return (
    <Swiper
      modules={[Navigation, Pagination]}
      className="swiper_cont"
      loop={true}
      spaceBetween={25}
      slidesPerView={3}
      slidesPerGroup={3}
      centeredSlides={true}
      navigation
      pagination={{
        type: "bullets",
        clickable: true,
      }}
      speed={700}
      breakpoints={{
        300: {
          slidesPerView: 1,
          slidesPerGroup: 1,
          spaceBetween: 50,
        },
        480: {
          slidesPerView: 1,
          spaceBetween: 50,
          slidesPerGroup: 1,
        },
        500: {
          slidesPerView: 2,
          slidesPerGroup: 1,
          spaceBetween: 150,
        },
        550: {
          slidesPerGroup: 1,
          slidesPerView: 2,
          spaceBetween: 150,
        },
        675: {
          slidesPerView: 2,
          slidesPerGroup: 1,
          spaceBetween: 50,
        },
        800: {
          slidesPerView: 2,
          slidesPerGroup: 1,
        },
        1000: {
          slidesPerView: 1,
          slidesPerGroup: 1,
        },
        1100: {
          slidesPerView: 3,
          slidesPerGroup: 3,
        },
        1300: {
          slidesPerView: 3,
          spaceBetween: 1,
        },
        1400: {
          slidesPerView: 3,
          spaceBetween: 1,
        },
      }}
    >
      <SwiperSlide>
        <Link to="./serv/AC_M">
          <div className="swiper-slide">
            <div className="card">
              <div className="round">
                <img
                  className="photo_AC_main"
                  src={ACMaintenece}
                  style={styles.img}
                  alt="Work"
                />
              </div>
              <div className="card_container">
                <h4 className="card_title">
                  <b>AC Maintenance</b>
                </h4>
                <p className="card_par">
                  Regular AC maintenance is an essential aspect of ensuring
                  optimal performance and longevity for your air conditioner.
                </p>
              </div>
            </div>
          </div>
        </Link>
      </SwiperSlide>
      <SwiperSlide>
        <Link to="./serv/AC_rep">
          <div className="swiper-slide">
            <div className="card">
              <div className="round">
                <img
                  className="photo_AC_rep"
                  src={ACRepair}
                  style={styles.img}
                  alt="work"
                />
              </div>
              <div className="card_container">
                <h4 className="card_title">
                  <b>AC Repair</b>
                </h4>
                <p className="card_par">
                  When it comes to air conditioning systems, the decision to
                  repair or replace an old unit can be a difficult one.
                </p>
              </div>
            </div>
          </div>
        </Link>
      </SwiperSlide>
      <SwiperSlide>
        <Link to="./serv/AC_repl">
          <div className="swiper-slide">
            <div className="card">
              <div className="round">
                <img
                  className="photo_AC"
                  src={ACReplace}
                  style={styles.img}
                  alt="work"
                />
              </div>
              <div className="card_container">
                <h4 className="card_title">
                  <b>AC Replacement/New installation</b>
                </h4>
                <p className="card_par">
                  Selecting the appropriate air conditioning (AC) equipment is
                  crucial for maintaining comfort and energy efficiency in your
                  home.
                </p>
              </div>
            </div>
          </div>
        </Link>
      </SwiperSlide>
      <SwiperSlide>
        <Link to="./serv/Minspinst">
          <div className="swiper-slide">
            <div className="card">
              <div className="round">
                <img
                  className="photo_Mini_inst"
                  src={MiniInstall}
                  style={styles.img}
                  alt="work"
                />
              </div>
              <div className="card_container">
                <h4 className="card_title">
                  <b>Mini Split installation estimate</b>
                </h4>
                <p className="card_par">
                  Selecting the appropriate AC/HP (Heat Pump) mini split system
                  is crucial for efficient cooling and heating in your home.
                </p>
              </div>
            </div>
          </div>
        </Link>
      </SwiperSlide>
      <SwiperSlide>
        <Link to="./serv/Minsprep">
          {" "}
          <div className="swiper-slide">
            <div className="card">
              <div className="round">
                <img
                  className="photo_Mini_split"
                  src={MiniPepair}
                  style={styles.img}
                  alt="work"
                />
              </div>
              <div className="card_container">
                <h4 className="card_title">
                  <b>Mini Split Repair/Maintenance</b>
                </h4>
                <p className="card_par">
                  Timely maintenance of your mini-split/heat pump system is
                  vital for both your health and your budget.
                </p>
              </div>
            </div>
          </div>
        </Link>
      </SwiperSlide>
      <SwiperSlide>
        <Link to="./serv/Furrep">
          <div className="swiper-slide">
            <div className="card">
              <div className="round">
                <img
                  className="photo_Fur_r"
                  src={FurnaceRepair}
                  style={styles.img}
                  alt="work"
                />
              </div>
              <div className="card_container">
                <h4 className="card_title">
                  <b>Furnace repair</b>
                </h4>
                <p className="card_par">
                  While furnace maintenance is crucial, repairs may not always
                  be worthwhile, especially considering the AFUE rating.
                </p>
              </div>
            </div>
          </div>
        </Link>
      </SwiperSlide>
      <SwiperSlide>
        <Link to="./serv/Fur">
          <div className="swiper-slide">
            <div className="card">
              <div className="round">
                <img
                  className="photo_Fur"
                  src={FurnaceInstall}
                  style={styles.img}
                  alt="work"
                />
              </div>
              <div className="card_container">
                <h4 className="card_title">
                  <b> Furnace/AC/Heat Pump Replacement/New installation</b>
                </h4>
                <p className="card_par">
                  Choosing the right furnace for your home is a significant
                  decision, and the expertise of a SMART HVAC specialist can be
                  invaluable throughout the process.{" "}
                </p>
              </div>
            </div>
          </div>
        </Link>
      </SwiperSlide>
      <SwiperSlide>
        <Link to="./serv/Maint">
          <div className="swiper-slide">
            <div className="card">
              <div className="round">
                <img
                  className="photo_Maint"
                  src={Maintenence}
                  style={styles.img}
                  alt="work"
                />
              </div>
              <div className="card_container">
                <h4 className="card_title">
                  <b>Maintenance</b>
                </h4>
                <p className="card_par">
                  Regular maintenance of HVAC (Heating, Ventilation, and Air
                  Conditioning) equipment and ventilation systems is crucial for
                  both the health and longevity of the equipment.
                </p>
              </div>
            </div>
          </div>
        </Link>
      </SwiperSlide>
      <SwiperSlide>
        <Link to="./serv/Emerg">
          <div className="swiper-slide">
            <div className="card">
              <div className="round">
                <img
                  className="photo_Emerg"
                  src={EmergencyService}
                  style={styles.img}
                  alt="work"
                />
              </div>
              <div className="card_container">
                <h4 className="card_title">
                  <b>Emergency service</b>
                </h4>
                <p className="card_par">
                  Introducing "Smart HVAC" - your reliable heating, ventilation,
                  and air conditioning (HVAC) service provider offering
                  top-notch Emergency service
                </p>
              </div>
            </div>
          </div>
        </Link>
      </SwiperSlide>
    </Swiper>
  );
};

export default SwiperComp;
