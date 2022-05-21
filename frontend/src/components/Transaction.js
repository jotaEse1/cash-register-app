import React, { useState } from "react";
import { operation } from "../utils/Operation";
import { motion } from "framer-motion";
import { appearVariant, buttonVariant } from "../animations/variants";
import { useDispatch, useSelector } from "react-redux";
import {
  openModalMsg,
  closeModalMsg,
} from "../features/ModalMessage/modalMessageReducer";
import { handleChangeDetails, openModalChangeDetails } from "../features/ModalChangeDetails/modalChangeDetailsReducer";

const initialState = {
  price: "",
  paid: "",
};

const Transaction = () => {
  const [form, setForm] = useState(initialState);
  const {money} = useSelector(state => state.app)
  const dispatch = useDispatch();

  const handleForm = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const { paid, price } = form,
      decimalsPaid = [...paid].slice([...paid].indexOf(".")),
      decimalsPrice = [...price].slice([...price].indexOf("."));

    if (!Number(paid) || !Number(price)) {
      dispatch(openModalMsg("That's not money!"));
      return setTimeout(() => dispatch(closeModalMsg()), 3500);
    }
    if (Number(paid) < Number(price)) {
      dispatch(openModalMsg("No need for change!"));
      return setTimeout(() => dispatch(closeModalMsg()), 3500);
    }
    if (decimalsPaid.length > 3 || decimalsPrice.length > 3) {
      dispatch(openModalMsg("Too much decimals!"));
      return setTimeout(() => dispatch(closeModalMsg()), 3500);
    }

    const result = operation(form, money);

    if (result.success) {
      dispatch(openModalChangeDetails())
      dispatch(handleChangeDetails({
        success: true,
        data: result.changeDetails,
        moneyCopy: result.moneyCopy
      }))

    }
    if (!result.success) {
      dispatch(openModalChangeDetails())
      dispatch(handleChangeDetails({
        success: false,
        msg: result.msg
      }))
    }

    setForm(initialState);
  };

  return (
    <motion.div
      className="transaction"
      variants={appearVariant}
      initial="hide"
      animate="visible"
    >
      <form onSubmit={handleSubmit}>
        <input
          type="number"
          name="price"
          step=".01"
          min="0"
          value={form.price}
          placeholder="Price"
          onChange={handleForm}
        />
        <input
          type="number"
          name="paid"
          step=".01"
          min="0"
          value={form.paid}
          placeholder="Amount paid"
          onChange={handleForm}
        />
        <motion.button
          type="submit"
          variants={buttonVariant}
          whileTap="click"
          whileHover="hover"
        >
          Change!
        </motion.button>
      </form>
    </motion.div>
  );
};

export default Transaction;
