import React, { useState } from "react";
import { updateAmount } from "../utils/UpdateAmount";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCheck, faXmark } from "@fortawesome/free-solid-svg-icons";
import "./ModalPlusMinus.css";
import { motion } from "framer-motion";
import { modalBackgroundVariant, modalVariant } from "../animations/variants";
import { URLS } from "../constants/constants";
import { useDispatch, useSelector } from "react-redux";
import {
  closeModalMsg,
  openModalMsg,
} from "../features/ModalMessage/modalMessageReducer";
import { closeModalUpdate } from "../features/ModalPlusMinus/modalPlusMinusReducer";
import { setForceRender } from "../features/App/appReducer";

const initialState = {
  editAmount: "Amount",
};

const ModalPlusMinus = () => {
  const {id} = useSelector(state => state.app)
  const [form, setForm] = useState(initialState);
  const { currency, amount, op } = useSelector(state => state.rowInformation);
  const {money} = useSelector(state => state.app)
  const dispatch = useDispatch();

  const handleForm = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    dispatch(closeModalUpdate())

    const { editAmount } = form,
      decimals = [...editAmount].slice([...editAmount].indexOf("."));

    if (!Number(editAmount)) {
      dispatch(openModalMsg("That's not money!"));
      return setTimeout(() => dispatch(closeModalMsg()), 3500);
    }
    if (decimals.length > 3) {
      dispatch(openModalMsg("Too much decimals!"));
      return setTimeout(() => dispatch(closeModalMsg()), 3500);
    }

    if (op === "Retire") {
      if (editAmount > amount) {
        dispatch(openModalMsg("Exceeds initial amount"));
        return setTimeout(() => dispatch(closeModalMsg()), 3500);
      }

      //subtract
      const result = updateAmount(op, editAmount, currency, money),
        url = URLS.transactions,
        options = {
          method: "PUT",
          headers: {
            Accept: "application/json",
            "Content-type": "application/json",
          },
          body: JSON.stringify(result),
        };

      //update money in dataBase
      fetch(`${url}?id=${id}`, options)
        .then((res) => res.json())
        .then((res) => {
          const { success } = res;

          if (!success) {
            dispatch(openModalMsg("An error ocurred. Try again."));
            return setTimeout(() => dispatch(closeModalMsg()), 3500);
          }

          dispatch(openModalMsg("Well done!"));
          setTimeout(() => dispatch(closeModalMsg()), 3500);
          return dispatch(setForceRender());
        })
        .catch(() => {
          dispatch(openModalMsg("An error ocurred. Try again."));
          return setTimeout(() => dispatch(closeModalMsg()), 3500);
        });
    }

    //add
    const result = updateAmount(op, editAmount, currency, money),
      url = URLS.transactions,
      options = {
        method: "PUT",
        headers: {
          Accept: "application/json",
          "Content-type": "application/json",
        },
        body: JSON.stringify(result),
      };

    //update money in dataBase
    fetch(`${url}?id=${id}`, options)
      .then((res) => res.json())
      .then((res) => {
        const { success } = res;

        if (!success) {
          dispatch(openModalMsg("An error ocurred. Try again."));
          return setTimeout(() => dispatch(closeModalMsg()), 3500);
        }

        dispatch(openModalMsg("Well done!"));
        setTimeout(() => dispatch(closeModalMsg()), 3500);
        return dispatch(setForceRender());
      })
      .catch(() => {
        dispatch(openModalMsg("An error ocurred. Try again."));
        return setTimeout(() => dispatch(closeModalMsg()), 3500);
      });
  };

  return (
    <motion.div
      className="plus-minus_container"
      variants={modalBackgroundVariant}
      initial="hide"
      animate="visible"
      exit="exit"
    >
      <motion.div className="plus-minus" variants={modalVariant}>
        <h4>{op} money!</h4>
        <form onSubmit={handleSubmit}>
          <input
            type="number"
            name="editAmount"
            step=".01"
            min="0"
            value={form.editAmount}
            placeholder={currency}
            onChange={handleForm}
          />
          <div>
            <button
              type="button"
              onClick={() => dispatch(closeModalUpdate())}
            >
              <FontAwesomeIcon icon={faXmark} />
            </button>
            <button type="submit">
              <FontAwesomeIcon icon={faCheck} />
            </button>
          </div>
        </form>
      </motion.div>
    </motion.div>
  );
};

export default ModalPlusMinus;
