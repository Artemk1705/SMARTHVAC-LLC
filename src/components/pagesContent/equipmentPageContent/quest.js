import React, { useState } from "react";
import CustomSlider from "./slider";

const API_URL =
  "https://r44benc4hk.execute-api.us-east-1.amazonaws.com/dev/equip";

// ✅ Словарь компаний
const companyNames = {
  1: "American Standart",
  2: "Mitsubishi",
  3: "Hitachi",
  4: "Ameristar",
  5: "York",
};

// ✅ Вопросы опросника
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

const Questionnaire = () => {
  const [currentStep, setCurrentStep] = useState(0); // Текущий шаг
  const [selectedAnswers, setSelectedAnswers] = useState(["", "", "", ""]); // Ответы пользователя
  const [filteredEquipment, setFilteredEquipment] = useState([]);
  const [showEquipment, setShowEquipment] = useState(false);
  const [value, setValue] = useState(50);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  // ✅ Соответствие мощности дому
  const getPowerByHouseSize = (size) => {
    const sizeMap = {
      "<1000 sqft": "2.0",
      "1000-1500 sqft": "2.5",
      "1500-2000 sqft": "3.0",
      "2000-2500 sqft": "3.5",
      "2500-3000 sqft": "4.0",
      "3000-3500 sqft": "5.0",
      ">3500 sqft": "6.0",
    };
    return sizeMap[size] || null;
  };

  // ✅ Определяем нужную категорию для запроса
  const getCategoryForRequest = () => {
    const system = selectedAnswers[3]; // Выбранная система (AC, Heat Pump и т. д.)
    const categoryMap = {
      AC: "air_conditioners",
      "Heat Pump": "heat_pumps",
      Both: "air_conditioners", // Можно оставить только AC или сделать отдельный запрос
      "Air Handler": "air_handlers",
      "Single Zone": "mini_splits",
      "Multi Zone": "mini_splits",
      Furnace: "furnace",
    };
    return categoryMap[system] || null;
  };

  // ✅ Запрос данных с сервера
  const fetchFilteredEquipment = async (power) => {
    const category = getCategoryForRequest();
    if (!category) {
      console.error("❌ Ошибка: Неизвестная категория оборудования.");
      return;
    }

    console.log(
      "🔎 Отправляем запрос в таблицу:",
      category,
      "с мощностью:",
      power
    );

    try {
      const response = await fetch(
        `${API_URL}?category=${category}&power=${power}`
      );

      if (!response.ok) {
        throw new Error(`Ошибка сервера: ${response.status}`);
      }

      const data = await response.json();
      console.log("📜 Получены данные:", data);

      setFilteredEquipment(Array.isArray(data) ? data : []);
      setShowEquipment(true);
    } catch (error) {
      console.error("❌ Ошибка при загрузке данных:", error);
      setFilteredEquipment([]);
      setShowEquipment(true);
    }
  };

  // ✅ Обработка выбора ответа
  const handleAnswer = (answer) => {
    let newAnswers = [...selectedAnswers];
    newAnswers[currentStep] = answer; // Сохраняем текущий ответ
    setSelectedAnswers(newAnswers);

    if (currentStep === 3) {
      setCurrentStep(4); // Переход на выбор размера дома
    } else if (currentStep === 4) {
      const power = getPowerByHouseSize(answer);
      if (power) {
        fetchFilteredEquipment(power); // ✅ Теперь запрос идёт только в выбранную категорию
      }
    } else {
      setCurrentStep(currentStep + 1); // Переход к следующему вопросу
    }
  };

  // ✅ Получение доступных вариантов для текущего шага
  const getCurrentOptions = () => {
    if (currentStep === 0) return questions[0];
    if (currentStep === 1) return questions[1];
    if (currentStep === 2) return questions[2];
    if (currentStep === 3) return questions[3][selectedAnswers[2]] || [];
    if (currentStep === 4) return questions[4];
    return [];
  };

  return (
    <div className="equip_page_container">
      <h1>Selection of equipment</h1>
      <h2>Step {currentStep + 1}</h2>
      <h3>Choose your option:</h3>
      <div className="equip_page_content">
        <div className="equip_container">
          {!showEquipment ? (
            <>
              <div className="equip_option_container">
                {getCurrentOptions().map((option, index) => (
                  <button
                    className="option_button"
                    key={index}
                    onClick={() => handleAnswer(option)}
                  >
                    {option}
                  </button>
                ))}
              </div>

              {/* 🔹 Кнопка "Назад" */}
              {currentStep > 0 && (
                <button
                  className="option_button_back"
                  onClick={() => {
                    setSelectedAnswers(selectedAnswers.slice(0, -1));
                    setCurrentStep(currentStep - 1);
                  }}
                >
                  Back
                </button>
              )}
            </>
          ) : (
            <>
              <div className="equip_page_content">
                {filteredEquipment.length > 0 ? (
                  <div className="equip_card_container">
                    {filteredEquipment.map((item, index) => (
                      <div key={index} className="equip_card_content">
                        {item.image_url && (
                          <img
                            className="equip_picture"
                            src={item.image_url}
                            alt={item.name}
                            onError={(e) => {
                              console.error("Picture error:", item.image_url);
                              e.target.src =
                                "https://via.placeholder.com/200?text=No+Image";
                            }}
                          />
                        )}
                        <div className="equip_text_container">
                          <h3>{item.name}</h3>
                          <p>
                            <strong>Company:</strong>{" "}
                            {companyNames[item.company_id] || "Неизвестно"}
                          </p>
                          <p>
                            <strong>Category:</strong> {item.category}
                          </p>
                          <p>
                            <strong>Type:</strong> {item.type}
                          </p>
                          <p>
                            <strong>Model:</strong> {item.model}
                          </p>
                          <p>
                            <strong>BTU:</strong> {item.btu}
                          </p>
                          <p>
                            <strong>SEER:</strong> {item.seer}
                          </p>
                          <p>
                            <strong>Power:</strong> {item.power} t
                          </p>
                        </div>
                      </div>
                    ))}
                  </div>
                ) : (
                  <p>No available equipment.</p>
                )}
                <div className="equip_effiency">
                  <h2 className="eff_title">Estimate</h2>
                  <h4>Price currently unavailable</h4>
                  <CustomSlider />
                </div>
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default Questionnaire;
