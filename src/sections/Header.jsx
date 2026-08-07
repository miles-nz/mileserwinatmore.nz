import { useState } from "react";
import "../css/ClickAnimations.css";
import { useGlarePos } from "../hooks/useGlarePos.js";
import { HEADER } from "../data/cvData.jsx";

const ANIMATIONS = ["colourflash"];

const Header = () => {
    const glareStyle = useGlarePos();
    const [activeAnim, setActiveAnim] = useState(null);

    const handleClick = () => {
        if (activeAnim) return;
        const anim = ANIMATIONS[Math.floor(Math.random() * ANIMATIONS.length)];
        setActiveAnim(anim);
        setTimeout(() => setActiveAnim(null), 200);
    };

    return (
        <header className="cv-header">
            <h1
                className={`cv-name click-anim-${activeAnim ?? "none"} ${activeAnim ? "active" : ""}`}
                onClick={handleClick}
                style={{
                    ...glareStyle,
                    willChange: "transform",
                    cursor: "pointer",
                }}
            >
                {HEADER.name}
            </h1>
            <div className="cv-contact">
                <a href={HEADER.phoneHref} className="cv-contact-link">
                    <span>{HEADER.phone}</span>
                </a>
                <a href={HEADER.emailHref} className="cv-contact-link">
                    <span>{HEADER.email}</span>
                </a>
            </div>
        </header>
    );
};

export default Header;
