// eslint-disable-next-line no-unused-vars
import { motion } from "motion/react";

function SpinningIcon({ text }) {
    return (
        <motion.div
            animate={{
                y: [3, -5, 3],
                transition: {
                    repeat: Infinity,
                    duration: 0.8,
                    times: [0, 0.6, 1],
                    ease: ["easeOut", "easeIn"],
                },
            }}
        >
            {text}
        </motion.div>
    );
}
export default SpinningIcon;
