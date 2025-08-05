import React, { useState, useEffect } from 'react';
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';
import './calendarStyles.css';
import { FaUserCircle } from 'react-icons/fa';
import tamilNaduFestivals from './festivalsData'; // ✅ new import

const CalendarCard = () => {
  const [date, setDate] = useState(new Date());
  const [userName, setUserName] = useState("Anni");

  const [tripStart, setTripStart] = useState(null);
  const [tripEnd, setTripEnd] = useState(null);

  useEffect(() => {
    const storedStart = localStorage.getItem('tripStart');
    const storedEnd = localStorage.getItem('tripEnd');
    if (storedStart && storedEnd) {
      setTripStart(new Date(storedStart));
      setTripEnd(new Date(storedEnd));
    }
  }, []);

  useEffect(() => {
    if (tripStart && tripEnd) {
      localStorage.setItem('tripStart', tripStart.toISOString());
      localStorage.setItem('tripEnd', tripEnd.toISOString());
    }
  }, [tripStart, tripEnd]);

  const handleCalendarClick = (selectedDate) => {
    if (!tripStart || (tripStart && tripEnd)) {
      setTripStart(selectedDate);
      setTripEnd(null);
    } else {
      if (selectedDate > tripStart) {
        setTripEnd(selectedDate);
      } else {
        setTripStart(selectedDate);
      }
    }
    setDate(selectedDate);
  };

  // ✅ Group festivals by month
  const groupedFestivals = tamilNaduFestivals.reduce((acc, festival) => {
    const month = new Date(festival.date).toLocaleString('en-US', { month: 'long' });
    if (!acc[month]) acc[month] = [];
    acc[month].push(festival);
    return acc;
  }, {});

  return (
    <div className="calendar-container">

      {/* Calendar Section */}
      <div className="calendar-wrapper">
        <Calendar
          onChange={handleCalendarClick}
          value={date}
          next2Label={null}
          prev2Label={null}
          formatShortWeekday={(locale, date) =>
            date.toLocaleDateString('en-US', { weekday: 'short' }).toUpperCase().slice(0, 3)
          }
          showNeighboringMonth={false}
          tileClassName={({ date, view }) => {
            if (view === 'month') {
              const isWeekend = date.getDay() === 0 || date.getDay() === 6;
              const isInTrip = tripStart && tripEnd && date >= tripStart && date <= tripEnd;
              return isInTrip ? 'trip-date' : isWeekend ? 'weekend-day' : null;
            }
            return null;
          }}
        />
      </div>

      {/* Festival List Section */}
      <div className="festival-section">
        <h5>Festivals in Tamil Nadu - 2025</h5>
        {Object.keys(groupedFestivals).length > 0 ? (
          <div className="festival-list">
            {Object.entries(groupedFestivals).map(([month, festivalList]) =>
              festivalList.map((festival, index) => (
                <div key={index} className="festival-card">
                  <div className="festival-info">
                    <strong className="festival-name">{festival.name}</strong>
                    <p className="festival-date">{month} - {festival.date} 📅</p>
                  </div>
                </div>
              ))
            )}
          </div>
        ) : (
          <p>No festivals found.</p>
        )}

        {/* Trip Plan Box */}
        {tripStart && tripEnd && (
          <div className="trip-saved-box">
            <h5>🧳 Your Trip Plan</h5>
            <p><strong>From:</strong> {tripStart.toDateString()}</p>
            <p><strong>To:</strong> {tripEnd.toDateString()}</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default CalendarCard;
