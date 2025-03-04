import React, { useRef, useEffect, useState } from "react";

const CustomSlider = ({ seerValue, setSeerValue, seerData }) => {
  const sliderRef = useRef(null);
  const [seerList, setSeerList] = useState([]);

  useEffect(() => {
    console.log("📡 Полученные seerData:", seerData); // Проверяем, что вообще пришло
    if (seerData && seerData.length > 0) {
      const uniqueSeerValues = [
        ...new Set(
          seerData
            .map((item) => parseFloat(item.seer))
            .filter((seer) => !isNaN(seer)) // Удаляем NaN
            .map((seer) => Math.round(seer))
        ),
      ].sort((a, b) => a - b);

      console.log("✅ Уникальные значения SEER:", uniqueSeerValues);
      setSeerList(uniqueSeerValues);
    }
  }, [seerData]);

  const handleMouseMove = (e) => {
    if (!sliderRef.current) return;

    const slider = sliderRef.current;
    const rect = slider.getBoundingClientRect();
    const offsetX = e.clientX - rect.left;
    const percentage = Math.min(Math.max((offsetX / rect.width) * 100, 0), 100);

    let newSeer = Math.round(13 + (percentage / 100) * 7);

    // 🔹 Если значение отсутствует в базе, находим ближайшее
    if (!seerList.includes(newSeer)) {
      const closestSeer = seerList.reduce((prev, curr) =>
        Math.abs(curr - newSeer) < Math.abs(prev - newSeer) ? curr : prev
      );
      newSeer = closestSeer;
    }

    setSeerValue(newSeer);
  };

  const handleMouseDown = (e) => {
    handleMouseMove(e);
    document.addEventListener("mousemove", handleMouseMove);
    document.addEventListener("mouseup", handleMouseUp);
  };

  const handleMouseUp = () => {
    document.removeEventListener("mousemove", handleMouseMove);
    document.removeEventListener("mouseup", handleMouseUp);
  };

  return (
    <div className="slide_container">
      <h3 className="eff_title">Efficiency Level (SEER)</h3>
      <h4 className="eff_sub_title">
        The more efficient, the more you save on energy
      </h4>

      {/* Контейнер шкалы */}
      <div
        className="eff_bar"
        style={{ position: "relative", textAlign: "center" }}
      >
        {/* Отображение чисел над шкалой */}
        {[...Array(8)].map((_, i) => {
          const seer = 13 + i;
          const isActive = seerList.includes(seer);

          return (
            <span
              key={seer}
              style={{
                position: "absolute",
                left: `${((seer - 13) / 7) * 100}%`,
                transform: "translateX(-50%)",
                color: isActive ? "#32326e" : "#aaa", // Активные — синие, неактивные — серые
                fontWeight: isActive ? "bold" : "normal",
                fontSize: "14px",
                top: "-20px",
              }}
            >
              {seer}
            </span>
          );
        })}

        {/* Шкала слайдера */}
        <div
          ref={sliderRef}
          onMouseDown={handleMouseDown}
          style={{
            position: "relative",
            height: "10px",
            borderRadius: "5px",
            background: "#ddd",
            cursor: "pointer",
            marginTop: "10px",
          }}
        >
          {/* Отображение делений SEER */}
          {[...Array(8)].map((_, i) => {
            const seer = 13 + i;
            const isActive = seerList.includes(seer);

            return (
              <div
                key={seer}
                style={{
                  position: "absolute",
                  left: `${((seer - 13) / 7) * 100}%`,
                  width: "4px",
                  height: "20px",
                  background: isActive ? "#32326e" : "#ccc",
                  top: "-5px",
                }}
              ></div>
            );
          })}

          {/* Заполненная часть слайдера (только до активного значения) */}
          <div
            style={{
              position: "absolute",
              height: "90%",
              width: `${((seerValue - 13) / 7) * 100}%`,
              borderRadius: "5px",
              background: "#32326e",
            }}
          ></div>

          {/* Бегунок */}
          <div
            style={{
              position: "absolute",
              top: "50%",
              left: `${((seerValue - 13) / 7) * 100}%`,
              transform: "translate(-50%, -50%)",
              width: "20px",
              height: "20px",
              borderRadius: "50%",
              background: "#32326e",
              border: "2px solid white",
              cursor: "grab",
            }}
          ></div>
        </div>
      </div>

      {/* Отображение текущего значения */}
      <p className="eff_current_seer">Current SEER: {seerValue}</p>
    </div>
  );
};

export default CustomSlider;
