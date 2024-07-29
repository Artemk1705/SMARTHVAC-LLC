import React from "react";

const data = [
  { bronze: "Bronze", silver: "Silver", gold: "Gold", platinum: "Platinum" },
  {
    bronze:
      "Annual Inspection: One comprehensive inspection and tune-up per year to ensure your HVAC system operates efficiently",
    silver:
      "Annual Inspection: One comprehensive inspection and tune-up per year to ensure your HVAC system operates efficiently.",
    gold: " Bi-Annual Inspections: Two thorough inspections and tune-ups per year to ensure optimal performance and efficiency.",
    platinum:
      "Bi-Annual Inspections: Two thorough inspections and tune-ups per year to ensure optimal performance and efficiency.",
  },
  {
    bronze:
      "Filter Replacement: Includes One Standard 1” Filter during the annual visit.",
    silver:
      "Filter Replacement: One complimentary filter (Standard 1” ) replacements annually. during the annual visit.",
    gold: "Filter Replacement: Two complimentary filter (Standard 1” ) replacements annually. during the annual visit.",
    platinum:
      "Filter Replacement: Two complimentary filter (Standard 1” ) replacements annually. during the annual visit.",
  },
  {
    bronze: "Discounts: 5% discount on repairs and parts.",
    silver: "Discounts: 10% discount on repairs and parts.",
    gold: "Discounts: 15% discount on all repairs, parts.",
    platinum: "Discounts: 20% Discount on Repairs and Accessories.",
  },
  {
    bronze: "Reduced Diagnostic fee",
    silver: "Reduced Diagnostic fee",
    gold: "Discounts: 15% discount on all repairs, parts.",
    platinum: "Discount: 10% new equipment purchases.",
  },
  {
    bronze: "Basic Factory warranty",
    silver: "1 Year Parts Warranty",
    gold: "1 Year Parts Warranty",
    platinum:
      "Extended Warranty: Extended warranty on parts and labor for the duration of the plan.",
  },
  {
    bronze:
      "Priority Scheduling: Priority scheduling for maintenance and repair services.",
    silver:
      "Priority Scheduling: High-priority scheduling with reduced wait times.",
    gold: "Priority Scheduling: Higher-priority scheduling for all services.",
    platinum:
      "Priority Scheduling: Immediate priority scheduling for all services.",
  },
  {
    bronze: "-",
    silver: "Service Calls: One complimentary emergency service call per year.",
    gold: "Service Calls: Two complimentary emergency service calls per year.",
    platinum: "Service Calls: 4 complimentary emergency service calls.",
  },
  {
    bronze: "-",
    silver: "$30 Unlimited Annual Loyalty Credit towards an upgrade.",
    gold: "$75 Unlimited Annual Loyalty Credit towards an upgrade.",
    platinum: "$150 Unlimited Annual Loyalty Credit towards an upgrade.",
  },
  {
    bronze: "-",
    silver: "-",
    gold: "1 Thorough Component Chemical Cleaning.",
    platinum: "2 Thorough Component Chemical Cleaning",
  },
  {
    bronze: "-",
    silver: "-",
    gold: "System Efficiency Report: Annual detailed efficiency report with personalized energy-saving recommendations.",
    platinum:
      "System Efficiency Report: Quarterly detailed efficiency reports with personalized energy-saving strategies.",
  },
  {
    bronze: "-",
    silver: "-",
    gold: "-",
    platinum: "$150 Unlimited Annual Loyalty Credit towards an upgrade.",
  },
];

const MaintenanceTable = () => (
  <div className="table_plan_container">
    <div className="column">
      <div className="header-row">Bronze</div>
      {data.slice(1).map((row, index) => (
        <div key={index} className={index % 2 === 0 ? "row-even" : "row-odd"}>
          {row.bronze}
        </div>
      ))}
    </div>
    <div className="column">
      <div className="header-row">Silver</div>
      {data.slice(1).map((row, index) => (
        <div key={index} className={index % 2 === 0 ? "row-even" : "row-odd"}>
          {row.silver}
        </div>
      ))}
    </div>
    <div className="column">
      <div className="header-row">Gold</div>
      {data.slice(1).map((row, index) => (
        <div key={index} className={index % 2 === 0 ? "row-even" : "row-odd"}>
          {row.gold}
        </div>
      ))}
    </div>
    <div className="column">
      <div className="header-row">Platinum</div>
      {data.slice(1).map((row, index) => (
        <div key={index} className={index % 2 === 0 ? "row-even" : "row-odd"}>
          {row.platinum}
        </div>
      ))}
    </div>
  </div>
);

export default MaintenanceTable;
