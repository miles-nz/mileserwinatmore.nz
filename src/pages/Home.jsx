import { useGlarePos } from "../hooks/useGlarePos.js";

function Home() {
    const glareStyle = useGlarePos();

    return (
        <div className="centered-container">
            <div className="centered-group">
                <h1 className="home-header" style={glareStyle}>
                    Miles Erwin-Atmore
                </h1>
            </div>
        </div>
    );
}

export default Home;
