import { useEffect, useState } from "react";

const QUERY = "(max-width: 767px)";

const useIsMobile = () => {
    const [isMobile, setIsMobile] = useState(
        () => window.matchMedia(QUERY).matches,
    );

    useEffect(() => {
        const mql = window.matchMedia(QUERY);

        function onChange(e) {
            setIsMobile(e.matches);
        }

        mql.addEventListener("change", onChange);
        return () => mql.removeEventListener("change", onChange);
    }, []);

    return isMobile;
};

export default useIsMobile;
