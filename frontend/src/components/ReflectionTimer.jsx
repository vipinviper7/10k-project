import React, { useState, useEffect, useCallback, useRef } from 'react';
import { Button } from './ui/button';
import { Play, Pause, RotateCcw } from 'lucide-react';

const DURATIONS = [
  { label: '1 min', seconds: 60 },
  { label: '2 min', seconds: 120 },
  { label: '5 min', seconds: 300 },
];

export default function ReflectionTimer() {
  const [duration, setDuration] = useState(60);
  const [remaining, setRemaining] = useState(60);
  const [isRunning, setIsRunning] = useState(false);
  const [isComplete, setIsComplete] = useState(false);
  const intervalRef = useRef(null);

  const progress = 1 - remaining / duration;
  const circumference = 2 * Math.PI * 45;
  const strokeOffset = circumference * (1 - progress);

  const minutes = Math.floor(remaining / 60);
  const seconds = remaining % 60;
  const timeDisplay = `${minutes}:${seconds.toString().padStart(2, '0')}`;

  const start = useCallback(() => {
    setIsRunning(true);
    setIsComplete(false);
  }, []);

  const pause = useCallback(() => {
    setIsRunning(false);
  }, []);

  const reset = useCallback(() => {
    setIsRunning(false);
    setIsComplete(false);
    setRemaining(duration);
  }, [duration]);

  const selectDuration = useCallback((secs) => {
    setDuration(secs);
    setRemaining(secs);
    setIsRunning(false);
    setIsComplete(false);
  }, []);

  useEffect(() => {
    if (isRunning && remaining > 0) {
      intervalRef.current = setInterval(() => {
        setRemaining(prev => {
          if (prev <= 1) {
            setIsRunning(false);
            setIsComplete(true);
            return 0;
          }
          return prev - 1;
        });
      }, 1000);
    }
    return () => clearInterval(intervalRef.current);
  }, [isRunning, remaining]);

  return (
    <div className="flex flex-col items-center gap-6" data-testid="reflection-timer">
      {/* Timer circle */}
      <div className="relative w-40 h-40 flex items-center justify-center">
        <svg className="absolute inset-0 w-full h-full -rotate-90" viewBox="0 0 100 100">
          <circle
            cx="50" cy="50" r="45"
            fill="none"
            stroke="hsl(var(--border))"
            strokeWidth="2"
          />
          <circle
            cx="50" cy="50" r="45"
            fill="none"
            stroke="hsl(var(--primary))"
            strokeWidth="2.5"
            strokeLinecap="round"
            strokeDasharray={circumference}
            strokeDashoffset={strokeOffset}
            className="transition-all duration-1000 ease-linear"
          />
        </svg>

        {isComplete ? (
          <div className="text-center animate-fade-in">
            <p className="text-sm text-primary font-medium">Amen</p>
          </div>
        ) : isRunning ? (
          <div className="text-center">
            <p className="text-2xl font-light text-foreground tabular-nums">{timeDisplay}</p>
            <p className="text-xs text-muted-foreground mt-1 animate-breathe">breathe</p>
          </div>
        ) : (
          <div className="text-center">
            <p className="text-2xl font-light text-foreground tabular-nums">{timeDisplay}</p>
            <p className="text-xs text-muted-foreground mt-1">reflect</p>
          </div>
        )}
      </div>

      {/* Duration selector */}
      {!isRunning && !isComplete && (
        <div className="flex gap-2 animate-fade-in">
          {DURATIONS.map(d => (
            <button
              key={d.seconds}
              onClick={() => selectDuration(d.seconds)}
              className={`px-3 py-1.5 text-xs rounded-full transition-colors ${
                duration === d.seconds
                  ? 'bg-primary/10 text-primary font-medium'
                  : 'text-muted-foreground hover:text-foreground hover:bg-secondary'
              }`}
            >
              {d.label}
            </button>
          ))}
        </div>
      )}

      {/* Controls */}
      <div className="flex gap-3">
        {isComplete ? (
          <Button
            variant="ghost"
            size="sm"
            onClick={reset}
            className="gap-2 text-muted-foreground"
          >
            <RotateCcw className="h-4 w-4" />
            Again
          </Button>
        ) : isRunning ? (
          <Button
            variant="ghost"
            size="sm"
            onClick={pause}
            className="gap-2 text-muted-foreground hover:text-foreground"
          >
            <Pause className="h-4 w-4" />
            Pause
          </Button>
        ) : (
          <>
            <Button
              variant="ghost"
              size="sm"
              onClick={start}
              className="gap-2 text-primary hover:text-primary hover:bg-primary/5"
            >
              <Play className="h-4 w-4" />
              {remaining < duration ? 'Resume' : 'Begin'}
            </Button>
            {remaining < duration && (
              <Button
                variant="ghost"
                size="sm"
                onClick={reset}
                className="gap-2 text-muted-foreground"
              >
                <RotateCcw className="h-4 w-4" />
                Reset
              </Button>
            )}
          </>
        )}
      </div>
    </div>
  );
}
