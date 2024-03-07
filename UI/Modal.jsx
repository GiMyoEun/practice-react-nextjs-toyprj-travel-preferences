import { createPortal } from 'react-dom';
import { motion } from 'framer-motion';
import { alertTitle } from '/styles/styles';

export default function Modal({ title, children, onClose, className = '' }) {
    return createPortal(
        <>
            <div className="backdrop" onClick={onClose} />
            <motion.dialog
                variants={{
                    hidden: { opacity: 0, y: 30 },
                    visible: { opacity: 1, y: 0 },
                }}
                initial="hidden"
                animate="visible"
                exit="hidden"
                open
                className={className ? className : 'modal'}
            >
                <h2 className={alertTitle}>{title}</h2>
                {children}
            </motion.dialog>
        </>,
        document.getElementById('modal')
    );
}
