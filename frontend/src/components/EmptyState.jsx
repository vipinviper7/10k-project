import React from 'react';
import { motion } from 'framer-motion';
import { Camera } from 'lucide-react';

export const EmptyState = () => (
  <motion.div
    initial={{ opacity: 0, y: 14 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ duration: 0.45 }}
    className="flex flex-col items-center justify-center px-6 py-24 text-center"
    data-testid="empty-state"
  >
    <div className="relative mb-6">
      <div className="absolute inset-0 animate-breathe rounded-full bg-primary/15" />
      <div className="relative flex h-24 w-24 items-center justify-center rounded-full bg-primary/10 text-primary">
        <Camera className="h-10 w-10" />
      </div>
    </div>
    <h2 className="mb-2 text-xl font-semibold tracking-tight">Your journal is empty</h2>
    <p className="max-w-xs text-sm leading-relaxed text-muted-foreground">
      Snap a quick photo whenever you eat or drink something. No calories, no counting —
      just a visual diary of your days.
    </p>
  </motion.div>
);
