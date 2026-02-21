import { useState } from 'react';
import { convertTo12Hour, playAlarm } from '../utils/timeConverter';
import '../styles/PrayerTimes.css';

function PrayerTimes({ dayData }) {
  const [alarmSet, setAlarmSet] = useState({});

  const prayers = [
    { name: 'Fajr', time: dayData.fajr, icon: '🌙' },
    { name: 'Sunrise', time: dayData.sunrise, icon: '🌅' },
    { name: 'Dhuhr', time: dayData.dhuhr, icon: '☀️' },
    { name: 'Asr', time: dayData.asr, icon: '⛅' },
    { name: 'Maghrib', time: dayData.maghrib, icon: '🌆' },
    { name: 'Isha', time: dayData.isha, icon: '⭐' }
  ];

  const toggleAlarm = (prayerName) => {
    const newState = { ...alarmSet };
    if (newState[prayerName]) {
      delete newState[prayerName];
    } else {
      newState[prayerName] = true;
      playAlarm(500);
    }
    setAlarmSet(newState);
  };

  return (
    <div className="prayer-times">
      <h3>Prayer Times - Day {dayData.day}</h3>
      <div className="prayers-grid">
        {prayers.map((prayer, index) => (
          <div key={index} className="prayer-card">
            <div className="prayer-icon">{prayer.icon}</div>
            <div className="prayer-name">{prayer.name}</div>
            <div className="prayer-time">{convertTo12Hour(prayer.time)}</div>
            <button
              className={`alarm-btn ${alarmSet[prayer.name] ? 'active' : ''}`}
              onClick={() => toggleAlarm(prayer.name)}
              title={`Set alarm for ${prayer.name}`}
            >
              {alarmSet[prayer.name] ? '🔔' : '🔕'}
            </button>
          </div>
        ))}
      </div>
      <div className="fasting-info">
        <div className="sehri-info">
          <span className="label">Sehri Ends:</span>
          <span className="time">{convertTo12Hour(dayData.sehriEnd)}</span>
        </div>
        <div className="iftar-info">
          <span className="label">Iftar (Breaking Fast):</span>
          <span className="time">{convertTo12Hour(dayData.iftarTime)}</span>
        </div>
      </div>
    </div>
  );
}

export default PrayerTimes;
