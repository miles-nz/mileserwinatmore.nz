import { motion, useMotionValue } from "motion/react";
import { createPortal } from "react-dom";
import PDFDownloadButton from "../components/PDFDownloadButton.jsx";
import "../css/CV.css";
import Header from "../sections/Header.jsx";
import Skills from "../sections/Skills.jsx";
import Education from "../sections/Education.jsx";
import Experience from "../sections/Experience.jsx";
import { useRef, useEffect, useState } from "react";

// JS scaling wrapper for perfect proportional scaling
function CVScaleWrapper({ children }) {
    const wrapperRef = useRef();
    const cvWidth = 649;
    const cvHeight = 840;
    const mobilePadding = 0.02;
    const BASE_SCALE = 0.95;

    useEffect(() => {
        function updateScale() {
            const availableWidth = window.innerWidth * (1 - 2 * mobilePadding);
            const availableHeight =
                window.innerHeight * (1 - 2 * mobilePadding);
            const scale =
                Math.min(
                    availableWidth / cvWidth,
                    availableHeight / cvHeight,
                    1,
                ) * BASE_SCALE;
            wrapperRef.current.style.transform = `scale(${scale})`;
            wrapperRef.current.style.transformOrigin = "center center";
            wrapperRef.current.style.width = `${cvWidth}px`;
            wrapperRef.current.style.height = `${cvHeight}px`;
            const parent = wrapperRef.current.parentElement;
            parent.style.display = "flex";
            parent.style.justifyContent = "center";
            parent.style.alignItems = "center";
            parent.style.width = "100vw";
            parent.style.height = "100dvh";
            parent.style.overflow = "hidden";
            parent.style.paddingLeft =
                parent.style.paddingRight = `${mobilePadding * 100}vw`;
            parent.style.paddingTop =
                parent.style.paddingBottom = `${mobilePadding * 100}vw`;
        }
        updateScale();
        window.addEventListener("resize", updateScale);
        return () => window.removeEventListener("resize", updateScale);
    }, []);

    return <div ref={wrapperRef}>{children}</div>;
}

function CVContent() {
    const containerRef = useRef(null);
    const x = useMotionValue(window.innerWidth <= 768 ? "-100vw" : "-60vw");
    const buttonY = useMotionValue("100px");
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
        const scrollContainer = containerRef.current?.closest(
            ".carousel-scroll-container",
        );
        if (!scrollContainer) return;

        function onScroll() {
            const { scrollTop, clientHeight } = scrollContainer;
            const progress = Math.min(Math.max(scrollTop / clientHeight, 0), 1);
            const isMobile = window.innerWidth <= 768;
            const startX = isMobile ? -100 : -60;
            x.set(`${startX + progress * Math.abs(startX)}vw`);
            buttonY.set(`${(1 - progress) * 100}px`);
        }

        scrollContainer.addEventListener("scroll", onScroll, {
            passive: true,
        });
        return () => scrollContainer.removeEventListener("scroll", onScroll);
    }, [x, buttonY]);

    return (
        <div className="cv-page-container" ref={containerRef}>
            <CVScaleWrapper>
                <motion.div style={{ x, pointerEvents: "none" }}>
                    <div
                        className="cv-main-container"
                        style={{ pointerEvents: "auto" }}
                    >
                        <Header />
                        <div className="cv-content-grid">
                            <div className="cv-sidebar">
                                <Skills />
                                <Education />
                            </div>
                            <div className="cv-main-content">
                                <Experience />
                            </div>
                        </div>
                    </div>
                </motion.div>
            </CVScaleWrapper>
            {isVisible &&
                createPortal(
                    <motion.div
                        className="pdf-download-portal"
                        style={{ x: "-50%", y: buttonY }}
                    >
                        <PDFDownloadButton />
                    </motion.div>,
                    document.body,
                )}
        </div>
    );
}

function CV() {
    return <CVContent />;
}

export default CV;
