import React, { useState, useContext } from 'react';
import { Link } from 'react-router-dom';
import { getDailyVerse, getRandomVerse } from '../data/dailyVerses';
import ReflectionTimer from '../components/ReflectionTimer';
import { BookmarkContext, ThemeContext } from '../App';
import { Button } from '../components/ui/button';
import { BookOpen, Bookmark, BookmarkCheck, RefreshCw, ChevronDown } from 'lucide-react';

export default function HomePage() {
  const [verse, setVerse] = useState(getDailyVerse);
  const [showTimer, setShowTimer] = useState(false);
  const [isRefreshing, setIsRefreshing] = useState(false);
  const { addBookmark, removeBookmark, isBookmarked } = useContext(BookmarkContext);
  const { fontSize } = useContext(ThemeContext);

  const saved = isBookmarked(verse.book, verse.chapter, 0);

  const handleNewVerse = () => {
    setIsRefreshing(true);
    setTimeout(() => {
      setVerse(getRandomVerse());
      setIsRefreshing(false);
    }, 300);
  };

  const handleBookmark = () => {
    if (saved) {
      removeBookmark(verse.book, verse.chapter, 0);
    } else {
      addBookmark({
        book: verse.book,
        chapter: verse.chapter,
        verse: 0,
        text: verse.text,
        reference: verse.reference,
      });
    }
  };

  const getGreeting = () => {
    const hour = new Date().getHours();
    if (hour < 12) return 'Good morning';
    if (hour < 17) return 'Good afternoon';
    return 'Good evening';
  };

  return (
    <div className="min-h-[calc(100vh-3.5rem)] flex flex-col" data-testid="home-page">
      {/* Main verse section */}
      <section className="flex-1 flex flex-col items-center justify-center px-6 py-12 max-w-[700px] mx-auto w-full">
        {/* Greeting */}
        <p className="text-sm text-muted-foreground mb-8 animate-fade-in tracking-widest uppercase">
          {getGreeting()}
        </p>

        {/* Daily verse */}
        <div
          className={`text-center transition-opacity duration-300 ${isRefreshing ? 'opacity-0' : 'opacity-100'}`}
        >
          <blockquote
            className="font-scripture leading-relaxed text-foreground text-balance animate-fade-in-delay-1"
            style={{ fontSize: `${fontSize}px`, lineHeight: 1.7 }}
            data-testid="daily-verse"
          >
            &ldquo;{verse.text}&rdquo;
          </blockquote>

          <cite className="block mt-6 text-sm text-primary font-medium not-italic animate-fade-in-delay-2 tracking-wide">
            &mdash; {verse.reference}
          </cite>
        </div>

        {/* Verse actions */}
        <div className="flex items-center gap-2 mt-8 animate-fade-in-delay-2">
          <Button
            variant="ghost"
            size="sm"
            onClick={handleBookmark}
            className={`gap-1.5 text-xs ${saved ? 'text-primary' : 'text-muted-foreground'}`}
            data-testid="bookmark-verse"
          >
            {saved ? <BookmarkCheck className="h-4 w-4" /> : <Bookmark className="h-4 w-4" />}
            {saved ? 'Saved' : 'Save'}
          </Button>

          <Button
            variant="ghost"
            size="sm"
            onClick={handleNewVerse}
            className="gap-1.5 text-xs text-muted-foreground"
            data-testid="new-verse"
          >
            <RefreshCw className={`h-3.5 w-3.5 ${isRefreshing ? 'animate-spin' : ''}`} />
            Another verse
          </Button>

          <Link to="/read">
            <Button
              variant="ghost"
              size="sm"
              className="gap-1.5 text-xs text-muted-foreground"
              data-testid="open-bible"
            >
              <BookOpen className="h-4 w-4" />
              Open Bible
            </Button>
          </Link>
        </div>

        {/* Reflect prompt */}
        {!showTimer && (
          <button
            onClick={() => setShowTimer(true)}
            className="mt-12 flex flex-col items-center gap-2 text-muted-foreground/60 hover:text-muted-foreground transition-colors animate-fade-in-delay-2"
            data-testid="show-timer"
          >
            <span className="text-xs tracking-widest uppercase">Reflect</span>
            <ChevronDown className="h-4 w-4 animate-bounce" />
          </button>
        )}
      </section>

      {/* Reflection timer section */}
      {showTimer && (
        <section className="pb-16 px-6 animate-fade-in">
          <div className="max-w-[400px] mx-auto">
            <div className="text-center mb-8">
              <p className="text-xs text-muted-foreground tracking-widest uppercase mb-2">
                A moment of quiet
              </p>
              <p className="text-sm text-muted-foreground/80 font-scripture italic">
                Be still, and know that I am God
              </p>
            </div>
            <ReflectionTimer />
          </div>
        </section>
      )}
    </div>
  );
}
