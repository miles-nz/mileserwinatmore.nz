import { motion, useTransform } from "motion/react";
import { createPortal } from "react-dom";
import PDFDownloadButton from "../components/PDFDownloadButton.jsx";
import CVScaleWrapper from "../components/CVScaleWrapper.jsx";
import useCVScrollProgress from "../hooks/useCVScrollProgress.js";
import "../css/CV.css";
import Header from "../sections/Header.jsx";
import Skills from "../sections/Skills.jsx";
import Education from "../sections/Education.jsx";
import Experience from "../sections/Experience.jsx";

const START_X = -60;

function CVDesktop() {
    const { containerRef, progress, isVisible } = useCVScrollProgress();

    const x = useTransform(
        progress,
        (p) => `${START_X + p * Math.abs(START_X)}vw`,
    );
    const buttonY = useTransform(progress, (p) => `${(1 - p) * 100}px`);
    const buttonOpacity = useTransform(progress, (p) =>
        Math.min(Math.max((p - 0.8) / 0.2, 0), 1),
    );
    const cvOpacity = useTransform(progress, (p) =>
        Math.min(Math.max((p - 0.2) / 0.8, 0), 1),
    );

    return (
        <>
            <div className="bottom-fade" />
            <div className="cv-page-container" ref={containerRef}>
                <CVScaleWrapper>
                    <motion.div
                        style={{ x, pointerEvents: "none", opacity: cvOpacity }}
                    >
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
                            style={{
                                x: "-50%",
                                y: buttonY,
                                opacity: buttonOpacity,
                            }}
                        >
                            <PDFDownloadButton />
                        </motion.div>,
                        document.body,
                    )}
            </div>
        </>
    );
}

export default CVDesktop;
