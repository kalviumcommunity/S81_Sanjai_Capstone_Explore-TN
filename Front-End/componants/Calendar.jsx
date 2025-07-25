import React, { useState, useEffect } from 'react';
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';
import './calendarStyles.css';
import { FaUserCircle } from 'react-icons/fa';

const CalendarCard = () => {
  const [date, setDate] = useState(new Date());
  const [festivals, setFestivals] = useState({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [userName, setUserName] = useState("");

  // Trip planning states
  const [tripStart, setTripStart] = useState(null);
  const [tripEnd, setTripEnd] = useState(null);

  // Load saved trip dates from localStorage on mount
  useEffect(() => {
    const storedStart = localStorage.getItem('tripStart');
    const storedEnd = localStorage.getItem('tripEnd');
    if (storedStart && storedEnd) {
      setTripStart(new Date(storedStart));
      setTripEnd(new Date(storedEnd));
    }
  }, []);

  // Save trip dates to localStorage when updated
  useEffect(() => {
    if (tripStart && tripEnd) {
      localStorage.setItem('tripStart', tripStart);
      localStorage.setItem('tripEnd', tripEnd);
    }
  }, [tripStart, tripEnd]);

  useEffect(() => {
    let isMounted = true;

    const fetchFestivals = async () => {
      try {
        const response = await fetch(
          `https://calendarific.com/api/v2/holidays?api_key=c9E67RjySnoU6ZRuB4Z8pLF3uvATzNag&country=IN&year=2025`
        );

        if (!response.ok) throw new Error(`Failed to fetch festivals`);

        const data = await response.json();

        if (isMounted && data.response.holidays) {
          const tamilNaduFestivals = data.response.holidays
            .filter(festival =>
              [
                "Puthandu",
                "Chithirai Festival",
                "Vaikasi Visakam",
                "Aadi Perukku",
                "Vinayaka Chaturthi",
                "Ayudha Puja",
                "Saraswati Puja",
                "Vijaya Dasami",
                "Deepavali",
              ].some(f => festival.name.toLowerCase().includes(f.toLowerCase()))
            )
            .reduce((acc, festival) => {
              const month = new Date(festival.date.iso).toLocaleString('en-US', { month: 'long' });
              if (!acc[month]) acc[month] = [];
              acc[month].push(festival);
              return acc;
            }, {});

          setFestivals(tamilNaduFestivals);
          setLoading(false);
        }
      } catch (error) {
        console.error("Festival Fetch Error:", error.message);
        setError(error.message);
        setLoading(false);
      }
    };

    fetchFestivals();
    return () => {
      isMounted = false;
    };
  }, []);

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

  return (
    <div className="calendar-container">
      {/* <div className="profile-section">
        <FaUserCircle size={32} color="#b0b0b0" className="profile-icon" />
        <span className="profile-name">{userName || "Anni"}</span>
      </div> */}
      

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

      <div className="festival-section">
        <h5>Festivals</h5>
        {loading ? (
          <p>Loading festival data...</p>
        ) : error ? (
          <p className="error-text">⚠️ {error}</p>
        ) : Object.keys(festivals).length > 0 ? (
          <div className="festival-list">
            {Object.entries(festivals).map(([month, festivalList]) => (
              festivalList.map((festival, index) => (
                <div key={index} className="festival-card">
                  <div className="festival-info">
                    <strong className="festival-name">{festival.name}</strong>
                    <p className="festival-date">{month} - {festival.date.iso} 📅</p>
                  </div>
                  <span className="date-icon"></span>
                </div>
              ))
            ))}
          </div>
        ) : (
          <p>No festivals found.</p>
        )}

        
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
