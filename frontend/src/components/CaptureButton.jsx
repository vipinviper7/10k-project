import React, { useRef, useState } from 'react';
import { Camera, Loader2 } from 'lucide-react';
import { motion } from 'framer-motion';

/**
 * Floating camera button. Uses a hidden file input with `capture` so that
 * phones open the camera directly; desktops fall back to a file picker.
 */
export const CaptureButton = ({ onCapture }) => {
  const inputRef = useRef(null);
  const [busy, setBusy] = useState(false);

  const handleChange = async (event) => {
    const file = event.target.files?.[0];
    event.target.value = '';
    if (!file) return;
    setBusy(true);
    try {
      await onCapture(file);
    } finally {
      setBusy(false);
    }
  };

  return (
    <>
      <input
        ref={inputRef}
        type="file"
        accept="image/*"
        capture="environment"
        className="hidden"
        onChange={handleChange}
        data-testid="capture-file-input"
      />
      <motion.button
        type="button"
        aria-label="Snap a food photo"
        data-testid="capture-button"
        disabled={busy}
        onClick={() => inputRef.current?.click()}
        initial={{ scale: 0, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.94 }}
        transition={{ type: 'spring', stiffness: 380, damping: 22 }}
        className="fixed bottom-6 left-1/2 -translate-x-1/2 z-40 flex items-center gap-3 rounded-full bg-primary px-7 py-4 text-primary-foreground shadow-[0_10px_30px_hsl(var(--primary)/0.45)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background disabled:opacity-70"
        style={{ marginBottom: 'env(safe-area-inset-bottom)' }}
      >
        {busy ? (
          <Loader2 className="h-6 w-6 animate-spin" />
        ) : (
          <Camera className="h-6 w-6" />
        )}
        <span className="text-base font-semibold tracking-wide">
          {busy ? 'Saving…' : 'Snap'}
        </span>
      </motion.button>
    </>
  );
};
