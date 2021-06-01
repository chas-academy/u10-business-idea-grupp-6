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
      <button className={openBtnClass} onClick={(e) => toggleModal(true)} aria-label="button">
        {openBtnText}
      </button>

      <ReactModal
        isOpen={openModal}
        onRequestClose={(e) => toggleModal(false)}
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
