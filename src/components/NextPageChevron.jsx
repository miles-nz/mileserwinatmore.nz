// eslint-disable-next-line no-unused-vars
import { motion } from "motion/react";
import { MdOutlineKeyboardArrowDown } from "react-icons/md";

function NextPageChevron({ handler }) {
    return (
        <button onClick={handler} className="chevron-down">
            <motion.div
                animate={{ y: [0, 10, 0] }}
                transition={{ repeat: Infinity, duration: 2 }}
            >
                <MdOutlineKeyboardArrowDown />
            </motion.div>
        </button>
    );
}

export default NextPageChevron;
