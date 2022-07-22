import { AnimatePresence, LazyMotion, m, domAnimation } from 'framer-motion';
import React from 'react';
import Modal from 'react-modal';

const customStyles = {
  content : {
    top                   : '10%',
    left                  : '10%',
    right                 : '10%',
    bottom                : '10%',
    // marginRight           : '-20%',
    overflow              : 'visible',
    // transform             : 'translate(-50%, -50%)',
    // maxHeight             : '50vh',
    maxWidth: 1200,
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
      <button className="tracking-tight block text-lg xl:text-xl leading-none xl:leading-[1.15] text-left relative overflow-hidden group border-none outline-none focus:border-none focus:outline-none" onClick={openModal}>
        <span className="block relative z-10">{title}</span>

        <span className="w-full group-hover:w-0 group-focus:w-0 transition-all ease-in-out duration-300 h-[1px] bg-black absolute bottom-0 left-0 right-0"></span>
      </button>

      <Modal
        isOpen={modalIsOpen}
        onRequestClose={closeModal}
        style={customStyles}
        contentLabel="Example Modal"
      >
        <LazyMotion features={domAnimation}>
          <AnimatePresence>
            { modalIsOpen && (
              <m.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}    
              >
                <div className="absolute top-0 right-0 mr-3 mt-2">
                  <button className="block relative group z-[100000]" onClick={closeModal}>
                    Close
                  </button>
                </div>
            
                { children }
              </m.div>
            )}
          </AnimatePresence>
        </LazyMotion>
      </Modal>
    </div>
  )
}