import { useEffect, useRef, useState } from "react";
import { FaChevronUp, FaChevronDown } from "react-icons/fa";
import "../css/PageCarousel.css";
import useIsZoomed from "../hooks/useIsZoomed";

const SCROLL_STEPS = 8;
const SCROLL_DELTA = 8;
const SCROLL_INTERVAL_MS = 30;
const SCROLL_END_DELAY_MS = 150;
const IS_MACOS_SAFARI =
    /^((?!chrome|android).)*safari/i.test(navigator.userAgent) &&
    !/iPhone|iPad|iPod/.test(navigator.userAgent);

const getScrollEl = () => document.getElementById("root");

function PageCarousel({ pages }) {
    const scrollEndTimer = useRef(null);
    const [enableUpArrow, setEnableUpArrow] = useState(false);
    const [enableDownArrow, setEnableDownArrow] = useState(true);
    const isZoomed = useIsZoomed();

    useEffect(() => {
        const el = getScrollEl();
        if (el) el.scrollTop = 0;

        const handleScroll = () => {
            document.body.classList.add("is-scrolling");
            clearTimeout(scrollEndTimer.current);
            scrollEndTimer.current = setTimeout(() => {
                document.body.classList.remove("is-scrolling");
            }, SCROLL_END_DELAY_MS);

            const { scrollTop, scrollHeight, clientHeight } = getScrollEl();
            const newIndex = Math.round(scrollTop / clientHeight);
            setEnableUpArrow(scrollTop > 0 && newIndex > 0);
            setEnableDownArrow(
                scrollTop + clientHeight < scrollHeight - 1 &&
                    newIndex < pages.length - 1,
            );
        };

        el.addEventListener("scroll", handleScroll, { passive: true });
        return () => el.removeEventListener("scroll", handleScroll);
    }, [pages.length]);

    useEffect(() => {
        const el = getScrollEl();
        if (!el) return;
        el.style.scrollSnapType = isZoomed ? "none" : "y mandatory";
    }, [isZoomed]);

    const scroll = (direction) => {
        const el = getScrollEl();
        if (!el) return;
        const { clientHeight, scrollTop } = el;
        if (clientHeight === 0) return;

        if (IS_MACOS_SAFARI) {
            const delta = direction === "down" ? SCROLL_DELTA : -SCROLL_DELTA;
            let step = 0;
            const interval = setInterval(() => {
                el.dispatchEvent(
                    new WheelEvent("wheel", { deltaY: delta, bubbles: true }),
                );
                if (++step >= SCROLL_STEPS) clearInterval(interval);
            }, SCROLL_INTERVAL_MS);
            return;
        }

        const scrollTo =
            direction === "up"
                ? scrollTop - clientHeight
                : scrollTop + clientHeight;
        el.scrollTo({ top: scrollTo, behavior: "smooth" });
    };

    if (!pages || pages.length === 0) return null;

    return (
        <>
            {pages.map((PageComponent, index) => (
                <div key={index} className="carousel-page-item">
                    {typeof PageComponent === "function" ? (
                        <PageComponent />
                    ) : (
                        PageComponent
                    )}
                </div>
            ))}
            {pages.length > 1 && (
                <>
                    <button
                        onClick={() => scroll("up")}
                        disabled={!enableUpArrow}
                        className="carousel-arrow-btn carousel-arrow-btn-top"
                        aria-label="Previous page"
                    >
                        <FaChevronUp />
                    </button>
                    <button
                        onClick={() => scroll("down")}
                        disabled={!enableDownArrow}
                        className="carousel-arrow-btn carousel-arrow-btn-bottom"
                        aria-label="Next page"
                    >
                        <FaChevronDown />
                    </button>
                </>
            )}
        </>
    );
}

export default PageCarousel;
