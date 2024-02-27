// Function to open or create an IndexedDB database
export const openDB = async (dbName, version) => {
    return new Promise((resolve, reject) => {
      const request = window.indexedDB.open(dbName, version);
      request.onerror = (e) => reject(`IndexedDB error: ${e.target.errorCode}`);
      request.onsuccess = (e) => resolve(e.target.result);
      request.onupgradeneeded = (e) => {
        const db = e.target.result;
        if (!db.objectStoreNames.contains('quests')) {
          db.createObjectStore('quests', { keyPath: 'id' });
        }
      };
    });
  };
  
  // Function to add a quest to the 'quests' store
  export const addQuest = async (db, quest) => {
    const transaction = db.transaction(['quests'], 'readwrite');
    const store = transaction.objectStore('quests');
    return new Promise((resolve, reject) => {
      const request = store.add(quest);
      request.onsuccess = () => resolve();
      request.onerror = (e) => reject(`Add quest error: ${e.target.errorCode}`);
    });
  };
  
  // Function to retrieve all quests from the 'quests' store
  export const getQuests = async (db) => {
    const transaction = db.transaction(['quests'], 'readonly');
    const store = transaction.objectStore('quests');
    return new Promise((resolve, reject) => {
      const request = store.getAll();
      request.onsuccess = () => resolve(request.result);
      request.onerror = (e) => reject(`Get quests error: ${e.target.errorCode}`);
    });
  };
  