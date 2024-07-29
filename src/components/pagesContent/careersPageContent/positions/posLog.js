import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";

function PosManager() {
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
        <h4 className="position_title">Project Manager/Estimator</h4>
        <p className="position_p">
        We are searching for a reliable, self -starter with the ability to problem solve in the field and lead a team of apprentice laborers.
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
              <div className="title_apply"><h4 className="full_header">Apex Mechanical</h4>
              <Link to="/careerforms/Servform">
                  <div className="apply_button">APPLY</div>
                </Link>
              </div>
              <p className="full_pa">
              Apex Mechanical is a family owned and operated business based in Battle Ground, WA. We are searching for a reliable, self -starter with the ability to problem solve in the field and lead a team of apprentice laborers. An Experienced HVAC/R Journeyman to install heating, ventilation, and air conditioning (HVAC/R) systems in our clients’ buildings. Experience with sheet metal work and refrigeration is preferred.

              </p>
              <h4 className="req_title">Requirements</h4>
              <ul className="req_list">
                <li>
                HVAC Installation, 5 years - preferred.
                </li>
                <li>
                Sheet Metal Work and Refrigeration - preferred.
                </li>
                <li>
                Comply with safety rules, policies, and procedures.
                </li>
                <li>
                Perform work assignments both with a team and independently.
                </li>
                <li> 
                  Install new HVAC systems in new build or renovation projects.
                </li>
                <li>
                  Professionally Communication with co-workers, managers, and customers.
                </li>
                <li>
                  Use proper personal protective equipment.
                </li>
                <li>
                  Present a professional appearance and conduct
                </li>
                <li>
                Follow blueprints from other HVAC specialists or design your own systems.
                </li>
                <li>
                Test and troubleshoot your installations after completion.
                </li>
                <li>
                Basic record- keeping techniques.
                </li>
                <li>
                Complete system installs in accordance with state and local regulations.
                </li>
                <li>
                Travel to job locations as scheduled.
                </li>
                <li>
                Must be able to pass drug & background check.
                </li>
              </ul>
              <h4 className="req_title">License/Certification</h4>
              <ul className="req_list">
                <li> 
                Driver’s License (Required)
              </li>
              <li>
                EPA Section 608 Universal (Required)
              </li>
              <li>
                OSHA 10 (Preferred)
              </li>
              <li>
                Refrigeration Card (Preferred)
              </li>
              <li>
                Class 5 Boiler (a plus)
              </li>
              <li>
                CDL (a plus)
              </li>
              </ul>
              <h4 className="req_title">Benefits</h4>
              <p className="full_pa">
              We offer 13 paid holidays, up to 3 weeks paid vacation, 401K, 100% paid health insurance
              including family, dental and vision. We host company sponsored events for the employees
              and their families. Company provides I-Pads for field Staff.
              </p>
              <p className="full_pa">
              Responses without resume will not be considered.
              </p>
              <p className="full_pa"> 
              Apex Mechanical is an equal opportunity employer.
              </p>
              <p className="full_pa">
              We look forward to hearing from you!
              </p>
              <div className="container_button">
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default PosManager;
