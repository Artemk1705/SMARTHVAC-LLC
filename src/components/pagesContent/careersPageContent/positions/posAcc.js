import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";

function Posacc() {
  const [isBlockVisible, setIsBlockVisible] = useState(false);
  const [isBlockRendered, setIsBlockRendered] = useState(false);
  const [blockHeight, setBlockHeight] = useState(0);

  useEffect(() => {
    const handleResize = () => {
      const windowHeight = window.innerHeight;
      setBlockHeight(windowHeight);
    };

    handleResize();

    window.addEventListener("resize", handleResize);
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  const handleDivClick = () => {
    if (!isBlockVisible) {
      setIsBlockRendered(true);
      setTimeout(() => {
        setIsBlockVisible(true);
      }, 20);
    }
  };

  const handleCloseClick = (event) => {
    event.stopPropagation();
    setIsBlockVisible(false);
    setTimeout(() => {
      setIsBlockRendered(false);
    }, 1000);
  };

  return (
    <div className="serv_pos">
      <div className="position">
        <h4 className="position_title">Office Assistant</h4>
        <p className="position_p">
          We are seeking a motivated and organized Office Assistant to join our
          team.
        </p>
        <button onClick={handleDivClick} className="info-button">
          MORE
        </button>
      </div>
      {isBlockRendered && (
        <div className={`block ${isBlockVisible ? "visible" : ""}`}>
          <div onClick={handleCloseClick} className="close-button"></div>
          <div className="block-content">
            <div>
              <div className="title_apply">
                <h4 className="full_header">HVAC Service Technician</h4>
                <Link to="/careerforms/Servform">
                  <div className="apply_button">APPLY</div>
                </Link>
              </div>
              <p className="full_pa">
                Smart Hvac is a reliable company with a good reputation in
                Clark, Cowlitz, Skamania, Lewis, Yakima, Klickitat WA counties.
                We are seeking a motivated and organized Office Assistant to
                join our team. The ideal candidate should have excellent
                communication skills, be proficient in basic office software,
                and have a strong command of Microsoft Excel.
              </p>
              <h4 className="req_title">Requirements</h4>
              <ul className="req_list">
                <li>
                  Proficiency in Microsoft Excel and other basic office software
                </li>
                <li>
                  Excellent English language skills (both written and spoken)
                </li>
                <li>Russian language skills are preferred but not required</li>
                <li>Strong organizational and multitasking abilities</li>
                <li>Ability to work 20 hours or more per week.</li>
                <li>Must be able to pass drug & background check.</li>
              </ul>
              <h4 className="req_title">Key Responsibilities</h4>
              <ul className="req_list">
                <li>Answer and direct phone calls</li>
                <li>Schedule appointments and manage calendars</li>
                <li>Assist with general administrative tasks</li>
              </ul>
              <p className="full_pa">
                Salary: Compensation is negotiable and will be discussed during
                the interview process.
              </p>
              <p className="full_pa">Rate + bonus.</p>
              <p className="full_pa">
                We host company sponsored events for the employees and their
                families. Company provides I-Pads for field Staff.
              </p>
              <p className="full_pa">
                Responses without resume will not be considered.
              </p>
              <p className="full_pa">We look forward to hearing from you!</p>
              <div className="container_button"></div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default Posacc;
