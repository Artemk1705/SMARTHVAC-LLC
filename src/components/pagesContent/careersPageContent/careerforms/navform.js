import { Link } from "react-router-dom";

function Navform() {
  return (
    <div className="nav_block_form">
      <div class="arrow-container">
        <div class="arrow-head"></div>
      </div>
      <Link to="/careers">CAREERS</Link>
    </div>
  );
}

export default Navform;
