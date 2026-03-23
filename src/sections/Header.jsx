import { useState } from "react";
import "../css/ClickAnimations.css";
import { useGlarePos } from "../hooks/useGlarePos.js";

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
                Miles Erwin-Atmore
            </h1>
            <div className="cv-contact">
                <a href="tel:+642102408271" className="cv-contact-link">
                    <span>021 0240 8271</span>
                </a>
                <a
                    href="mailto:mileserwinatmore@gmail.com"
                    className="cv-contact-link"
                >
                    <span>mileserwinatmore@gmail.com</span>
                </a>
            </div>
        </header>
    );
};

export default Header;
