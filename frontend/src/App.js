import React, { useState, useEffect, createContext } from 'react';
import '@/App.css';
import { HashRouter, Routes, Route } from 'react-router-dom';
import HomePage from './pages/HomePage';
import ReaderPage from './pages/ReaderPage';
import BookmarksPage from './pages/BookmarksPage';
import Header from './components/Header';
import { Toaster } from './components/ui/sonner';
import { syncStatusBarWithTheme, hapticLight } from './capacitorInit';

// Theme context for dark/light mode
export const ThemeContext = createContext(null);

// Bookmarks context for local storage
export const BookmarkContext = createContext(null);

function App() {
  const [theme, setTheme] = useState(() => {
    return localStorage.getItem('qv-theme') || 'light';
  });

  const [bookmarks, setBookmarks] = useState(() => {
    try {
      const saved = localStorage.getItem('qv-bookmarks');
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  });

  const [fontSize, setFontSize] = useState(() => {
    return parseInt(localStorage.getItem('qv-fontsize') || '20', 10);
  });

  // Apply theme class to document
  useEffect(() => {
    const root = document.documentElement;
    if (theme === 'dark') {
      root.classList.add('dark');
    } else {
      root.classList.remove('dark');
    }
    localStorage.setItem('qv-theme', theme);
    syncStatusBarWithTheme(theme);
  }, [theme]);

  // Persist bookmarks
  useEffect(() => {
    localStorage.setItem('qv-bookmarks', JSON.stringify(bookmarks));
  }, [bookmarks]);

  // Persist font size
  useEffect(() => {
    localStorage.setItem('qv-fontsize', fontSize.toString());
  }, [fontSize]);

  const toggleTheme = () => {
    setTheme(prev => prev === 'light' ? 'dark' : 'light');
  };

  const addBookmark = (bookmark) => {
    setBookmarks(prev => {
      const key = `${bookmark.book}:${bookmark.chapter}:${bookmark.verse}`;
      if (prev.some(b => `${b.book}:${b.chapter}:${b.verse}` === key)) return prev;
      hapticLight();
      return [{ ...bookmark, savedAt: Date.now() }, ...prev];
    });
  };

  const removeBookmark = (book, chapter, verse) => {
    hapticLight();
    setBookmarks(prev =>
      prev.filter(b => !(b.book === book && b.chapter === chapter && b.verse === verse))
    );
  };

  const isBookmarked = (book, chapter, verse) => {
    return bookmarks.some(b => b.book === book && b.chapter === chapter && b.verse === verse);
  };

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme, fontSize, setFontSize }}>
      <BookmarkContext.Provider value={{ bookmarks, addBookmark, removeBookmark, isBookmarked }}>
        <div className="App min-h-screen bg-background transition-colors duration-500">
          <HashRouter>
            <Header />
            <main className="pb-8">
              <Routes>
                <Route path="/" element={<HomePage />} />
                <Route path="/read" element={<ReaderPage />} />
                <Route path="/read/:bookName" element={<ReaderPage />} />
                <Route path="/read/:bookName/:chapter" element={<ReaderPage />} />
                <Route path="/bookmarks" element={<BookmarksPage />} />
              </Routes>
            </main>
          </HashRouter>
          <Toaster position="top-center" />
        </div>
      </BookmarkContext.Provider>
    </ThemeContext.Provider>
  );
}

export default App;
