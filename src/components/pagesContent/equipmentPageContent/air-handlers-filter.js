import React from "react";

const AirHandlerFilter = ({ airHandlerType, setAirHandlerType }) => {
  const airHandlerOptions = ["Variable Speed", "Multy Speed"];

  return (
    <div className="furnace-filter">
      <h3 className="filter-title">Select Air Handler Type</h3>
      <div className="filter-buttons">
        {airHandlerOptions.map((option) => (
          <button
            key={option}
            className={`filter-btn ${
              airHandlerType === option ? "active" : ""
            }`}
            onClick={() => setAirHandlerType(option)}
          >
            {option}
          </button>
        ))}
      </div>
    </div>
  );
};

export default AirHandlerFilter;
