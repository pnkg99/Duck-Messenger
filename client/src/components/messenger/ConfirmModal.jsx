import PropTypes from 'prop-types';
import Modal from 'react-modal';
import styles from '../../css/confirmModal.module.css'
function ConfirmModal({ typeOfUserReq, isOpen, setIsOpen }) {

    const customStyles = {
        content: {
            top: '50%',
            left: '50%',
            right: 'auto',
            bottom: 'auto',
            marginRight: '-50%',
            transform: 'translate(-50%, -50%)',
            background: 'transparent',
            border: 'none'
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
    const confirmation = () => {
        typeOfUserReq()
        setIsOpen(false)
    }
    const rejection = () => {
        setIsOpen(false)
    }
    return (
        <Modal
            isOpen={isOpen}
            onAfterOpen={afterOpenModal}
            onRequestClose={closeModal}
            style={customStyles}
            contentLabel="Register Modal"
        ><section className={styles.confirmModalContainer}>
                <h2>Are you sure?</h2>
                <div className={styles.confirmModalBTNGroup}>
                    <button onClick={confirmation}>Yes</button>
                    <button onClick={rejection}>No</button>
                </div>
            </section>

        </Modal>)
}
ConfirmModal.propTypes = {
    typeOfUserReq: PropTypes.func.isRequired,
    isOpen: PropTypes.bool.isRequired,
    setIsOpen: PropTypes.func.isRequired,
};
export default ConfirmModal