import React from 'react';
import TableRow from './TableRow';
import {motion} from 'framer-motion'
import {appearVariant} from '../animations/variants'
import {useSelector} from 'react-redux'

const Table = () => {
    const {money} = useSelector(state => state.app)
    
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
                    {money.length? (
                        money.map(obj => 
                            <TableRow 
                                key={obj['_id']} 
                                row={obj} 
                            />
                        )
                    ):(
                        <tr>
                            <td colSpan={3}>Loading....</td>
                        </tr>
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