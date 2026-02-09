// Curated calming scripture verses for daily display (KJV - Public Domain)
// Organized by themes of peace, comfort, trust, and hope

const dailyVerses = [
  // Peace & Calm
  { reference: "Philippians 4:6-7", book: "Philippians", chapter: 4, text: "Be careful for nothing; but in every thing by prayer and supplication with thanksgiving let your requests be made known unto God. And the peace of God, which passeth all understanding, shall keep your hearts and minds through Christ Jesus." },
  { reference: "Isaiah 26:3", book: "Isaiah", chapter: 26, text: "Thou wilt keep him in perfect peace, whose mind is stayed on thee: because he trusteth in thee." },
  { reference: "John 14:27", book: "John", chapter: 14, text: "Peace I leave with you, my peace I give unto you: not as the world giveth, give I unto you. Let not your heart be troubled, neither let it be afraid." },
  { reference: "Psalm 46:10", book: "Psalms", chapter: 46, text: "Be still, and know that I am God: I will be exalted among the heathen, I will be exalted in the earth." },
  { reference: "Matthew 11:28-30", book: "Matthew", chapter: 11, text: "Come unto me, all ye that labour and are heavy laden, and I will give you rest. Take my yoke upon you, and learn of me; for I am meek and lowly in heart: and ye shall find rest unto your souls. For my yoke is easy, and my burden is light." },
  { reference: "Psalm 23:1-3", book: "Psalms", chapter: 23, text: "The Lord is my shepherd; I shall not want. He maketh me to lie down in green pastures: he leadeth me beside the still waters. He restoreth my soul: he leadeth me in the paths of righteousness for his name's sake." },
  { reference: "Romans 8:28", book: "Romans", chapter: 8, text: "And we know that all things work together for good to them that love God, to them who are the called according to his purpose." },

  // Trust & Faith
  { reference: "Proverbs 3:5-6", book: "Proverbs", chapter: 3, text: "Trust in the Lord with all thine heart; and lean not unto thine own understanding. In all thy ways acknowledge him, and he shall direct thy paths." },
  { reference: "Psalm 37:5", book: "Psalms", chapter: 37, text: "Commit thy way unto the Lord; trust also in him; and he shall bring it to pass." },
  { reference: "Isaiah 41:10", book: "Isaiah", chapter: 41, text: "Fear thou not; for I am with thee: be not dismayed; for I am thy God: I will strengthen thee; yea, I will help thee; yea, I will uphold thee with the right hand of my righteousness." },
  { reference: "Jeremiah 29:11", book: "Jeremiah", chapter: 29, text: "For I know the thoughts that I think toward you, saith the Lord, thoughts of peace, and not of evil, to give you an expected end." },
  { reference: "Psalm 56:3", book: "Psalms", chapter: 56, text: "What time I am afraid, I will trust in thee." },
  { reference: "Hebrews 11:1", book: "Hebrews", chapter: 11, text: "Now faith is the substance of things hoped for, the evidence of things not seen." },
  { reference: "2 Timothy 1:7", book: "2 Timothy", chapter: 1, text: "For God hath not given us the spirit of fear; but of power, and of love, and of a sound mind." },

  // Comfort in Anxiety
  { reference: "1 Peter 5:7", book: "1 Peter", chapter: 5, text: "Casting all your care upon him; for he careth for you." },
  { reference: "Psalm 34:4", book: "Psalms", chapter: 34, text: "I sought the Lord, and he heard me, and delivered me from all my fears." },
  { reference: "Psalm 94:19", book: "Psalms", chapter: 94, text: "In the multitude of my thoughts within me thy comforts delight my soul." },
  { reference: "Isaiah 43:1", book: "Isaiah", chapter: 43, text: "But now thus saith the Lord that created thee, O Jacob, and he that formed thee, O Israel, Fear not: for I have redeemed thee, I have called thee by thy name; thou art mine." },
  { reference: "Deuteronomy 31:6", book: "Deuteronomy", chapter: 31, text: "Be strong and of a good courage, fear not, nor be afraid of them: for the Lord thy God, he it is that doth go with thee; he will not fail thee, nor forsake thee." },
  { reference: "Psalm 55:22", book: "Psalms", chapter: 55, text: "Cast thy burden upon the Lord, and he shall sustain thee: he shall never suffer the righteous to be moved." },
  { reference: "Romans 8:38-39", book: "Romans", chapter: 8, text: "For I am persuaded, that neither death, nor life, nor angels, nor principalities, nor powers, nor things present, nor things to come, nor height, nor depth, nor any other creature, shall be able to separate us from the love of God, which is in Christ Jesus our Lord." },

  // Hope & Strength
  { reference: "Isaiah 40:31", book: "Isaiah", chapter: 40, text: "But they that wait upon the Lord shall renew their strength; they shall mount up with wings as eagles; they shall run, and not be weary; and they shall walk, and not faint." },
  { reference: "Psalm 27:1", book: "Psalms", chapter: 27, text: "The Lord is my light and my salvation; whom shall I fear? the Lord is the strength of my life; of whom shall I be afraid?" },
  { reference: "Romans 15:13", book: "Romans", chapter: 15, text: "Now the God of hope fill you with all joy and peace in believing, that ye may abound in hope, through the power of the Holy Ghost." },
  { reference: "Lamentations 3:22-23", book: "Lamentations", chapter: 3, text: "It is of the Lord's mercies that we are not consumed, because his compassions fail not. They are new every morning: great is thy faithfulness." },
  { reference: "Philippians 4:13", book: "Philippians", chapter: 4, text: "I can do all things through Christ which strengtheneth me." },
  { reference: "Psalm 121:1-2", book: "Psalms", chapter: 121, text: "I will lift up mine eyes unto the hills, from whence cometh my help. My help cometh from the Lord, which made heaven and earth." },
  { reference: "Joshua 1:9", book: "Joshua", chapter: 1, text: "Have not I commanded thee? Be strong and of a good courage; be not afraid, neither be thou dismayed: for the Lord thy God is with thee whithersoever thou goest." },

  // God's Love
  { reference: "John 3:16", book: "John", chapter: 3, text: "For God so loved the world, that he gave his only begotten Son, that whosoever believeth in him should not perish, but have everlasting life." },
  { reference: "Psalm 136:1", book: "Psalms", chapter: 136, text: "O give thanks unto the Lord; for he is good: for his mercy endureth for ever." },
  { reference: "1 John 4:18", book: "1 John", chapter: 4, text: "There is no fear in love; but perfect love casteth out fear: because fear hath torment. He that feareth is not made perfect in love." },
  { reference: "Zephaniah 3:17", book: "Zephaniah", chapter: 3, text: "The Lord thy God in the midst of thee is mighty; he will save, he will rejoice over thee with joy; he will rest in his love, he will joy over thee with singing." },
  { reference: "Romans 5:8", book: "Romans", chapter: 5, text: "But God commendeth his love toward us, in that, while we were yet sinners, Christ died for us." },
  { reference: "Psalm 103:8", book: "Psalms", chapter: 103, text: "The Lord is merciful and gracious, slow to anger, and plenteous in mercy." },
  { reference: "Ephesians 3:17-19", book: "Ephesians", chapter: 3, text: "That Christ may dwell in your hearts by faith; that ye, being rooted and grounded in love, may be able to comprehend with all saints what is the breadth, and length, and depth, and height; and to know the love of Christ, which passeth knowledge, that ye might be filled with all the fulness of God." },

  // Rest & Refuge
  { reference: "Psalm 91:1-2", book: "Psalms", chapter: 91, text: "He that dwelleth in the secret place of the most High shall abide under the shadow of the Almighty. I will say of the Lord, He is my refuge and my fortress: my God; in him will I trust." },
  { reference: "Psalm 62:1-2", book: "Psalms", chapter: 62, text: "Truly my soul waiteth upon God: from him cometh my salvation. He only is my rock and my salvation; he is my defence; I shall not be greatly moved." },
  { reference: "Nahum 1:7", book: "Nahum", chapter: 1, text: "The Lord is good, a strong hold in the day of trouble; and he knoweth them that trust in him." },
  { reference: "Psalm 4:8", book: "Psalms", chapter: 4, text: "I will both lay me down in peace, and sleep: for thou, Lord, only makest me dwell in safety." },
  { reference: "Psalm 116:7", book: "Psalms", chapter: 116, text: "Return unto thy rest, O my soul; for the Lord hath dealt bountifully with thee." },
  { reference: "Exodus 33:14", book: "Exodus", chapter: 33, text: "And he said, My presence shall go with thee, and I will give thee rest." },

  // Guidance & Wisdom
  { reference: "Psalm 32:8", book: "Psalms", chapter: 32, text: "I will instruct thee and teach thee in the way which thou shalt go: I will guide thee with mine eye." },
  { reference: "James 1:5", book: "James", chapter: 1, text: "If any of you lack wisdom, let him ask of God, that giveth to all men liberally, and upbraideth not; and it shall be given him." },
  { reference: "Psalm 119:105", book: "Psalms", chapter: 119, text: "Thy word is a lamp unto my feet, and a light unto my path." },
  { reference: "Proverbs 16:9", book: "Proverbs", chapter: 16, text: "A man's heart deviseth his way: but the Lord directeth his steps." },
  { reference: "Isaiah 30:21", book: "Isaiah", chapter: 30, text: "And thine ears shall hear a word behind thee, saying, This is the way, walk ye in it, when ye turn to the right hand, and when ye turn to the left." },

  // Joy & Gratitude
  { reference: "Psalm 118:24", book: "Psalms", chapter: 118, text: "This is the day which the Lord hath made; we will rejoice and be glad in it." },
  { reference: "Nehemiah 8:10", book: "Nehemiah", chapter: 8, text: "Then he said unto them, Go your way, eat the fat, and drink the sweet, and send portions unto them for whom nothing is prepared: for this day is holy unto our Lord: neither be ye sorry; for the joy of the Lord is your strength." },
  { reference: "1 Thessalonians 5:16-18", book: "1 Thessalonians", chapter: 5, text: "Rejoice evermore. Pray without ceasing. In every thing give thanks: for this is the will of God in Christ Jesus concerning you." },
  { reference: "Psalm 16:11", book: "Psalms", chapter: 16, text: "Thou wilt shew me the path of life: in thy presence is fulness of joy; at thy right hand there are pleasures for evermore." },
  { reference: "Habakkuk 3:17-18", book: "Habakkuk", chapter: 3, text: "Although the fig tree shall not blossom, neither shall fruit be in the vines; the labour of the olive shall fail, and the fields shall yield no meat; the flock shall be cut off from the fold, and there shall be no herd in the stalls: Yet I will rejoice in the Lord, I will joy in the God of my salvation." },

  // Patience & Endurance
  { reference: "Psalm 27:14", book: "Psalms", chapter: 27, text: "Wait on the Lord: be of good courage, and he shall strengthen thine heart: wait, I say, on the Lord." },
  { reference: "Romans 12:12", book: "Romans", chapter: 12, text: "Rejoicing in hope; patient in tribulation; continuing instant in prayer." },
  { reference: "James 1:2-4", book: "James", chapter: 1, text: "My brethren, count it all joy when ye fall into divers temptations; knowing this, that the trying of your faith worketh patience. But let patience have her perfect work, that ye may be perfect and entire, wanting nothing." },
  { reference: "Galatians 6:9", book: "Galatians", chapter: 6, text: "And let us not be weary in well doing: for in due season we shall reap, if we faint not." },
  { reference: "Psalm 40:1", book: "Psalms", chapter: 40, text: "I waited patiently for the Lord; and he inclined unto me, and heard my cry." },

  // Forgiveness & Grace
  { reference: "Psalm 103:12", book: "Psalms", chapter: 103, text: "As far as the east is from the west, so far hath he removed our transgressions from us." },
  { reference: "1 John 1:9", book: "1 John", chapter: 1, text: "If we confess our sins, he is faithful and just to forgive us our sins, and to cleanse us from all unrighteousness." },
  { reference: "Ephesians 2:8-9", book: "Ephesians", chapter: 2, text: "For by grace are ye saved through faith; and that not of yourselves: it is the gift of God: Not of works, lest any man should boast." },
  { reference: "Micah 7:18", book: "Micah", chapter: 7, text: "Who is a God like unto thee, that pardoneth iniquity, and passeth by the transgression of the remnant of his heritage? he retaineth not his anger for ever, because he delighteth in mercy." },
  { reference: "2 Corinthians 12:9", book: "2 Corinthians", chapter: 12, text: "And he said unto me, My grace is sufficient for thee: for my strength is made perfect in weakness. Most gladly therefore will I rather glory in my infirmities, that the power of Christ may rest upon me." },

  // Protection & Security
  { reference: "Psalm 91:11", book: "Psalms", chapter: 91, text: "For he shall give his angels charge over thee, to keep thee in all thy ways." },
  { reference: "Psalm 121:7-8", book: "Psalms", chapter: 121, text: "The Lord shall preserve thee from all evil: he shall preserve thy soul. The Lord shall preserve thy going out and thy coming in from this time forth, and even for evermore." },
  { reference: "Psalm 46:1", book: "Psalms", chapter: 46, text: "God is our refuge and strength, a very present help in trouble." },
  { reference: "Isaiah 54:17", book: "Isaiah", chapter: 54, text: "No weapon that is formed against thee shall prosper; and every tongue that shall rise against thee in judgment thou shalt condemn. This is the heritage of the servants of the Lord, and their righteousness is of me, saith the Lord." },
  { reference: "Psalm 18:2", book: "Psalms", chapter: 18, text: "The Lord is my rock, and my fortress, and my deliverer; my God, my strength, in whom I will trust; my buckler, and the horn of my salvation, and my high tower." },

  // Evening / Night Peace
  { reference: "Psalm 3:5", book: "Psalms", chapter: 3, text: "I laid me down and slept; I awaked; for the Lord sustained me." },
  { reference: "Psalm 127:2", book: "Psalms", chapter: 127, text: "It is vain for you to rise up early, to sit up late, to eat the bread of sorrows: for so he giveth his beloved sleep." },
  { reference: "Proverbs 3:24", book: "Proverbs", chapter: 3, text: "When thou liest down, thou shalt not be afraid: yea, thou shalt lie down, and thy sleep shall be sweet." },
  { reference: "Psalm 63:6-7", book: "Psalms", chapter: 63, text: "When I remember thee upon my bed, and meditate on thee in the night watches. Because thou hast been my help, therefore in the shadow of thy wings will I rejoice." },

  // Morning Renewal
  { reference: "Psalm 5:3", book: "Psalms", chapter: 5, text: "My voice shalt thou hear in the morning, O Lord; in the morning will I direct my prayer unto thee, and will look up." },
  { reference: "Psalm 143:8", book: "Psalms", chapter: 143, text: "Cause me to hear thy lovingkindness in the morning; for in thee do I trust: cause me to know the way wherein I should walk; for I lift up my soul unto thee." },
  { reference: "Psalm 30:5", book: "Psalms", chapter: 30, text: "For his anger endureth but a moment; in his favour is life: weeping may endure for a night, but joy cometh in the morning." },
  { reference: "Psalm 90:14", book: "Psalms", chapter: 90, text: "O satisfy us early with thy mercy; that we may rejoice and be glad all our days." },

  // Additional Peace Verses
  { reference: "Colossians 3:15", book: "Colossians", chapter: 3, text: "And let the peace of God rule in your hearts, to the which also ye are called in one body; and be ye thankful." },
  { reference: "Numbers 6:24-26", book: "Numbers", chapter: 6, text: "The Lord bless thee, and keep thee: The Lord make his face shine upon thee, and be gracious unto thee: The Lord lift up his countenance upon thee, and give thee peace." },
  { reference: "John 16:33", book: "John", chapter: 16, text: "These things I have spoken unto you, that in me ye might have peace. In the world ye shall have tribulation: but be of good cheer; I have overcome the world." },
  { reference: "2 Thessalonians 3:16", book: "2 Thessalonians", chapter: 3, text: "Now the Lord of peace himself give you peace always by all means. The Lord be with you all." },
  { reference: "Psalm 29:11", book: "Psalms", chapter: 29, text: "The Lord will give strength unto his people; the Lord will bless his people with peace." },
  { reference: "Isaiah 12:2", book: "Isaiah", chapter: 12, text: "Behold, God is my salvation; I will trust, and not be afraid: for the Lord Jehovah is my strength and my song; he also is become my salvation." },
  { reference: "Psalm 139:23-24", book: "Psalms", chapter: 139, text: "Search me, O God, and know my heart: try me, and know my thoughts: And see if there be any wicked way in me, and lead me in the way everlasting." },
  { reference: "Matthew 6:33-34", book: "Matthew", chapter: 6, text: "But seek ye first the kingdom of God, and his righteousness; and all these things shall be added unto you. Take therefore no thought for the morrow: for the morrow shall take thought for the things of itself. Sufficient unto the day is the evil thereof." },
  { reference: "Psalm 34:17-18", book: "Psalms", chapter: 34, text: "The righteous cry, and the Lord heareth, and delivereth them out of all their troubles. The Lord is nigh unto them that are of a broken heart; and saveth such as be of a contrite spirit." },
  { reference: "Isaiah 40:29", book: "Isaiah", chapter: 40, text: "He giveth power to the faint; and to them that have no might he increaseth strength." },
  { reference: "Psalm 147:3", book: "Psalms", chapter: 147, text: "He healeth the broken in heart, and bindeth up their wounds." },
  { reference: "Matthew 5:4", book: "Matthew", chapter: 5, text: "Blessed are they that mourn: for they shall be comforted." },
  { reference: "Revelation 21:4", book: "Revelation", chapter: 21, text: "And God shall wipe away all tears from their eyes; and there shall be no more death, neither sorrow, nor crying, neither shall there be any more pain: for the former things are passed away." },
  { reference: "Psalm 46:5", book: "Psalms", chapter: 46, text: "God is in the midst of her; she shall not be moved: God shall help her, and that right early." },
  { reference: "2 Corinthians 1:3-4", book: "2 Corinthians", chapter: 1, text: "Blessed be God, even the Father of our Lord Jesus Christ, the Father of mercies, and the God of all comfort; Who comforteth us in all our tribulation, that we may be able to comfort them which are in any trouble, by the comfort wherewith we ourselves are comforted of God." },
  { reference: "Psalm 145:18", book: "Psalms", chapter: 145, text: "The Lord is nigh unto all them that call upon him, to all that call upon him in truth." },
  { reference: "Matthew 6:25-26", book: "Matthew", chapter: 6, text: "Therefore I say unto you, Take no thought for your life, what ye shall eat, or what ye shall drink; nor yet for your body, what ye shall put on. Is not the life more than meat, and the body than raiment? Behold the fowls of the air: for they sow not, neither do they reap, nor gather into barns; yet your heavenly Father feedeth them. Are ye not much better than they?" },
  { reference: "Psalm 23:4", book: "Psalms", chapter: 23, text: "Yea, though I walk through the valley of the shadow of death, I will fear no evil: for thou art with me; thy rod and thy staff they comfort me." },
  { reference: "Romans 8:26", book: "Romans", chapter: 8, text: "Likewise the Spirit also helpeth our infirmities: for we know not what we should pray for as we ought: but the Spirit itself maketh intercession for us with groanings which cannot be uttered." },
  { reference: "Psalm 138:7", book: "Psalms", chapter: 138, text: "Though I walk in the midst of trouble, thou wilt revive me: thou shalt stretch forth thine hand against the wrath of mine enemies, and thy right hand shall save me." },
  { reference: "Isaiah 46:4", book: "Isaiah", chapter: 46, text: "And even to your old age I am he; and even to hoar hairs will I carry you: I have made, and I will bear; even I will carry, and will deliver you." },
  { reference: "Psalm 73:26", book: "Psalms", chapter: 73, text: "My flesh and my heart faileth: but God is the strength of my heart, and my portion for ever." },
  { reference: "John 10:10", book: "John", chapter: 10, text: "The thief cometh not, but for to steal, and to kill, and to destroy: I am come that they might have life, and that they might have it more abundantly." },
  { reference: "Psalm 42:11", book: "Psalms", chapter: 42, text: "Why art thou cast down, O my soul? and why art thou disquieted within me? hope thou in God: for I shall yet praise him, who is the health of my countenance, and my God." },
  { reference: "Romans 8:31", book: "Romans", chapter: 8, text: "What shall we then say to these things? If God be for us, who can be against us?" },
  { reference: "Psalm 37:7", book: "Psalms", chapter: 37, text: "Rest in the Lord, and wait patiently for him: fret not thyself because of him who prospereth in his way, because of the man who bringeth wicked devices to pass." },
  { reference: "1 Corinthians 10:13", book: "1 Corinthians", chapter: 10, text: "There hath no temptation taken you but such as is common to man: but God is faithful, who will not suffer you to be tempted above that ye are able; but will with the temptation also make a way to escape, that ye may be able to bear it." },
  { reference: "Psalm 68:19", book: "Psalms", chapter: 68, text: "Blessed be the Lord, who daily loadeth us with benefits, even the God of our salvation." },
];

// Get today's verse based on day of year
export function getDailyVerse() {
  const now = new Date();
  const start = new Date(now.getFullYear(), 0, 0);
  const diff = now - start;
  const oneDay = 1000 * 60 * 60 * 24;
  const dayOfYear = Math.floor(diff / oneDay);
  return dailyVerses[dayOfYear % dailyVerses.length];
}

// Get a random verse
export function getRandomVerse() {
  return dailyVerses[Math.floor(Math.random() * dailyVerses.length)];
}

export default dailyVerses;
