import React, { useState, useEffect, createContext } from 'react';
import '@/App.css';
import { Header } from './components/Header';
import { Timeline } from './components/Timeline';
import { EmptyState } from './components/EmptyState';
import { CaptureButton } from './components/CaptureButton';
import { EntryDialog } from './components/EntryDialog';
import { Toaster, toast } from './components/ui/sonner';
import { Skeleton } from './components/ui/skeleton';
import { useEntries } from './hooks/useEntries';
import { syncStatusBarWithTheme, hapticSuccess } from './capacitorInit';

export const ThemeContext = createContext(null);

function App() {
  const [theme, setTheme] = useState(() => localStorage.getItem('fj-theme') || 'light');
  const [openEntryId, setOpenEntryId] = useState(null);
  const { entries, loading, capture, update, remove } = useEntries();

  useEffect(() => {
    const root = document.documentElement;
    root.classList.toggle('dark', theme === 'dark');
    localStorage.setItem('fj-theme', theme);
    syncStatusBarWithTheme(theme);
  }, [theme]);

  const toggleTheme = () => setTheme((prev) => (prev === 'light' ? 'dark' : 'light'));

  const handleCapture = async (file) => {
    try {
      const entry = await capture(file);
      hapticSuccess();
      toast.success('Added to your journal', {
        description: new Date(entry.takenAt).toLocaleTimeString([], {
          hour: 'numeric',
          minute: '2-digit',
        }),
      });
    } catch (err) {
      console.error('Capture failed', err);
      toast.error("Couldn't save that photo", { description: 'Please try again.' });
    }
  };

  const handleDelete = async (id) => {
    setOpenEntryId(null);
    await remove(id);
    toast('Photo deleted');
  };

  const openEntry = entries.find((e) => e.id === openEntryId) || null;

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme }}>
      <div className="App min-h-screen bg-background transition-colors duration-500">
        <Header entryCount={entries.length} />

        <main className="mx-auto max-w-2xl px-4 pb-36 pt-6">
          {loading ? (
            <div className="grid grid-cols-2 gap-3 sm:grid-cols-3">
              {Array.from({ length: 6 }).map((_, i) => (
                <Skeleton key={i} className="aspect-square rounded-2xl" />
              ))}
            </div>
          ) : entries.length === 0 ? (
            <EmptyState />
          ) : (
            <Timeline entries={entries} onOpen={(entry) => setOpenEntryId(entry.id)} />
          )}
        </main>

        <CaptureButton onCapture={handleCapture} />

        <EntryDialog
          entry={openEntry}
          onClose={() => setOpenEntryId(null)}
          onUpdate={update}
          onDelete={handleDelete}
        />

        <Toaster position="top-center" />
      </div>
    </ThemeContext.Provider>
  );
}

export default App;
