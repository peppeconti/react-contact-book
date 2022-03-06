import React from 'react';
import styles from './ContactInfo.module.scss';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

const ContactInfo = ({ contact }) => {
    return (
        <div className={styles['sub-container']}>
            <div>
                <p className={styles['contact-info']}><span className={styles.label}>phone: </span>{contact.phoneNumber}</p>
                <p className={styles['contact-info']}><span className={styles.label}>email: </span>{contact.email}</p>
                <p className={styles['contact-info']}><span className={styles.label}>address: </span>{contact.address}</p>
            </div>
        </div>
    )
}
export default ContactInfo;