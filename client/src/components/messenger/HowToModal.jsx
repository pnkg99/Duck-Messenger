import React, { useState } from "react";
import styles from "../../css/modal.module.css"; // Import your CSS styles for the modal

const HowToModal = () => {
  const [step, setStep] = useState(1); // Initialize the step state
  const [isModalOpen, setIsModalOpen] = useState(false);

  const openModal = () => {
    setStep(1); // Reset to the first step when opening the modal
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  const handleNext = () => {
    if (step < totalSteps) {
      setStep(step + 1);
    } else if (step == totalSteps) {
      setStep(1);
    }
  };

  const handlePrevious = () => {
    if (step > 1) {
      setStep(step - 1);
    }
  };

  const totalSteps = 3; // Define the total number of steps

  return (
    <div>
      <a href="#" onClick={openModal}>
        How duck works?
      </a>

      {isModalOpen && (
        <div className={styles.modalOverlay}>
          <div className={styles.modalContent}>
            <span className={styles.closeButton} onClick={closeModal}>
              &times;
            </span>
            <h2>Step {step}</h2>
            {/* Content for each step */}
            {step === 1 && (
              <div>
                <h2>Registration & Login</h2>
                <p>
                  To register on Duck is possesion of blockchain account on
                  inery testnet. Registration and Login require 3 parameters!
                </p>
                <ul>
                  <li>
                    <b>account name</b>
                  </li>
                  <li>
                    <b>inery testnet node https url</b>
                    <p>https:://tas.blockchain-servers.world</p>
                  </li>
                  <li>
                    <b>private key of blockchain account</b>
                  </li>
                </ul>
                <p>
                  When you enter account credentials for the first time, Duck
                  will create Asymetric RSA keypair. You will be returned by
                  private RSA key.
                </p>
              </div>
            )}
            {step === 2 && (
              <div>
                <h2>Import private RSA key</h2>
                <p>
                  RSA keypair is used for exchanging symetric(AES) key between
                  contacts.
                </p>
                <p>
                  each Contact pair has unique AES generated when sending
                  contact request.
                </p>
                <p>
                  You will have to import private RSA when using application to
                  manage requests and decrypting messages
                </p>
              </div>
            )}
            {step === 3 && (
              <div>
                <h2>Add Contact & Message Securely</h2>
                <p>
                  When you successfully imported RSA private key you can add
                  contact by searching contact name and manage requests.
                </p>
                <p>After successfully added contact you can duck chat</p>
                <p>
                  As long as you dont compromise your private RSA this
                  application gives you appsolutely security and ownership of
                  your messages
                </p>
              </div>
            )}

            <div className={styles.navigationButtons}>
              {
                <button onClick={handleNext} className={styles.nextButton}>
                  ➡️
                </button>
              }
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default HowToModal;
