import React from "react";

const FurnaceFilter = ({ furnaceType, setFurnaceType }) => {
  const furnaceOptions = [
    "Single stage",
    "Two stage",
    "Variable two stage",
    "Modulating Variable",
  ];

  return (
    <div className="furnace-filter">
      <h3 className="filter-title">Select Furnace Type</h3>
      <div className="filter-buttons">
        {furnaceOptions.map((option) => (
          <button
            key={option}
            className={`filter-btn ${furnaceType === option ? "active" : ""}`}
            onClick={() => setFurnaceType(option)}
          >
            {option}
          </button>
        ))}
      </div>
    </div>
  );
};

export default FurnaceFilter;
