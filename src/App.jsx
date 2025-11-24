import { useState } from "react";
// eslint-disable-next-line no-unused-vars
import { motion } from "motion/react";
import "./App.css";

function Header({ title }) {
    return <h1 className="stack-sans-notch-header">{title}</h1>;
}

function Button({ onClick, classes }) {
    return (
        <div className={classes}>
            <button onClick={onClick} className="button">
                spin!
            </button>
        </div>
    );
}

function App() {
    const [count, setCount] = useState(0);
    function handleClick() {
        setCount(count + 1);
    }
    return (
        <div className="centered-container">
            <motion.div key={count} animate={{ rotate: 360 }}>
                <div className="centered-group">
                    <Header title="Miles Erwin-Atmore" />
                    <Button onClick={handleClick} />
                </div>
            </motion.div>
        </div>
    );
}

export default App;
