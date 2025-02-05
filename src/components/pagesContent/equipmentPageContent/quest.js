import React, { useState, useEffect } from "react";
import Equipment from "./equipContent";

const Questionnaire = () => {
  const [currentLevel, setCurrentLevel] = useState(0);
  const [selectedPath, setSelectedPath] = useState([]);
  const [filteredEquipment, setFilteredEquipment] = useState([]);
  const [showEquipment, setShowEquipment] = useState(false);

  const questions = {
    0: ["Single Fam", "Condo", "Mobile", "Townhome", "Commercial"],
    1: ["New Installation", "Replacement"],
    2: ["Gas", "Electrical", "Minisplit"],
    3: {
      Gas: ["AC", "Heat Pump", "Both"],
      Electrical: ["Air Handler", "Heat Pump"],
      Minisplit: ["Single Zone", "Multi Zone"],
    },
    4: [
      "<1000 sqft",
      "1000-1500 sqft",
      "1500-2000 sqft",
      "2000-2500 sqft",
      "2500-3000 sqft",
      "3000-3500 sqft",
      ">3500 sqft",
    ],
  };

  const getPowerByHouseSize = (size) => {
    const sizeMap = {
      "<1000 sqft": "2.0",
      "1000-1500 sqft": "2.0",
      "1500-2000 sqft": "2.5",
      "2000-2500 sqft": "3.0",
      "2500-3000 sqft": "3.5",
      "3000-3500 sqft": "4.0",
      ">3500 sqft": "5.0",
    };
    return sizeMap[size] || null;
  };

  const handleBlockClick = (block) => {
    setSelectedPath([...selectedPath, block]);
    if (currentLevel === 3) {
      setCurrentLevel(4);
    } else if (currentLevel === 4) {
      const power = getPowerByHouseSize(block);
      fetchFilteredEquipment(power);
      setShowEquipment(true);
    } else {
      setCurrentLevel(currentLevel + 1);
    }
  };

  const handleBack = () => {
    if (showEquipment) {
      setShowEquipment(false);
      setCurrentLevel(4);
    } else if (currentLevel > 0) {
      setSelectedPath(selectedPath.slice(0, -1));
      setCurrentLevel(currentLevel - 1);
    }
  };

  const fetchFilteredEquipment = async (power) => {
    try {
      const response = await fetch(`/equip?power=${power}`);
      const data = await response.json();
      setFilteredEquipment(data.slice(0, 3));
    } catch (error) {
      console.error("Ошибка загрузки данных:", error);
    }
  };

  const getCurrentBlocks = () => {
    if (currentLevel === 0) return questions[0];
    if (currentLevel === 1) return questions[1];
    if (currentLevel === 2) return questions[2];
    if (currentLevel === 3) return questions[3][selectedPath[2]] || [];
    if (currentLevel === 4) return questions[4];
    return [];
  };

  return (
    <div style={{ padding: "20px", fontFamily: "Arial, sans-serif" }}>
      {!showEquipment ? (
        <>
          <h1>Выбор оборудования</h1>
          <h2>Шаг {currentLevel + 1}</h2>

          <div style={{ display: "flex", gap: "10px", flexWrap: "wrap" }}>
            {Array.isArray(getCurrentBlocks()) &&
              getCurrentBlocks().map((block, index) => (
                <button
                  key={index}
                  onClick={() => handleBlockClick(block)}
                  style={{
                    padding: "10px 20px",
                    border: "1px solid #ccc",
                    borderRadius: "5px",
                    background: "#f0f0f0",
                    cursor: "pointer",
                  }}
                >
                  {block}
                </button>
              ))}
          </div>

          {currentLevel > 0 && (
            <button
              onClick={handleBack}
              style={{
                marginTop: "20px",
                padding: "10px 20px",
                border: "none",
                borderRadius: "5px",
                background: "#ffcccc",
                cursor: "pointer",
              }}
            >
              Назад
            </button>
          )}
        </>
      ) : (
        <>
          <Equipment selectedEquipment={filteredEquipment} />
          <button
            onClick={handleBack}
            style={{
              marginTop: "20px",
              padding: "10px 20px",
              border: "none",
              borderRadius: "5px",
              background: "#ffcccc",
              cursor: "pointer",
            }}
          >
            Назад
          </button>
        </>
      )}
    </div>
  );
};

export default Questionnaire;
