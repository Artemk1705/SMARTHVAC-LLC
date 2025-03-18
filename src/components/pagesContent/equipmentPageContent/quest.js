import React, { useState, useEffect } from "react";
import CustomSlider from "./slider";
import FurnaceFilter from "./furnace-filter";
import EquipForm from "./equip-form";
import AirHandlerFilter from "./air-handlers-filter";
import { post } from "aws-amplify/api";
import LoadingBar from "./loadingSc";

const API_URL =
  "https://r44benc4hk.execute-api.us-east-1.amazonaws.com/dev/equip";

const companyNames = {
  1: "American Standart",
  2: "Mitsubishi",
  3: "Hitachi",
  4: "Ameristar",
  5: "York",
};

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
    Minisplit: [
      "Wall Mounted",
      "Horizontal Ducted",
      "Floor Mounted",
      "Ceiling Recessed",
    ],
  },
  4: [
    "American Standart",
    "Mitsubishi",
    "Hitachi",
    "Ameristar",
    "York",
    "Not sure",
  ],
  5: [
    "<1000 sqft",
    "1000-1500 sqft",
    "1500-2000 sqft",
    "2000-2500 sqft",
    "2500-3000 sqft",
    "3000-3500 sqft",
    ">3500 sqft",
  ],
};

export default function Questionnaire() {
  const [showForm, setShowForm] = useState(false);
  const [formData, setFormData] = useState(null);
  const [currentStep, setCurrentStep] = useState(0);
  const [selectedAnswers, setSelectedAnswers] = useState(["", "", "", "", ""]);
  const [filteredEquipment, setFilteredEquipment] = useState([]);
  const [showEquipment, setShowEquipment] = useState(false);
  const [seerValue, setSeerValue] = useState(13);
  const [isSuccess, setIsSuccess] = useState(null);
  const [modalOpen, setModalOpen] = useState(false);
  const [furnaceType, setFurnaceType] = useState("");
  const [airHandlerType, setAirHandlerType] = useState("");
  const [initialEquipment, setInitialEquipment] = useState([]);
  const [filteredFurnaces, setFilteredFurnaces] = useState([]);
  const [loading, setLoading] = useState(false);

  const shouldShowFurnaceFilter =
    selectedAnswers[3] === "Furnace" || selectedAnswers[3] === "Furnace and AC";

  const shouldShowAirHandlerFilter = selectedAnswers[3] === "Air Handler";

  const handleHouseAnswer = (answer) => {
    setSelectedAnswers([...selectedAnswers, answer]);
    setShowForm(true);
  };

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        const response = await fetch(API_URL);
        const data = await response.json();
        setInitialEquipment(Array.isArray(data) ? data : []);
        setFilteredEquipment(Array.isArray(data) ? data : []);
      } catch (error) {
        console.error("Ошибка при загрузке данных", error);
        setInitialEquipment([]);
        setFilteredEquipment([]);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const handleSubmitForm = async (data) => {
    console.log("📩 Данные формы + ответы:", data);
    setLoading(true);
    setFormData(data);
    setShowForm(false);
    setShowEquipment(true);

    const selectedSystem = data.selectedAnswers[3] || "unknown"; // ✅ Подстраховка
    const unitType = data.selectedAnswers[4] || null;
    const power = getPowerByHouseSize(data.selectedAnswers[5]);

    try {
      console.log("📡 Отправляем данные формы на сервер...");

      const restOperation = post({
        apiName: "equipForm",
        path: "/equipForm",
        options: {
          body: data,
          headers: {
            "Content-Type": "application/json",
          },
        },
      });

      const { body } = await restOperation.response;
      const response = await body.json();

      console.log("✅ Ответ сервера:", response);

      if (response.success) {
        console.log("🎉 Форма успешно отправлена!");
        setIsSuccess(true);
        fetchFilteredEquipment(power, selectedSystem, unitType); // ✅ УБРАЛ лишние скобки!
      } else {
        console.log("❌ Ошибка отправки формы:", response.error);
        setIsSuccess(false);
      }
    } catch (e) {
      console.error(
        "❌ Ошибка во время отправки:",
        JSON.parse(e.response.body)
      );
      setIsSuccess(false);
    } finally {
      setModalOpen(true);
      setLoading(false);
    }
  };

  useEffect(() => {
    console.log(`🔄 Компонент обновлён, текущий шаг: ${currentStep}`);
  }, [currentStep]);

  useEffect(() => {
    console.log(`🔄 useEffect: текущий шаг ${currentStep}`);

    if (currentStep === 6) {
      console.log("🔍 Вошли в шаг 6 через useEffect, выполняем запрос...");

      const power = getPowerByHouseSize(selectedAnswers[5]);
      const unitType = selectedAnswers[3] || null;
      const selectedSystem = selectedAnswers[3];

      console.log("🔍 Проверка перед запросом:");
      console.log("   - System:", selectedSystem);
      console.log("   - Unit Type:", unitType);
      console.log("   - Power:", power);

      if (!power) {
        console.error(
          "❌ Ошибка: Power не определён! Возможно, getPowerByHouseSize не возвращает значение."
        );
        return;
      }

      console.log("📡 Отправляем запрос...");
      fetchFilteredEquipment(power, selectedSystem, unitType);
    }
  }, [currentStep]);

  const getPowerByHouseSize = (size) => {
    console.log("🔍 Проверка getPowerByHouseSize. Входящий size:", size);

    const sizeMap = {
      "<1000 sqft": "2.0",
      "1000-1500 sqft": "2.5",
      "1500-2000 sqft": "3.0",
      "2000-2500 sqft": "3.5",
      "2500-3000 sqft": "4.0",
      "3000-3500 sqft": "5.0",
      ">3500 sqft": "6.0",
    };

    const result = sizeMap[size] || null;
    console.log("🔍 Power для данного size:", result);
    return result;
  };

  const getCategoriesForRequest = (system, unitType) => {
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
    const categoryMap = {
      AC: ["air_conditioners"],
      "Heat Pump": ["heat_pumps"],
      Furnace: ["furnace"],
      "Furnace and AC": ["furnace", "air_conditioners"],
      "Furnace and Heat Pump": ["furnace", "heat_pumps"],
      "Air Handler": ["air_handlers"],
    };

    return categoryMap[system] || [];
  };

  const handleAnswer = (answer) => {
    console.log(
      `🚀 handleAnswer вызван. currentStep: ${currentStep}, answer: ${answer}`
    );

    let newAnswers = [...selectedAnswers];
    newAnswers[currentStep] = answer;
    setSelectedAnswers(newAnswers);

    if (currentStep === 3) {
      setCurrentStep(4);
    } else if (currentStep === 4) {
      setCurrentStep(5);
    } else if (currentStep === 5) {
      setShowForm(true);
    } else if (currentStep === 6) {
      const power = getPowerByHouseSize(answer);
      const unitType = selectedAnswers[4] || null;
      const selectedSystem = selectedAnswers[3];

      if (!power) {
        console.error(
          "❌ Ошибка: Power не определён! Возможно, getPowerByHouseSize не возвращает значение."
        );
        return;
      }

      console.log("📡 Отправляем запрос...");
      fetchFilteredEquipment(power, selectedSystem, unitType);
    } else {
      setCurrentStep(currentStep + 1);
    }
  };

  const fetchFilteredEquipment = async (power, selectedSystem, unitType) => {
    if (!selectedSystem) {
      console.error(
        "❌ Ошибка: selectedSystem не передан в fetchFilteredEquipment"
      );
      return;
    }
    console.log("📡 Выполняем запрос для:", {
      power,
      selectedSystem,
      unitType,
    });
    const categories = getCategoriesForRequest(selectedSystem, unitType);
    const companyIndex = 4;
    const selectedCompany = selectedAnswers[companyIndex];

    if (categories.length === 0) {
      console.error("❌ Ошибка: Неизвестная категория оборудования.");
      return;
    }

    const typeFilterMap = {
      "Ceiling Recessed": "Residential Ceiling Recessed",
      "Floor Mounted": "Residential Floor Mounted",
      "Horizontal Ducted": "Residential Horizontal Ducted",
      "Wall Mounted": "Residential Wall Mount",
    };

    const typeFilter = typeFilterMap[unitType] || null;

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
      if (typeFilter) {
        mergedData = mergedData.filter((item) => item.type === typeFilter);
      }

      if (selectedCompany && selectedCompany !== "Not sure") {
        mergedData = mergedData.filter((item) => {
          const companyName = companyNames[item.company_id]
            ?.toLowerCase()
            .trim();
          const selectedCompanyName = selectedCompany.toLowerCase().trim();
          return companyName === selectedCompanyName;
        });
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

  // Сначала фильтруем по SEER (как у тебя сейчас, без изменений)
  const filteredBySeer = filteredEquipment.filter((item) => {
    if (
      [
        "Residential Wall Mount",
        "Ceiling Recessed",
        "Floor Mounted",
        "Horizontal Ducted",
      ].includes(item.type)
    ) {
      console.log(`⚡ Игнорируем фильтр по SEER для MiniSplit: ${item.name}`);
      return true;
    }

    if (
      item.category === "air_conditioners" ||
      item.category === "heat_pumps"
    ) {
      const itemSeer = parseFloat(item.seer);

      if (isNaN(itemSeer)) {
        console.warn(
          `⚠️ У элемента ${item.name} нет SEER или он некорректен:`,
          item.seer
        );
        return false;
      }

      console.log(
        `⚡ Проверка SEER: ${item.name} (${Math.round(
          itemSeer
        )}) против ${seerValue}`
      );
      return Math.round(itemSeer) === seerValue;
    }

    return true;
  });

  // Теперь добавляем фильтр по типу Furnace (поверх SEER)
  const filteredByFurnaceType = filteredBySeer.filter((item) => {
    if (shouldShowFurnaceFilter && furnaceType) {
      const match =
        item.category.toLowerCase().trim() === "furnace" &&
        item.type.toLowerCase().trim() === furnaceType.toLowerCase().trim();
      if (!match && item.category === "furnace") {
        console.log(
          `🔥 Отбросили печь (${item.name}), не подходит по типу: ${furnaceType}`
        );
      }
      return match;
    }

    return true; // для остальных категорий пропускаем фильтр
  });

  const filteredByAirHandlerType = filteredByFurnaceType.filter((item) => {
    if (shouldShowAirHandlerFilter && airHandlerType) {
      const match =
        item.category.toLowerCase().trim() === "air_handlers" &&
        item.type.toLowerCase().trim() === airHandlerType.toLowerCase().trim();

      if (!match && item.category === "air_handlers") {
        console.log(
          `❄️ Отбросили Air Handler (${item.name}), не подходит по типу: ${airHandlerType}`
        );
      }
      return match;
    }

    return true;
  });
  // Группируем именно отфильтрованные данные (по SEER и по Furnace Type одновременно!)
  const groupedFilteredEquipment = filteredByAirHandlerType.reduce(
    (acc, item) => {
      if (!acc[item.category]) {
        acc[item.category] = [];
      }
      acc[item.category].push(item);
      return acc;
    },
    {}
  );

  // Получаем доступные варианты вопросов для текущего шага (без изменений)
  const getCurrentOptions = () => {
    console.log(`🔍 Получение опций для шага ${currentStep}`);

    if (currentStep === 0) return questions[0];
    if (currentStep === 1) return questions[1];
    if (currentStep === 2) return questions[2];
    if (currentStep === 3) return questions[3][selectedAnswers[2]] || [];
    if (currentStep === 4) return questions[4];
    if (currentStep === 5) return questions[5];
    if (currentStep === 6) {
      console.log("✅ Шаг 6 найден! Передаём вопросы.");
      return questions[6];
    }

    return [];
  };

  // Создаём список категорий и проверяем на множественные категории (без изменений)
  const categories = [
    ...new Set(filteredEquipment.map((item) => item.category)),
  ];

  const hasMultipleCategories = categories.length > 1;

  // Группируем исходный набор equipment по категориям (без изменений)
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
      {loading ? (
        <div className="loading_screen">
          <h2>Loading equipment...</h2>
          <LoadingBar className="spinner" />
        </div>
      ) : (
        <>
          {" "}
          <h1 className="equip_main_title">Selection of equipment</h1>
          <h2>Step {currentStep + 1}</h2>
          <h3>Choose your option</h3>
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
              {showForm ? (
                <EquipForm
                  answers={selectedAnswers}
                  onSubmit={handleSubmitForm}
                />
              ) : !showEquipment ? (
                <>
                  <div className="equip_option_container">
                    {(getCurrentOptions() || []).map((option, index) => (
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
                <div className="equip_page_content">
                  <div className="equip_double_container">
                    {Object.keys(groupedFilteredEquipment).length > 0 ? (
                      Object.entries(groupedFilteredEquipment).map(
                        ([category, items]) => (
                          <div
                            key={category}
                            className="equip_category_section"
                          >
                            <div
                              className={`equip_card_container ${
                                hasMultipleCategories
                                  ? "multi-category-cards"
                                  : ""
                              }`}
                            >
                              {items.map((item, index) => (
                                <div
                                  key={index}
                                  className={`equip_card_content ${
                                    hasMultipleCategories
                                      ? "multi-category-card"
                                      : ""
                                  }`}
                                >
                                  {item.image_url && (
                                    <img
                                      className="equip_picture"
                                      src={item.image_url}
                                      alt={item.name}
                                    />
                                  )}
                                  <div className="equip_text_container">
                                    <div className="equip_h_title_container">
                                      <h3 className="equip_card_name">
                                        {item.name}
                                      </h3>
                                      <div className="equip_price">
                                        <div className="first_price_container">
                                          <h2>Price $</h2>
                                          <h3 className="first_price">
                                            {item.price
                                              ? (
                                                  parseFloat(
                                                    item.price.replace(
                                                      /[$,]/g,
                                                      ""
                                                    )
                                                  ) *
                                                    3 +
                                                  (item.category ===
                                                  "air_conditioners"
                                                    ? 700
                                                    : 0)
                                                ).toFixed(2)
                                              : "N/A"}
                                          </h3>
                                        </div>
                                        <div>
                                          <h3 className="discount_price">
                                            {item.price
                                              ? (
                                                  parseFloat(
                                                    item.price.replace(
                                                      /[$,]/g,
                                                      ""
                                                    )
                                                  ) *
                                                    2.5 +
                                                  (item.category ===
                                                  "air_conditioners"
                                                    ? 700
                                                    : 0)
                                                ).toFixed(2)
                                              : "Call"}
                                          </h3>
                                        </div>
                                      </div>
                                    </div>
                                    <p className="equip_p_card">
                                      <strong>Company:</strong>{" "}
                                      {companyNames[item.company_id] ||
                                        "Unknown"}
                                    </p>
                                    <p className="equip_p_card">
                                      <strong>Type:</strong> {item.type}
                                    </p>
                                    <p className="equip_p_card">
                                      <strong>Model:</strong> {item.model}
                                    </p>
                                    <p className="equip_p_card">
                                      <strong>BTU:</strong> {item.btu}
                                    </p>
                                    {item.category !== "furnace" && (
                                      <p className="equip_p_card">
                                        <strong>SEER:</strong> {item.seer}
                                      </p>
                                    )}
                                    <p className="equip_p_card">
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
                      <p>No equipment available for selected criteria.</p>
                    )}
                  </div>

                  <div className="filter_block">
                    <CustomSlider
                      seerValue={seerValue}
                      setSeerValue={setSeerValue}
                      seerData={filteredEquipment}
                    />

                    {shouldShowFurnaceFilter && (
                      <FurnaceFilter
                        furnaceType={furnaceType}
                        setFurnaceType={setFurnaceType}
                        equipmentData={initialEquipment}
                      />
                    )}

                    {shouldShowAirHandlerFilter && (
                      <AirHandlerFilter
                        airHandlerType={airHandlerType}
                        setAirHandlerType={setAirHandlerType}
                      />
                    )}
                  </div>
                </div>
              )}
            </div>
          </div>
        </>
      )}
    </div>
  );
}
