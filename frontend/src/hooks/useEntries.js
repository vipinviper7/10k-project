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
        if (!cancelled) setEntries(all.map(withUrl));
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
  }, [withUrl]);

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
      setEntries((prev) => [decorated, ...prev]);
      return decorated;
    },
    [withUrl]
  );

  const update = useCallback(async (id, patch) => {
    let updated = null;
    setEntries((prev) =>
      prev.map((e) => {
        if (e.id !== id) return e;
        updated = { ...e, ...patch };
        return updated;
      })
    );
    if (updated) {
      const { photoUrl, ...record } = updated;
      await updateEntry(record);
    }
    return updated;
  }, []);

  const remove = useCallback(async (id) => {
    await deleteEntry(id);
    const url = urlsRef.current.get(id);
    if (url) {
      URL.revokeObjectURL(url);
      urlsRef.current.delete(id);
    }
    setEntries((prev) => prev.filter((e) => e.id !== id));
  }, []);

  return { entries, loading, capture, update, remove };
}
