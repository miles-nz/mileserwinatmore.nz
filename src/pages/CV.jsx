import useIsMobile from "../hooks/useIsMobile.js";
import CVDesktop from "./CVDesktop.jsx";
import CVMobile from "./CVMobile.jsx";

function CV() {
    const isMobile = useIsMobile();
    return isMobile ? <CVMobile /> : <CVDesktop />;
}

export default CV;
