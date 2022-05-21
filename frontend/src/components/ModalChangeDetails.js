import React from "react";
import DetailsRow from "./DetailsRow";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCheck, faXmark } from "@fortawesome/free-solid-svg-icons";
import "./ModalChangeDetails.css";
import { motion } from "framer-motion";
import {
  modalBackgroundVariant,
  modalChangeVariant,
} from "../animations/variants";
import { URLS } from "../constants/constants";
import { closeModalMsg, openModalMsg } from "../features/ModalMessage/modalMessageReducer";
import { useDispatch, useSelector } from "react-redux";
import { closeModalChangeDetails } from "../features/ModalChangeDetails/modalChangeDetailsReducer";
import { setForceRender } from "../features/App/appReducer";

const ModalChangeDetails = () => {
  const {id} = useSelector(state => state.app)
  const {success, data, moneyCopy, msg} = useSelector(state => state.changeDetails)
  const dispatch = useDispatch()

  const handleUpdate = (updatedMoney) => {
    const url = URLS.transactions,
      options = {
        method: "PUT",
        headers: {
          Accept: "application/json",
          "Content-type": "application/json",
        },
        body: JSON.stringify(updatedMoney),
      };
      
    dispatch(closeModalChangeDetails());
    fetch(`${url}?id=${id}`, options)
      .then((res) => res.json())
      .then((res) => {
        dispatch(openModalMsg("Well done!"))
        setTimeout(() => dispatch(closeModalMsg()), 2000);
        dispatch(setForceRender());
      })
      .catch(() => {});

  };

  return (
    <motion.div
      className="change-details_container"
      variants={modalBackgroundVariant}
      initial="hide"
      animate="visible"
      exit="exit"
    >
      <motion.div className="change-details" variants={modalChangeVariant}>
        {success ? (
          <>
            <table>
              <thead>
                <tr>
                  <th>Currency</th>
                  <th>Amount</th>
                </tr>
              </thead>
              <tbody>
                {data.map((obj, index) => (
                  <DetailsRow key={index} data={obj} />
                ))}
              </tbody>
              <tfoot>
                <tr>
                  <td>Total</td>
                  <td>
                    ${" "}
                    {data.reduce(
                      (acumulator, current) =>
                        Number((acumulator + current.amount).toFixed(2)),
                      0
                    )}
                  </td>
                </tr>
              </tfoot>
            </table>
            <div>
              <button type="button" onClick={() => dispatch(closeModalChangeDetails())}>
                <FontAwesomeIcon icon={faXmark} />
              </button>
              <button type="button" onClick={() => handleUpdate(moneyCopy)}>
                <FontAwesomeIcon icon={faCheck} />
              </button>
            </div>
          </>
        ) : (
          <>
            <p>{msg}</p>
            <button type="button" onClick={() => dispatch(closeModalChangeDetails())}>
              <FontAwesomeIcon icon={faXmark} />
            </button>
          </>
        )}
      </motion.div>
    </motion.div>
  );
};

export default ModalChangeDetails;
