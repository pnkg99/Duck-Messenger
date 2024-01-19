import { useState, useEffect } from 'react';
import Modal from 'react-modal';
import { downloadFile } from '../../lib/downloadFile';
import styles from '../../css/login.module.css'
function RegisterModal({ registerResponse, isOpen, setIsOpen, accountName }) {
    const [ShowAll, setShowAll] = useState(false)
    const coppyPKey = () => {
        navigator.clipboard.writeText(registerResponse.private_key)
    }
    const customStyles = {
        content: {
            top: '50%',
            left: '50%',
            right: 'auto',
            bottom: 'auto',
            marginRight: '-50%',
            transform: 'translate(-50%, -50%)',
            background: 'transparent',
            border:'none',
        },
        overlay: {
            position: 'fixed',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            backgroundColor: 'rgba(0, 0, 0, 0.75)'
        },
    };
    const afterOpenModal = () => {
        console.log('open')
    }
    const closeModal = () => {
        setIsOpen(false)
    }
    useEffect(() => {
        if (!registerResponse ||!accountName) return;
        downloadFile(registerResponse.private_key, accountName)
    }, [registerResponse])
    return (
        <Modal
            isOpen={isOpen}
            onAfterOpen={afterOpenModal}
            onRequestClose={closeModal}
            style={customStyles}
            contentLabel="Register Modal"
        ><section className={styles.registerModalContainer}>
                <p className={styles.registerPkey}>{ShowAll ? registerResponse.private_key : registerResponse.private_key.slice(38, 100) + '...'}
                    <button className={styles.copyBTN} onClick={coppyPKey}><img src="./img/copy.svg" alt="copy" /></button>
                </p>
                <div className={styles.buttonGroupRegister}>
                    <button onClick={() => setShowAll(prev => !prev)}>{ShowAll ? 'ShowLess' : 'ShowAll'}</button>
                    <button onClick={() => setIsOpen(false)}>Close</button>
                </div>
            </section>

        </Modal>)
}

export default RegisterModal