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
  closeEvent,
  btnOpenEvent
}) => {

  return (
    <>
      <button
        type="button"
        className={openBtnClass}
        onClick={btnOpenEvent}>
        {openBtnText}
      </button>

      <ReactModal
        isOpen={isModalOpen || false}
        onRequestClose={closeEvent}
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