import Navform from "./navform";
import EmploymentForm from "./form";
import { useEffect } from "react";

function Servform() {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);
  return (
    <div className="career_form_block">
      <div className="nav_arrow">
        <Navform />
      </div>
      <EmploymentForm />
    </div>
  );
}

export default Servform;
