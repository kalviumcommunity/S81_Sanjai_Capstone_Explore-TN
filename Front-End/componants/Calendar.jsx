import React, { useState } from "react";
import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css";
import "./calendarStyles.css";
import { FaUserCircle } from "react-icons/fa";
import tamilNaduFestivals from "./festivalsData"; // ✅ new import

const CalendarCard = () => {
  const [date, setDate] = useState(new Date());

  const handleCalendarClick = (selectedDate) => {
    setDate(selectedDate);
  };

  // Group festivals by month
  const groupedFestivals = tamilNaduFestivals.reduce((acc, festival) => {
    const month = new Date(festival.date).toLocaleString("en-US", {
      month: "long",
    });
    if (!acc[month]) acc[month] = [];
    acc[month].push(festival);
    return acc;
  }, {});

  return (
    <div
      className="calendar-container sticky top-6"
      style={{ height: "calc(100vh - 24px)", overflow: "hidden" }}
    >
      {/* Calendar Section */}
      <div className="calendar-wrapper">
        <Calendar
          onChange={handleCalendarClick}
          value={date}
          next2Label={null}
          prev2Label={null}
          formatShortWeekday={(locale, date) =>
            date
              .toLocaleDateString("en-US", { weekday: "short" })
              .toUpperCase()
              .slice(0, 3)
          }
          showNeighboringMonth={false}
          tileClassName={({ date, view }) => {
            if (view === "month") {
              const isWeekend = date.getDay() === 0 || date.getDay() === 6;
              return isWeekend ? "weekend-day" : null;
            }
            return null;
          }}
        />
      </div>

      {/* Festival List Section */}
      <div
        className="festival-section"
        style={{ overflowY: "auto", maxHeight: "40vh" }}
      >
        <h5>Festivals in Tamil Nadu - 2025</h5>
        {Object.keys(groupedFestivals).length > 0 ? (
          <div className="festival-list">
            {Object.entries(groupedFestivals).map(([month, festivalList]) =>
              festivalList.map((festival, index) => (
                <div key={index} className="festival-card">
                  <div className="festival-info">
                    <strong className="festival-name">{festival.name}</strong>
                    <p className="festival-date">
                      {month} - {festival.date} 📅
                    </p>
                  </div>
                </div>
              ))
            )}
          </div>
        ) : (
          <p>No festivals found.</p>
        )}
      </div>
    </div>
  );
};

export default CalendarCard;
