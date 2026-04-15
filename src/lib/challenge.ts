// Weekly community reading challenges
// Rotates every Monday at midnight UTC

export interface WeeklyChallenge {
  id: string;
  title: string;
  description: string;
  emoji: string;
  chapters: { book: string; chapter: number; title: string }[];
}

const CHALLENGES: WeeklyChallenge[] = [
  {
    id: "romans-1-8",
    title: "Romans 1\u20138",
    description: "The foundation of the Gospel. Grace, faith, and nothing can separate us.",
    emoji: "\ud83d\udd25",
    chapters: [
      { book: "Romans", chapter: 1, title: "The Gospel's Power" },
      { book: "Romans", chapter: 2, title: "God's Righteous Judgment" },
      { book: "Romans", chapter: 3, title: "No One Is Righteous" },
      { book: "Romans", chapter: 4, title: "Faith Like Abraham" },
      { book: "Romans", chapter: 5, title: "Peace With God" },
      { book: "Romans", chapter: 6, title: "Dead to Sin" },
      { book: "Romans", chapter: 7, title: "The Inner Struggle" },
      { book: "Romans", chapter: 8, title: "Nothing Can Separate Us" },
    ],
  },
  {
    id: "john-1-7",
    title: "John 1\u20137",
    description: "Meet Jesus through the eyes of someone who walked with Him.",
    emoji: "\u2728",
    chapters: [
      { book: "John", chapter: 1, title: "The Word Became Flesh" },
      { book: "John", chapter: 2, title: "Water Into Wine" },
      { book: "John", chapter: 3, title: "Born Again" },
      { book: "John", chapter: 4, title: "Living Water" },
      { book: "John", chapter: 5, title: "Healing at the Pool" },
      { book: "John", chapter: 6, title: "Bread of Life" },
      { book: "John", chapter: 7, title: "Is This the Christ?" },
    ],
  },
  {
    id: "genesis-1-7",
    title: "Genesis 1\u20137",
    description: "Where it all began. Creation, the fall, and starting over.",
    emoji: "\ud83c\udf0d",
    chapters: [
      { book: "Genesis", chapter: 1, title: "Creation" },
      { book: "Genesis", chapter: 2, title: "The Garden" },
      { book: "Genesis", chapter: 3, title: "The Fall" },
      { book: "Genesis", chapter: 4, title: "Cain and Abel" },
      { book: "Genesis", chapter: 5, title: "Generations" },
      { book: "Genesis", chapter: 6, title: "Corruption of Humanity" },
      { book: "Genesis", chapter: 7, title: "The Flood" },
    ],
  },
  {
    id: "psalms-selections",
    title: "Psalms for the Soul",
    description: "Raw prayers, real emotions, and honest conversations with God.",
    emoji: "\ud83c\udfb5",
    chapters: [
      { book: "Psalms", chapter: 1, title: "Two Paths" },
      { book: "Psalms", chapter: 23, title: "The Shepherd" },
      { book: "Psalms", chapter: 27, title: "The Lord Is My Light" },
      { book: "Psalms", chapter: 34, title: "Taste and See" },
      { book: "Psalms", chapter: 42, title: "Why So Downcast?" },
      { book: "Psalms", chapter: 91, title: "God's Protection" },
      { book: "Psalms", chapter: 139, title: "Fearfully Made" },
    ],
  },
  {
    id: "matthew-5-7",
    title: "Sermon on the Mount",
    description: "Jesus' most famous teaching. This changes everything.",
    emoji: "\u26f0\ufe0f",
    chapters: [
      { book: "Matthew", chapter: 5, title: "The Beatitudes" },
      { book: "Matthew", chapter: 6, title: "Don't Worry" },
      { book: "Matthew", chapter: 7, title: "Build on the Rock" },
    ],
  },
  {
    id: "ephesians",
    title: "Ephesians",
    description: "Identity, unity, and how to live it out. Paul's masterclass.",
    emoji: "\ud83d\udcaa",
    chapters: [
      { book: "Ephesians", chapter: 1, title: "Blessed in Christ" },
      { book: "Ephesians", chapter: 2, title: "Saved by Grace" },
      { book: "Ephesians", chapter: 3, title: "God's Power in Us" },
      { book: "Ephesians", chapter: 4, title: "Unity in the Body" },
      { book: "Ephesians", chapter: 5, title: "Walk in Love" },
      { book: "Ephesians", chapter: 6, title: "The Armor of God" },
    ],
  },
  {
    id: "james",
    title: "James",
    description: "Faith without action is dead. The most practical book in the Bible.",
    emoji: "\ud83d\udee0\ufe0f",
    chapters: [
      { book: "James", chapter: 1, title: "Trials and Temptation" },
      { book: "James", chapter: 2, title: "Faith and Works" },
      { book: "James", chapter: 3, title: "Taming the Tongue" },
      { book: "James", chapter: 4, title: "Submit to God" },
      { book: "James", chapter: 5, title: "Patience and Prayer" },
    ],
  },
  {
    id: "proverbs-selections",
    title: "Proverbs: Life Wisdom",
    description: "Practical advice that's thousands of years old and still hits.",
    emoji: "\ud83e\udde0",
    chapters: [
      { book: "Proverbs", chapter: 1, title: "The Beginning of Wisdom" },
      { book: "Proverbs", chapter: 3, title: "Trust in the Lord" },
      { book: "Proverbs", chapter: 4, title: "Guard Your Heart" },
      { book: "Proverbs", chapter: 10, title: "Wise Sayings" },
      { book: "Proverbs", chapter: 15, title: "A Gentle Answer" },
      { book: "Proverbs", chapter: 22, title: "A Good Name" },
      { book: "Proverbs", chapter: 31, title: "Strength and Dignity" },
    ],
  },
];

export function getCurrentChallenge(): WeeklyChallenge {
  // Get the Monday of the current week (UTC)
  const now = new Date();
  const dayOfWeek = now.getUTCDay();
  const mondayOffset = dayOfWeek === 0 ? 6 : dayOfWeek - 1;
  const monday = new Date(now);
  monday.setUTCDate(now.getUTCDate() - mondayOffset);
  monday.setUTCHours(0, 0, 0, 0);

  // Use the week number to rotate through challenges
  const weeksSinceEpoch = Math.floor(monday.getTime() / (7 * 24 * 60 * 60 * 1000));
  const index = weeksSinceEpoch % CHALLENGES.length;
  return CHALLENGES[index];
}

export function getDaysLeftInWeek(): number {
  const now = new Date();
  const dayOfWeek = now.getUTCDay();
  const daysLeft = dayOfWeek === 0 ? 0 : 7 - dayOfWeek;
  return daysLeft;
}

export function getChallengeWeekKey(): string {
  const now = new Date();
  const dayOfWeek = now.getUTCDay();
  const mondayOffset = dayOfWeek === 0 ? 6 : dayOfWeek - 1;
  const monday = new Date(now);
  monday.setUTCDate(now.getUTCDate() - mondayOffset);
  return `challenge:${monday.toISOString().split("T")[0]}`;
}
