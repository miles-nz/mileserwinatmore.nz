import { motion } from "motion/react";

function SpinIn({ children }) {
    return (
        <>
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
                    {children}
                </motion.div>
            </motion.div>
        </>
    );
}

export default SpinIn;
