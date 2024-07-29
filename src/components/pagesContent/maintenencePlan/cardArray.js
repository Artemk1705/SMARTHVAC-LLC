import React, { useState } from "react";
import PlanForm from "./planForm";
import "../../../assets/styles/maintanencePlan.css";

function CardArray({ title, recommendation, price, annualPrice, features }) {
  const [isExpanded, setIsExpanded] = useState(false);
  const [showForm, setShowForm] = useState(false);
  const [selectedTitle, setSelectedTitle] = useState("");

  const toggleExpansion = () => {
    setIsExpanded(!isExpanded);
  };

  const handleApplyClick = () => {
    setSelectedTitle(title);
    setShowForm(true);
  };

  const handleCloseForm = () => {
    setShowForm(false);
  };

  return (
    <div>
      <div className={`plan_card ${title.toLowerCase()}_card`}>
        <div className={`plan_card_title ${title.toLowerCase()}`}>
          <h2 className="card_title">{title}</h2>
          <h3 className="plan_card_rec">{recommendation}</h3>
        </div>
        <div className="plan_card_content">
          <div className="plan_card_price">
            <nav className="price_nav">$</nav>
            {price}
          </div>
          <div className="plan_card_price_par">Billed annually</div>
          <div className="plan_card_price_par">
            or <nav className="month_price">${annualPrice}</nav> billed monthly
          </div>
        </div>
        <div className={`plan_card_features ${isExpanded ? "expanded" : ""}`}>
          <ul className="plan_card_list">
            {features.map((feature, index) => (
              <li key={index} className="plan_card_point">
                {feature}
              </li>
            ))}
            {isExpanded && (
              <>
                <li className="plan_card_point">
                  Additional Information for {title} plan.
                </li>
              </>
            )}
          </ul>
        </div>
        <div className="plan_card_button_container">
          <button className="plan_card_apply" onClick={handleApplyClick}>
            APPLY
          </button>
        </div>
        <button className="toggle_button" onClick={toggleExpansion}>
          {isExpanded ? "HIDE INFORMATION" : "SHOW INFORMATION"}
        </button>
      </div>
      {showForm && <PlanForm title={selectedTitle} onClose={handleCloseForm} />}
    </div>
  );
}

export default CardArray;
