import React, { useContext } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Button } from './ui/button';
import { ThemeContext } from '../App';
import { BookOpen, Bookmark, Sun, Moon, Home } from 'lucide-react';

export default function Header() {
  const { theme, toggleTheme } = useContext(ThemeContext);
  const location = useLocation();

  const isActive = (path) => {
    if (path === '/') return location.pathname === '/';
    return location.pathname.startsWith(path);
  };

  return (
    <header className="sticky top-0 z-50 bg-background/85 backdrop-blur-md border-b border-border/50 transition-colors duration-500 safe-area-top" data-testid="header">
      <div className="mx-auto max-w-[800px] px-4">
        <div className="flex h-14 items-center justify-between">
          <Link to="/" className="flex items-center gap-2" data-testid="logo-link">
            <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center">
              <span className="text-primary text-lg leading-none">+</span>
            </div>
            <span className="text-lg font-medium font-scripture text-foreground tracking-wide">
              Quiet Verse
            </span>
          </Link>

          <nav className="flex items-center gap-1">
            <Link to="/">
              <Button
                variant="ghost"
                size="sm"
                className={`gap-1.5 text-xs ${isActive('/') ? 'text-primary bg-primary/5' : 'text-muted-foreground'}`}
                data-testid="nav-home"
              >
                <Home className="h-4 w-4" />
                <span className="hidden sm:inline">Home</span>
              </Button>
            </Link>

            <Link to="/read">
              <Button
                variant="ghost"
                size="sm"
                className={`gap-1.5 text-xs ${isActive('/read') ? 'text-primary bg-primary/5' : 'text-muted-foreground'}`}
                data-testid="nav-read"
              >
                <BookOpen className="h-4 w-4" />
                <span className="hidden sm:inline">Read</span>
              </Button>
            </Link>

            <Link to="/bookmarks">
              <Button
                variant="ghost"
                size="sm"
                className={`gap-1.5 text-xs ${isActive('/bookmarks') ? 'text-primary bg-primary/5' : 'text-muted-foreground'}`}
                data-testid="nav-bookmarks"
              >
                <Bookmark className="h-4 w-4" />
                <span className="hidden sm:inline">Saved</span>
              </Button>
            </Link>

            <div className="w-px h-5 bg-border mx-1" />

            <Button
              variant="ghost"
              size="sm"
              onClick={toggleTheme}
              className="text-muted-foreground hover:text-foreground"
              data-testid="theme-toggle"
              aria-label={`Switch to ${theme === 'light' ? 'dark' : 'light'} mode`}
            >
              {theme === 'light' ? (
                <Moon className="h-4 w-4" />
              ) : (
                <Sun className="h-4 w-4" />
              )}
            </Button>
          </nav>
        </div>
      </div>
    </header>
  );
}
