import React, { useMemo } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { EntryCard } from './EntryCard';
import { dayKey, formatDayHeading } from '../lib/meals';

export const Timeline = ({ entries, onOpen }) => {
  const groups = useMemo(() => {
    const map = new Map();
    for (const entry of entries) {
      const key = dayKey(entry.takenAt);
      if (!map.has(key)) map.set(key, []);
      map.get(key).push(entry);
    }
    return Array.from(map.entries());
  }, [entries]);

  return (
    <div className="space-y-8" data-testid="timeline">
      {groups.map(([key, dayEntries]) => (
        <motion.section
          key={key}
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3 }}
          data-testid="timeline-day-section"
        >
          <div className="mb-3 flex items-baseline justify-between px-0.5">
            <h2 className="text-sm font-semibold uppercase tracking-wider text-muted-foreground">
              {formatDayHeading(key)}
            </h2>
            <span className="text-xs text-muted-foreground/70">
              {dayEntries.length} {dayEntries.length === 1 ? 'photo' : 'photos'}
            </span>
          </div>
          <div className="grid grid-cols-2 gap-3 sm:grid-cols-3">
            <AnimatePresence>
              {dayEntries.map((entry) => (
                <EntryCard key={entry.id} entry={entry} onOpen={onOpen} />
              ))}
            </AnimatePresence>
          </div>
        </motion.section>
      ))}
    </div>
  );
};
