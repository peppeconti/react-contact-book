import { Fragment } from 'react';
import ReactDOM from 'react-dom';
import styles from './Modal.module.scss';
import Card from '../UI/Styled-Components/Card';

const Backdrop = ({ closeModal }) => {
    return <div className={styles.backdrop} onClick={closeModal} />;
};

const ModalOverlay = ({ children, closeModal }) => {
    return (
        <div className={styles.modal} onClick={closeModal}>
            <Card dark='#adb867' light='#f1ff94' vertical>
                <div className={styles.content}>
                    {children}
                </div>
            </Card>
        </div>
    );
};

const portalElement = document.getElementById('overlays');

const Modal = ({ children, closeModal }) => {
    return (
        <Fragment>
            {ReactDOM.createPortal(<Backdrop closeModal={closeModal} />, portalElement)}
            {ReactDOM.createPortal(
                <ModalOverlay closeModal={closeModal}>{children}</ModalOverlay>,
                portalElement
            )}
        </Fragment>
    );
};

export default Modal;