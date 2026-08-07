# Architecture

**Page structure:** `App.jsx` holds a `PAGES` array (`[Home, CV]`) passed to `PageCarousel`. Adding a page means creating a component and appending it to that array.

**PageCarousel** (`src/components/PageCarousel.jsx`): Wraps each page in a `.carousel-page-item` div. The scroll container is `#root` (defined in `index.html`) with `scroll-snap-type: y mandatory`. Navigation arrows are shown/hidden based on scroll position. macOS Safari requires a `WheelEvent` workaround instead of `scrollTo`. Scroll-snap is disabled while the page is pinch-zoomed, via `useIsZoomed`.

**AuroraBackground** (`src/components/AuroraBackground.jsx`): Three blobs rendered via `createPortal` into `document.body` (fixed position, behind everything). Animated with `requestAnimationFrame` + lerp tracking mouse/touch position.

**CV page** (`src/pages/CV.jsx`): Picks `CVDesktop` or `CVMobile` (`src/pages/`) based on `useIsMobile` (matches `(max-width: 767px)`). Both variants share:

- `CVScaleWrapper` (`src/components/CVScaleWrapper.jsx`) - JS-scales a fixed 649×840px CV to fit any viewport.
- `useCVScrollProgress` (`src/hooks/useCVScrollProgress.js`) - tracks scroll progress (0–1) through the CV page on `#root` as a `motion` value, plus whether the page is ≥50% visible. Drives the CV's slide-in transform and the PDF button's fade/position.
- `cvData.jsx` (`src/data/`) - single source of truth for CV content (`HEADER`, `SKILLS_SECTIONS`, `EDUCATION`, `EXPERIENCE_ROLES`), consumed by both desktop and mobile section components.
- `PDFDownloadButton`, portalled to `document.body`, fading in once the CV page is ≥50% visible.

`CVDesktop` renders static sections - `Header`, `Skills`, `Education`, `Experience` (`src/sections/`).

`CVMobile` renders tap-to-zoom sections - `SkillsMobile`, `EducationMobile`, `ExperienceMobile` (`src/sections/`) - each wrapped in `ZoomableSection` (`src/components/ZoomableSection.jsx`). Tapping a compact card triggers a FLIP-style transition into a full-screen view styled the same as the card; only one section can be expanded at a time, with `expandedId` state lifted up to `CVMobile`.

**CSS co-location:** Each component/page imports its own CSS from `src/css/`. Global styles are in `src/index.css` and `src/css/App.css`.

**Hooks** (`src/hooks/`):

- `useGlarePos` - returns `--glare-x` / `--glare-y` CSS custom properties tracking cursor position, used for the glare effect on the Home page heading and the CV name.
- `useIsMobile` - `matchMedia`-based mobile/desktop breakpoint check, used to pick the CV variant.
- `useIsZoomed` - tracks `visualViewport.scale` to detect pinch-zoom, used to suspend scroll-snap in `PageCarousel`.
- `useCVScrollProgress` - see CV page above.
