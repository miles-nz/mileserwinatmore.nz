import { useState, useEffect } from "react";

function Home() {
    const [pos, setPos] = useState({ x: 0.5, y: 0.5 });

    useEffect(() => {
        function handleMouseMove(e) {
            setPos({
                x: e.clientX / window.innerWidth,
                y: e.clientY / window.innerHeight,
            });
        }
        function handleMouseLeave() {
            setPos({ x: 0.5, y: 0.5 });
        }
        window.addEventListener("mousemove", handleMouseMove);
        window.addEventListener("mouseleave", handleMouseLeave);
        return () => {
            window.removeEventListener("mousemove", handleMouseMove);
            window.removeEventListener("mouseleave", handleMouseLeave);
        };
    }, []);

    return (
        <div className="centered-container">
            <div className="centered-group">
                <h1
                    className="home-header"
                    style={{
                        "--glare-x": `${pos.x * 100}%`,
                        "--glare-y": `${pos.y * 100}%`,
                    }}
                >
                    Miles Erwin-Atmore
                </h1>
            </div>
        </div>
    );
}

export default Home;
