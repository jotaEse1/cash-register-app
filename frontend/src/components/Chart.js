import React, { useEffect, useRef } from 'react';
import {motion} from 'framer-motion'
import {appearVariant} from '../animations/variants'
import { d3Chart } from '../utils/chartGenerator';
import {useSelector} from 'react-redux'

const Chart = () => {
    const svgRef = useRef()
    const {money} = useSelector(state => state.app)

    useEffect(() => {
        if(!money.length) return;

        d3Chart(money, svgRef)
    }, [money])


    return (
        <motion.div 
            className='chart_container' 
            id='svg-container'
            variants={appearVariant}
            initial='hide'
            animate='visible'
        >
            <svg ref={svgRef} height='100%' width='100%'/>
        </motion.div>
    );
};

export default Chart;