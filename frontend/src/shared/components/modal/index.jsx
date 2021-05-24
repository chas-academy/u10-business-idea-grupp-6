import React, { useState } from "react";
import "./Modal.scss";
import ReactModal from "react-modal";

const Modal = ({modalContent}) => {
  const [openModal, setOpenModal] = useState(false);

  const toggleModal = (e) => {
    setOpenModal(e);
  };

  return (
    <>
      <button onClick={(e) => toggleModal(true)}>
        Open Modal
      </button>
      <ReactModal
        isOpen={openModal}
        onRequestClose={(e) => toggleModal(false)}
        /* Function that will be run when the modal is requested
     to be closed (either by clicking on overlay or pressing ESC).
     Note: It is not called if isOpen is changed by other means. */
        className="modal"
        overlayClassName="modal-overlay"
        shouldCloseOnOverlayClick={true}
        ariaHideApp={false}
      >
        {modalContent}
        <button
          onClick={(e) => toggleModal(false)}
        >
          Close Modal
        </button>
      </ReactModal>
    </>
  );
};

export default Modal;