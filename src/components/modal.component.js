import React from "react";

function Modal({ handleClose, show, children }) {
  const showHideClassName = show ? "modal d-block" : "modal d-none";

  return (
    <div className={showHideClassName}>
      <div className="modal-container">
        <button className="modal-close" onClick={handleClose}>
          close
        </button>
        {children}
      </div>
    </div>
  );
};

export default Modal;
