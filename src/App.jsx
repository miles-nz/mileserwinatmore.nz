import { useState } from "react";
// eslint-disable-next-line no-unused-vars
import { motion } from "motion/react";
import { ImSpinner11 } from "react-icons/im";
import Button from "./components/Button.jsx";
import SpinningIcon from "./components/SpinningIcon.jsx";
import "./App.css";

function Header({ title }) {
    return <h1 className="stack-sans-notch-header">{title}</h1>;
}

function App() {
    const [count, setCount] = useState(0);
    function handleClick() {
        setCount(count + 1);
    }
    return (
        <div className="app-container">
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
                            <Button
                                onClick={handleClick}
                                text={
                                    <SpinningIcon
                                        icon={<ImSpinner11 />}
                                    ></SpinningIcon>
                                }
                            />
                        </div>
                    </motion.div>
                </motion.div>
            </div>
            <div className="bottom-text">
                site under construction. have fun spinning my name.
            </div>
        </div>
    );
}

export default App;
