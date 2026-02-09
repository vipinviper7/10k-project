// Lazy-loads Bible book data to keep initial bundle small
// Each book is a separate chunk loaded on demand

const bookLoaders = {
  // Old Testament
  Genesis: () => import('./bible/genesis'),
  Exodus: () => import('./bible/exodus'),
  Leviticus: () => import('./bible/leviticus'),
  Numbers: () => import('./bible/numbers'),
  Deuteronomy: () => import('./bible/deuteronomy'),
  Joshua: () => import('./bible/joshua'),
  Judges: () => import('./bible/judges'),
  Ruth: () => import('./bible/ruth'),
  "1 Samuel": () => import('./bible/1-samuel'),
  "2 Samuel": () => import('./bible/2-samuel'),
  "1 Kings": () => import('./bible/1-kings'),
  "2 Kings": () => import('./bible/2-kings'),
  "1 Chronicles": () => import('./bible/1-chronicles'),
  "2 Chronicles": () => import('./bible/2-chronicles'),
  Ezra: () => import('./bible/ezra'),
  Nehemiah: () => import('./bible/nehemiah'),
  Esther: () => import('./bible/esther'),
  Job: () => import('./bible/job'),
  Psalms: () => import('./bible/psalms'),
  Proverbs: () => import('./bible/proverbs'),
  Ecclesiastes: () => import('./bible/ecclesiastes'),
  "Song of Solomon": () => import('./bible/song-of-solomon'),
  Isaiah: () => import('./bible/isaiah'),
  Jeremiah: () => import('./bible/jeremiah'),
  Lamentations: () => import('./bible/lamentations'),
  Ezekiel: () => import('./bible/ezekiel'),
  Daniel: () => import('./bible/daniel'),
  Hosea: () => import('./bible/hosea'),
  Joel: () => import('./bible/joel'),
  Amos: () => import('./bible/amos'),
  Obadiah: () => import('./bible/obadiah'),
  Jonah: () => import('./bible/jonah'),
  Micah: () => import('./bible/micah'),
  Nahum: () => import('./bible/nahum'),
  Habakkuk: () => import('./bible/habakkuk'),
  Zephaniah: () => import('./bible/zephaniah'),
  Haggai: () => import('./bible/haggai'),
  Zechariah: () => import('./bible/zechariah'),
  Malachi: () => import('./bible/malachi'),
  // New Testament
  Matthew: () => import('./bible/matthew'),
  Mark: () => import('./bible/mark'),
  Luke: () => import('./bible/luke'),
  John: () => import('./bible/john'),
  Acts: () => import('./bible/acts'),
  Romans: () => import('./bible/romans'),
  "1 Corinthians": () => import('./bible/1-corinthians'),
  "2 Corinthians": () => import('./bible/2-corinthians'),
  Galatians: () => import('./bible/galatians'),
  Ephesians: () => import('./bible/ephesians'),
  Philippians: () => import('./bible/philippians'),
  Colossians: () => import('./bible/colossians'),
  "1 Thessalonians": () => import('./bible/1-thessalonians'),
  "2 Thessalonians": () => import('./bible/2-thessalonians'),
  "1 Timothy": () => import('./bible/1-timothy'),
  "2 Timothy": () => import('./bible/2-timothy'),
  Titus: () => import('./bible/titus'),
  Philemon: () => import('./bible/philemon'),
  Hebrews: () => import('./bible/hebrews'),
  James: () => import('./bible/james'),
  "1 Peter": () => import('./bible/1-peter'),
  "2 Peter": () => import('./bible/2-peter'),
  "1 John": () => import('./bible/1-john'),
  "2 John": () => import('./bible/2-john'),
  "3 John": () => import('./bible/3-john'),
  Jude: () => import('./bible/jude'),
  Revelation: () => import('./bible/revelation'),
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
