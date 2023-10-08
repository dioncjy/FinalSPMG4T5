// Modal.js
import React from 'react';
import Modal from 'react-modal';

Modal.setAppElement('#root'); // Set the root element for accessibility

function ResultModal({ isOpen, onClose }) {
  return (
    <Modal
      isOpen={isOpen}
      onRequestClose={onClose}
      contentLabel="Example Modal"
    >
      <h2>Modal Content</h2>
      <p>This is the content of your modal.</p>
      <button onClick={onClose}>Close</button>
    </Modal>
  );
}

export default ResultModal;
