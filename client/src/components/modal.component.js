import React from "react";
import Modal from 'react-bootstrap/Modal'

function Modal1({ handleClose, show, children }) {
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

const Popup = ({ show, handleClose, title, body, footer }) => {
  return (
    <Modal size='lg' show={show} onHide={handleClose} animation={false}>
      <Modal.Header closeButton>
        <Modal.Title>
          {title}
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        {body}
      </Modal.Body>
      <Modal.Footer>
        {footer}
      </Modal.Footer>
    </Modal>
  )
}

export default Popup;
