"use client";
import { useState, useEffect } from 'react';
import Navbar from '../component/navbar';

export default function Quests() {
  const [quests, setQuests] = useState([]);
  const [questName, setQuestName] = useState('');
  const [questSerial, setQuestSerial] = useState('');

  useEffect(() => {
    // Fetch all quests when the component mounts
    const fetchQuests = async () => {
      try {
        const response = await fetch('/api/quests/getAllQuest');
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        const data = await response.json();
        setQuests(data); // Update the quests state
      } catch (error) {
        console.error('Error fetching quests:', error);
      }
    };

    fetchQuests();
  }, []); // The empty array ensures this effect runs only once on mount

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

      const newQuest = await response.json();
      setQuests([...quests, newQuest]); // Add the new quest to the current list of quests
      console.log('Quest created successfully:', newQuest);
      setQuestName('');
      setQuestSerial('');
    } catch (error) {
      console.error('Error creating quest:', error);
    }
  };
  
  const fetchQuestById = async (id) => {
    try {
      const response = await fetch(`/api/quests/getQuestById?id=${id}`);
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      const quest = await response.json();
      console.log('Fetched quest:', quest);
      return quest;
    } catch (error) {
      console.error('Error fetching quest:', error);
    }
  };

  const handleDeleteQuest = async (id) => {
    try {
      const response = await fetch(`/api/quests/removeQuest?id=${id}`, {
        method: 'DELETE',
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const { quest } = await response.json();
      const updatedQuests = quests.filter((q) => q.id !== quest.id);
      setQuests(updatedQuests); // Update the quests state
      console.log('Quest deleted successfully:', quest);
    } catch (error) {
      console.error('Error deleting quest:', error);
    }
  }

  return (
    <div className="bg-black text-white min-h-screen">
      <Navbar />
      <div className="max-w-md mx-auto py-12">
        <h1 className="text-xl font-bold mb-6">Create a Quest</h1>
        <form onSubmit={handleQuestSubmit} className="bg-gray-800 p-6 rounded-lg">
          <div className="mb-4">
            <label className="block text-sm font-medium mb-2" htmlFor="questName">Quest Name:</label>
            <input
              id="questName"
              type="text"
              value={questName}
              onChange={(e) => setQuestName(e.target.value)}
              className="w-full p-2 text-black rounded-md"
            />
          </div>
          <div className="mb-6">
            <label className="block text-sm font-medium mb-2" htmlFor="questSerial">Quest Serial:</label>
            <input
              id="questSerial"
              type="text"
              value={questSerial}
              onChange={(e) => setQuestSerial(e.target.value)}
              className="w-full p-2 text-black rounded-md"
            />
          </div>
          <button type="submit" className="w-full bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-md">Create Quest</button>
        </form>
        <div className="mt-8">
          <h2 className="text-lg font-bold mb-4">All Quests</h2>
          <ul>
            {quests.map((quest, index) => (
              <li key={index} className="mb-2 p-2 border border-gray-700 rounded-md">
                {quest.name} - {quest.serialQuest} <br />
                <button  onClick={() => handleDeleteQuest(quest.id)}>Delete</button> <br />
                <button onClick={() => fetchQuestById(quest.id)}>Fetch</button>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
}
