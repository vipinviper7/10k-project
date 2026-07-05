import React, { useContext } from 'react';
import { Moon, Sun, UtensilsCrossed } from 'lucide-react';
import { ThemeContext } from '../App';
import { Button } from './ui/button';

export const Header = ({ entryCount }) => {
  const { theme, toggleTheme } = useContext(ThemeContext);

  return (
    <header className="safe-area-top sticky top-0 z-30 border-b border-border/60 bg-background/80 backdrop-blur supports-[backdrop-filter]:bg-background/70">
      <div className="mx-auto flex max-w-2xl items-center justify-between px-4 py-3">
        <div className="flex items-center gap-2.5">
          <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-primary/15 text-primary">
            <UtensilsCrossed className="h-5 w-5" />
          </div>
          <div>
            <h1 className="text-lg font-semibold leading-tight tracking-tight">Bites</h1>
            <p className="text-xs text-muted-foreground" data-testid="entry-count-text">
              {entryCount === 0
                ? 'Your food photo journal'
                : `${entryCount} ${entryCount === 1 ? 'photo' : 'photos'} logged`}
            </p>
          </div>
        </div>
        <Button
          variant="ghost"
          size="icon"
          onClick={toggleTheme}
          aria-label="Toggle dark mode"
          data-testid="theme-toggle-button"
          className="rounded-full"
        >
          {theme === 'dark' ? <Sun className="h-5 w-5" /> : <Moon className="h-5 w-5" />}
        </Button>
      </div>
    </header>
  );
};
