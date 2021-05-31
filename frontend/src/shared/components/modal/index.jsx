import React, { useState } from 'react';
import './Modal.scss';
import ReactModal from 'react-modal';

const Modal = ({
  modalContent,
  openBtnClass,
  openBtnText,
  modalClass,
  modalOverlayClass,
  isModalOpen,
  btnOpenEvent
}) => {
  // const [openModal, setOpenModal] = useState(false);

  // const toggleModal = (e) => setOpenModal(e);

  return (
    <>
      <button className={openBtnClass} onClick={btnOpenEvent}>
        {openBtnText}
      </button>

      <ReactModal
        isOpen={isModalOpen || false}
        // onRequestClose={(e) => toggleModal(false)}
        className={modalClass}
        overlayClassName={modalOverlayClass}
        shouldCloseOnOverlayClick={true}
        ariaHideApp={false}
      >
        {modalContent}
      </ReactModal>
    </>
  );
};

export default Modal;