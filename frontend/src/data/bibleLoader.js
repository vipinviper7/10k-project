// Lazy-loads Bible book data to keep initial bundle small
// Each book is a separate chunk loaded on demand

const bookLoaders = {
  Genesis: () => import('./bible/genesis'),
  Psalms: () => import('./bible/psalms'),
  Proverbs: () => import('./bible/proverbs'),
  Matthew: () => import('./bible/matthew'),
  John: () => import('./bible/john'),
  Romans: () => import('./bible/romans'),
  Philippians: () => import('./bible/philippians'),
  James: () => import('./bible/james'),
};

const cache = {};

export async function loadChapter(bookName, chapter) {
  const cacheKey = `${bookName}:${chapter}`;
  if (cache[cacheKey]) return cache[cacheKey];

  const loader = bookLoaders[bookName];
  if (!loader) return null;

  try {
    const module = await loader();
    const bookData = module.default;
    const chapterData = bookData[chapter];
    if (chapterData) {
      cache[cacheKey] = chapterData;
    }
    return chapterData || null;
  } catch (err) {
    console.error(`Failed to load ${bookName} ${chapter}:`, err);
    return null;
  }
}

export async function getAvailableChapters(bookName) {
  const loader = bookLoaders[bookName];
  if (!loader) return [];

  try {
    const module = await loader();
    const bookData = module.default;
    return Object.keys(bookData).map(Number).sort((a, b) => a - b);
  } catch (err) {
    console.error(`Failed to load chapters for ${bookName}:`, err);
    return [];
  }
}

export function isBookAvailable(bookName) {
  return bookName in bookLoaders;
}
