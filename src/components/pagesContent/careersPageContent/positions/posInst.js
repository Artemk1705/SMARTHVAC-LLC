import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";

function Posinst() {
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
        <h4 className="position_title">HVAC Installer</h4>
        <p className="position_p">
          We are searhcing a skilled and experienced HVAC Installer to join our
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
                <h4 className="full_header">HVAC Installer</h4>
                <Link to="/careerforms/Servform">
                  <div className="apply_button">APPLY</div>
                </Link>
              </div>
              <p className="full_pa">
                We are seeking a skilled and experienced HVAC Installer to join
                our team. As an HVAC Installer, you will be responsible for
                installing, repairing, and maintaining heating, ventilation, and
                air conditioning systems in residential and commercial settings.
                This is a full-time position with competitive pay and benefits.
              </p>
              <h4 className="req_title">Requirements and Responsibility</h4>
              <ul className="req_list">
                <li>
                  Proven 1 year experience as an HVAC Installer or similar role.
                </li>
                <li>
                  Strong knowledge of refrigeration principles and practices
                </li>
                <li>Proficient in equipment repair and maintenance.</li>
                <li>
                  Familiarity with air conditioning systems and components.
                </li>
                <li>
                  Excellent mechanical knowledge and troubleshooting skills.
                </li>
                <li>Ability to read blueprints and technical drawings.</li>
                <li>
                  Experience in field service or a related field is a plus.
                </li>
                <li>Install/reinstall furnaces/air handlers.</li>
                <li>Evacuate, charge any AC or Heat pump.</li>
                <li>
                  braze, experience build any fitting on site with flat stock.
                </li>
                <li>Must be able to pass drug & background check.</li>
              </ul>

              <h4 className="req_title">License/Certification</h4>
              <ul className="req_list">
                <li>Driver’s License (Required).</li>
                <li>HVAC technician</li>
                <li>Certifications for Journey.</li>
                <li>Low Voltage.</li>
                <li>EPA 608.</li>
                <li>CFC card.</li>
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

export default Posinst;
