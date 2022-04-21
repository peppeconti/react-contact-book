import React from 'react';
import styles from './ContactImg.module.scss';

const ContactImg = ({ contact }) => {

    return (
        <div className={styles['sub-container']}>
            <img className={styles.image} src={contact.photoURL} alt='contact'/>
        </div>
    )
}

export default ContactImg;