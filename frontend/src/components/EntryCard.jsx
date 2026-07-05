import React from 'react';
import { motion } from 'framer-motion';
import { mealById, formatTime } from '../lib/meals';

export const EntryCard = ({ entry, onOpen }) => {
  const meal = mealById(entry.meal);
  const MealIcon = meal.icon;

  return (
    <motion.button
      type="button"
      layout
      initial={{ opacity: 0, scale: 0.92 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.9 }}
      whileHover={{ y: -3 }}
      whileTap={{ scale: 0.97 }}
      transition={{ duration: 0.22 }}
      onClick={() => onOpen(entry)}
      data-testid="entry-card"
      className="group relative aspect-square w-full overflow-hidden rounded-2xl bg-muted text-left shadow-[0_2px_10px_rgba(0,0,0,0.06)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background"
    >
      <img
        src={entry.photoUrl}
        alt={`${meal.label} at ${formatTime(entry.takenAt)}`}
        loading="lazy"
        className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-[1.04]"
      />
      <div className="pointer-events-none absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent p-2.5 pt-8">
        <div className="flex items-center justify-between text-white">
          <span className="flex items-center gap-1 rounded-full bg-white/15 px-2 py-0.5 text-[11px] font-medium backdrop-blur-sm">
            <MealIcon className="h-3 w-3" />
            {meal.label}
          </span>
          <span className="text-[11px] font-medium tabular-nums" data-testid="entry-time-text">
            {formatTime(entry.takenAt)}
          </span>
        </div>
      </div>
      {entry.note && (
        <div className="pointer-events-none absolute right-2 top-2 h-2 w-2 rounded-full bg-white shadow" />
      )}
    </motion.button>
  );
};
