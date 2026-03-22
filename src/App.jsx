import Home from "./pages/Home.jsx";
import About from "./pages/About.jsx";
import CV from "./pages/CV.jsx";
import PageCarousel from "./components/PageCarousel.jsx";
import AuroraBackground from "./components/AuroraBackground.jsx";

import "./css/AuroraBackground.css";
import "./css/App.css";

const PAGES = [Home, CV];

function App() {
    return (
        <div className="app-container">
            <AuroraBackground>
                <PageCarousel pages={PAGES} />
            </AuroraBackground>
        </div>
    );
}

export default App;
