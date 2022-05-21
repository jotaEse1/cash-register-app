import { useEffect, useState } from 'react';
import Table from './components/Table';
import Chart from './components/Chart';
import Transaction from './components/Transaction';
import ModalChangeDetails from './components/ModalChangeDetails';
import ModalMessage from './components/ModalMessage';
import ModalPlusMinus from './components/ModalPlusMinus';
import ThemeButton from './components/ThemeButton';
import {AnimatePresence} from 'framer-motion'
import './App.css';
import {URLS} from './constants/constants'
import {useSelector, useDispatch} from 'react-redux'
import {openModalMsg, closeModalMsg} from './features/ModalMessage/modalMessageReducer'
import {setMoney} from './features/App/appReducer'

function App() {
  const {id, forceRender} = useSelector(state => state.app)
  const {isModalMsg} = useSelector(state => state.modalMsg);
  const {isChangeDetails} = useSelector(state => state.changeDetails);
  const {isModalUpdate} = useSelector(state => state.plusMinus);
  const {theme} = useSelector(state => state.themeButton)
  const dispatch = useDispatch()

  //fetch data to render the money list when the component did mount
  useEffect(() => {
    const url = URLS.transactions
    
    fetch(`${url}?id=${id}`)
      .then(res => res.json())
      .then(res => {
        const {data} = res;

        dispatch(setMoney(data))
      })
      .catch(err => {
        dispatch(openModalMsg("An error ocurred. Try again"))
        setTimeout(() => dispatch(closeModalMsg()), 3500);
      })
  }, [])

  //to update the chart and the table when add/subtract money or a transaction ocurred
  useEffect(() => {
    if(forceRender === 1) return;
    /*why 1? Becasuse forceRender starts at 1 and when any of the above actions take place, 
    forceRender it's set to prev + 1 to ensure that its value will change, and as the state changed, so the table
    and the chart */

    const url = URLS.transactions

    fetch(`${url}?id=${id}`)
      .then(res => res.json())
      .then(res => {
        const {data} = res;

        dispatch(setMoney(data))
      })
      .catch(err => {
        dispatch(openModalMsg("An error ocurred. Try again"))
        setTimeout(() => dispatch(closeModalMsg()), 3500);
      })

  },[forceRender])

  return (
    <div className='app' theme={theme}>
      <h1>Cash register App!</h1>
      <ThemeButton />
      <div className='main_container'>
        <div className='main_left-side'>
          <Transaction />
          <Chart />
        </div>
        <Table /> 
      </div>
      <AnimatePresence>
        {isChangeDetails && <ModalChangeDetails />}
      </AnimatePresence>
      <AnimatePresence>
        {isModalMsg && <ModalMessage />}
      </AnimatePresence>
      <AnimatePresence>
        {isModalUpdate && <ModalPlusMinus />}
      </AnimatePresence>
    </div>
  );
}

export default App;
