import { useEffect, useLayoutEffect, useRef, useState } from "react";
import { AnimatePresence, motion, useAnimate, usePresence } from "motion/react";
import { createPortal } from "react-dom";
import "../css/ZoomableSection.css";

const ZOOM_TRANSITION = { duration: 0.32, ease: [0.22, 1, 0.36, 1] };
const ZOOM_OUT_TRANSITION = { duration: 0.46, ease: [0.22, 1, 0.36, 1] };
const IDENTITY_TRANSFORM = "translate(0px, 0px) scale(1, 1)";

// Transform that maps dest's box onto origin's box (same center, same size).
function flipFrom(origin, dest) {
    const originCenterX = origin.left + origin.width / 2;
    const originCenterY = origin.top + origin.height / 2;
    const destCenterX = dest.left + dest.width / 2;
    const destCenterY = dest.top + dest.height / 2;
    const x = originCenterX - destCenterX;
    const y = originCenterY - destCenterY;
    const scaleX = origin.width / dest.width;
    const scaleY = origin.height / dest.height;
    return `translate(${x}px, ${y}px) scale(${scaleX}, ${scaleY})`;
}

// Tracks whether ref's element has more content above/below the current
// scroll position, for the scroll hint and edge fade masks.
function useScrollEdges(ref) {
    const [edges, setEdges] = useState({
        canScrollUp: false,
        canScrollDown: false,
    });

    useEffect(() => {
        const el = ref.current;
        if (!el) return;

        function check() {
            setEdges({
                canScrollUp: el.scrollTop > 4,
                canScrollDown:
                    el.scrollHeight - el.scrollTop - el.clientHeight > 4,
            });
        }

        check();
        el.addEventListener("scroll", check, { passive: true });
        window.addEventListener("resize", check);
        return () => {
            el.removeEventListener("scroll", check);
            window.removeEventListener("resize", check);
        };
    }, [ref]);

    return edges;
}

// Animates `transform` through explicit keyframes (overlay-transform to
// identity, reversed on exit) rather than letting animate() read the
// element's current transform implicitly - a duration:0 "jump" doesn't
// apply synchronously enough for that to be reliable.
function ZoomCard({
    originRect,
    className,
    contentClassName,
    breadcrumb,
    onClick,
    children,
}) {
    const [scope, animate] = useAnimate();
    const [isPresent, safeToRemove] = usePresence();
    const flipRef = useRef(null);
    const innerRef = useRef(null);
    const { canScrollUp, canScrollDown } = useScrollEdges(innerRef);
    const maskImage = `linear-gradient(to bottom, transparent 0, black ${
        canScrollUp ? "28px" : "0px"
    }, black ${canScrollDown ? "calc(100% - 28px)" : "100%"}, transparent 100%)`;

    useLayoutEffect(() => {
        const el = scope.current;
        if (isPresent) {
            const from = flipFrom(originRect, el.getBoundingClientRect());
            flipRef.current = from;
            animate(
                el,
                { transform: [from, IDENTITY_TRANSFORM] },
                ZOOM_TRANSITION,
            );
        } else if (flipRef.current) {
            // Fades out during the shrink to hide the glitchy scaled-down layout.
            animate(
                el,
                {
                    transform: [IDENTITY_TRANSFORM, flipRef.current],
                    opacity: [1, 0],
                },
                ZOOM_OUT_TRANSITION,
            );
            const timer = setTimeout(
                safeToRemove,
                ZOOM_OUT_TRANSITION.duration * 1000,
            );
            return () => clearTimeout(timer);
        } else {
            safeToRemove();
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [isPresent]);

    return (
        <motion.div ref={scope} className={className}>
            {/* Content layer drawn over the fixed element's background -
                see .cv-zoom-open in ZoomableSection.css. */}
            <div className="cv-zoom-open-surface">
                {breadcrumb && (
                    <div className="cv-zoom-breadcrumb">{breadcrumb}</div>
                )}
                <button
                    type="button"
                    className="cv-zoom-close"
                    onClick={onClick}
                    aria-label="Close"
                >
                    <svg
                        viewBox="0 0 24 24"
                        width="18"
                        height="18"
                        aria-hidden="true"
                    >
                        <line
                            x1="5"
                            y1="5"
                            x2="19"
                            y2="19"
                            stroke="currentColor"
                            strokeWidth="2"
                            strokeLinecap="round"
                        />
                        <line
                            x1="19"
                            y1="5"
                            x2="5"
                            y2="19"
                            stroke="currentColor"
                            strokeWidth="2"
                            strokeLinecap="round"
                        />
                    </svg>
                </button>
                <div
                    className={`cv-zoom-open-inner ${contentClassName}`}
                    ref={innerRef}
                    style={{ maskImage, WebkitMaskImage: maskImage }}
                >
                    {children}
                </div>
            </div>
            <div
                className={`cv-zoom-scroll-hint ${canScrollDown ? "cv-zoom-scroll-hint--visible" : ""}`}
                aria-hidden="true"
            />
        </motion.div>
    );
}

// Tap target that zooms into a full-screen view styled like the compact
// card. Only one section is expanded at a time; state is lifted by the caller.
function ZoomableSection({
    id,
    expandedId,
    onExpand,
    onCollapse,
    className = "",
    variant = "main",
    breadcrumb,
    ariaLabel,
    children,
}) {
    const triggerRef = useRef(null);
    const [originRect, setOriginRect] = useState(null);
    const isOpen = expandedId === id;

    // Prevents links/buttons inside the compact trigger (e.g. tel:/mailto:)
    // from firing before the zoom transition; they work normally once zoomed in.
    function handleOpen(e) {
        e?.preventDefault();
        setOriginRect(triggerRef.current.getBoundingClientRect());
        onExpand(id);
    }

    function handleKeyDown(e) {
        if (e.key === "Enter" || e.key === " ") {
            e.preventDefault();
            handleOpen(e);
        }
    }

    return (
        <>
            <div
                ref={triggerRef}
                className={`cv-zoomable ${className}`}
                onClick={handleOpen}
                role="button"
                tabIndex={0}
                aria-label={ariaLabel}
                onKeyDown={handleKeyDown}
            >
                {children}
            </div>
            {createPortal(
                <AnimatePresence>
                    {isOpen && (
                        <ZoomCard
                            originRect={originRect}
                            className={`cv-zoomable cv-zoom-open cv-zoom-open--${variant} ${className}`}
                            contentClassName={className}
                            breadcrumb={breadcrumb}
                            onClick={onCollapse}
                        >
                            {children}
                        </ZoomCard>
                    )}
                </AnimatePresence>,
                document.body,
            )}
        </>
    );
}

export default ZoomableSection;
