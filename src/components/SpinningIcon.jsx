// eslint-disable-next-line no-unused-vars
import { motion } from "motion/react";

function SpinningIcon({ icon }) {
    return (
        <motion.div
            animate={{
                rotate: 360,
                transition: { repeat: Infinity, duration: 5 },
            }}
        >
            {icon}
        </motion.div>
    );
}
export default SpinningIcon;
