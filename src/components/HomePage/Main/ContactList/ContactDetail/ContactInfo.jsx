import React from 'react';
import styles from './ContactInfo.module.scss';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

const ContactInfo = ({ contact }) => {
    return (
        <div className={styles['sub-container']}>
            <div>
                <div className={styles['contact-info']}>
                    <FontAwesomeIcon icon='fa-address-book' />
                    <p className={styles.fullName}>{contact.firstName} {contact.lastName ? contact.lastName : ''}</p>
                </div>
                <div className={styles['contact-info']}>
                    <FontAwesomeIcon icon='phone-alt' />
                    <p className={styles.fullName}>{contact.phoneNumber}</p>
                </div>
                <div className={styles['contact-info']}>
                    <FontAwesomeIcon icon='fa-at' />
                    <p className={styles.fullName}>{contact.email}</p>
                </div>
                <div className={styles['contact-info']}>
                    <FontAwesomeIcon icon='fa-house' />
                    <p className={styles.fullName}>{contact.address}</p>
                </div>
            </div>
        </div>
    )
}
export default ContactInfo;