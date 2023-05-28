import React from "react";
import { motion } from "framer-motion";
import ErrorIcon from '@mui/icons-material/Error';

export default function ErrPage() {
    return (
        <div className="err_container">
            <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{
                    duration: 1,
                    delay: 0.5,
                }}
            ><ErrorIcon sx={{
                fontSize: 140,
                color: '#fe0222'
            }} /></motion.div>
            <motion.div
                className="box"
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{
                    duration: 1,
                    delay: 1,
                }}

            >
                <p><b>Opps !</b></p>
                <p>Page not found</p>
            </motion.div>
            <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{
                    duration: 1,
                    delay: 1.5,
                }}

            >
                <a href="/login">return to the page index</a>
            </motion.div>
        </div>
    );
}

