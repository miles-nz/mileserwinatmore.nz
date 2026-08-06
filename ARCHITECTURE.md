# Architecture

**Page structure:** `App.jsx` holds a `PAGES` array (`[Home, CV]`) passed to `PageCarousel`. Adding a page means creating a component and appending it to that array.

**PageCarousel** (`src/components/PageCarousel.jsx`): Wraps each page in a `.carousel-page-item` div. The scroll container is `#root` (defined in `index.html`) with `scroll-snap-type: y mandatory`. Navigation arrows are shown/hidden based on scroll position. macOS Safari requires a `WheelEvent` workaround instead of `scrollTo`.

**AuroraBackground** (`src/components/AuroraBackground.jsx`): Three blobs rendered via `createPortal` into `document.body` (fixed position, behind everything). Animated with `requestAnimationFrame` + lerp tracking mouse/touch position.

**CV page** (`src/pages/CV.jsx`): Uses `CVScaleWrapper` to JS-scale a fixed 649×840px CV to fit any viewport. The CV slides in from off-screen via `motion/react`'s `useMotionValue`, driven by scroll progress on `#root`. A PDF download button is portalled to `document.body` and fades in when the CV page is ≥50% visible. CV content (skills, experience, education) lives in `src/sections/`, and the downloadable PDF is served from `public/`.

**CSS co-location:** Each component/page imports its own CSS from `src/css/`. Global styles are in `src/index.css` and `src/css/App.css`.

**`useGlarePos`** (`src/hooks/useGlarePos.js`): Returns `--glare-x` / `--glare-y` CSS custom properties tracking cursor position, used for the glare effect on the Home page heading.
