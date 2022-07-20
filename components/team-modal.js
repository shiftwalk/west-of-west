import React from 'react';
import Modal from 'react-modal';

const customStyles = {
  content : {
    top                   : '5%',
    left                  : '10%',
    right                 : '10%',
    bottom                : '5%',
    // marginRight           : '-20%',
    overflow              : 'visible',
    // transform             : 'translate(-50%, -50%)',
    // maxHeight             : '50vh',
    maxWidth: 1600,
    margin: 'auto'
  }
};

Modal.setAppElement('#body-wrapper')

export default function TeamModal({ children, title }) {
  const [modalIsOpen,setIsOpen] = React.useState(false);
  function openModal() {
    setIsOpen(true);
  }

  function closeModal(){
    setIsOpen(false);
  }

  return (
    <div className="relative">
      <button className="tracking-tight block text-lg xl:text-xl leading-none xl:leading-[1.15] underline" onClick={openModal}>
        <span className="block relative z-10">{title}</span>
      </button>

      <Modal
        isOpen={modalIsOpen}
        onRequestClose={closeModal}
        style={customStyles}
        contentLabel="Example Modal"
      >
        <div className="absolute top-0 right-0 mr-3 mt-2">
          <button className="block relative group z-[100000]" onClick={closeModal}>
            Close
          </button>
        </div>
    
        { children }
      </Modal>
    </div>
  )
}