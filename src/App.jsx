import { useState, useRef, useCallback, useEffect } from "react";

import Home from "./pages/Home.jsx";
import About from "./pages/About.jsx";
import Page from "./pages/Page.jsx";
import NextPageChevron from "./components/NextPageChevron.jsx";

import "./App.css";

const PAGES = [Home, About];

const useIntersectionObserver = (pageRefs, callback) => {
    useEffect(() => {
        const elements = pageRefs.current;
        if (!elements || elements.length === 0 || !callback) return;

        const options = {
            root: document.getElementById("root"),
            rootMargin: "0px",
            threshold: 0.7,
        };

        const observer = new IntersectionObserver((entries) => {
            let mostVisibleIndex = null;
            let maxIntersectionRatio = 0;

            entries.forEach((entry) => {
                if (entry.isIntersecting) {
                    const index = elements.findIndex(
                        (el) => el === entry.target
                    );
                    const ratio = entry.intersectionRatio;

                    if (ratio > maxIntersectionRatio) {
                        maxIntersectionRatio = ratio;
                        mostVisibleIndex = index;
                    }
                }
            });

            if (mostVisibleIndex !== null) {
                callback(mostVisibleIndex);
            }
        }, options);

        elements.forEach((el) => {
            if (el) {
                observer.observe(el);
            }
        });

        return () => {
            observer.disconnect();
        };
    }, [pageRefs, callback]);
};

function App() {
    const [currentPageIndex, setCurrentPageIndex] = useState(0);

    const pageRefs = useRef([]);

    const scrollToPage = useCallback((index) => {
        if (index >= 0 && index < PAGES.length) {
            const targetElement = pageRefs.current[index];

            if (targetElement) {
                targetElement.scrollIntoView({
                    behavior: "smooth",
                    block: "start",
                });
                setCurrentPageIndex(index);
            } else {
                console.error(
                    `Error: Target element for index ${index} not found in refs.`
                );
            }
        }
    }, []);

    useEffect(() => {
        if (pageRefs.current.length === PAGES.length) {
            // Defer the state update to allow the current render to finish.
            const timerId = setTimeout(() => {
                scrollToPage(0);
            }, 0);

            // Cleanup the timer
            return () => clearTimeout(timerId);
        }
    }, [scrollToPage]);

    const handleNextPage = () => {
        const nextIndex = currentPageIndex + 1;
        if (nextIndex < PAGES.length) {
            console.log("Scrolling to page index:", nextIndex);
            scrollToPage(nextIndex);
        } else if (nextIndex === PAGES.length) {
            scrollToPage(0);
        }
    };

    const setIntersectingIndex = useCallback(
        (index) => {
            if (index !== null && index !== currentPageIndex) {
                setCurrentPageIndex(index);
            }
        },
        [currentPageIndex]
    );

    useIntersectionObserver(pageRefs, setIntersectingIndex);

    return (
        <div>
            {PAGES.map((PageComponent, index) => {
                return (
                    <section
                        key={index}
                        ref={(el) => {
                            if (el) {
                                pageRefs.current[index] = el;
                            }
                        }}
                        className="page-container"
                    >
                        <PageComponent
                            text={
                                "index: " +
                                index +
                                ", currentPageIndex: " +
                                currentPageIndex
                            }
                        />
                        <div className="footer-container">
                            <NextPageChevron handler={handleNextPage} />
                            <div className="bottom-text">
                                <div>site under construction.</div>
                            </div>
                        </div>
                    </section>
                );
            })}
        </div>
    );
}

export default App;
