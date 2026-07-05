import React, { useEffect, useState } from 'react';
import { Trash2, Download } from 'lucide-react';
import { Dialog, DialogContent, DialogTitle, DialogDescription } from './ui/dialog';
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from './ui/alert-dialog';
import { Button } from './ui/button';
import { Textarea } from './ui/textarea';
import { MEALS, mealById, formatTime } from '../lib/meals';

export const EntryDialog = ({ entry, onClose, onUpdate, onDelete }) => {
  const [note, setNote] = useState('');

  useEffect(() => {
    setNote(entry?.note ?? '');
  }, [entry?.id, entry?.note]);

  if (!entry) return null;

  const meal = mealById(entry.meal);
  const takenAt = new Date(entry.takenAt);

  const commitNote = () => {
    if (note !== entry.note) onUpdate(entry.id, { note });
  };

  const download = () => {
    const a = document.createElement('a');
    a.href = entry.photoUrl;
    a.download = `bites-${takenAt.toISOString().slice(0, 19).replaceAll(':', '-')}.jpg`;
    a.click();
  };

  return (
    <Dialog open onOpenChange={(open) => { if (!open) { commitNote(); onClose(); } }}>
      <DialogContent
        className="max-w-lg gap-0 overflow-hidden rounded-2xl border-0 p-0"
        data-testid="entry-dialog"
      >
        <DialogTitle className="sr-only">{meal.label} photo</DialogTitle>
        <DialogDescription className="sr-only">
          Photo taken at {formatTime(entry.takenAt)}
        </DialogDescription>

        <div className="max-h-[55vh] overflow-hidden bg-black">
          <img
            src={entry.photoUrl}
            alt={`${meal.label} at ${formatTime(entry.takenAt)}`}
            className="mx-auto max-h-[55vh] w-full object-contain"
          />
        </div>

        <div className="space-y-4 p-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-semibold">
                {takenAt.toLocaleDateString([], { weekday: 'long', month: 'long', day: 'numeric' })}
              </p>
              <p className="text-xs text-muted-foreground tabular-nums">{formatTime(entry.takenAt)}</p>
            </div>
            <div className="flex gap-1">
              <Button
                variant="ghost"
                size="icon"
                onClick={download}
                aria-label="Download photo"
                data-testid="entry-download-button"
                className="rounded-full"
              >
                <Download className="h-4 w-4" />
              </Button>
              <AlertDialog>
                <AlertDialogTrigger asChild>
                  <Button
                    variant="ghost"
                    size="icon"
                    aria-label="Delete entry"
                    data-testid="entry-delete-button"
                    className="rounded-full text-destructive hover:text-destructive"
                  >
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </AlertDialogTrigger>
                <AlertDialogContent data-testid="delete-confirm-dialog">
                  <AlertDialogHeader>
                    <AlertDialogTitle>Delete this photo?</AlertDialogTitle>
                    <AlertDialogDescription>
                      This removes the photo from your journal permanently.
                    </AlertDialogDescription>
                  </AlertDialogHeader>
                  <AlertDialogFooter>
                    <AlertDialogCancel data-testid="delete-cancel-button">Keep it</AlertDialogCancel>
                    <AlertDialogAction
                      data-testid="delete-confirm-button"
                      className="bg-destructive text-destructive-foreground hover:bg-destructive/90"
                      onClick={() => onDelete(entry.id)}
                    >
                      Delete
                    </AlertDialogAction>
                  </AlertDialogFooter>
                </AlertDialogContent>
              </AlertDialog>
            </div>
          </div>

          <div className="flex flex-wrap gap-1.5">
            {MEALS.map((m) => {
              const Icon = m.icon;
              const active = m.id === entry.meal;
              return (
                <button
                  key={m.id}
                  type="button"
                  onClick={() => onUpdate(entry.id, { meal: m.id })}
                  data-testid={`meal-chip-${m.id}`}
                  className={`flex items-center gap-1.5 rounded-full px-3 py-1.5 text-xs font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring ${
                    active
                      ? 'bg-primary text-primary-foreground'
                      : 'bg-secondary text-secondary-foreground hover:bg-muted'
                  }`}
                >
                  <Icon className="h-3.5 w-3.5" />
                  {m.label}
                </button>
              );
            })}
          </div>

          <Textarea
            value={note}
            onChange={(e) => setNote(e.target.value)}
            onBlur={commitNote}
            placeholder="Add a note (optional) — how was it?"
            rows={2}
            data-testid="entry-note-input"
            className="resize-none rounded-xl"
          />
        </div>
      </DialogContent>
    </Dialog>
  );
};
