import React from 'react';
import './ModalMessage.css'
import {motion} from 'framer-motion'
import {modalMsgVariant} from '../animations/variants'
import { useSelector } from "react-redux";

const ModalMessage = () => {
    const {msg} = useSelector(state => state.modalMsg);

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