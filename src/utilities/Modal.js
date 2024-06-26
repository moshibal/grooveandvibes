import React from "react";
import Modal from "react-modal";

const customStyles = {
  content: {
    width: "300px", // Set your desired width
    height: "250px", // Set your desired height
    margin: "auto", // Center the modal horizontally
    padding: "16px",
    color: "orangered",
  },
};
const ModalComponent = ({ isOpen, onRequestClose }) => {
  return (
    <Modal isOpen={isOpen} onRequestClose={onRequestClose} style={customStyles}>
      <h2>Error</h2>
      <p>
        Unavailable to book on this day for the first class, Please choose some
        other days for booking, thank you😊.
      </p>
      <button
        onClick={onRequestClose}
        style={{ padding: "3px", width: "6rem" }}
      >
        Close
      </button>
    </Modal>
  );
};

export default ModalComponent;
