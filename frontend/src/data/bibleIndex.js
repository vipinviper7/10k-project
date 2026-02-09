// Complete KJV Bible index with book metadata
// Books with `available: true` have full chapter text included in the app

const bibleBooks = [
  // Old Testament
  { name: "Genesis", abbr: "Gen", testament: "old", chapters: 50, available: true },
  { name: "Exodus", abbr: "Exod", testament: "old", chapters: 40, available: true },
  { name: "Leviticus", abbr: "Lev", testament: "old", chapters: 27, available: true },
  { name: "Numbers", abbr: "Num", testament: "old", chapters: 36, available: true },
  { name: "Deuteronomy", abbr: "Deut", testament: "old", chapters: 34, available: true },
  { name: "Joshua", abbr: "Josh", testament: "old", chapters: 24, available: true },
  { name: "Judges", abbr: "Judg", testament: "old", chapters: 21, available: true },
  { name: "Ruth", abbr: "Ruth", testament: "old", chapters: 4, available: true },
  { name: "1 Samuel", abbr: "1Sam", testament: "old", chapters: 31, available: true },
  { name: "2 Samuel", abbr: "2Sam", testament: "old", chapters: 24, available: true },
  { name: "1 Kings", abbr: "1Kgs", testament: "old", chapters: 22, available: true },
  { name: "2 Kings", abbr: "2Kgs", testament: "old", chapters: 25, available: true },
  { name: "1 Chronicles", abbr: "1Chr", testament: "old", chapters: 29, available: true },
  { name: "2 Chronicles", abbr: "2Chr", testament: "old", chapters: 36, available: true },
  { name: "Ezra", abbr: "Ezra", testament: "old", chapters: 10, available: true },
  { name: "Nehemiah", abbr: "Neh", testament: "old", chapters: 13, available: true },
  { name: "Esther", abbr: "Esth", testament: "old", chapters: 10, available: true },
  { name: "Job", abbr: "Job", testament: "old", chapters: 42, available: true },
  { name: "Psalms", abbr: "Ps", testament: "old", chapters: 150, available: true },
  { name: "Proverbs", abbr: "Prov", testament: "old", chapters: 31, available: true },
  { name: "Ecclesiastes", abbr: "Eccl", testament: "old", chapters: 12, available: true },
  { name: "Song of Solomon", abbr: "Song", testament: "old", chapters: 8, available: true },
  { name: "Isaiah", abbr: "Isa", testament: "old", chapters: 66, available: true },
  { name: "Jeremiah", abbr: "Jer", testament: "old", chapters: 52, available: true },
  { name: "Lamentations", abbr: "Lam", testament: "old", chapters: 5, available: true },
  { name: "Ezekiel", abbr: "Ezek", testament: "old", chapters: 48, available: true },
  { name: "Daniel", abbr: "Dan", testament: "old", chapters: 12, available: true },
  { name: "Hosea", abbr: "Hos", testament: "old", chapters: 14, available: true },
  { name: "Joel", abbr: "Joel", testament: "old", chapters: 3, available: true },
  { name: "Amos", abbr: "Amos", testament: "old", chapters: 9, available: true },
  { name: "Obadiah", abbr: "Obad", testament: "old", chapters: 1, available: true },
  { name: "Jonah", abbr: "Jonah", testament: "old", chapters: 4, available: true },
  { name: "Micah", abbr: "Mic", testament: "old", chapters: 7, available: true },
  { name: "Nahum", abbr: "Nah", testament: "old", chapters: 3, available: true },
  { name: "Habakkuk", abbr: "Hab", testament: "old", chapters: 3, available: true },
  { name: "Zephaniah", abbr: "Zeph", testament: "old", chapters: 3, available: true },
  { name: "Haggai", abbr: "Hag", testament: "old", chapters: 2, available: true },
  { name: "Zechariah", abbr: "Zech", testament: "old", chapters: 14, available: true },
  { name: "Malachi", abbr: "Mal", testament: "old", chapters: 4, available: true },
  // New Testament
  { name: "Matthew", abbr: "Matt", testament: "new", chapters: 28, available: true },
  { name: "Mark", abbr: "Mark", testament: "new", chapters: 16, available: true },
  { name: "Luke", abbr: "Luke", testament: "new", chapters: 24, available: true },
  { name: "John", abbr: "John", testament: "new", chapters: 21, available: true },
  { name: "Acts", abbr: "Acts", testament: "new", chapters: 28, available: true },
  { name: "Romans", abbr: "Rom", testament: "new", chapters: 16, available: true },
  { name: "1 Corinthians", abbr: "1Cor", testament: "new", chapters: 16, available: true },
  { name: "2 Corinthians", abbr: "2Cor", testament: "new", chapters: 13, available: true },
  { name: "Galatians", abbr: "Gal", testament: "new", chapters: 6, available: true },
  { name: "Ephesians", abbr: "Eph", testament: "new", chapters: 6, available: true },
  { name: "Philippians", abbr: "Phil", testament: "new", chapters: 4, available: true },
  { name: "Colossians", abbr: "Col", testament: "new", chapters: 4, available: true },
  { name: "1 Thessalonians", abbr: "1Thess", testament: "new", chapters: 5, available: true },
  { name: "2 Thessalonians", abbr: "2Thess", testament: "new", chapters: 3, available: true },
  { name: "1 Timothy", abbr: "1Tim", testament: "new", chapters: 6, available: true },
  { name: "2 Timothy", abbr: "2Tim", testament: "new", chapters: 4, available: true },
  { name: "Titus", abbr: "Titus", testament: "new", chapters: 3, available: true },
  { name: "Philemon", abbr: "Phlm", testament: "new", chapters: 1, available: true },
  { name: "Hebrews", abbr: "Heb", testament: "new", chapters: 13, available: true },
  { name: "James", abbr: "Jas", testament: "new", chapters: 5, available: true },
  { name: "1 Peter", abbr: "1Pet", testament: "new", chapters: 5, available: true },
  { name: "2 Peter", abbr: "2Pet", testament: "new", chapters: 3, available: true },
  { name: "1 John", abbr: "1John", testament: "new", chapters: 5, available: true },
  { name: "2 John", abbr: "2John", testament: "new", chapters: 1, available: true },
  { name: "3 John", abbr: "3John", testament: "new", chapters: 1, available: true },
  { name: "Jude", abbr: "Jude", testament: "new", chapters: 1, available: true },
  { name: "Revelation", abbr: "Rev", testament: "new", chapters: 22, available: true },
];

export function getBookByName(name) {
  return bibleBooks.find(b => b.name === name);
}

export function getAvailableBooks() {
  return bibleBooks.filter(b => b.available);
}

export function getOldTestament() {
  return bibleBooks.filter(b => b.testament === "old");
}

export function getNewTestament() {
  return bibleBooks.filter(b => b.testament === "new");
}

export default bibleBooks;
