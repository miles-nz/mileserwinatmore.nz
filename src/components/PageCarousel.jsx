import { useRef, useState, useEffect } from "react";
import { FaChevronUp, FaChevronDown } from "react-icons/fa";
import "../css/PageCarousel.css";

const SCROLL_STEPS = 8;
const SCROLL_DELTA = 8;
const SCROLL_INTERVAL_MS = 30;
const SCROLL_END_DELAY_MS = 150;
const IS_SAFARI = /^((?!chrome|android).)*safari/i.test(navigator.userAgent);

function PageCarousel({ pages }) {
    const scrollRef = useRef(null);
    const scrollEndTimer = useRef(null);
    const [enableUpArrow, setEnableUpArrow] = useState(false);
    const [enableDownArrow, setEnableDownArrow] = useState(true);

    useEffect(() => {
        if (scrollRef.current) {
            scrollRef.current.scrollTop = 0;
        }
    }, []);

    const handleScroll = () => {
        document.body.classList.add("is-scrolling");
        clearTimeout(scrollEndTimer.current);
        scrollEndTimer.current = setTimeout(() => {
            document.body.classList.remove("is-scrolling");
        }, SCROLL_END_DELAY_MS);

        const { scrollTop, scrollHeight, clientHeight } = scrollRef.current;
        const newIndex = Math.round(scrollTop / clientHeight);
        setEnableUpArrow(scrollTop > 0 && newIndex > 0);
        setEnableDownArrow(
            scrollTop + clientHeight < scrollHeight &&
                newIndex < pages.length - 1,
        );
    };

    const scroll = (direction) => {
        if (!scrollRef.current) return;
        const { clientHeight, scrollTop } = scrollRef.current;
        if (clientHeight === 0) return;

        if (IS_SAFARI) {
            const delta = direction === "down" ? SCROLL_DELTA : -SCROLL_DELTA;
            let step = 0;
            const interval = setInterval(() => {
                scrollRef.current.dispatchEvent(
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
        scrollRef.current.scrollTo({ top: scrollTo, behavior: "smooth" });
    };

    if (!pages || pages.length === 0) return null;

    return (
        <div className="carousel-wrapper">
            <div
                className="carousel-scroll-container hide-scrollbar"
                ref={scrollRef}
                onScroll={handleScroll}
            >
                {pages.map((PageComponent, index) => (
                    <div key={index} className="carousel-page-item">
                        {typeof PageComponent === "function" ? (
                            <PageComponent />
                        ) : (
                            PageComponent
                        )}
                    </div>
                ))}
            </div>

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
        </div>
    );
}

export default PageCarousel;
