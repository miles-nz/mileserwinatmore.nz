import { useEffect, useState } from "react";

const useIsZoomed = () => {
    const [isZoomed, setIsZoomed] = useState(false);

    useEffect(() => {
        const viewport = window.visualViewport;
        if (!viewport) return;

        function onViewportChange() {
            setIsZoomed(viewport.scale > 1.1);
        }

        viewport.addEventListener("resize", onViewportChange);
        viewport.addEventListener("scroll", onViewportChange);
        return () => {
            viewport.removeEventListener("resize", onViewportChange);
            viewport.removeEventListener("scroll", onViewportChange);
        };
    }, []);

    return isZoomed;
};

export default useIsZoomed;
