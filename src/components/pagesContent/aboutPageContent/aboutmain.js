import React, { useEffect } from "react";
import LineChart from "./chart";
import Table from "./table";
import Team from "../../../assets/images/ownerPic.png";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

function Aboutpage() {
  useEffect(() => {
    gsap.set(
      [".bubble_block_first", ".bubble_block_second", ".bubble_block_third"],
      {
        opacity: "0",
      }
    );
    gsap.set(".welcome_text", { opacity: 0 });

    gsap.to(".welcome_text", {
      opacity: 1,
      duration: 2,
    });

    gsap.to(".bubble_block_first", {
      opacity: "1",
      duration: 2,
      scrollTrigger: {
        trigger: ".bubble_block_first",
        start: "top 100%",
        end: "bottom 100%",
        scrub: true,
      },
    });

    gsap.to(".bubble_block_second", {
      opacity: "1",
      duration: 1,
      scrollTrigger: {
        trigger: ".bubble_block_second",
        start: "top 100%",
        end: "bottom 100%",
        scrub: true,
      },
    });

    gsap.to(".bubble_block_third", {
      opacity: "1",
      duration: 2,
      scrollTrigger: {
        trigger: ".bubble_block_third",
        start: "top 100%",
        end: "bottom 100%",
        scrub: true,
      },
    });
    gsap.to(".about_page", {
      duration: 2,
      scrollTrigger: {
        trigger: ".welcome_block",
        start: "bottom 30%",
        end: "bottom 70%",
        scrub: 1,
      },
    });
  });
  return (
    <div className="about_page">
      <div className="welcome_abot_block">
        <h1 className="welcome_text">
          Welcome to Smart <nav className="hvac_text">HVAC</nav>
        </h1>
        <div className="arrow_block">
          <div className="about_arrow"></div>
        </div>
      </div>
      <div className="about_block">
        <div className="bubble_title">
          <img src={Team} className="main_picture_about" alt="Main" />
          <div>
            <h3 className="title_h_block">
              Smart HVAC: Your Partner for Comfort, Efficiency, and Peace of
              Mind
            </h3>
            <p>
              Choose Smart HVAC as your trusted HVAC partner and experience the
              convenience and peace of mind that comes with working with a
              multi-brand company. We are here to help you create the perfect
              indoor environment for your home, office, or commercial space.
              Thank you for considering Smart HVAC. Contact us today and let us
              bring comfort, efficiency, and reliability to your HVAC systems.
              Stay comfortable, stay smart with Smart HVAC.
            </p>
            <p className="sign">Owner</p>
          </div>
        </div>

        <div className="triple_blocks">
          <div className="bubble_block_first">
            <h3>Exceeding Expectations with Personalized HVAC Solutions</h3>
            <p>
              At Smart HVAC, we are committed to delivering exceptional service
              that exceeds your expectations. From the initial consultation to
              the final installation and beyond, we are dedicated to
              understanding your specific requirements and providing
              personalized solutions that fit your budget and deliver optimal
              performance. Customer satisfaction is at the heart of our
              business. We strive to build long-lasting relationships with our
              clients by offering transparent pricing, clear communication, and
              timely responses to your inquiries. Our team of experts is always
              available to address any concerns, provide expert advice, and
              ensure that your HVAC systems are operating at peak efficiency.
            </p>
          </div>
          <div className="bubble_block_second">
            <h3>Your Premier Destination for HVAC Solutions</h3>
            <p>
              At Smart HVAC, we are your premier destination for all your
              heating, ventilation, and air conditioning needs. As a multi-brand
              company, we take pride in our extensive partnerships with leading
              HVAC manufacturers, allowing us to offer a diverse range of
              high-quality products and services tailored to meet your specific
              requirements.
            </p>
          </div>
          <div className="bubble_block_third">
            <h3>
              Elevating Your HVAC Experience with Premier Brands and Expertise
            </h3>
            <p>
              With our vast network of brand collaborations, we bring you the
              best of the best in the HVAC industry. We understand that each
              customer has unique preferences and priorities, which is why we
              have curated a wide selection of top-tier brands, ensuring that
              you have access to cutting-edge technologies, energy-efficient
              solutions, and reliable equipment that suits your individual
              needs. Our team of experienced professionals is well-versed in
              working with multiple brands, enabling us to provide comprehensive
              services and support for a wide range of HVAC systems. Whether you
              are a homeowner, business owner, or property manager, we have the
              expertise and knowledge to handle projects of any scale or
              complexity.
            </p>
          </div>
        </div>
        <div className="chart_block">
          <h4 className="chart_title">ORDER GROWTH</h4>
          <LineChart />
        </div>
        <div className="bubble_block3">
          <h3>
            Your Trusted Partner for Customer Satisfaction and HVAC Excellence
          </h3>
          <p>
            Customer satisfaction is at the heart of our business. We strive to
            build long-lasting relationships with our clients by offering
            transparent pricing, clear communication, and timely responses to
            your inquiries. Our team of experts is always available to address
            any concerns, provide expert advice, and ensure that your HVAC
            systems are operating at peak efficiency. With Smart HVAC, you can
            expect a seamless experience from start to finish. Our technicians
            are highly skilled, trained, and certified to work with various
            brands, ensuring that your HVAC systems are installed, repaired, and
            maintained to the highest industry standards.
          </p>
        </div>
      </div>
    </div>
  );
}

export default Aboutpage;
