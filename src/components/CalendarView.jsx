import { useState } from 'react';
import '../styles/CalendarView.css';

function CalendarView({ ramadanData, onDaySelect }) {
  const [selectedDay, setSelectedDay] = useState(1);

  const handleDayClick = (day) => {
    setSelectedDay(day);
    onDaySelect(day);
  };

  return (
    <div className="calendar-view">
      <h2>Ramadan 2026 Calendar</h2>
      <p className="calendar-subtitle">Click on any day to view prayer times</p>
      
      <div className="days-grid">
        {ramadanData.map((day) => (
          <div
            key={day.day}
            className={`day-cell ${selectedDay === day.day ? 'selected' : ''}`}
            onClick={() => handleDayClick(day.day)}
          >
            <div className="day-number">{day.day}</div>
            <div className="day-date">
              {new Date(day.date).toLocaleDateString('en-US', {
                month: 'short',
                day: 'numeric'
              })}
            </div>
            <div className="iftar-time">{day.iftarTime}</div>
          </div>
        ))}
      </div>

      <div className="legend">
        <p>📅 Click a day to view detailed prayer times</p>
      </div>
    </div>
  );
}

export default CalendarView;
