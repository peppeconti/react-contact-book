import React from 'react';
import styles from './ContactInfo.module.scss';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

const ContactInfo = ({ contact }) => {
    return (
        <div className={styles['sub-container']}>
            <div>
                <div className={styles.wrapper}>
                    <FontAwesomeIcon className={styles.icon} icon="fa-address-book" />
                    <p className={styles['contact-info']}>{contact.firstName} {contact.lastName ? contact.lastName : ''}</p>
                </div>
                <hr />
                <div className={styles.wrapper}>
                    <FontAwesomeIcon className={styles.icon} icon="fa-phone-alt" />
                    <p className={styles['contact-info']}>{contact.phoneNumber}</p>
                </div>
                <hr />
                <div className={styles.wrapper}>
                    <FontAwesomeIcon className={styles.icon} icon="fa-phone-alt" />
                    <p className={styles['contact-info']}>{contact.email}</p>
                </div>
                <hr />
                <div className={styles.wrapper}>
                    <FontAwesomeIcon className={styles.icon} icon="fa-house" />
                    <p className={styles['contact-info']}>{contact.address}</p>
                </div>
            </div>
        </div>
    )
}
export default ContactInfo;