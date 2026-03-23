import Home from "./pages/Home.jsx";
import CV from "./pages/CV.jsx";
import PageCarousel from "./components/PageCarousel.jsx";
import AuroraBackground from "./components/AuroraBackground.jsx";

import "./css/AuroraBackground.css";
import "./css/App.css";

const PAGES = [Home, CV];

function App() {
    return (
        <>
            <AuroraBackground />
            <PageCarousel pages={PAGES} />
        </>
    );
}

export default App;
