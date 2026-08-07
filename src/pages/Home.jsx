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
                    Software Engineer | Full-Stack Developer
                </h2>
                <div className="home-social-links" style={glareStyle}>
                    <a
                        href="https://www.linkedin.com/in/mileserwinatmore/"
                        target="_blank"
                        rel="noopener noreferrer"
                        aria-label="LinkedIn"
                    >
                        <span className="glare-icon glare-icon-linkedin" aria-hidden="true" />
                    </a>
                    <a
                        href="https://github.com/miles-nz"
                        target="_blank"
                        rel="noopener noreferrer"
                        aria-label="GitHub"
                    >
                        <span className="glare-icon glare-icon-github" aria-hidden="true" />
                    </a>
                </div>
            </div>
        </div>
    );
}

export default Home;
