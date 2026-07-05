import { Sunrise, Sun, Cookie, Moon, CupSoda } from 'lucide-react';

export const MEALS = [
  { id: 'breakfast', label: 'Breakfast', icon: Sunrise },
  { id: 'lunch', label: 'Lunch', icon: Sun },
  { id: 'snack', label: 'Snack', icon: Cookie },
  { id: 'dinner', label: 'Dinner', icon: Moon },
  { id: 'drink', label: 'Drink', icon: CupSoda },
];

export function mealById(id) {
  return MEALS.find((m) => m.id === id) || MEALS[2];
}

/** Suggest a meal tag from the hour of the day. Purely a convenience default. */
export function suggestMeal(date = new Date()) {
  const hour = date.getHours();
  if (hour >= 5 && hour < 11) return 'breakfast';
  if (hour >= 11 && hour < 15) return 'lunch';
  if (hour >= 15 && hour < 18) return 'snack';
  if (hour >= 18 && hour < 22) return 'dinner';
  return 'snack';
}

export function formatTime(ms) {
  return new Date(ms).toLocaleTimeString([], { hour: 'numeric', minute: '2-digit' });
}

export function dayKey(ms) {
  const d = new Date(ms);
  return `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, '0')}-${String(d.getDate()).padStart(2, '0')}`;
}

export function formatDayHeading(key) {
  const [y, m, d] = key.split('-').map(Number);
  const date = new Date(y, m - 1, d);
  const today = new Date();
  const yesterday = new Date();
  yesterday.setDate(today.getDate() - 1);

  if (dayKey(date.getTime()) === dayKey(today.getTime())) return 'Today';
  if (dayKey(date.getTime()) === dayKey(yesterday.getTime())) return 'Yesterday';

  const sameYear = date.getFullYear() === today.getFullYear();
  return date.toLocaleDateString([], {
    weekday: 'long',
    month: 'long',
    day: 'numeric',
    ...(sameYear ? {} : { year: 'numeric' }),
  });
}
