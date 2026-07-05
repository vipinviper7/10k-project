/**
 * Local-first storage for journal entries using IndexedDB.
 * Each entry: { id, blob, takenAt (epoch ms), meal, note, createdAt }
 * Photos are stored as compressed JPEG blobs and never leave the device.
 */

const DB_NAME = 'food-journal';
const DB_VERSION = 1;
const STORE = 'entries';

let dbPromise = null;

function openDb() {
  if (dbPromise) return dbPromise;
  dbPromise = new Promise((resolve, reject) => {
    const request = indexedDB.open(DB_NAME, DB_VERSION);
    request.onupgradeneeded = () => {
      const db = request.result;
      if (!db.objectStoreNames.contains(STORE)) {
        const store = db.createObjectStore(STORE, { keyPath: 'id' });
        store.createIndex('takenAt', 'takenAt');
      }
    };
    request.onsuccess = () => resolve(request.result);
    request.onerror = () => reject(request.error);
  });
  return dbPromise;
}

function tx(db, mode) {
  return db.transaction(STORE, mode).objectStore(STORE);
}

export async function getAllEntries() {
  const db = await openDb();
  return new Promise((resolve, reject) => {
    const request = tx(db, 'readonly').getAll();
    request.onsuccess = () => {
      const entries = request.result || [];
      entries.sort((a, b) => b.takenAt - a.takenAt);
      resolve(entries);
    };
    request.onerror = () => reject(request.error);
  });
}

export async function addEntry(entry) {
  const db = await openDb();
  return new Promise((resolve, reject) => {
    const request = tx(db, 'readwrite').add(entry);
    request.onsuccess = () => resolve(entry);
    request.onerror = () => reject(request.error);
  });
}

export async function updateEntry(entry) {
  const db = await openDb();
  return new Promise((resolve, reject) => {
    const request = tx(db, 'readwrite').put(entry);
    request.onsuccess = () => resolve(entry);
    request.onerror = () => reject(request.error);
  });
}

export async function deleteEntry(id) {
  const db = await openDb();
  return new Promise((resolve, reject) => {
    const request = tx(db, 'readwrite').delete(id);
    request.onsuccess = () => resolve();
    request.onerror = () => reject(request.error);
  });
}
