import { useState } from "react";
// eslint-disable-next-line no-unused-vars
import { motion } from "motion/react";
import { MdRotateRight } from "react-icons/md";
import { ImSpinner11 } from "react-icons/im";
import "./App.css";

function Header({ title }) {
    return <h1 className="stack-sans-notch-header">{title}</h1>;
}

function Button({ onClick, classes }) {
    return (
        <div className={classes}>
            <button onClick={onClick} className="button">
                <motion.div
                    animate={{
                        rotate: 360,
                        transition: { repeat: Infinity, duration: 5 },
                    }}
                >
                    <ImSpinner11 />
                </motion.div>
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
            <motion.div
                initial={{ x: -360, y: -360, scale: 0.3 }}
                animate={{
                    x: 0,
                    y: 0,
                    scale: 1,
                    transition: {
                        type: "spring",
                        mass: 0.5,
                        damping: 2,
                        stiffness: 15,
                    },
                }}
            >
                <motion.div
                    key={count}
                    animate={{
                        rotate: 360,
                        transition: {
                            type: "spring",
                            mass: 0.5,
                            damping: 2,
                            stiffness: 15,
                        },
                    }}
                >
                    <div className="centered-group">
                        <Header title="Miles Erwin-Atmore" />
                        <Button onClick={handleClick} />
                    </div>
                </motion.div>
            </motion.div>
        </div>
    );
}

export default App;
