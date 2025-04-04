import React, { useState, useEffect } from "react";
import CustomSlider from "./slider";
import FurnaceFilter from "./furnace-filter";
import EquipForm from "./equip-form";
import AirHandlerFilter from "./air-handlers-filter";
import { post } from "aws-amplify/api";
import LoadingBar from "./loadingSc";
import ConfirmModal from "./confirm";

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
  2: ["AC", "Furnace", "Electrical", "Minisplit"],
  3: {
    AC: ["AC", "Furnace and AC"],
    Furnace: ["Furnace", "Furnace and AC", "Furnace and Heat Pump"],
    Electrical: ["Air Handler", "Heat Pump"],
    Minisplit: [
      "Wall Mounted",
      "Horizontal Ducted",
      "Floor Mounted",
      "Ceiling Recessed",
    ],
  },
  4: ["American Standart", "Mitsubishi", "Hitachi", "Ameristar", "York"],
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
  const [isBlockVisible, setIsBlockVisible] = useState(false);
  const [isBlockRendered, setIsBlockRendered] = useState(false);
  const [blockHeight, setBlockHeight] = useState(0);
  const [selectedItem, setSelectedItem] = useState(null);
  const [cartItems, setCartItems] = useState([]);
  const [showConfirm, setShowConfirm] = useState(false);
  const [pendingItem, setPendingItem] = useState(null);

  useEffect(() => {
    const handleResize = () => {
      const windowHeight = window.innerHeight;
      setBlockHeight(windowHeight);
    };

    handleResize();

    window.addEventListener("resize", handleResize);
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  const shouldShowFurnaceFilter =
    selectedAnswers[3] === "Furnace" ||
    selectedAnswers[3] === "Furnace and AC" ||
    selectedAnswers[3] === "Furnace and Heat Pump";
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

  useEffect(() => {
    const saved = localStorage.getItem("myCart");
    if (saved) {
      setCartItems(JSON.parse(saved));
      window.dispatchEvent(new Event("cartUpdated"));
    }
  }, []);

  useEffect(() => {
    if (cartItems.length > 0) {
      localStorage.setItem("myCart", JSON.stringify(cartItems));
    }
  }, [cartItems]);

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

  useEffect(() => {}, [currentStep]);

  useEffect(() => {
    if (currentStep === 6) {
      const power = getPowerByHouseSize(selectedAnswers[5]);
      const unitType = selectedAnswers[3] || null;
      const selectedSystem = selectedAnswers[3];

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

  const handleAddToCart = (item) => {
    setPendingItem(item);
    setShowConfirm(true);
  };

  const confirmAddToCart = () => {
    const item = pendingItem;
    const alreadyInCart = cartItems.find(
      (i) => i.name === item.name && i.model === item.model
    );

    if (alreadyInCart) {
      const updatedCart = cartItems.map((i) =>
        i.name === item.name && i.model === item.model
          ? { ...i, qty: i.qty + 1 }
          : i
      );
      setCartItems(updatedCart);
      localStorage.setItem("myCart", JSON.stringify(updatedCart));
    } else {
      const newItem = { ...item, qty: 1 };
      const updatedCart = [...cartItems, newItem];
      setCartItems(updatedCart);
      localStorage.setItem("myCart", JSON.stringify(updatedCart));
    }

    setShowConfirm(false);
    setPendingItem(null);
  };

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

  const filteredByFurnaceType = filteredBySeer.filter((item) => {
    if (item.category.toLowerCase().trim() === "furnace") {
      if (shouldShowFurnaceFilter && furnaceType) {
        const match =
          item.type.toLowerCase().trim() === furnaceType.toLowerCase().trim();

        if (!match) {
          console.log(
            `🔥 Отбросили печь (${item.name}), не подходит по типу: ${furnaceType}`
          );
        }

        return match;
      }
    }

    return true;
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

  const getCurrentOptions = () => {
    console.log(`🔍 Получение опций для шага ${currentStep}`);

    if (currentStep === 0) return questions[0];
    if (currentStep === 1) return questions[1];
    if (currentStep === 2) return questions[2];
    if (currentStep === 3) return questions[3][selectedAnswers[2]] || [];

    if (currentStep === 4) {
      const isMinisplit =
        selectedAnswers[2] === "Minisplit" &&
        questions[3]["Minisplit"].includes(selectedAnswers[3]);

      if (isMinisplit) {
        return ["Mitsubishi", "York"];
      } else {
        return ["American Standart", "Hitachi", "Ameristar", "York"];
      }
    }

    if (currentStep === 5) return questions[5];
    if (currentStep === 6) {
      console.log("✅ Шаг 6 найден! Передаём вопросы.");
      return questions[6];
    }

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
      {loading ? (
        <div className="loading_screen">
          <h2>Loading ...</h2>
          <LoadingBar className="spinner" />
        </div>
      ) : (
        <>
          <h1 className="equip_main_title">Selection of equipment</h1>
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
                        ([category, items], catIndex) => (
                          <div
                            key={category}
                            className="equip_category_section"
                          >
                            <div
                              className={`equip_card_container ${
                                hasMultipleCategories
                                  ? `multi-category-cards-${catIndex + 1}`
                                  : ""
                              }`}
                            >
                              {items.map((item, index) => (
                                <div
                                  key={index}
                                  className={`equip_card_content ${
                                    hasMultipleCategories
                                      ? `multi-category-card-${catIndex + 1}`
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
                                    <button
                                      onClick={() => handleAddToCart(item)}
                                      className="eq_cart_button"
                                    >
                                      Add to cart
                                    </button>
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
                  <h1 className="equip_ch_title">{selectedAnswers[3]}</h1>
                  <div className="filter_block">
                    <CustomSlider
                      seerValue={seerValue}
                      setSeerValue={setSeerValue}
                      seerData={filteredEquipment}
                      category={
                        selectedAnswers[3] === "Heat Pump" ||
                        selectedAnswers[3] === "Furnace and Heat Pump"
                          ? "heat_pumps"
                          : "default"
                      }
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
      <ConfirmModal
        isOpen={showConfirm}
        onClose={() => setShowConfirm(false)}
        onConfirm={confirmAddToCart}
        message="Do you want to add this equipment to your cart?"
      />
    </div>
  );
}
