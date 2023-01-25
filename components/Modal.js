import React, { useEffect, useState } from "react";
import styles from "@/styles/Modal.module.css";
import ReactDOM from "react-dom";
import { FaTimes } from "react-icons/fa";

const Modal = ({show, onClose, children, title}) => {
  const [isBrowser, SetIsBrowser] = useState(false);

  useEffect(() => SetIsBrowser(true));

  const handleClose = (e) => {
    e.preventDefault();
    onClose();
  };

  const modalContent = show ? (
    <div className={styles.overlay}>
      <div className={styles.modal}>
        <div className={styles.header}>
          <button onClick={handleClose}>
            <FaTimes></FaTimes>
          </button>
        </div>
        {title && <div>{title}</div>}
        <div className={styles.body}>{children}</div>
      </div>
    </div>
  ) : null;

  if (isBrowser) {
    return ReactDOM.createPortal(
      modalContent,
      document.getElementById("modal-root")
    );
  } else {
    return null;
  }
};

export default Modal;
