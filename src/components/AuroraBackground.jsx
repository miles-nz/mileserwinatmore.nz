import { useEffect, useRef } from "react";

// AuroraBackground: animated aurora effect

const ANIMATION_INTENSITY = 1;

const BLOB_OFFSETS = [
    { x: 150, y: 120 },
    { x: -180, y: 100 },
    { x: 130, y: -150 },
];

const lerp = (start, end, factor) => start + (end - start) * factor;

const AuroraBackground = ({ style = {}, className = "", children }) => {
    const blobRef1 = useRef(null);
    const blobRef2 = useRef(null);
    const blobRef3 = useRef(null);

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
        rafId = requestAnimationFrame(animate);

        return () => {
            window.removeEventListener("mousemove", handleMouseMove);
            cancelAnimationFrame(rafId);
        };
    }, []);

    return (
        <div
            className={`aurora-bg-wrapper ${className}`}
            style={{
                position: "absolute",
                inset: 0,
                width: "100vw",
                height: "100vh",
                overflow: "hidden",
                zIndex: 0,
                ...style,
            }}
        >
            <div className="aurora-blob aurora-blob-1" ref={blobRef1} />
            <div className="aurora-blob aurora-blob-2" ref={blobRef2} />
            <div className="aurora-blob aurora-blob-3" ref={blobRef3} />
            {children}
        </div>
    );
};

export default AuroraBackground;
