import { useState, useEffect } from "react";

export function useGlarePos() {
    const [pos, setPos] = useState({ x: 0.5, y: 0.5 });

    useEffect(() => {
        function handleMouseMove(e) {
            setPos({
                x: e.clientX / window.innerWidth,
                y: e.clientY / window.innerHeight,
            });
        }
        function handleTouchMove(e) {
            const touch = e.touches[0];
            setPos({
                x: touch.clientX / window.innerWidth,
                y: touch.clientY / window.innerHeight,
            });
        }
        function handleMouseLeave() {
            setPos({ x: 0.5, y: 0.5 });
        }
        window.addEventListener("mousemove", handleMouseMove);
        window.addEventListener("mouseleave", handleMouseLeave);
        window.addEventListener("touchmove", handleTouchMove, {
            passive: true,
        });
        return () => {
            window.removeEventListener("mousemove", handleMouseMove);
            window.removeEventListener("mouseleave", handleMouseLeave);
            window.removeEventListener("touchmove", handleTouchMove);
        };
    }, []);

    return {
        "--glare-x": `${pos.x * 100}%`,
        "--glare-y": `${pos.y * 100}%`,
    };
}
