import { useState } from "react";
// eslint-disable-next-line no-unused-vars
import { motion } from "motion/react";
import "./App.css";

function Header({ title }) {
    return <h1 className="centered-header stack-sans-notch-header">{title}</h1>;
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
        console.log(`Button clicked ${count} times`);
    }
    return (
        <motion.div key={count} animate={{ rotate: 360 }}>
            <div className="centered-group">
                <Header title="Miles Erwin-Atmore" />
                <Button onClick={handleClick} classes="centered-button" />
            </div>
        </motion.div>
    );
}

export default App;
