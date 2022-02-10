import React from 'react';
import TableRow from './TableRow';
import {motion} from 'framer-motion'
import {appearVariant} from '../animations/variants'

const Table = ({money, setModalUpdateMoney, setRowInformation}) => {
    return (
        <div className='table_container'>
            <motion.table
                variants={appearVariant}
                initial='hide'
                animate='visible'
            >
                <thead>
                    <tr>
                        <th>Currency</th>
                        <th>Amount</th>
                        <th>Options</th>
                    </tr>
                </thead>
                <tbody>
                    {money.map(money => 
                        <TableRow 
                            key={money['_id']} 
                            money={money} 
                            setModalUpdateMoney={setModalUpdateMoney}
                            setRowInformation={setRowInformation}
                        />
                    )}
                </tbody>
                <tfoot>
                    <tr>
                        <td>Total</td>
                        <td colSpan='2'>$ {money.reduce((acumulator, current) => Number((acumulator + current.amount).toFixed(2)), 0)}</td>
                    </tr>
                </tfoot>
            </motion.table>
        </div>
    );
};

export default Table;