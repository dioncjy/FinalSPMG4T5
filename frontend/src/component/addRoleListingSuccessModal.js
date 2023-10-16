// Modal.js
import React from 'react';
import { useNavigate } from 'react-router-dom';
import Modal from 'react-modal';
import { Button } from "@material-tailwind/react";

Modal.setAppElement('#root'); // Set the root element for accessibility

function roleListingSuccessModal({ isOpen, onClose }) {
  const navigate = useNavigate();

  const returnHome = () => {
      navigate(`/roles`);
  }
  return (
    <Modal
      isOpen={isOpen}
      onRequestClose={onClose}
      contentLabel="Application Result Modal"
    >
      <div className="flex flex-col items-center justify-center">
            <img src="checkmark.png" alt="checkmark" className="py-8"/>
            <div className="flex-grow">
                <h2>All changes are saved!</h2>
            </div>
            <div className="flex-grow py-8">
                <p>Role Listing successfully added</p>
            </div>
            <div className="flex-grow pt-8">
                <Button className="bg-violet-600" onClick={() => {
                  onClose()
                  returnHome()
                }}>
                  Close
                </Button>
            </div>
        </div>
    </Modal>
  );
}

export default roleListingSuccessModal;
