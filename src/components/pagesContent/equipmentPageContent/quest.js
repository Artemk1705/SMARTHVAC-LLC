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
    Gas: [
      "AC",
      "Heat Pump",
      "Furnace",
      "Furnace and AC",
      "Furnace and Heat Pump",
    ],
    Electrical: ["Air Handler", "Heat Pump"],
    Minisplit: ["Single Zone", "Multi Zone"],
  },
  4: {
    "Single Zone": [
      "Wall Mounted",
      "Horizontal Ducted",
      "Floor Mounted",
      "Ceiling Recessed",
    ],
    "Multi Zone": [
      "Wall Mounted",
      "Horizontal Ducted",
      "Floor Mounted",
      "Ceiling Recessed",
    ],
  },
  5: [
    "American Standart",
    "Mitsubishi",
    "Hitachi",
    "Ameristar",
    "York",
    "Not sure",
  ],
  6: [
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
  const [currentStep, setCurrentStep] = useState(0);
  const [selectedAnswers, setSelectedAnswers] = useState(["", "", "", "", ""]);
  const [filteredEquipment, setFilteredEquipment] = useState([]);
  const [showEquipment, setShowEquipment] = useState(false);
  const [value, setValue] = useState(50);
  const [seerValue, setSeerValue] = useState(13);

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

  // ✅ Функция для получения категории
  const getCategoriesForRequest = (system, unitType) => {
    // ✅ Если выбрана установка (Ceiling Recessed, Wall Mounted и т. д.), запрашиваем air_conditioners
    if (
      unitType &&
      [
        "Ceiling Recessed",
        "Floor Mounted",
        "Horizontal Ducted",
        "Wall Mounted",
      ].includes(unitType)
    ) {
      return ["air_conditioners"];
    }

    // ✅ Если `unitType === null`, ищем категорию по `system`
    const categoryMap = {
      AC: ["air_conditioners"],
      "Heat Pump": ["heat_pumps"],
      Furnace: ["furnace"],
      "Furnace and AC": ["furnace", "air_conditioners"],
      "Furnace and Heat Pump": ["furnace", "heat_pumps"],
      "Air Handler": ["air_handlers"],
    };

    return categoryMap[system] || []; // ✅ Теперь всегда возвращаем массив
  };

  const handleAnswer = (answer) => {
    let newAnswers = [...selectedAnswers];
    newAnswers[currentStep] = answer;
    setSelectedAnswers(newAnswers);

    if (currentStep === 3) {
      if (answer === "Single Zone" || answer === "Multi Zone") {
        setCurrentStep(4); // Перейти к выбору установки (Wall Mounted и т.д.)
      } else {
        setCurrentStep(5); // Пропустить доп. шаг и перейти к выбору компании
      }
    } else if (currentStep === 4) {
      setCurrentStep(5); // После выбора установки – перейти к выбору компании
    } else if (currentStep === 5) {
      if (answer === "Not sure") {
        setCurrentStep(6); // Пропустить шаг и перейти к размеру дома
      } else {
        setCurrentStep(6);
      }
    } else if (currentStep === 6) {
      const power = getPowerByHouseSize(answer);
      const unitType = newAnswers[4] || null; // ✅ Теперь unitType не сломает обычные запросы
      const selectedSystem = newAnswers[3]; // ✅ Выбранная система (AC, Heat Pump и т.д.)

      if (power) {
        console.log(
          "📡 Отправляем запрос с unitType:",
          unitType || "Обычная система"
        );
        fetchFilteredEquipment(power, selectedSystem, unitType); // ✅ Передаём `selectedSystem`
      }
    } else {
      setCurrentStep(currentStep + 1);
    }
  };

  // ✅ Функция для запроса данных
  const fetchFilteredEquipment = async (power, selectedSystem, unitType) => {
    if (!selectedSystem) {
      console.error(
        "❌ Ошибка: selectedSystem не передан в fetchFilteredEquipment"
      );
      return;
    }

    const categories = getCategoriesForRequest(selectedSystem, unitType);
    const selectedCompany = selectedAnswers[5]; // Выбранная компания

    if (categories.length === 0) {
      console.error("❌ Ошибка: Неизвестная категория оборудования.");
      return;
    }

    // ✅ Определяем нужный `typeFilter`
    const typeFilterMap = {
      "Ceiling Recessed": "Residential Ceiling Recessed",
      "Floor Mounted": "Residential Floor Mounted",
      "Horizontal Ducted": "Residential Horizontal Ducted",
      "Wall Mounted": "Residential Wall Mount",
    };

    const typeFilter = typeFilterMap[unitType] || null;

    console.log(
      "📡 Запрос в API с category:",
      categories,
      "и type:",
      typeFilter || "Нет фильтра по type"
    );

    try {
      const responses = await Promise.all(
        categories.map((category) => {
          let url = `${API_URL}?category=${category}&power=${power}`;
          if (typeFilter) {
            url += `&type=${encodeURIComponent(typeFilter)}`; // ✅ Добавляем фильтр по `type`, если есть
          }
          return fetch(url).then((res) => res.json());
        })
      );

      let mergedData = responses.flat();

      // 🔹 Если `unitType === null`, то не фильтруем по `type`
      if (typeFilter) {
        mergedData = mergedData.filter((item) => item.type === typeFilter);
      }

      // 🔹 Фильтруем по компании, если выбрана
      if (selectedCompany !== "Not sure") {
        mergedData = mergedData.filter(
          (item) => companyNames[item.company_id] === selectedCompany
        );
      }

      console.log("📜 ОТФИЛЬТРОВАННЫЕ ДАННЫЕ:", mergedData);
      setFilteredEquipment(mergedData);
      setShowEquipment(true);
    } catch (error) {
      console.error("❌ Ошибка при загрузке данных:", error);
      setFilteredEquipment([]);
      setShowEquipment(true);
    }
  };
  const filteredBySeer = filteredEquipment.filter((item) => {
    if (
      item.category === "air_conditioners" ||
      item.category === "heat_pumps"
    ) {
      return Math.round(parseFloat(item.seer)) === seerValue; // ✅ Фильтр по SEER только для AC и Heat Pump
    }
    return true; // ✅ Для Furnace и других категорий фильтр SEER не применяется
  });
  // ✅ Группируем только отфильтрованные элементы по SEER
  const groupedFilteredEquipment = filteredBySeer.reduce((acc, item) => {
    if (!acc[item.category]) {
      acc[item.category] = [];
    }
    acc[item.category].push(item);
    return acc;
  }, {});
  // ✅ Получение доступных вариантов для текущего шага
  const getCurrentOptions = () => {
    if (currentStep === 0) return questions[0];
    if (currentStep === 1) return questions[1];
    if (currentStep === 2) return questions[2];
    if (currentStep === 3) return questions[3][selectedAnswers[2]] || [];
    if (currentStep === 4) return questions[4][selectedAnswers[3]] || [];
    if (currentStep === 5) return questions[5];
    if (currentStep === 6) return questions[6];
    return [];
  };

  const categories = [
    ...new Set(filteredEquipment.map((item) => item.category)),
  ];
  const hasMultipleCategories = categories.length > 1;
  const groupedEquipment = filteredEquipment.reduce((acc, item) => {
    if (!acc[item.category]) {
      acc[item.category] = [];
    }
    acc[item.category].push(item);
    return acc;
  }, {});

  return (
    <div
      className={`equip_page_container ${
        hasMultipleCategories ? "multi-category" : ""
      }`}
    >
      <h1>Selection of equipment</h1>
      <h2>Step {currentStep + 1}</h2>
      <h3>Choose your option:</h3>
      <div
        className={`equip_page_content ${
          hasMultipleCategories ? "multi-category-content" : ""
        }`}
      >
        <div
          className={`equip_container ${
            hasMultipleCategories ? "multi-category-container" : ""
          }`}
        >
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
            <div
              className={`equip_page_content ${
                hasMultipleCategories ? "multi-category-content" : ""
              }`}
            >
              {/* ✅ Показываем только отфильтрованные категории */}
              {Object.keys(groupedFilteredEquipment).length > 0 ? (
                Object.entries(groupedFilteredEquipment).map(
                  ([category, items]) => (
                    <div key={category} className="equip_category_section">
                      <div
                        className={`equip_card_container ${
                          hasMultipleCategories ? "multi-category-cards" : ""
                        }`}
                      >
                        {items.map((item, index) => (
                          <div
                            key={index}
                            className={`equip_card_content ${
                              hasMultipleCategories ? "multi-category-card" : ""
                            }`}
                          >
                            {item.image_url && (
                              <img
                                className="equip_picture"
                                src={item.image_url}
                                alt={item.name}
                                onError={(e) => {
                                  console.error(
                                    "Picture error:",
                                    item.image_url
                                  );
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
                                <strong>Type:</strong> {item.type}
                              </p>
                              <p>
                                <strong>Model:</strong> {item.model}
                              </p>
                              <p>
                                <strong>BTU:</strong> {item.btu}
                              </p>
                              {item.category !== "furnace" && (
                                <p>
                                  <strong>SEER:</strong> {item.seer}
                                </p>
                              )}
                              <p>
                                <strong>Power:</strong> {item.power} t
                              </p>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  )
                )
              ) : (
                <p>No equipment available for selected SEER.</p>
              )}
              <div className="equip_effiency">
                <h2 className="eff_title">Estimate</h2>
                <h4>Price currently unavailable</h4>
                <CustomSlider
                  seerValue={seerValue}
                  setSeerValue={setSeerValue}
                  seerData={filteredEquipment} // ✅ Передаём все SEER в слайдер
                />
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
export default Questionnaire;
