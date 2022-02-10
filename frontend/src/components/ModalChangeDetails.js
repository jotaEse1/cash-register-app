import React from 'react';
import DetailsRow from './DetailsRow';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome'
import {faCheck, faXmark} from '@fortawesome/free-solid-svg-icons'
import './ModalChangeDetails.css'
import {motion} from 'framer-motion'
import {modalBackgroundVariant, modalChangeVariant} from '../animations/variants'

const ModalChangeDetails = ({changeDetails, setModalChange, setForceRender, setMsg, setModalMessage}) => {
    const {success, data, moneyCopy = ''} = changeDetails;

    const handleUpdate = async (updatedMoney) => {
        const url = 'https://ChashRegister.joaquinsanchez9.repl.co/api/v1/transactions',
            options = {
                method: 'PUT',
                headers: {
                    'Accept': 'application/json',
                    'Content-type': 'application/json'
                },
                body: JSON.stringify(updatedMoney)
            }
        
        await fetch(url, options)
            .catch(err => console.log(err))

        setMsg('Well done!')
        setModalChange(false)
        setModalMessage(true)
        setTimeout(() => setModalMessage(false), 2000)
        setForceRender(prev => prev + 1)
    }

    return (
        <motion.div 
            className='change-details_container'
            variants={modalBackgroundVariant}
            initial='hide'
            animate='visible'
            exit='exit'
        >
            <motion.div 
                className='change-details'
                variants={modalChangeVariant}
            >
                {success? (
                    <>
                        <table>
                            <thead>
                                <tr>
                                    <th>Currency</th>
                                    <th>Amount</th>
                                </tr>
                            </thead>
                            <tbody>
                                {data.map((obj,index) => <DetailsRow key={index} data={obj} />)}
                            </tbody>
                            <tfoot>
                                <tr>
                                    <td>Total</td>
                                    <td>$ {data.reduce((acumulator, current) => Number((acumulator + current.amount).toFixed(2)), 0)}</td>
                                </tr>
                            </tfoot>
                        </table>
                        <div>
                            <button
                                type='button'
                                onClick={() => setModalChange(false)}
                            >
                                <FontAwesomeIcon icon={faXmark} />
                            </button>
                            <button
                                type='button'
                                onClick={() => handleUpdate(moneyCopy)}
                            >
                                <FontAwesomeIcon icon={faCheck} />
                            </button>
                        </div>
                    </>
                    
                ):(
                    <>
                        <p>{data}</p>
                        <button
                            type='button'
                            onClick={() => setModalChange(false)}
                        >
                            <FontAwesomeIcon icon={faXmark} />
                        </button>
                    </>
                )}
            </motion.div>
        </motion.div>
    );
};

export default ModalChangeDetails;