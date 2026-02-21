import { useState } from 'react';
import '../styles/SurahSection.css';

function SurahSection({ surahs }) {
  const [selectedSurah, setSelectedSurah] = useState(null);
  const [favorites, setFavorites] = useState([]);
  const [selectedLanguage, setSelectedLanguage] = useState('arabic');

  const toggleFavorite = (surahId) => {
    if (favorites.includes(surahId)) {
      setFavorites(favorites.filter(id => id !== surahId));
    } else {
      setFavorites([...favorites, surahId]);
    }
  };

  return (
    <div className="surah-section">
      <h2>آخری 10 سورتیں</h2>
      <div className="surahs-container">
        <div className="surahs-list">
          {surahs.map((surah) => (
            <div
              key={surah.id}
              className={`surah-item ${selectedSurah?.id === surah.id ? 'selected' : ''}`}
              onClick={() => setSelectedSurah(surah)}
            >
              <div className="surah-header">
                <div className="surah-info">
                  <span className="surah-number">سورة {surah.number}</span>
                  <span className="surah-name">{surah.name}</span>
                </div>
                <button
                  className={`favorite-btn ${favorites.includes(surah.id) ? 'favorited' : ''}`}
                  onClick={(e) => {
                    e.stopPropagation();
                    toggleFavorite(surah.id);
                  }}
                >
                  {favorites.includes(surah.id) ? '❤️' : '🤍'}
                </button>
              </div>
            </div>
          ))}
        </div>
        {selectedSurah && (
          <div className="surah-detail">
            <div className="surah-title-section">
              <div className="surah-number-circle">{selectedSurah.number}</div>
              <div className="surah-title-text">
                <h3 dir="rtl">{selectedSurah.name}</h3>
                <p className="surah-verses">آیتیں: {selectedSurah.verses}</p>
              </div>
            </div>
            <div className="language-tabs">
              <button
                className={`language-btn ${selectedLanguage === 'arabic' ? 'active' : ''}`}
                onClick={() => setSelectedLanguage('arabic')}
              >
                عربی
              </button>
              <button
                className={`language-btn ${selectedLanguage === 'urdu' ? 'active' : ''}`}
                onClick={() => setSelectedLanguage('urdu')}
              >
                اردو
              </button>
            </div>
            <div className="surah-content">
              <div className="surah-text">
                <p dir={selectedLanguage === 'urdu' ? 'rtl' : 'rtl'}>
                  {selectedLanguage === 'arabic' ? selectedSurah.arabic : selectedSurah.urdu}
                </p>
              </div>
            </div>
            <button
              className="copy-btn"
              onClick={() => {
                const text = selectedLanguage === 'arabic' ? selectedSurah.arabic : selectedSurah.urdu;
                navigator.clipboard.writeText(text);
                alert(selectedLanguage === 'arabic' ? 'سورة کاپی ہو گیا!' : 'سورہ کاپی ہو گیا!');
              }}
            >
              {selectedLanguage === 'arabic' ? 'سورہ کاپی کریں' : 'سورہ کاپی کریں'}
            </button>
          </div>
        )}
      </div>
      {favorites.length > 0 && (
        <div className="favorites-section">
          <h3>پسندیدہ سورتیں ({favorites.length})</h3>
          <div className="favorites-list">
            {surahs.filter(surah => favorites.includes(surah.id)).map(surah => (
              <div key={surah.id} className="favorite-item">
                <span className="fav-number">سورة {surah.number}</span>
                <span>{surah.name}</span>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

export default SurahSection;
