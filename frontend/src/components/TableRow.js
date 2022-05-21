import React from 'react';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome'
import {faSquarePlus, faSquareMinus} from '@fortawesome/free-solid-svg-icons'
import {motion} from 'framer-motion'
import {appearVariant, buttonVariant} from '../animations/variants'
import { useDispatch } from "react-redux";
import { setRowInfo } from "../features/TableRow/tableRowReducer";
import { openModalUpdate } from '../features/ModalPlusMinus/modalPlusMinusReducer';

const TableRow = ({row}) => {
    const dispatch = useDispatch()

    const {currency, amount} = row;

    return (
        <>
            <motion.tr
                variants={appearVariant}
            >
                <td>{currency}</td>
                <td>$ {Number((amount).toFixed(2))}</td>
                <td>
                    <motion.button
                        onClick={() => {
                            dispatch(openModalUpdate())
                            dispatch(setRowInfo({currency, amount, op: 'Add'}))
                        }}
                        variants={buttonVariant}
                        whileHover='hover'
                        whileTap='click'
                    >
                        <FontAwesomeIcon icon={faSquarePlus} />
                    </motion.button>
                    <motion.button
                        onClick={() => {
                            dispatch(openModalUpdate())
                            dispatch(setRowInfo({currency, amount, op: 'Retire'}))
                        }}
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