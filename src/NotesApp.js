import React, { useState, useEffect } from 'react';

const NotesApp = () => {
  const [notes, setNotes] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [inputText, setInputText] = useState('');
  const [characterLimit, setCharacterLimit] = useState(100);

  useEffect(() => {
    // Load notes from local storage
    const storedNotes = localStorage.getItem('notes');
    if (storedNotes) {
      setNotes(JSON.parse(storedNotes));
    }
  }, []);

  useEffect(() => {
    // Save notes to local storage
    localStorage.setItem('notes', JSON.stringify(notes));
  }, [notes]);

  const handleAddNote = () => {
    if (inputText.trim() !== '') {
      const newNote = {
        id: Date.now(),
        text: inputText.trim(),
      };
      setNotes((prevNotes) => [...prevNotes, newNote]);
      setInputText('');
    }
  };

  const handleDeleteNote = (id) => {
    setNotes((prevNotes) => prevNotes.filter((note) => note.id !== id));
  };

  const handleSearchChange = (event) => {
    setSearchTerm(event.target.value);
  };

  const filteredNotes = notes.filter((note) =>
    note.text.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div style={{width: '500px', margin: 'auto'}}>
      <h1 style={{ textAlign: 'center' }}>Notes App</h1>
      <div style={{ marginBottom: '10px' }}>
        <textarea
          placeholder="Enter your note..."
          value={inputText}
          onChange={(event) => setInputText(event.target.value)}
          maxLength={characterLimit}
          style={{ width: '100%', minHeight: '100px', padding: '5px' }}
        />
        <p style={{ textAlign: 'right', fontSize: '14px', margin: '5px 0' }}>
          Characters left: {characterLimit - inputText.length}
        </p>
        <button
          onClick={handleAddNote}
          style={{ display: 'block', margin: '0 auto' }}
        >
          Add Note
        </button>
      </div>
      <input
        type="text"
        placeholder="Search notes..."
        value={searchTerm}
        onChange={handleSearchChange}
        style={{ width: '100%', padding: '5px' }}
      />
      <ul style={{ listStyleType: 'none', padding: '0' }}>
        {filteredNotes.map((note) => (
          <li
            key={note.id}
            style={{ marginBottom: '10px', padding: '5px', border: '1px solid #ccc' }}
          >
            <p style={{ margin: '0' }}>{note.text}</p>
            <button
              onClick={() => handleDeleteNote(note.id)}
              style={{ display: 'block', margin: '5px auto' }}
            >
              Delete
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default NotesApp;
