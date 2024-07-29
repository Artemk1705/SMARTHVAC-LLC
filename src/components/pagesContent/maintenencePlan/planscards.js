import React, { useState } from "react";
import CardArray from "./cardArray";
import "../../../assets/styles/maintanencePlan.css";

export default function PlanCard() {
  const plans = [
    {
      title: "Bronze",
      price: 199,
      annualPrice: 18.99,
      features: [
        "Annual Inspection: One comprehensive inspection and tune-up per year to ensure your HVAC system operates efficiently.",
        "Filter Replacement: Includes One Standard 1” Filter during the annual visit.",
        "Discounts: 5% discount on repairs and parts.",
        "Reduced Diagnostic fee",
        "Basic Factory warranty",
        "Priority Scheduling: Priority scheduling for maintenance and repair services.",
      ],
    },
    {
      title: "Silver",
      price: 299,
      annualPrice: 27.99,
      features: [
        "Annual Inspection: One comprehensive inspection and tune-up per year to ensure your HVAC system operates efficiently.",
        "Filter Replacement: One complimentary filter (Standard 1”) replacements annually during the annual visit.",
        "Discounts: 10% discount on repairs and parts.",
        "Reduced Diagnostic fee",
        "1 Year Parts Warranty",
        "Priority Scheduling: High-priority scheduling with reduced wait times.",
        "Service Calls: One complimentary emergency service call per year.",
        "$30 Unlimited Annual Loyalty Credit towards an upgrade.",
      ],
    },
    {
      title: "Gold",
      price: 599,
      annualPrice: 54.99,
      features: [
        "Bi-Annual Inspections: Two thorough inspections and tune-ups per year to ensure optimal performance and efficiency.",
        "Filter Replacement: Two complimentary filter (Standard 1” ) replacements annually. during the annual visit",
        "Discounts: 15% discount on all repairs, parts.",
        "Discount: 5% new equipment purchases.",
        "Priority Scheduling: Higher-priority scheduling for all services.",
        "Service Calls: Two complimentary emergency service calls per year.",
        "System Efficiency Report: Annual detailed efficiency report with personalized energy-saving recommendations.",
        "1 Thorough Component Chemical Cleaning.",
        "$75 Unlimited Annual Loyalty Credit towards an upgrade.",
      ],
    },
    {
      title: "Platinum",
      recommendation: "Favorite",
      price: 799,
      annualPrice: 73.99,
      features: [
        "Bi-Annual Inspections: Two thorough inspections and tune-ups per year to ensure optimal performance and efficiency.",
        "Filter Replacement: Two complimentary filter (Standard 1” ) replacements annually. during the annual visit",
        "Discounts: 20% Discount on Repairs and Accessories.",
        "Discount: 10% new equipment purchases.",
        "Priority Scheduling: Immediate priority scheduling for all services.",
        "Service Calls: 4 complimentary emergency service calls.",
        "System Efficiency Report: Quarterly detailed efficiency reports with personalized energy-saving strategies.",
        "Extended Warranty: Extended warranty on parts and labor for the duration of the plan.",
        "2 Thorough Component Chemical Cleaning.",
        "$150 Unlimited Annual Loyalty Credit towards an upgrade.",
      ],
    },
  ];
  return (
    <div className="plan_cards_container">
      {" "}
      <div className="plan_cards_container">
        {plans.map((plan, index) => (
          <CardArray
            key={index}
            title={plan.title}
            recommendation={plan.recommendation}
            price={plan.price}
            annualPrice={plan.annualPrice}
            features={plan.features}
          />
        ))}
      </div>
    </div>
  );
}
