import React, { useEffect } from "react";

const FurnaceFilter = ({ furnaceType, setFurnaceType }) => {
  const furnaceOptions = [
    "Two stage",
    "Single stage",
    "Variable two stage",
    "Modulating Variable",
  ];

  // Устанавливаем "Two stage" при первом рендере
  useEffect(() => {
    if (!furnaceType) {
      setFurnaceType("Two stage");
    }
  }, [furnaceType, setFurnaceType]);

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
