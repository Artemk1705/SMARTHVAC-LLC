import React, { useState } from "react";
import "../../../assets/styles/maintanencePlan.css";

export default function ExplanArray({ title, paragr }) {
  const [isOpenExplain, setIsOpenExplain] = useState(false);

  const clickFull = () => {
    setIsOpenExplain(!isOpenExplain);
  };

  return (
    <div className="explanation_block">
      <div className="explanation_content" onClick={clickFull}>
        <div className="explanation_title_block">
          <div className="explanation_title">{title}</div>
          <div
            className={`explanation_arrow_block ${
              isOpenExplain ? "active" : ""
            }`}
          >
            <div className="explanation_arrow_1"></div>
            <div className="explanation_arrow_2"></div>
          </div>
        </div>
        {isOpenExplain && <p className="explanation_paragraph">{paragr}</p>}
      </div>
    </div>
  );
}
