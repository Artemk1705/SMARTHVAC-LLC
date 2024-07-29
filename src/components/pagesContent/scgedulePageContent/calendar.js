import React, { useState } from "react";
import { daysInMonth } from "./dateTime";
import moment from "moment";

export default function Calendar({ onDateSelect, onTimeSelect }) {
  const [selectedDay, setSelectedDay] = useState(null);
  const [availableTimes, setAvailableTimes] = useState([]);
  const [selectedTime, setSelectedTime] = useState(null);
  const [currentDate, setCurrentDate] = useState(new Date());
  const currentYear = currentDate.getFullYear();
  const currentMonthIndex = currentDate.getMonth();
  const today = new Date();
  const isCurrentMonth =
    currentYear === today.getFullYear() &&
    currentMonthIndex === today.getMonth();
  const monthNames = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];

  const currentMonthName = monthNames[currentMonthIndex];
  const daysInCurrentMonth = daysInMonth(currentYear, currentMonthIndex + 1);

  const nextMonth = () => {
    if (currentMonthIndex === 11) {
      setCurrentDate(new Date(currentYear + 1, 0, 1));
    } else {
      setCurrentDate(new Date(currentYear, currentMonthIndex + 1, 1));
    }
  };

  const previousMonth = () => {
    setCurrentDate(new Date(currentYear, currentMonthIndex - 1, 1));
  };

  const handleDayClick = (day) => {
    setSelectedDay(day);
    setAvailableTimes([
      "8:00 AM",
      "12:00 PM",
      "5:00 PM",
      "Emergency 7:00 AM - 10:00 PM",
    ]);

    const selectedDate = new Date(currentYear, currentMonthIndex, day);
    onDateSelect(moment(selectedDate).format("YYYY-MM-DD"));
  };

  const handleTimeClick = (time) => {
    const selectedDate = moment(
      `${currentYear}-${currentMonthIndex + 1}-${selectedDay} ${time}`,
      ["YYYY-MM-DD h:mm A"]
    ).format("HH:mm:ss");
    onTimeSelect(selectedDate);
    setSelectedTime(time);
  };

  const daysArray = Array.from({ length: daysInCurrentMonth }, (_, i) => i + 1);

  return (
    <div className="sched_container">
      <div className="calendar_sched">
        <div className="month_and_year">
          <button
            onClick={previousMonth}
            disabled={isCurrentMonth}
            className="calendar_button_back"
          >
            PREV
          </button>
          <div className="month">{currentMonthName}</div>
          <div className="year">{currentYear}</div>
          <button onClick={nextMonth} className="calendar_button_next">
            NEXT
          </button>
        </div>
        <div className="calendar_content">
          <div className="days_container">
            {daysArray.map((day) => {
              const dayDate = new Date(currentYear, currentMonthIndex, day);
              const isPast = isCurrentMonth && dayDate < today;
              return (
                <div
                  key={day}
                  className={`day ${selectedDay === day ? "active_day" : ""} ${
                    isPast ? "disabled_day" : ""
                  }`}
                  onClick={() => !isPast && handleDayClick(day)}
                >
                  {day}
                </div>
              );
            })}
          </div>
        </div>
      </div>
      <div className="time_container">
        {selectedDay && (
          <div className="time_selection">
            <h3>
              Time selection for day - {currentMonthName} {selectedDay}
            </h3>
            {availableTimes.map((time, index) => (
              <div
                key={index}
                className={`time_slot ${
                  selectedTime === time ? "active_time" : ""
                }`}
                onClick={() => handleTimeClick(time)}
              >
                {time}
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
