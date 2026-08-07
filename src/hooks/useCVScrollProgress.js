import { useEffect, useRef, useState } from "react";
import { useMotionValue } from "motion/react";

// Tracks scroll progress (0-1) on #root as a motion value, plus whether
// the CV page is ≥50% visible.
function useCVScrollProgress() {
    const containerRef = useRef(null);
    const progress = useMotionValue(0);
    const [isVisible, setIsVisible] = useState(false);

    useEffect(() => {
        const observer = new IntersectionObserver(
            ([entry]) => setIsVisible(entry.isIntersecting),
            { threshold: 0.5 },
        );
        if (containerRef.current) observer.observe(containerRef.current);
        return () => observer.disconnect();
    }, []);

    useEffect(() => {
        const scrollContainer = document.getElementById("root");
        if (!scrollContainer) return;

        function onScroll() {
            const isZoomed = (window.visualViewport?.scale ?? 1) > 1.1;
            if (isZoomed) return;
            // Skip if the container isn't actually scrollable (can happen during mobile zoom).
            if (scrollContainer.scrollHeight <= scrollContainer.clientHeight) {
                return;
            }

            const { scrollTop, clientHeight } = scrollContainer;
            progress.set(Math.min(Math.max(scrollTop / clientHeight, 0), 1));
        }

        scrollContainer.addEventListener("scroll", onScroll, {
            passive: true,
        });
        return () => scrollContainer.removeEventListener("scroll", onScroll);
    }, [progress]);

    return { containerRef, progress, isVisible };
}

export default useCVScrollProgress;
