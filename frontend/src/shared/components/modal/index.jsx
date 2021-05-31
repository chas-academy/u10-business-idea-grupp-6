import React, { useState } from 'react';
import './Modal.scss';
import ReactModal from 'react-modal';

const Modal = ({
  modalContent,
  openBtnClass,
  closeBtnClass,
  openBtnText,
  closeBtnText,
  modalClass,
  modalOverlayClass,
}) => {
  const [openModal, setOpenModal] = useState(false);

  const toggleModal = (e) => setOpenModal(e);

  return (
    <>
      <button id="btn" className={openBtnClass} onClick={(e) => toggleModal(true)}>
        {openBtnText}
      </button>

      <ReactModal
        isOpen={openModal}
        onRequestClose={(e) => toggleModal(false)}
        className={modalClass}
        overlayClassName={modalOverlayClass}
        shouldCloseOnOverlayClick={true}
        ariaHideApp={false}
        parentSelector={() => document.querySelector('#btn')}
      >
        {modalContent}
      </ReactModal>
    </>
  );
};

export default Modal;
