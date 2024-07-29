import Posserv from "./positions/posServ";

function Careersmain() {
  return (
    <div className="Careers_block">
      <div className="prev_page">
        <h2 className="prev_h">
          Your Ideal Career Choice for Air Conditioning Service
        </h2>
        <p className="prev_p">
          At SMART HVAC, we take pride in being a leading air conditioning
          service company, offering you an exceptional career opportunity. With
          us, you'll experience
        </p>
      </div>
      <div className="position_block">
        <h4 className="positions_title">Open work positions</h4>
        <div className="positions">
          <div className="positions_first_block">
            <Posserv />
          </div>
          <div className="positions_second_block"></div>
        </div>
      </div>
    </div>
  );
}

export default Careersmain;
