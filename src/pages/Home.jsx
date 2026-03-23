import { useGlarePos } from "../hooks/useGlarePos.js";

function Home() {
    const glareStyle = useGlarePos();

    return (
        <div className="centered-container">
            <div className="centered-group">
                <h1 className="home-header" style={glareStyle}>
                    Miles Erwin-Atmore
                </h1>
                <h2 className="home-subheader" style={glareStyle}>
                    Software Engineer | Full-Stack Development
                </h2>
            </div>
        </div>
    );
}

export default Home;
