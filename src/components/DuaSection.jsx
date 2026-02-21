import { useState } from 'react';
import '../styles/DuaSection.css';

function DuaSection({ duas }) {
  const [selectedDua, setSelectedDua] = useState(null);
  const [favorites, setFavorites] = useState([]);
  const [selectedLanguage, setSelectedLanguage] = useState('arabic');

  const toggleFavorite = (duaId) => {
    if (favorites.includes(duaId)) {
      setFavorites(favorites.filter(id => id !== duaId));
    } else {
      setFavorites([...favorites, duaId]);
    }
  };

  return (
    <div className="dua-section">
      <h2>رمضان کی دعائیں</h2>
      <div className="duas-container">
        <div className="duas-list">
          {duas.map((dua) => (
            <div
              key={dua.id}
              className={`dua-item ${selectedDua?.id === dua.id ? 'selected' : ''}`}
              onClick={() => setSelectedDua(dua)}
            >
              <div className="dua-header">
                <span className="dua-title">{dua.title}</span>
                <button
                  className={`favorite-btn ${favorites.includes(dua.id) ? 'favorited' : ''}`}
                  onClick={(e) => {
                    e.stopPropagation();
                    toggleFavorite(dua.id);
                  }}
                >
                  {favorites.includes(dua.id) ? '❤️' : '🤍'}
                </button>
              </div>
            </div>
          ))}
        </div>
        {selectedDua && (
          <div className="dua-detail">
            <h3>{selectedDua.title}</h3>
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
              <button
                className={`language-btn ${selectedLanguage === 'pashto' ? 'active' : ''}`}
                onClick={() => setSelectedLanguage('pashto')}
              >
                پشتو
              </button>
            </div>
            <div className="dua-content">
              <div className="dua-text">
                <p dir={selectedLanguage === 'pashto' ? 'ltr' : 'rtl'}>
                  {selectedLanguage === 'arabic' ? selectedDua.arabic : selectedLanguage === 'urdu' ? selectedDua.urdu : selectedDua.pashto}
                </p>
              </div>
            </div>
            <button
              className="copy-btn"
              onClick={() => {
                const text = selectedLanguage === 'arabic' ? selectedDua.arabic : selectedLanguage === 'urdu' ? selectedDua.urdu : selectedDua.pashto;
                navigator.clipboard.writeText(text);
                const message = selectedLanguage === 'arabic' ? 'الدعاء نسخ!' : selectedLanguage === 'urdu' ? 'دعا کاپی ہو گئی!' : 'دعا کاپي شو!';
                alert(message);
              }}
            >
              {selectedLanguage === 'arabic' ? 'نسخ الدعاء' : selectedLanguage === 'urdu' ? 'دعا کاپی کریں' : 'دعا کاپي کړه'}
            </button>
          </div>
        )}
      </div>
      {favorites.length > 0 && (
        <div className="favorites-section">
          <h3>پسندیدہ دعائیں ({favorites.length})</h3>
          <div className="favorites-list">
            {duas.filter(dua => favorites.includes(dua.id)).map(dua => (
              <div key={dua.id} className="favorite-item">
                <span>{dua.title}</span>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

export default DuaSection;
