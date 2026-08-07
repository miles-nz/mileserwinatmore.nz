import { useCallback, useState } from "react";
import { motion, useTransform } from "motion/react";
import { createPortal } from "react-dom";
import PDFDownloadButton from "../components/PDFDownloadButton.jsx";
import CVScaleWrapper from "../components/CVScaleWrapper.jsx";
import ZoomableSection from "../components/ZoomableSection.jsx";
import useCVScrollProgress from "../hooks/useCVScrollProgress.js";
import "../css/CVMobile.css";
import { HEADER } from "../data/cvData.jsx";
import SkillsMobile from "../sections/SkillsMobile.jsx";
import EducationMobile from "../sections/EducationMobile.jsx";
import ExperienceMobile from "../sections/ExperienceMobile.jsx";

const START_X = -100;

function CVMobile() {
    const { containerRef, progress, isVisible } = useCVScrollProgress();
    const [expandedId, setExpandedId] = useState(null);

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

    const handleExpand = useCallback((id) => setExpandedId(id), []);
    const handleCollapse = useCallback(() => setExpandedId(null), []);

    return (
        <>
            <div className="bottom-fade" />
            <div className="cvm-page-container" ref={containerRef}>
                <CVScaleWrapper>
                    <motion.div
                        style={{ x, pointerEvents: "none", opacity: cvOpacity }}
                    >
                        <div
                            className="cvm-main-container"
                            style={{ pointerEvents: "auto" }}
                        >
                            <header className="cvm-header">
                                <ZoomableSection
                                    id="contact"
                                    expandedId={expandedId}
                                    onExpand={handleExpand}
                                    onCollapse={handleCollapse}
                                    className="cvm-contact"
                                    variant="main"
                                    breadcrumb="Contact"
                                    ariaLabel="Zoom in on contact details"
                                >
                                    <h1 className="cvm-name">{HEADER.name}</h1>
                                    <div className="cvm-contact-links">
                                        <a href={HEADER.phoneHref}>{HEADER.phone}</a>
                                        <a href={HEADER.emailHref}>{HEADER.email}</a>
                                    </div>
                                </ZoomableSection>
                            </header>
                            <div className="cvm-content-grid">
                                <div className="cvm-sidebar">
                                    <SkillsMobile
                                        expandedId={expandedId}
                                        onExpand={handleExpand}
                                        onCollapse={handleCollapse}
                                    />
                                    <EducationMobile
                                        expandedId={expandedId}
                                        onExpand={handleExpand}
                                        onCollapse={handleCollapse}
                                    />
                                </div>
                                <div className="cvm-main-content">
                                    <ExperienceMobile
                                        expandedId={expandedId}
                                        onExpand={handleExpand}
                                        onCollapse={handleCollapse}
                                    />
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

export default CVMobile;
