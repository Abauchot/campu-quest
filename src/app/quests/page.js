"use client";
import { useState } from 'react';

export default function Quests() {
  const [questName, setQuestName] = useState('');
  const [questSerial, setQuestSerial] = useState('');

  const handleQuestSubmit = async (event) => {
    event.preventDefault();
    try {
      const response = await fetch('/api/quests/createQuest', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ Name: questName, SerialQuest: questSerial }),
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data = await response.json();
      console.log('Quest created successfully:', data);
      setQuestName('');
      setQuestSerial('');
      // Handle success feedback to user here
    } catch (error) {
      console.error('Error creating quest:', error);
      // Handle error feedback to user here
    }
  };

  return (
    <div>
      <h1>Create a Quest</h1>
      <form onSubmit={handleQuestSubmit} style={{ backgroundColor: '#fff', color: '#000', padding: '20px', borderRadius: '8px' }}>
        <label>
          Quest Name:
          <input
            type="text"
            value={questName}
            onChange={(e) => setQuestName(e.target.value)}
            style={{ margin: '10px 0', padding: '5px', borderRadius: '4px', border: '1px solid #ccc' }}
          />
        </label>
        <label>
          Quest Serial:
          <input
            type="text"
            value={questSerial}
            onChange={(e) => setQuestSerial(e.target.value)}
            style={{ margin: '10px 0', padding: '5px', borderRadius: '4px', border: '1px solid #ccc' }}
          />
        </label>
        <button type="submit" style={{ backgroundColor: '#007bff', color: '#fff', padding: '8px 16px', borderRadius: '4px' }}>Create Quest</button>
      </form>
    </div>
  );
}
