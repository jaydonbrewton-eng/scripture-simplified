export interface TopicVerse {
  reference: string;
  book: string;
  chapter: number;
  verseStart: number;
  verseEnd?: number;
  preview: string;
}

export interface Topic {
  id: string;
  label: string;
  emoji: string;
  description: string;
  color: string;
  verses: TopicVerse[];
}

export interface ReadingPlan {
  id: string;
  title: string;
  description: string;
  emoji: string;
  days: { day: number; book: string; chapter: number; title: string; summary: string; prompts: string[] }[];
}

export const TOPICS: Topic[] = [
  {
    id: "anxiety",
    label: "Anxiety & Worry",
    emoji: "\ud83c\udf0a",
    description: "When your mind won't stop racing",
    color: "from-blue-500/20 to-cyan-500/20",
    verses: [
      { reference: "Philippians 4:6-7", book: "Philippians", chapter: 4, verseStart: 6, verseEnd: 7, preview: "Be careful for nothing; but in every thing by prayer and supplication with thanksgiving let your requests be made known unto God." },
      { reference: "Matthew 6:25-27", book: "Matthew", chapter: 6, verseStart: 25, verseEnd: 27, preview: "Therefore I say unto you, Take no thought for your life..." },
      { reference: "1 Peter 5:7", book: "1 Peter", chapter: 5, verseStart: 7, preview: "Casting all your care upon him; for he careth for you." },
      { reference: "Isaiah 41:10", book: "Isaiah", chapter: 41, verseStart: 10, preview: "Fear thou not; for I am with thee: be not dismayed..." },
      { reference: "Psalms 55:22", book: "Psalms", chapter: 55, verseStart: 22, preview: "Cast thy burden upon the LORD, and he shall sustain thee..." },
      { reference: "John 14:27", book: "John", chapter: 14, verseStart: 27, preview: "Peace I leave with you, my peace I give unto you..." },
    ],
  },
  {
    id: "depression",
    label: "Depression",
    emoji: "\ud83c\udf11",
    description: "When everything feels dark and heavy",
    color: "from-indigo-500/20 to-slate-500/20",
    verses: [
      { reference: "Psalms 42:11", book: "Psalms", chapter: 42, verseStart: 11, preview: "Why art thou cast down, O my soul? and why art thou disquieted within me? hope thou in God..." },
      { reference: "Psalms 34:17-18", book: "Psalms", chapter: 34, verseStart: 17, verseEnd: 18, preview: "The righteous cry, and the LORD heareth... The LORD is nigh unto them that are of a broken heart..." },
      { reference: "1 Kings 19:4-8", book: "1 Kings", chapter: 19, verseStart: 4, verseEnd: 8, preview: "He requested for himself that he might die... an angel touched him, and said, Arise and eat." },
      { reference: "Psalms 88:1-3", book: "Psalms", chapter: 88, verseStart: 1, verseEnd: 3, preview: "O LORD God of my salvation, I have cried day and night before thee... my soul is full of troubles." },
      { reference: "Matthew 26:38", book: "Matthew", chapter: 26, verseStart: 38, preview: "My soul is exceeding sorrowful, even unto death: tarry ye here, and watch with me." },
      { reference: "Romans 8:38-39", book: "Romans", chapter: 8, verseStart: 38, verseEnd: 39, preview: "Neither death, nor life... nor any other creature, shall be able to separate us from the love of God." },
    ],
  },
  {
    id: "loneliness",
    label: "Loneliness",
    emoji: "\ud83e\udec2",
    description: "When you feel like nobody gets you",
    color: "from-purple-500/20 to-indigo-500/20",
    verses: [
      { reference: "Deuteronomy 31:6", book: "Deuteronomy", chapter: 31, verseStart: 6, preview: "Be strong and of a good courage, fear not, nor be afraid of them: for the LORD thy God, he it is that doth go with thee; he will not fail thee, nor forsake thee." },
      { reference: "Psalms 23:4", book: "Psalms", chapter: 23, verseStart: 4, preview: "Yea, though I walk through the valley of the shadow of death..." },
      { reference: "Isaiah 43:2", book: "Isaiah", chapter: 43, verseStart: 2, preview: "When thou passest through the waters, I will be with thee..." },
      { reference: "Romans 8:38-39", book: "Romans", chapter: 8, verseStart: 38, verseEnd: 39, preview: "For I am persuaded, that neither death, nor life, nor angels, nor principalities, nor powers... shall be able to separate us from the love of God." },
      { reference: "Psalms 34:18", book: "Psalms", chapter: 34, verseStart: 18, preview: "The LORD is nigh unto them that are of a broken heart..." },
      { reference: "Matthew 28:20", book: "Matthew", chapter: 28, verseStart: 20, preview: "I am with you alway, even unto the end of the world." },
    ],
  },
  {
    id: "identity",
    label: "Identity & Self-Worth",
    emoji: "\ud83d\ude4f",
    description: "When you're questioning who you are",
    color: "from-amber-500/20 to-yellow-500/20",
    verses: [
      { reference: "Psalms 139:14", book: "Psalms", chapter: 139, verseStart: 14, preview: "I will praise thee; for I am fearfully and wonderfully made: marvellous are thy works; and that my soul knoweth right well." },
      { reference: "Ephesians 2:10", book: "Ephesians", chapter: 2, verseStart: 10, preview: "For we are his workmanship, created in Christ Jesus unto good works, which God hath before ordained that we should walk in them." },
      { reference: "Jeremiah 1:5", book: "Jeremiah", chapter: 1, verseStart: 5, preview: "Before I formed thee in the belly I knew thee..." },
      { reference: "1 Peter 2:9", book: "1 Peter", chapter: 2, verseStart: 9, preview: "But ye are a chosen generation, a royal priesthood..." },
      { reference: "Genesis 1:27", book: "Genesis", chapter: 1, verseStart: 27, preview: "So God created man in his own image..." },
      { reference: "2 Corinthians 5:17", book: "2 Corinthians", chapter: 5, verseStart: 17, preview: "If any man be in Christ, he is a new creature..." },
    ],
  },
  {
    id: "purpose",
    label: "Purpose & Direction",
    emoji: "\ud83e\udded",
    description: "When you don't know what you're here for",
    color: "from-emerald-500/20 to-green-500/20",
    verses: [
      { reference: "Jeremiah 29:11", book: "Jeremiah", chapter: 29, verseStart: 11, preview: "For I know the thoughts that I think toward you..." },
      { reference: "Proverbs 3:5-6", book: "Proverbs", chapter: 3, verseStart: 5, verseEnd: 6, preview: "Trust in the LORD with all thine heart..." },
      { reference: "Romans 8:28", book: "Romans", chapter: 8, verseStart: 28, preview: "All things work together for good to them that love God..." },
      { reference: "Psalms 37:4", book: "Psalms", chapter: 37, verseStart: 4, preview: "Delight thyself also in the LORD; and he shall give thee..." },
      { reference: "Ephesians 2:10", book: "Ephesians", chapter: 2, verseStart: 10, preview: "For we are his workmanship, created in Christ Jesus unto good works, which God hath before ordained that we should walk in them." },
      { reference: "Isaiah 58:11", book: "Isaiah", chapter: 58, verseStart: 11, preview: "The LORD shall guide thee continually..." },
    ],
  },
  {
    id: "heartbreak",
    label: "Heartbreak & Loss",
    emoji: "\ud83d\udc94",
    description: "When something or someone is taken from you",
    color: "from-rose-500/20 to-pink-500/20",
    verses: [
      { reference: "Psalms 147:3", book: "Psalms", chapter: 147, verseStart: 3, preview: "He healeth the broken in heart, and bindeth up their wounds." },
      { reference: "Psalms 34:18", book: "Psalms", chapter: 34, verseStart: 18, preview: "The LORD is nigh unto them that are of a broken heart..." },
      { reference: "Revelation 21:4", book: "Revelation", chapter: 21, verseStart: 4, preview: "And God shall wipe away all tears from their eyes; and there shall be no more death, neither sorrow, nor crying, neither shall there be any more pain." },
      { reference: "Isaiah 61:1-3", book: "Isaiah", chapter: 61, verseStart: 1, verseEnd: 3, preview: "He hath sent me to bind up the brokenhearted... to give unto them beauty for ashes, the oil of joy for mourning." },
      { reference: "Matthew 5:4", book: "Matthew", chapter: 5, verseStart: 4, preview: "Blessed are they that mourn: for they shall be comforted." },
      { reference: "2 Corinthians 1:3-4", book: "2 Corinthians", chapter: 1, verseStart: 3, verseEnd: 4, preview: "Blessed be God, even the Father of our Lord Jesus Christ, the Father of mercies, and the God of all comfort; who comforteth us in all our tribulation." },
    ],
  },
  {
    id: "fear",
    label: "Fear & Uncertainty",
    emoji: "\ud83d\udee1\ufe0f",
    description: "When the future scares you",
    color: "from-slate-500/20 to-gray-500/20",
    verses: [
      { reference: "2 Timothy 1:7", book: "2 Timothy", chapter: 1, verseStart: 7, preview: "For God hath not given us the spirit of fear; but of power, and of love, and of a sound mind." },
      { reference: "Isaiah 41:10", book: "Isaiah", chapter: 41, verseStart: 10, preview: "Fear thou not; for I am with thee..." },
      { reference: "Psalms 27:1", book: "Psalms", chapter: 27, verseStart: 1, preview: "The LORD is my light and my salvation; whom shall I fear?" },
      { reference: "Joshua 1:9", book: "Joshua", chapter: 1, verseStart: 9, preview: "Have not I commanded thee? Be strong and of a good courage; be not afraid, neither be thou dismayed: for the LORD thy God is with thee whithersoever thou goest." },
      { reference: "Psalms 56:3", book: "Psalms", chapter: 56, verseStart: 3, preview: "What time I am afraid, I will trust in thee." },
      { reference: "Romans 8:31", book: "Romans", chapter: 8, verseStart: 31, preview: "If God be for us, who can be against us?" },
    ],
  },
  {
    id: "forgiveness",
    label: "Forgiveness",
    emoji: "\ud83d\udd4a\ufe0f",
    description: "When you need to let go or be let go of",
    color: "from-sky-500/20 to-blue-500/20",
    verses: [
      { reference: "Ephesians 4:32", book: "Ephesians", chapter: 4, verseStart: 32, preview: "And be ye kind one to another, tenderhearted, forgiving one another, even as God for Christ's sake hath forgiven you." },
      { reference: "Colossians 3:13", book: "Colossians", chapter: 3, verseStart: 13, preview: "Forbearing one another, and forgiving one another, if any man have a quarrel against any: even as Christ forgave you, so also do ye." },
      { reference: "Matthew 6:14-15", book: "Matthew", chapter: 6, verseStart: 14, verseEnd: 15, preview: "For if ye forgive men their trespasses..." },
      { reference: "1 John 1:9", book: "1 John", chapter: 1, verseStart: 9, preview: "If we confess our sins, he is faithful and just to forgive us our sins, and to cleanse us from all unrighteousness." },
      { reference: "Psalms 103:12", book: "Psalms", chapter: 103, verseStart: 12, preview: "As far as the east is from the west, so far hath he removed..." },
      { reference: "Luke 6:37", book: "Luke", chapter: 6, verseStart: 37, preview: "Forgive, and ye shall be forgiven." },
    ],
  },
  {
    id: "strength",
    label: "Strength & Perseverance",
    emoji: "\ud83d\udcaa",
    description: "When you're running on empty",
    color: "from-orange-500/20 to-red-500/20",
    verses: [
      { reference: "Isaiah 40:31", book: "Isaiah", chapter: 40, verseStart: 31, preview: "They that wait upon the LORD shall renew their strength..." },
      { reference: "Philippians 4:13", book: "Philippians", chapter: 4, verseStart: 13, preview: "I can do all things through Christ which strengtheneth me." },
      { reference: "2 Corinthians 12:9", book: "2 Corinthians", chapter: 12, verseStart: 9, preview: "And he said unto me, My grace is sufficient for thee: for my strength is made perfect in weakness." },
      { reference: "Psalms 46:1", book: "Psalms", chapter: 46, verseStart: 1, preview: "God is our refuge and strength, a very present help in trouble." },
      { reference: "James 1:2-4", book: "James", chapter: 1, verseStart: 2, verseEnd: 4, preview: "My brethren, count it all joy when ye fall into divers temptations; knowing this, that the trying of your faith worketh patience." },
      { reference: "Nehemiah 8:10", book: "Nehemiah", chapter: 8, verseStart: 10, preview: "The joy of the LORD is your strength." },
    ],
  },
  {
    id: "anger",
    label: "Anger & Frustration",
    emoji: "\ud83e\udd2f",
    description: "When you're about to lose it",
    color: "from-red-500/20 to-orange-500/20",
    verses: [
      { reference: "James 1:19-20", book: "James", chapter: 1, verseStart: 19, verseEnd: 20, preview: "Wherefore, my beloved brethren, let every man be swift to hear, slow to speak, slow to wrath: For the wrath of man worketh not the righteousness of God." },
      { reference: "Proverbs 15:1", book: "Proverbs", chapter: 15, verseStart: 1, preview: "A soft answer turneth away wrath: but grievous words stir up anger." },
      { reference: "Ephesians 4:26-27", book: "Ephesians", chapter: 4, verseStart: 26, verseEnd: 27, preview: "Be ye angry, and sin not: let not the sun go down upon your wrath: Neither give place to the devil." },
      { reference: "Proverbs 29:11", book: "Proverbs", chapter: 29, verseStart: 11, preview: "A fool uttereth all his mind: but a wise man keepeth it in till afterwards." },
      { reference: "Psalms 37:8", book: "Psalms", chapter: 37, verseStart: 8, preview: "Cease from anger, and forsake wrath: fret not thyself in any wise to do evil." },
      { reference: "Colossians 3:8", book: "Colossians", chapter: 3, verseStart: 8, preview: "But now ye also put off all these; anger, wrath, malice, blasphemy, filthy communication out of your mouth." },
    ],
  },
  {
    id: "healing",
    label: "Healing & Restoration",
    emoji: "\ud83e\ude79",
    description: "When you need God to make it right",
    color: "from-emerald-500/20 to-teal-500/20",
    verses: [
      { reference: "Psalms 147:3", book: "Psalms", chapter: 147, verseStart: 3, preview: "He healeth the broken in heart, and bindeth up their wounds." },
      { reference: "Jeremiah 17:14", book: "Jeremiah", chapter: 17, verseStart: 14, preview: "Heal me, O LORD, and I shall be healed; save me, and I shall be saved: for thou art my praise." },
      { reference: "Isaiah 53:5", book: "Isaiah", chapter: 53, verseStart: 5, preview: "But he was wounded for our transgressions, he was bruised for our iniquities: the chastisement of our peace was upon him; and with his stripes we are healed." },
      { reference: "James 5:14-15", book: "James", chapter: 5, verseStart: 14, verseEnd: 15, preview: "Is any sick among you? let him call for the elders of the church; and let them pray over him... And the prayer of faith shall save the sick." },
      { reference: "Psalms 30:2", book: "Psalms", chapter: 30, verseStart: 2, preview: "O LORD my God, I cried unto thee, and thou hast healed me." },
      { reference: "3 John 1:2", book: "3 John", chapter: 1, verseStart: 2, preview: "Beloved, I wish above all things that thou mayest prosper and be in health, even as thy soul prospereth." },
    ],
  },
  {
    id: "temptation",
    label: "Temptation & Self-Control",
    emoji: "\ud83d\udee1\ufe0f",
    description: "When you're fighting what pulls you away",
    color: "from-yellow-500/20 to-amber-500/20",
    verses: [
      { reference: "1 Corinthians 10:13", book: "1 Corinthians", chapter: 10, verseStart: 13, preview: "There hath no temptation taken you but such as is common to man: but God is faithful, who will not suffer you to be tempted above that ye are able." },
      { reference: "James 1:12-14", book: "James", chapter: 1, verseStart: 12, verseEnd: 14, preview: "Blessed is the man that endureth temptation: for when he is tried, he shall receive the crown of life." },
      { reference: "Galatians 5:16", book: "Galatians", chapter: 5, verseStart: 16, preview: "This I say then, Walk in the Spirit, and ye shall not fulfil the lust of the flesh." },
      { reference: "Matthew 26:41", book: "Matthew", chapter: 26, verseStart: 41, preview: "Watch and pray, that ye enter not into temptation: the spirit indeed is willing, but the flesh is weak." },
      { reference: "2 Timothy 2:22", book: "2 Timothy", chapter: 2, verseStart: 22, preview: "Flee also youthful lusts: but follow righteousness, faith, charity, peace, with them that call on the Lord out of a pure heart." },
      { reference: "Romans 12:21", book: "Romans", chapter: 12, verseStart: 21, preview: "Be not overcome of evil, but overcome evil with good." },
    ],
  },
];

export const READING_PLANS: ReadingPlan[] = [
  {
    id: "anxiety-7",
    title: "7 Days on Anxiety",
    description: "When your mind won't quiet down, God's Word can.",
    emoji: "\ud83c\udf0a",
    days: [
      { day: 1, book: "Philippians", chapter: 4, title: "Give It to God", summary: "Paul's prescription for an anxious mind.", prompts: ["What's weighing on you right now that you keep carrying on your own?", "Was there anything in this chapter that felt like it was written for where you are today?"] },
      { day: 2, book: "Matthew", chapter: 6, title: "Stop Worrying About Tomorrow", summary: "Jesus explains why stressing is pointless.", prompts: ["What part of this chapter challenged the way you usually think?", "What would your day look like if you actually let go of tomorrow's worries?"] },
      { day: 3, book: "Psalms", chapter: 23, title: "He Leads You", summary: "Even in the darkest valley, you're not alone.", prompts: ["What stood out to you most in this psalm?", "Where in your life do you need to be led right now?"] },
      { day: 4, book: "Isaiah", chapter: 41, title: "Do Not Fear", summary: "God's direct promise to hold you up.", prompts: ["What word or phrase stuck with you after reading this?", "What fear have you been avoiding bringing to God?"] },
      { day: 5, book: "1 Peter", chapter: 5, title: "Cast Your Cares", summary: "Throw the weight off. He can carry it.", prompts: ["What are you holding onto that you could release right now?", "How did this chapter make you feel?"] },
      { day: 6, book: "Psalms", chapter: 46, title: "Be Still", summary: "God is in control even when everything shakes.", prompts: ["What does being still actually look like in your life?", "Was there a moment reading this where something clicked for you?"] },
      { day: 7, book: "John", chapter: 14, title: "Peace I Give You", summary: "The peace Jesus offers is different from the world's.", prompts: ["After this week of reading, what has shifted in how you see your anxiety?", "What's one thing from this plan you want to hold onto going forward?"] },
    ],
  },
  {
    id: "depression-7",
    title: "7 Days on Depression",
    description: "Even the people closest to God went through the darkness.",
    emoji: "\ud83c\udf11",
    days: [
      { day: 1, book: "Psalms", chapter: 42, title: "Why So Downcast?", summary: "David asks his own soul why it's so heavy -- and chooses hope anyway.", prompts: ["What felt real to you in this psalm?", "Have you ever had a conversation with yourself the way the psalmist does here?"] },
      { day: 2, book: "1 Kings", chapter: 19, title: "Elijah's Darkest Day", summary: "After his greatest victory, he wanted to die. God gave him rest, not a lecture.", prompts: ["What surprised you about how God responded to Elijah?", "What do you think you need right now -- rest, food, a word, or just presence?"] },
      { day: 3, book: "Psalms", chapter: 88, title: "The Honest Prayer", summary: "The only psalm with no happy ending. Raw, real, and still in the Bible.", prompts: ["How does it feel to read a prayer that doesn't end with a resolution?", "What would you say to God if you were completely honest right now?"] },
      { day: 4, book: "Job", chapter: 3, title: "Job's Grief", summary: "He lost everything and cursed the day he was born. God didn't abandon him.", prompts: ["What part of Job's words hit closest to home for you?", "What does it mean to you that this kind of raw pain is in the Bible?"] },
      { day: 5, book: "Lamentations", chapter: 3, title: "Hope in the Wreckage", summary: "In the middle of utter devastation: 'His mercies are new every morning.'", prompts: ["Was there a line in this chapter that stopped you?", "What does 'new every morning' look like for where you are right now?"] },
      { day: 6, book: "Matthew", chapter: 26, title: "Jesus Knew Sorrow", summary: "His soul was 'exceeding sorrowful, even unto death.' He understands.", prompts: ["How does it change things to know Jesus felt deep sorrow too?", "What are you carrying that you haven't fully acknowledged yet?"] },
      { day: 7, book: "Romans", chapter: 8, title: "Nothing Can Separate You", summary: "No darkness, no depth, nothing can cut you off from God's love.", prompts: ["After reading through this week, what has stayed with you the most?", "What's one thing you want to remember on the hard days?"] },
    ],
  },
  {
    id: "identity-5",
    title: "5 Days on Identity",
    description: "What God says about who you are.",
    emoji: "\ud83d\ude4f",
    days: [
      { day: 1, book: "Psalms", chapter: 139, title: "Fearfully Made", summary: "You were designed with intention.", prompts: ["What stood out to you about how God sees you in this psalm?", "What voices have you been listening to about who you are?"] },
      { day: 2, book: "Genesis", chapter: 1, title: "In His Image", summary: "You carry the image of the Creator.", prompts: ["What hit you differently reading this chapter with identity in mind?", "What does it stir in you to know you were made on purpose?"] },
      { day: 3, book: "Ephesians", chapter: 2, title: "His Masterpiece", summary: "You're God's workmanship, created for a purpose.", prompts: ["What part of this chapter felt personal to you?", "Is there something about yourself you've been struggling to accept?"] },
      { day: 4, book: "Jeremiah", chapter: 1, title: "Known Before Birth", summary: "God knew you before you existed.", prompts: ["How does it land to read that God knew you before you were born?", "What are you feeling after sitting with this chapter?"] },
      { day: 5, book: "1 Peter", chapter: 2, title: "Chosen", summary: "You are chosen, royal, and set apart.", prompts: ["After this week, has anything shifted in how you see yourself?", "What's one truth from these readings you want to carry with you?"] },
    ],
  },
  {
    id: "purpose-7",
    title: "7 Days on Purpose",
    description: "Finding out why you're here.",
    emoji: "\ud83e\udded",
    days: [
      { day: 1, book: "Jeremiah", chapter: 29, title: "Plans for You", summary: "God's plans for you are good.", prompts: ["What jumped out at you in this chapter?", "What have you been telling yourself about your future?"] },
      { day: 2, book: "Proverbs", chapter: 3, title: "Trust the Process", summary: "Stop leaning on your own understanding.", prompts: ["What part of this chapter made you pause?", "Where in your life have you been trying to figure everything out on your own?"] },
      { day: 3, book: "Romans", chapter: 8, title: "It All Works Together", summary: "Even the hard stuff has a purpose.", prompts: ["What resonated with you in this chapter?", "Is there something hard you've been through that makes more sense now?"] },
      { day: 4, book: "Ecclesiastes", chapter: 3, title: "A Time for Everything", summary: "Your season has meaning.", prompts: ["What season are you in right now?", "What did you notice in this chapter that you hadn't before?"] },
      { day: 5, book: "Matthew", chapter: 5, title: "Salt and Light", summary: "You're meant to make a difference.", prompts: ["What stood out to you in how Jesus describes his followers?", "Where in your life could you be showing up differently?"] },
      { day: 6, book: "Ephesians", chapter: 2, title: "Created for Good Works", summary: "Your purpose was prepared in advance.", prompts: ["What felt meaningful to you in this chapter?", "What gifts or passions do you have that might be part of something bigger?"] },
      { day: 7, book: "Isaiah", chapter: 58, title: "Guided Continually", summary: "He won't leave you guessing forever.", prompts: ["After this week of reading, what has come into focus for you?", "What's one thing you're taking away from this plan?"] },
    ],
  },
  {
    id: "strength-5",
    title: "5 Days on Strength",
    description: "When life hits hard and you need to keep going.",
    emoji: "\ud83d\udcaa",
    days: [
      { day: 1, book: "Isaiah", chapter: 40, title: "Renewed Strength", summary: "Wait on God and your energy comes back.", prompts: ["What part of this chapter spoke to where you are right now?", "What does waiting look like for you in this season?"] },
      { day: 2, book: "Philippians", chapter: 4, title: "I Can Do All Things", summary: "Strength through Christ, not yourself.", prompts: ["What stood out to you beyond the famous verse?", "Where have you been trying to be strong on your own?"] },
      { day: 3, book: "James", chapter: 1, title: "Joy in Trials", summary: "Hard times build something real in you.", prompts: ["What's your honest reaction to this chapter?", "Is there a trial you're in right now that you see differently after reading this?"] },
      { day: 4, book: "Psalms", chapter: 46, title: "God Is Your Refuge", summary: "A very present help in trouble.", prompts: ["What phrase or image in this psalm stayed with you?", "What would it look like to actually run to God instead of away?"] },
      { day: 5, book: "2 Corinthians", chapter: 12, title: "Strength in Weakness", summary: "When you're weak, He's strong.", prompts: ["After this week, what has changed about how you see strength?", "What's one thing from these readings you needed to hear?"] },
    ],
  },
  {
    id: "forgiveness-5",
    title: "5 Days on Forgiveness",
    description: "Letting go so you can move forward.",
    emoji: "\ud83d\udd4a\ufe0f",
    days: [
      { day: 1, book: "Ephesians", chapter: 4, title: "Be Kind, Forgive", summary: "Forgive like you've been forgiven.", prompts: ["What part of this chapter was hardest to sit with?", "Is there someone or something that came to mind while reading this?"] },
      { day: 2, book: "Matthew", chapter: 6, title: "The Condition", summary: "Forgiveness is a two-way street.", prompts: ["What stood out to you in this chapter?", "How do you feel about what Jesus says about forgiveness here?"] },
      { day: 3, book: "Colossians", chapter: 3, title: "Bear With Each Other", summary: "Nobody's perfect. Give grace.", prompts: ["What in this chapter felt convicting or freeing?", "Where do you need to extend more grace -- to others or to yourself?"] },
      { day: 4, book: "Psalms", chapter: 103, title: "As Far as East from West", summary: "How far God removes your mistakes.", prompts: ["What line in this psalm hit you the most?", "Is there something you've been holding against yourself that God has already let go of?"] },
      { day: 5, book: "Luke", chapter: 6, title: "Forgive and Be Free", summary: "Holding on only hurts you.", prompts: ["After this week, has your view on forgiveness shifted at all?", "What's one thing you want to take with you from these readings?"] },
    ],
  },
  {
    id: "healing-7",
    title: "7 Days on Healing",
    description: "God heals the broken -- body, mind, and soul.",
    emoji: "\ud83e\ude79",
    days: [
      { day: 1, book: "Psalms", chapter: 147, title: "He Binds Up Wounds", summary: "God is close to the broken and actively healing them.", prompts: ["What part of you feels like it needs healing right now?", "What stood out to you in this psalm?"] },
      { day: 2, book: "2 Kings", chapter: 5, title: "Naaman's Healing", summary: "A powerful man humbles himself and gets healed in a way he didn't expect.", prompts: ["Have you ever resisted help because it didn't come the way you expected?", "What surprised you about this story?"] },
      { day: 3, book: "Mark", chapter: 5, title: "Touch and Be Whole", summary: "A woman who'd been suffering for 12 years reaches out in desperation -- and is healed instantly.", prompts: ["What does desperation look like in your own life?", "What hit you about how Jesus responded to her?"] },
      { day: 4, book: "Isaiah", chapter: 53, title: "Wounded for Us", summary: "The most vivid prophecy of Jesus taking on our pain so we could be made whole.", prompts: ["How does it feel to read that someone carried your pain on purpose?", "What line in this chapter stayed with you?"] },
      { day: 5, book: "John", chapter: 5, title: "Do You Want to Be Healed?", summary: "Jesus asks a man who'd been sick for 38 years a question that goes deeper than the surface.", prompts: ["If Jesus asked you that question today, what would you say?", "Is there something you've been holding onto that's keeping you stuck?"] },
      { day: 6, book: "Psalms", chapter: 30, title: "Mourning Into Dancing", summary: "David's testimony of God turning his worst season into joy.", prompts: ["Have you ever experienced something painful that eventually turned around?", "What are you feeling after reading this?"] },
      { day: 7, book: "Revelation", chapter: 21, title: "No More Pain", summary: "The ultimate promise -- a day when every tear is wiped away and healing is complete.", prompts: ["After this week, what has shifted in how you see healing?", "What's one thing from these readings you want to hold onto?"] },
    ],
  },
];
