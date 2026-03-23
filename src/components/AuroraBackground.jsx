import { useEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";

// AuroraBackground: animated aurora effect

const ANIMATION_INTENSITY = 1;

const BLOB_OFFSETS = [
    { x: 150, y: 120 },
    { x: -180, y: 100 },
    { x: 130, y: -150 },
];

const lerp = (start, end, factor) => start + (end - start) * factor;

const getHeight = () =>
    window.innerWidth <= 768 ? screen.height : window.innerHeight;

const AuroraBackground = () => {
    const blobRef1 = useRef(null);
    const blobRef2 = useRef(null);
    const blobRef3 = useRef(null);
    const [dimensions, setDimensions] = useState({
        width: window.innerWidth,
        height: getHeight(),
    });

    useEffect(() => {
        function updateDimensions() {
            setDimensions({
                width: window.innerWidth,
                height: getHeight(),
            });
        }
        window.addEventListener("resize", updateDimensions);
        return () => window.removeEventListener("resize", updateDimensions);
    }, []);

    useEffect(() => {
        const blobRefs = [blobRef1, blobRef2, blobRef3];
        let targetX = 0;
        let targetY = 0;
        let currentX = 0;
        let currentY = 0;
        let rafId;

        const handleMouseMove = (e) => {
            targetX = e.clientX / window.innerWidth;
            targetY = e.clientY / window.innerHeight;
        };

        const handleTouchMove = (e) => {
            const touch = e.touches[0];
            targetX = touch.clientX / window.innerWidth;
            targetY = touch.clientY / window.innerHeight;
        };

        const animate = () => {
            currentX = lerp(currentX, targetX, 0.05);
            currentY = lerp(currentY, targetY, 0.05);

            blobRefs.forEach((ref, i) => {
                if (!ref.current) return;
                const tx = currentX * BLOB_OFFSETS[i].x * ANIMATION_INTENSITY;
                const ty = currentY * BLOB_OFFSETS[i].y * ANIMATION_INTENSITY;
                ref.current.style.transform = `translateX(${tx}px) translateY(${ty}px) translateZ(0)`;
            });

            rafId = requestAnimationFrame(animate);
        };

        window.addEventListener("mousemove", handleMouseMove);
        window.addEventListener("touchmove", handleTouchMove, {
            passive: true,
        });
        rafId = requestAnimationFrame(animate);

        return () => {
            window.removeEventListener("mousemove", handleMouseMove);
            window.removeEventListener("touchmove", handleTouchMove);
            cancelAnimationFrame(rafId);
        };
    }, []);

    return createPortal(
        <div
            className="aurora-bg-wrapper"
            style={{
                position: "absolute",
                top: 0,
                left: 0,
                width: dimensions.width,
                height: dimensions.height,
            }}
        >
            <div className="aurora-blob aurora-blob-1" ref={blobRef1} />
            <div className="aurora-blob aurora-blob-2" ref={blobRef2} />
            <div className="aurora-blob aurora-blob-3" ref={blobRef3} />
        </div>,
        document.body,
    );
};

export default AuroraBackground;
