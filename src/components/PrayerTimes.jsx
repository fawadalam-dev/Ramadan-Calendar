import { useState } from 'react';
import '../styles/PrayerTimes.css';

function PrayerTimes({ dayData }) {
  const prayers = [
    { name: 'Fajr', time: dayData.fajr, icon: '🌙' },
    { name: 'Sunrise', time: dayData.sunrise, icon: '🌅' },
    { name: 'Dhuhr', time: dayData.dhuhr, icon: '☀️' },
    { name: 'Asr', time: dayData.asr, icon: '⛅' },
    { name: 'Maghrib', time: dayData.maghrib, icon: '🌆' },
    { name: 'Isha', time: dayData.isha, icon: '⭐' }
  ];

  return (
    <div className="prayer-times">
      <h3>Prayer Times - Day {dayData.day}</h3>
      <div className="prayers-grid">
        {prayers.map((prayer, index) => (
          <div key={index} className="prayer-card">
            <div className="prayer-icon">{prayer.icon}</div>
            <div className="prayer-name">{prayer.name}</div>
            <div className="prayer-time">{prayer.time}</div>
          </div>
        ))}
      </div>
      <div className="fasting-info">
        <div className="sehri-info">
          <span className="label">Sehri Ends:</span>
          <span className="time">{dayData.sehriEnd}</span>
        </div>
        <div className="iftar-info">
          <span className="label">Iftar (Breaking Fast):</span>
          <span className="time">{dayData.iftarTime}</span>
        </div>
      </div>
    </div>
  );
}

export default PrayerTimes;
