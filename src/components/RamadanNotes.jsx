import { useState } from 'react';
import '../styles/RamadanNotes.css';

function RamadanNotes() {
  const [notes, setNotes] = useState([]);
  const [newNote, setNewNote] = useState('');
  const [newCategory, setNewCategory] = useState('general');

  const categories = [
    { id: 'general', label: 'General', icon: '📝' },
    { id: 'goals', label: 'Goals', icon: '🎯' },
    { id: 'reminders', label: 'Reminders', icon: '🔔' },
    { id: 'reflections', label: 'Reflections', icon: '🤔' }
  ];

  const addNote = () => {
    if (newNote.trim()) {
      setNotes([
        ...notes,
        {
          id: Date.now(),
          text: newNote,
          category: newCategory,
          date: new Date().toLocaleDateString()
        }
      ]);
      setNewNote('');
    }
  };

  const deleteNote = (id) => {
    setNotes(notes.filter(note => note.id !== id));
  };

  const groupedNotes = categories.map(cat => ({
    ...cat,
    items: notes.filter(note => note.category === cat.id)
  }));

  return (
    <div className="ramadan-notes">
      <h2>My Ramadan Notes & Goals</h2>
      
      <div className="note-input-section">
        <div className="input-group">
          <input
            type="text"
            value={newNote}
            onChange={(e) => setNewNote(e.target.value)}
            onKeyPress={(e) => e.key === 'Enter' && addNote()}
            placeholder="Add a note, goal, or reminder..."
            className="note-input"
          />
          <select
            value={newCategory}
            onChange={(e) => setNewCategory(e.target.value)}
            className="category-select"
          >
            {categories.map(cat => (
              <option key={cat.id} value={cat.id}>
                {cat.label}
              </option>
            ))}
          </select>
          <button onClick={addNote} className="add-btn">
            Add
          </button>
        </div>
      </div>

      <div className="notes-display">
        {groupedNotes.map(category => (
          <div key={category.id} className="notes-category">
            <h3 className="category-title">
              <span className="category-icon">{category.icon}</span>
              {category.label}
            </h3>
            {category.items.length > 0 ? (
              <div className="notes-list">
                {category.items.map(note => (
                  <div key={note.id} className="note-item">
                    <div className="note-content">
                      <p>{note.text}</p>
                      <small className="note-date">{note.date}</small>
                    </div>
                    <button
                      className="delete-btn"
                      onClick={() => deleteNote(note.id)}
                      title="Delete note"
                    >
                      ✕
                    </button>
                  </div>
                ))}
              </div>
            ) : (
              <p className="empty-message">No {category.label.toLowerCase()} yet</p>
            )}
          </div>
        ))}
      </div>

      {notes.length > 0 && (
        <div className="stats">
          <p>Total Items: <strong>{notes.length}</strong></p>
        </div>
      )}
    </div>
  );
}

export default RamadanNotes;
