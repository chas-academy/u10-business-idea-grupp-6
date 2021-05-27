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
      <button className={openBtnClass} onClick={(e) => toggleModal(true)}>
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
        <button
          className={closeBtnClass}
          onClick={(e) => toggleModal(false)}
        >
          {closeBtnText}
        </button>
      </ReactModal>
    </>
  );
};

export default Modal;
