import { useState } from 'react'
import './App.css'
import CalendarView from './components/CalendarView'
import PrayerTimes from './components/PrayerTimes'
import DuaSection from './components/DuaSection'
import RamadanNotes from './components/RamadanNotes'
import { ramadanData } from './data/prayerTimes'
import { duas } from './data/duas'

function App() {
  const [selectedDay, setSelectedDay] = useState(1)
  const currentDayData = ramadanData.find(day => day.day === selectedDay)

  return (
    <div className="app">
      <header className="app-header">
        <div className="header-content">
          <h1>🌙 Ramadan Calendar 2026 🌙</h1>
          <p className="header-subtitle">Complete guide to prayer times, fasting schedule, and duas</p>
        </div>
      </header>

      <main className="app-container">
        <section className="calendar-section">
          <CalendarView 
            ramadanData={ramadanData}
            onDaySelect={setSelectedDay}
          />
        </section>

        {currentDayData && (
          <section className="prayer-section">
            <PrayerTimes dayData={currentDayData} />
          </section>
        )}

        <section className="duas-section">
          <DuaSection duas={duas} />
        </section>

        <section className="notes-section">
          <RamadanNotes />
        </section>

        <footer className="app-footer">
          <p>💚 May Allah accept from us in this blessed month of Ramadan</p>
          <p className="footer-credit">Ramadan Mubarak 1447 Hijri / 2026 CE</p>
        </footer>
      </main>
    </div>
  )
}

export default App
