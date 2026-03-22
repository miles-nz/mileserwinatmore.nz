import { useEffect, useState } from "react";
import "../css/ClickAnimations.css";

const ANIMATIONS = ["colourflash"];

const Header = () => {
    const [pos, setPos] = useState({ x: 0.5, y: 0.5 });
    const [activeAnim, setActiveAnim] = useState(null);

    useEffect(() => {
        function handleMouseMove(e) {
            setPos({
                x: e.clientX / window.innerWidth,
                y: e.clientY / window.innerHeight,
            });
        }
        function handleMouseLeave() {
            setPos({ x: 0.5, y: 0.5 });
        }
        window.addEventListener("mousemove", handleMouseMove);
        window.addEventListener("mouseleave", handleMouseLeave);
        return () => {
            window.removeEventListener("mousemove", handleMouseMove);
            window.removeEventListener("mouseleave", handleMouseLeave);
        };
    }, []);

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
                    "--glare-x": `${pos.x * 100}%`,
                    "--glare-y": `${pos.y * 100}%`,
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
