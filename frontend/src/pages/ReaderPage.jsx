import React, { useState, useEffect, useContext, useCallback } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import bibleBooks, { getOldTestament, getNewTestament } from '../data/bibleIndex';
import { loadChapter, getAvailableChapters, isBookAvailable } from '../data/bibleLoader';
import { BookmarkContext, ThemeContext } from '../App';
import { Button } from '../components/ui/button';
import {
  ChevronLeft, ChevronRight, Bookmark, BookmarkCheck,
  Minus, Plus, BookOpen, Lock
} from 'lucide-react';

function BookList({ onSelect }) {
  const oldTestament = getOldTestament();
  const newTestament = getNewTestament();

  const renderSection = (title, books) => (
    <div className="mb-8">
      <h3 className="text-xs text-muted-foreground tracking-widest uppercase mb-3 px-1">{title}</h3>
      <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
        {books.map(book => (
          <button
            key={book.name}
            onClick={() => book.available && onSelect(book.name)}
            className={`text-left px-3 py-2.5 rounded-lg text-sm transition-colors ${
              book.available
                ? 'hover:bg-primary/5 text-foreground'
                : 'text-muted-foreground/40 cursor-not-allowed'
            }`}
            disabled={!book.available}
          >
            <span className="flex items-center gap-2">
              {book.name}
              {!book.available && <Lock className="h-3 w-3" />}
            </span>
          </button>
        ))}
      </div>
    </div>
  );

  return (
    <div className="animate-fade-in">
      <div className="text-center mb-8">
        <h2 className="text-2xl font-scripture font-semibold text-foreground mb-2">Scripture</h2>
        <p className="text-sm text-muted-foreground">Select a book to begin reading</p>
      </div>
      {renderSection('Old Testament', oldTestament)}
      {renderSection('New Testament', newTestament)}
    </div>
  );
}

function ChapterList({ bookName, chapters, onSelect, onBack }) {
  return (
    <div className="animate-fade-in">
      <button
        onClick={onBack}
        className="flex items-center gap-1 text-sm text-muted-foreground hover:text-foreground mb-6 transition-colors"
      >
        <ChevronLeft className="h-4 w-4" />
        All Books
      </button>
      <h2 className="text-2xl font-scripture font-semibold text-foreground mb-2">{bookName}</h2>
      <p className="text-sm text-muted-foreground mb-6">Select a chapter</p>
      <div className="grid grid-cols-5 sm:grid-cols-8 gap-2">
        {chapters.map(ch => (
          <button
            key={ch}
            onClick={() => onSelect(ch)}
            className="aspect-square flex items-center justify-center rounded-lg text-sm hover:bg-primary/5 text-foreground transition-colors border border-border/50"
          >
            {ch}
          </button>
        ))}
      </div>
    </div>
  );
}

function ChapterReader({ bookName, chapter, verses, onPrev, onNext, hasPrev, hasNext }) {
  const { addBookmark, removeBookmark, isBookmarked } = useContext(BookmarkContext);
  const { fontSize, setFontSize } = useContext(ThemeContext);

  const handleBookmark = (verse) => {
    const v = verse.verse;
    if (isBookmarked(bookName, chapter, v)) {
      removeBookmark(bookName, chapter, v);
    } else {
      addBookmark({
        book: bookName,
        chapter,
        verse: v,
        text: verse.text,
        reference: `${bookName} ${chapter}:${v}`,
      });
    }
  };

  return (
    <div className="animate-fade-in">
      {/* Chapter header */}
      <div className="flex items-center justify-between mb-8">
        <div>
          <Link to="/read" className="text-xs text-muted-foreground hover:text-foreground transition-colors">
            Books
          </Link>
          <span className="text-xs text-muted-foreground mx-2">/</span>
          <Link to={`/read/${bookName}`} className="text-xs text-muted-foreground hover:text-foreground transition-colors">
            {bookName}
          </Link>
          <h2 className="text-2xl font-scripture font-semibold text-foreground mt-1">
            Chapter {chapter}
          </h2>
        </div>

        {/* Font size controls */}
        <div className="flex items-center gap-1 bg-secondary/50 rounded-full px-2 py-1">
          <button
            onClick={() => setFontSize(Math.max(14, fontSize - 2))}
            className="p-1 text-muted-foreground hover:text-foreground transition-colors"
            aria-label="Decrease font size"
          >
            <Minus className="h-3 w-3" />
          </button>
          <span className="text-xs text-muted-foreground w-6 text-center">{fontSize}</span>
          <button
            onClick={() => setFontSize(Math.min(32, fontSize + 2))}
            className="p-1 text-muted-foreground hover:text-foreground transition-colors"
            aria-label="Increase font size"
          >
            <Plus className="h-3 w-3" />
          </button>
        </div>
      </div>

      {/* Verses */}
      <div className="space-y-1 mb-12" style={{ fontSize: `${fontSize}px`, lineHeight: 1.8 }}>
        {verses.map(verse => {
          const saved = isBookmarked(bookName, chapter, verse.verse);
          return (
            <span
              key={verse.verse}
              className={`group inline ${saved ? 'verse-highlight' : ''}`}
            >
              <sup className="text-primary/60 text-xs mr-1 font-sans select-none">
                {verse.verse}
              </sup>
              <span className="font-scripture text-foreground">{verse.text} </span>
              <button
                onClick={() => handleBookmark(verse)}
                className="inline-flex align-middle opacity-0 group-hover:opacity-100 transition-opacity"
                aria-label={saved ? 'Remove bookmark' : 'Bookmark this verse'}
              >
                {saved ? (
                  <BookmarkCheck className="h-3.5 w-3.5 text-primary" />
                ) : (
                  <Bookmark className="h-3.5 w-3.5 text-muted-foreground/40" />
                )}
              </button>
            </span>
          );
        })}
      </div>

      {/* Navigation */}
      <div className="flex items-center justify-between border-t border-border pt-6">
        {hasPrev ? (
          <Button variant="ghost" size="sm" onClick={onPrev} className="gap-1 text-muted-foreground">
            <ChevronLeft className="h-4 w-4" />
            Previous
          </Button>
        ) : <div />}
        {hasNext ? (
          <Button variant="ghost" size="sm" onClick={onNext} className="gap-1 text-muted-foreground">
            Next
            <ChevronRight className="h-4 w-4" />
          </Button>
        ) : <div />}
      </div>
    </div>
  );
}

export default function ReaderPage() {
  const { bookName, chapter } = useParams();
  const navigate = useNavigate();
  const [verses, setVerses] = useState(null);
  const [availableChapters, setAvailableChapters] = useState([]);
  const [loading, setLoading] = useState(false);

  // Load available chapters when book changes
  useEffect(() => {
    if (bookName && isBookAvailable(bookName)) {
      getAvailableChapters(bookName).then(setAvailableChapters);
    }
  }, [bookName]);

  // Load chapter verses
  useEffect(() => {
    if (bookName && chapter) {
      setLoading(true);
      loadChapter(bookName, parseInt(chapter, 10)).then(data => {
        setVerses(data);
        setLoading(false);
        window.scrollTo({ top: 0, behavior: 'smooth' });
      });
    }
  }, [bookName, chapter]);

  const chapterNum = chapter ? parseInt(chapter, 10) : null;
  const chapterIdx = availableChapters.indexOf(chapterNum);
  const hasPrev = chapterIdx > 0;
  const hasNext = chapterIdx < availableChapters.length - 1;

  const goToPrev = useCallback(() => {
    if (hasPrev) navigate(`/read/${bookName}/${availableChapters[chapterIdx - 1]}`);
  }, [hasPrev, navigate, bookName, availableChapters, chapterIdx]);

  const goToNext = useCallback(() => {
    if (hasNext) navigate(`/read/${bookName}/${availableChapters[chapterIdx + 1]}`);
  }, [hasNext, navigate, bookName, availableChapters, chapterIdx]);

  // No book selected — show book list
  if (!bookName) {
    return (
      <div className="max-w-[700px] mx-auto px-4 py-8" data-testid="reader-page">
        <BookList onSelect={(name) => navigate(`/read/${name}`)} />
      </div>
    );
  }

  // Book selected but no chapter — show chapter list
  if (!chapter) {
    return (
      <div className="max-w-[700px] mx-auto px-4 py-8" data-testid="reader-page">
        {isBookAvailable(bookName) ? (
          <ChapterList
            bookName={bookName}
            chapters={availableChapters}
            onSelect={(ch) => navigate(`/read/${bookName}/${ch}`)}
            onBack={() => navigate('/read')}
          />
        ) : (
          <div className="text-center py-16 animate-fade-in">
            <BookOpen className="h-12 w-12 text-muted-foreground/30 mx-auto mb-4" />
            <h2 className="text-xl font-scripture text-foreground mb-2">{bookName}</h2>
            <p className="text-sm text-muted-foreground mb-6">
              This book will be available in a future update.
            </p>
            <Button variant="ghost" size="sm" onClick={() => navigate('/read')} className="text-primary">
              <ChevronLeft className="h-4 w-4 mr-1" />
              Back to Books
            </Button>
          </div>
        )}
      </div>
    );
  }

  // Loading
  if (loading) {
    return (
      <div className="max-w-[700px] mx-auto px-4 py-8" data-testid="reader-page">
        <div className="space-y-3 animate-pulse">
          {[...Array(12)].map((_, i) => (
            <div key={i} className="h-4 bg-muted rounded w-full" style={{ width: `${70 + Math.random() * 30}%` }} />
          ))}
        </div>
      </div>
    );
  }

  // Chapter loaded
  if (verses) {
    return (
      <div className="max-w-[700px] mx-auto px-4 py-8" data-testid="reader-page">
        <ChapterReader
          bookName={bookName}
          chapter={chapterNum}
          verses={verses}
          onPrev={goToPrev}
          onNext={goToNext}
          hasPrev={hasPrev}
          hasNext={hasNext}
        />
      </div>
    );
  }

  // Fallback
  return (
    <div className="max-w-[700px] mx-auto px-4 py-16 text-center" data-testid="reader-page">
      <p className="text-muted-foreground">Chapter not available.</p>
      <Button variant="ghost" size="sm" onClick={() => navigate(`/read/${bookName}`)} className="mt-4 text-primary">
        Back to {bookName}
      </Button>
    </div>
  );
}
