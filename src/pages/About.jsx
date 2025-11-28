import { useState } from "react";
// eslint-disable-next-line no-unused-vars
import { motion } from "motion/react";

import Button from "../components/Button.jsx";
import { MdArrowUpward } from "react-icons/md";
import BouncingIcon from "../components/BouncingIcon.jsx";

function About() {
    const [count, setCount] = useState(0);
    function handleClick() {
        setCount(count + 1);
    }
    return (
        <div className="centered-container">
            <motion.div
                key={count}
                initial={{ y: 0 }}
                animate={{
                    y: [0, -120, 0, -60, 0, -30, 0, -10, 0, -3, 0],
                }}
                transition={{
                    duration: 1.2,
                    ease: [
                        "easeOut",
                        "easeIn",
                        "easeOut",
                        "easeIn",
                        "easeOut",
                        "easeIn",
                        "easeOut",
                        "easeIn",
                        "easeOut",
                        "easeIn",
                    ],
                    times: [
                        0, 0.05, 0.3, 0.45, 0.6, 0.75, 0.85, 0.92, 0.96, 0.98,
                        1,
                    ],
                }}
            >
                <div className="centered-group">
                    <h1 className="stack-sans-notch-header">
                        Miles Erwin-Atmore
                    </h1>
                </div>
            </motion.div>
            <Button
                onClick={handleClick}
                text={<BouncingIcon text={<MdArrowUpward />}></BouncingIcon>}
            />
        </div>
    );
}

export default About;
