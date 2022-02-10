import React from 'react';

const DetailsRow = ({data}) => {
    const {currency, amount} = data;
    return (
        <>
            <tr>
                <td>{currency}</td>
                <td>$ {Number((amount).toFixed(2))}</td>
            </tr>
        </>
    );
};

export default DetailsRow;