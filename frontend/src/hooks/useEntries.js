import { useCallback, useEffect, useRef, useState } from 'react';
import { getAllEntries, addEntry, updateEntry, deleteEntry } from '../lib/db';
import { compressImage } from '../lib/image';
import { suggestMeal } from '../lib/meals';

function makeId() {
  return typeof crypto !== 'undefined' && crypto.randomUUID
    ? crypto.randomUUID()
    : `${Date.now()}-${Math.random().toString(36).slice(2)}`;
}

/**
 * Loads entries from IndexedDB and exposes CRUD helpers.
 * Manages object URLs for photo blobs, revoking them on unmount.
 */
export function useEntries() {
  const [entries, setEntries] = useState([]);
  const [loading, setLoading] = useState(true);
  const urlsRef = useRef(new Map());
  // Mirror of `entries` that updates synchronously, so async mutators can
  // read the latest list without waiting for a React render.
  const entriesRef = useRef([]);

  const commit = useCallback((next) => {
    entriesRef.current = next;
    setEntries(next);
  }, []);

  const withUrl = useCallback((entry) => {
    let url = urlsRef.current.get(entry.id);
    if (!url) {
      url = URL.createObjectURL(entry.blob);
      urlsRef.current.set(entry.id, url);
    }
    return { ...entry, photoUrl: url };
  }, []);

  useEffect(() => {
    let cancelled = false;
    getAllEntries()
      .then((all) => {
        if (!cancelled) commit(all.map(withUrl));
      })
      .catch((err) => console.error('Failed to load entries', err))
      .finally(() => {
        if (!cancelled) setLoading(false);
      });

    const urls = urlsRef.current;
    return () => {
      cancelled = true;
      urls.forEach((url) => URL.revokeObjectURL(url));
      urls.clear();
    };
  }, [commit, withUrl]);

  const capture = useCallback(
    async (file) => {
      const blob = await compressImage(file);
      const now = Date.now();
      const entry = {
        id: makeId(),
        blob,
        takenAt: now,
        meal: suggestMeal(new Date(now)),
        note: '',
        createdAt: now,
      };
      await addEntry(entry);
      const decorated = withUrl(entry);
      commit([decorated, ...entriesRef.current]);
      return decorated;
    },
    [commit, withUrl]
  );

  const update = useCallback(
    async (id, patch) => {
      const current = entriesRef.current.find((e) => e.id === id);
      if (!current) return null;
      const updated = { ...current, ...patch };
      commit(entriesRef.current.map((e) => (e.id === id ? updated : e)));
      const { photoUrl, ...record } = updated;
      await updateEntry(record);
      return updated;
    },
    [commit]
  );

  const remove = useCallback(
    async (id) => {
      await deleteEntry(id);
      const url = urlsRef.current.get(id);
      if (url) {
        URL.revokeObjectURL(url);
        urlsRef.current.delete(id);
      }
      commit(entriesRef.current.filter((e) => e.id !== id));
    },
    [commit]
  );

  return { entries, loading, capture, update, remove };
}
