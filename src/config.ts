/**
 * ============================================================
 *  💙  EDIT THIS FILE TO PERSONALIZE THE WEBSITE  💙
 * ============================================================
 *  Everything personal lives here. Change the name once and every
 *  heading and message updates automatically.
 *
 *  Tip: use {name} inside any text and it is replaced with `herName`.
 */

export interface Reason {
  text: string
}

export interface PhotoSlot {
  /** Path inside /public, e.g. "/photos/us-1.jpg". Leave '' to show a cute placeholder. */
  src: string
  caption: string
  alt?: string
}

export interface TimelineEvent {
  /** Short label, e.g. "When we first met" */
  title: string
  /** Your own date text, e.g. "June 2023". Leave '' if you'd rather not show a date. */
  date: string
  /** Your own words about this moment. */
  text: string
}

export const config = {
  /** Her name or nickname. Used everywhere. Replace the placeholder! */
  herName: 'Ah Ju',

  /** Shown at the bottom of the letter and finale. */
  signOff: 'From Yours truly pd sml.😞💙',

  // ---------------------------------------------------------
  // 1. Intro screen
  // ---------------------------------------------------------
  intro: {
    line1: 'Hey, my world... 💙',
    line2: 'I made something just for you dude, my bad i mean Babe!.',
    button: 'Open it Come on!',
    hint: 'tap the envelope or the button',
  },

  // ---------------------------------------------------------
  // 2. Hero / birthday celebration
  // ---------------------------------------------------------
  hero: {
    topHeading: 'Happy Birthday, My pov mean (Ah Ju!)😞💙',
    nameHeading: 'Happy Birthday, {name}! 🤍',
    subtitle:
      'Today is your special day my one and only Babyy Awww. I hope your day is filled with smiles, happiness, love, and all the little things that make you happy. ohhhh and hope u get alot of gift and food😞. And Share some for ME!',
    wishButton: 'Make a Wish ✨',
    wishMessage: 'I hope every wishes you Made comes true and got me tver pd😞💙.',
    giftButton: 'Scroll down babe!',
  },

  // ---------------------------------------------------------
  // 3. Love letter  (blank line = new paragraph)
  // ---------------------------------------------------------
  letter: {
    title: 'A Little Letter For You 💌',
    hint: 'tap the envelope to open it, (IDK what song to choos so ignore it!)',
    body: `Happy Birthday, my love. 💙

Today is a special day because it is the day someone as wonderful as you came into this world.

I wish I could find all the right words to explain how much you mean to me. You make my days brighter, my smiles bigger, and my life a little more beautiful just by being in it.

I hope this new chapter of your life brings you happiness, good health, success, peace, and countless beautiful memories. I hope you never forget how special you are and how much you deserve to be loved.

Thank you for being yourself. Thank you for the little moments, the smiles, the laughter, and all the beautiful memories we share.

If I could wish for one thing today, it would be that you always have reasons to smile, people who care about you, and dreams that make you excited for tomorrow.

And selfishly, I hope I get to be part of many more of your birthdays and beautiful memories.

Happy Birthday, my beautiful girl. I love you so much like so so Muchhhhh!💙.

I hope you like it i try my best😭 i'm just hoping to get a smile from my gf😞, I have nothing else to say so i'm ma stfu. 🤍

Love U babeee!,
From the dumbest person and The most lovely peroson u know(Me ur future husband😞) 💙`,
  },

  // ---------------------------------------------------------
  // 4. Reasons
  // ---------------------------------------------------------
  reasons: {
    title: "Little Reasons Why You're So Special to Me",
    subtitle: 'tap a card to flip it (I just add random shape to make it looks cool so dont mind it)',
    moreButton: 'Give Me Another Reason 💙',
    /** The 8 cards shown on the board. */
    cards: [
      'Love the way u remember me the first time we met.',
      'U probably dont know this but i fell for u with thoses eyes of urs!.',
      'You make ordinary moments feel special.',
      'Love you the way u are! just be yourself with me babe i love it!.',
      'You give me so many reasons to smile.',
      "You're my favorite person to annoy😞❤️.",
      'Just being with u makes my day batter.',
      'Even tho u never slime for real for me but even the little fake slime makes u so adorable!.',
      'The way you laugh is one of my favorite sounds.',
      'You make me want to be a better person.',
      'You make even quiet days feel warm.',
      'You are my calm, my comfort, and my favorite hello.',
      'Just thinking about you makes me smile.',
    ] as string[],
    /** Extra reasons revealed one by one by the "Give Me Another Reason" button. Add as many as you like! */
    more: [
    
    ] as string[],
  },

  // ---------------------------------------------------------
  // 5. Photo gallery  (at least 6 slots; add more freely)
  //    1. Copy your pictures into /public/photos/
  //    2. Set `src` below, e.g. src: '/photos/us-1.jpg'
  //    Leave src: '' to keep the cute placeholder illustration.
  // ---------------------------------------------------------
  gallery: {
    title: 'Some pics i have of u that i like',
    subtitle: 'tap a photo to see it bigger or just dont and ignore the shi out of it like me',
    photos: [
      { src: '/photos/u1.jpg', caption: "A little moment I'll always treasure." },
      { src: '/photos/u2.jpg', caption: 'My little cutie.' },
      { src: '/photos/u3.jpg', caption: 'Im sorry but it is cute! Literally a donut head!.' },
      { src: '/photos/u4.jpg', caption: 'kmg barca but wear madrid.' },
    ] as PhotoSlot[],
  },

  // ---------------------------------------------------------
  // 6. Secret gift box
  // ---------------------------------------------------------
  gift: {
    teaser: 'My last surprise!.',
    button: 'Open Your Gift 💙',
    replayButton: 'Replay the Surprise 🔁',
    message: `If I could give you one thing, it would be the chance to see yourself through my eyes. Then you would understand how special, beautiful, and precious you truly are.

Stop thinking this is cringe💔, It's Cute!.
I have so much idea but i put it as a text shouldn't have added something amazing T~T.

Happy Birthday, my girl. Never forget how wonderful you are. 🤍💙`,
  },

  // ---------------------------------------------------------
  // 7. Timeline.  Starts HIDDEN until you add your own events.
  //    Set `showPlaceholders: true` to preview how it looks with example text.
  //    Nothing here is real — it's only filled in when YOU write it.
  // ---------------------------------------------------------
  timeline: {
    title: 'Little Moments, Big Feelings',
    subtitle: 'a few of my favorite chapters ✨',
    showPlaceholders: false,
    events: [
      // Example — uncomment & edit:
      // { title: 'When we first met', date: 'Your date here', text: 'Write your own memory here.' },
    ] as TimelineEvent[],
    /** Only shown when showPlaceholders is true and `events` is empty. */
    placeholders: [
      { title: 'When we first met', date: 'Add your date', text: 'Write your own memory of this moment here.' },
      { title: 'Our first conversation', date: 'Add your date', text: 'Write your own memory of this moment here.' },
      { title: 'Our first date', date: 'Add your date', text: 'Write your own memory of this moment here.' },
      { title: 'A favorite memory', date: 'Add your date', text: 'Write your own memory of this moment here.' },
      { title: 'A moment that made me smile', date: 'Add your date', text: 'Write your own memory of this moment here.' },
      { title: 'A special moment together', date: 'Add your date', text: 'Write your own memory of this moment here.' },
      { title: 'A dream for our future', date: 'Add your date', text: 'Write your own dream for the future here.' },
    ] as TimelineEvent[],
  },

  // ---------------------------------------------------------
  // 8. Music.  Put an audio file you have permission to use at
  //    public/music/birthday-song.mp3  (or change the path).
  //    If the file is missing, the player politely says so.
  // ---------------------------------------------------------
  music: {
    src: '/music/birthday-song.mp3',
    defaultVolume: 0.35,
    /** Soft synthesized chimes on key moments (no audio file needed). */
    soundEffects: true,
  },

  // ---------------------------------------------------------
  // 9. Finale
  // ---------------------------------------------------------
  finale: {
    kicker: 'One Last Thing, Birthday Girl... 💙',
    body: `I hope you always remember how special you are.

I hope life gives you beautiful reasons to smile, the courage to follow your dreams, and the happiness your heart deserves.

Thank you for being part of my world. I hope we get to make many more beautiful memories together.

Today is your day, my love. Keep smiling, keep shining, and never forget how wonderful you are.

Happy Birthday babeeeee I love you so mucbbbbbbhhh ah juuuuu. 🤍💙`,
    heading: 'Happy Birthday, My Love! 🎂',
    madeWith: 'Made it just for you i try myy best.',
    button: "If u haven't made a wish click here dumbass!",
  },

  // ---------------------------------------------------------
  // 10. Secret heart (hidden clickable heart)
  // ---------------------------------------------------------
  secret: {
    title: 'You found my secret heart 💙',
    message:
      "Psst... of all the hearts on this page, you found the secret one. Just like you found the secret corner of mine. I'm really glad it's you. 🤍",
  },
}

/** Replaces {name} in any string with her name. */
export const withName = (text: string): string => text.replace(/\{name\}/g, config.herName)

/**
 * Turns "/photos/us-1.jpg" into a path that works wherever the site is hosted
 * (site root or a sub-folder such as GitHub Pages). Full https:// links pass through.
 */
export const asset = (path: string): string =>
  /^(https?:)?\/\//.test(path) ? path : `${import.meta.env.BASE_URL}${path.replace(/^\/+/, '')}`
