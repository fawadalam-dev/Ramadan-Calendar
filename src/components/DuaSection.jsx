import { useState } from 'react';
import '../styles/DuaSection.css';

function DuaSection({ duas }) {
  const [selectedDua, setSelectedDua] = useState(null);
  const [favorites, setFavorites] = useState([]);

  const toggleFavorite = (duaId) => {
    if (favorites.includes(duaId)) {
      setFavorites(favorites.filter(id => id !== duaId));
    } else {
      setFavorites([...favorites, duaId]);
    }
  };

  return (
    <div className="dua-section">
      <h2>Duas for Ramadan</h2>
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
            <div className="dua-content">
              <div className="dua-arabic">
                <label>Arabic:</label>
                <p dir="rtl">{selectedDua.arabic}</p>
              </div>
              <div className="dua-transliteration">
                <label>Transliteration:</label>
                <p>{selectedDua.transliteration}</p>
              </div>
              <div className="dua-translation">
                <label>English Translation:</label>
                <p>{selectedDua.translation}</p>
              </div>
            </div>
            <button
              className="copy-btn"
              onClick={() => {
                navigator.clipboard.writeText(selectedDua.arabic);
                alert('Arabic text copied!');
              }}
            >
              Copy Arabic Text
            </button>
          </div>
        )}
      </div>
      {favorites.length > 0 && (
        <div className="favorites-section">
          <h3>Your Favorite Duas ({favorites.length})</h3>
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
