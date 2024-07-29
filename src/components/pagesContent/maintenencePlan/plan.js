import PlanCard from "./planscards";
import ExplainComp from "./explanation";
import MaintenanceTable from "./maintenenceTable";
import "../../../assets/styles/maintanencePlan.css";

export default function MainPlan() {
  return (
    <div className="plan_container">
      <div className="plan_title_block">
        <h2 className="plan_title">
          Stay Comfortable Year-Round with Our Comprehensive HVAC Maintenance
          Plan
        </h2>
        <p className="plan_par_title">
          Keep your HVAC system running at peak efficiency with our regular
          maintenance checks. A well-maintained system not only keeps your home
          comfortable but also reduces energy consumption and lowers utility
          bills.
        </p>
      </div>
      <PlanCard />
      <div className="table_cont">
        <MaintenanceTable />
      </div>
      <div className="exp_cont">
        <ExplainComp />
      </div>
    </div>
  );
}
