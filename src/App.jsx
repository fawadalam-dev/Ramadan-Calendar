import { useState } from 'react'
import './App.css'
import CalendarView from './components/CalendarView'
import PrayerTimes from './components/PrayerTimes'
import DuaSection from './components/DuaSection'
import SurahSection from './components/SurahSection'
import RamadanNotes from './components/RamadanNotes'
import { ramadanData } from './data/prayerTimes'
import { duas } from './data/duas'
import { surahs } from './data/surahs'

function App() {
  const getTodayString = () => {
    const t = new Date()
    const y = t.getFullYear()
    const m = String(t.getMonth() + 1).padStart(2, '0')
    const d = String(t.getDate()).padStart(2, '0')
    return `${y}-${m}-${d}`
  }

  const todayStr = getTodayString()
  const todayEntry = ramadanData.find((day) => day.date === todayStr)
  const [selectedDay, setSelectedDay] = useState(todayEntry ? todayEntry.day : 1)
  const currentDayData = ramadanData.find((day) => day.day === selectedDay)

  return (
    <div className="app">
      <header className="app-header">
        <div className="header-content">
          <h1>🌙 رمضان کیلنڈر 2026 🌙</h1>
          <p className="header-subtitle">نماز کے اوقات، روزہ کا شیڈول، اور دعائیں</p>
        </div>
      </header>

      <main className="app-container">
        <section className="calendar-section">
          <CalendarView 
            ramadanData={ramadanData}
            selectedDay={selectedDay}
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

        <section className="surahs-section">
          <SurahSection surahs={surahs} />
        </section>

        <section className="notes-section">
          <RamadanNotes />
        </section>

        <footer className="app-footer">
          <p>💚 اللہ ہمارے روزے قبول فرمائے، ہماری دعاؤں کو قبول فرمائے، ہمارے گناہوں کو معاف فرمائے، ہمارے دلوں کو پاک فرمائے اور ہمیں رمضان کی برکتوں سے بھرپور حصہ عطا فرمائے۔ آمین یا رب العالمین۔</p>
          <p className="footer-credit">رمضان مبارک 1447 ہجری / 2026 عیسوی</p>
        </footer>
      </main>
    </div>
  )
}

export default App
