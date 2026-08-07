import { useEffect, useRef } from "react";

function CVScaleWrapper({ children }) {
    const wrapperRef = useRef();
    const cvWidth = 649;
    const cvHeight = 840;
    const mobilePadding = 0.02;
    const BASE_SCALE = 0.95;

    useEffect(() => {
        function updateScale() {
            // clientWidth/clientHeight, not innerWidth/innerHeight - avoids
            // rescaling on pinch-zoom.
            const availableWidth =
                document.documentElement.clientWidth * (1 - 2 * mobilePadding);
            const availableHeight =
                document.documentElement.clientHeight * (1 - 2 * mobilePadding);
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

export default CVScaleWrapper;
