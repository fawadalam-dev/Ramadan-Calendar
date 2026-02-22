import { convertTo12Hour } from '../utils/timeConverter';
import '../styles/CalendarView.css';

function CalendarView({ ramadanData, onDaySelect, selectedDay }) {
  const handleDayClick = (day) => {
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
            <div className="timing-info">
              <div className="sehri-time">
                <span className="timing-label">Sehri:</span>
                <span className="timing-value">{convertTo12Hour(day.sehriEnd)}</span>
              </div>
              <div className="iftari-time">
                <span className="timing-label">Iftari:</span>
                <span className="timing-value">{convertTo12Hour(day.iftarTime)}</span>
              </div>
            </div>
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
