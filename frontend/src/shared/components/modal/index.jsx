import React, { useState } from 'react';
import './Modal.scss';
import ReactModal from 'react-modal';

const Modal = ({ modalContent, openModalBtnClass, closeModalBtnClass }) => {
  const [openModal, setOpenModal] = useState(false);

  const toggleModal = (e) => setOpenModal(e);

  return (
    <>
      <button
        className={openModalBtnClass}
        onClick={(e) => toggleModal(true)}
      >
        Open Modal
      </button>

      <ReactModal
        isOpen={openModal}
        onRequestClose={(e) => toggleModal(false)}
        className='modal'
        overlayClassName='modal-overlay'
        shouldCloseOnOverlayClick={true}
        ariaHideApp={false}
      >
        {modalContent}
        <button
          className={closeModalBtnClass}
          onClick={(e) => toggleModal(false)}
        >
          Close Modal
        </button>
      </ReactModal>
    </>
  );
};

export default Modal;
