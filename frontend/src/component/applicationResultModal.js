// Modal.js
import React from 'react';
import Modal from 'react-modal';
import { Button } from "@material-tailwind/react";

Modal.setAppElement('#root'); // Set the root element for accessibility

function ResultModal({ isOpen, onClose }) {
  return (
    <Modal
      isOpen={isOpen}
      onRequestClose={onClose}
      contentLabel="Example Modal"
    >
      <div className="flex flex-col items-center justify-centre h-screen">
            <div className="flex-grow">
                <h2>Your Application has been submitted!</h2>
            </div>
            <div className="flex-grow">
                <p>The hiring team will review your application.</p>
            </div>
            <div className="flex-grow">
                <Button className="bg-violet-600" onClick={onClose}>Close</Button>
            </div>
        </div>
    </Modal>
  );
}

export default ResultModal;
