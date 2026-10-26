# 💙 A Little Birthday World

A cute, dreamy, blue-and-white interactive birthday website. It opens with a sealed envelope, then
leads through a birthday cake, a love letter that types itself, flip-card reasons, a photo gallery,
a secret gift box, an optional timeline and a finale. No backend, no API keys, no accounts.

Built with React + TypeScript + Vite. Fonts are bundled, so it looks the same offline.

---

## Run it

You need [Node.js](https://nodejs.org) 18 or newer.

```bash
cd birthday-world
npm install
npm run dev
```

Open the address it prints (usually http://localhost:5173). On your phone, use the "Network" address
it also prints (same Wi-Fi) to see how she will see it.

## Personalize it (everything is in ONE file)

Open **`src/config.ts`**. Every text, name, photo and song is there, with comments.

| What | Where in `src/config.ts` |
| --- | --- |
| Her name or nickname | `herName` (change `'[HER NAME]'`; every heading updates) |
| Birthday headline and subtitle | `hero` |
| The love letter | `letter.body` (a blank line starts a new paragraph) |
| Reasons you love her | `reasons.cards` (the 8 cards) and `reasons.more` (extra ones for the button) |
| Photos and captions | `gallery.photos` |
| Gift box message | `gift.message` |
| Timeline | `timeline.events` |
| Finale message | `finale` |
| The hidden-heart message | `secret` |
| Music file and volume | `music` |

Tip: write `{name}` anywhere inside a text and it becomes her name.

### Add your photos

1. Copy your pictures into **`public/photos/`** (square-ish photos look best; JPG or PNG).
2. In `src/config.ts`, set the `src` of a slot, for example:
   ```ts
   { src: '/photos/us-1.jpg', caption: 'My favorite smile.' },
   ```
3. Add more slots by copying a line. Slots with `src: ''` (or a wrong file name) show a cute
   illustration instead, so the gallery always looks nice.

### Add music

1. Put an audio file in **`public/music/`**, named `birthday-song.mp3` (or change `music.src`).
2. Only use a song you have the right to use (your own recording, something you commissioned, or
   royalty-free / Creative Commons music). Do not publish copyrighted songs on a public website.
3. Music never plays by itself. She taps the little ♪ button; the ⋯ button next to it has a volume
   slider. With no file added, the site works normally and the player just says no song is added yet.

### Timeline (optional)

The timeline stays **hidden** until you add real events, so nothing invented is ever shown:

```ts
timeline: {
  events: [
    { title: 'When we first met', date: 'June 2023', text: 'Your own words here.' },
    { title: 'A dream for our future', date: '', text: 'Leave date empty to hide it.' },
  ],
```

To preview the layout with example text, set `showPlaceholders: true` (then turn it off again!).

### Sound effects

Soft chimes are generated in the browser (no files). Turn them off with `soundEffects: false`.

## Share it with her

```bash
npm run build
```

This creates a **`dist/`** folder. Upload that folder to any static host (all have free plans):
Netlify Drop (drag and drop the folder), Cloudflare Pages, GitHub Pages or Vercel. You then get a
link to send her. It works from a sub-folder URL too.

Before sharing: replace `[HER NAME]`, check every message, add your photos, and open the link on a
phone once.

## What is inside

```
src/config.ts        <- all your personal content
src/App.tsx          <- page order and the opening/replay logic
src/effects.tsx      <- hearts, sparkles, confetti and soft chimes
src/components/      <- Intro, Envelope, Hero, Cake, Letter, Reasons, Gallery,
                        GiftBox, Timeline, Finale, MusicPlayer, Extras
src/styles.css       <- the blue-and-white look
public/photos/       <- your pictures
public/music/        <- your song
```

## Little extras to find

Tapping empty space makes sparkles. Reason cards and the envelope release hearts. A tiny, faint
heart hides between the gallery and the gift box (it has a secret message). A tiny blue heart in the
corner takes her back to the top. The page footer replays the opening surprise.

## Accessibility and comfort

Everything works with a keyboard and touch. Photos support arrow keys, swipe and Esc. If her device
asks for reduced motion, animations and particles are switched off and the text appears instantly.
