import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import { BookmarkContext } from '../App';
import { Button } from '../components/ui/button';
import { Bookmark, BookmarkX, BookOpen } from 'lucide-react';

export default function BookmarksPage() {
  const { bookmarks, removeBookmark } = useContext(BookmarkContext);

  if (bookmarks.length === 0) {
    return (
      <div className="max-w-[700px] mx-auto px-4 py-16 text-center animate-fade-in" data-testid="bookmarks-page">
        <Bookmark className="h-12 w-12 text-muted-foreground/20 mx-auto mb-4" />
        <h2 className="text-xl font-scripture text-foreground mb-2">No saved verses</h2>
        <p className="text-sm text-muted-foreground mb-6">
          Tap the bookmark icon on any verse to save it here.
        </p>
        <Link to="/read">
          <Button variant="ghost" size="sm" className="text-primary gap-2">
            <BookOpen className="h-4 w-4" />
            Open Bible
          </Button>
        </Link>
      </div>
    );
  }

  return (
    <div className="max-w-[700px] mx-auto px-4 py-8 animate-fade-in" data-testid="bookmarks-page">
      <div className="mb-8">
        <h2 className="text-2xl font-scripture font-semibold text-foreground mb-1">Saved Verses</h2>
        <p className="text-sm text-muted-foreground">{bookmarks.length} verse{bookmarks.length !== 1 ? 's' : ''} saved</p>
      </div>

      <div className="space-y-4">
        {bookmarks.map((bm, i) => (
          <div
            key={`${bm.book}:${bm.chapter}:${bm.verse}`}
            className="group bg-card border border-border/50 rounded-xl p-5 transition-colors hover:border-primary/20"
          >
            <div className="flex items-start justify-between gap-4">
              <div className="flex-1 min-w-0">
                <p className="font-scripture text-foreground leading-relaxed text-base mb-3">
                  &ldquo;{bm.text}&rdquo;
                </p>
                <div className="flex items-center gap-3">
                  <span className="text-xs text-primary font-medium">{bm.reference}</span>
                  {bm.verse > 0 && (
                    <Link
                      to={`/read/${bm.book}/${bm.chapter}`}
                      className="text-xs text-muted-foreground hover:text-foreground transition-colors"
                    >
                      Read chapter
                    </Link>
                  )}
                </div>
              </div>
              <button
                onClick={() => removeBookmark(bm.book, bm.chapter, bm.verse)}
                className="text-muted-foreground/30 hover:text-destructive transition-colors shrink-0 p-1"
                aria-label="Remove bookmark"
              >
                <BookmarkX className="h-4 w-4" />
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
