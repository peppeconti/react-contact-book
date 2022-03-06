import React from 'react';
import styles from './ContactImg.module.scss';

const ContactImg = ({ contact }) => {

    return (
        <div className={styles['sub-container']}>
            <img className={styles.image} src={contact.photoURL} alt='contact'/>
            <div className={styles.name}>
                <p className={styles.label}>Name</p>
                <p className={styles.fullName}>{contact.firstName} {contact.lastName ? contact.lastName : ''}</p>
            </div>
        </div>
    )
}

export default ContactImg;