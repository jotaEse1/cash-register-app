import React from 'react';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome'
import {faSquarePlus, faSquareMinus} from '@fortawesome/free-solid-svg-icons'
import {motion} from 'framer-motion'
import {appearVariant, buttonVariant} from '../animations/variants'

const TableRow = ({money, setModalUpdateMoney, setRowInformation}) => {
    const {currency, amount} = money;

    return (
        <>
            <motion.tr
                variants={appearVariant}
            >
                <td>{currency}</td>
                <td>$ {Number((amount).toFixed(2))}</td>
                <td>
                    <motion.button
                        onClick={() => {setModalUpdateMoney(prev => !prev); setRowInformation({currency, amount, op: 'Add'})}}
                        variants={buttonVariant}
                        whileHover='hover'
                        whileTap='click'
                    >
                        <FontAwesomeIcon icon={faSquarePlus} />
                    </motion.button>
                    <motion.button
                        onClick={() => {setModalUpdateMoney(prev => !prev); setRowInformation({currency, amount, op: 'Retire'})}}
                        variants={buttonVariant}
                        whileHover='hover'
                        whileTap='click'
                    >
                        <FontAwesomeIcon icon={faSquareMinus} />
                    </motion.button>
                </td>
            </motion.tr>
        </>
    );
};

export default TableRow;