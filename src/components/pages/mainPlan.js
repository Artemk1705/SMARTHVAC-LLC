import { useEffect } from "react";
import Navbar from "../layout/navbar";
import Footer from "../layout/footer";
import MainPlan from "../pagesContent/maintenencePlan/plan";
import "../../assets/styles/index.css";
import "../../assets/styles/Contact.css";
import "../../assets/styles/maintanencePlan.css";

export default function MaintenancePlan() {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);
  return (
    <div className="main_plan">
      <Navbar />
      <MainPlan />
      <div>
        <Footer />
      </div>
    </div>
  );
}
