import React from 'react';
import './ModalMessage.css'
import {motion} from 'framer-motion'
import {modalMsgVariant} from '../animations/variants'

const ModalMessage = ({msg}) => {
    return (
        <motion.div 
            className='message'
            variants={modalMsgVariant}
            initial='hide'
            animate='visible'
            exit='exit'
        >
            <p>{msg}</p>
        </motion.div>
    );
};

export default ModalMessage;