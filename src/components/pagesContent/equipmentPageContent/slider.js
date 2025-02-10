import React, { useState, useRef } from "react";

const CustomSlider = () => {
  const [value, setValue] = useState(50); // Значение слайдера (начальное 50%)
  const sliderRef = useRef(null); // Ссылка на шкалу слайдера

  // ✅ Обработчик изменения позиции
  const handleMouseMove = (e) => {
    if (!sliderRef.current) return;

    const slider = sliderRef.current;
    const rect = slider.getBoundingClientRect(); // Получаем размеры шкалы
    const offsetX = e.clientX - rect.left; // Расстояние от начала шкалы до курсора
    const percentage = Math.min(Math.max((offsetX / rect.width) * 100, 0), 100); // Значение в процентах (0-100)

    setValue(Math.round(percentage)); // Устанавливаем значение
  };

  // ✅ Обработчик нажатия мыши
  const handleMouseDown = (e) => {
    handleMouseMove(e);
    document.addEventListener("mousemove", handleMouseMove); // Следим за движением мыши
    document.addEventListener("mouseup", handleMouseUp); // Следим за отпусканием
  };

  // ✅ Обработчик отпускания мыши
  const handleMouseUp = () => {
    document.removeEventListener("mousemove", handleMouseMove); // Убираем обработчик
    document.removeEventListener("mouseup", handleMouseUp); // Убираем обработчик
  };

  return (
    <div style={{ padding: "20px", width: "300px", margin: "auto" }}>
      <h3>Efficiency Level</h3>
      <h4>Then more efficient, the more you save on energy</h4>

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
        }}
      >
        {/* Заполненная часть слайдера */}
        <div
          style={{
            position: "absolute",
            height: "100%",
            width: `${value}%`,
            borderRadius: "5px",
            background: "#007bff",
          }}
        ></div>

        {/* Бегунок */}
        <div
          style={{
            position: "absolute",
            top: "50%",
            left: `${value}%`,
            transform: "translate(-50%, -50%)",
            width: "20px",
            height: "20px",
            borderRadius: "50%",
            background: "#007bff",
            border: "2px solid white",
            cursor: "grab",
          }}
        ></div>
      </div>

      {/* Отображение текущего значения */}
      <p style={{ textAlign: "center", marginTop: "10px" }}>
        Current Efficiency: {value}%
      </p>
    </div>
  );
};

export default CustomSlider;
