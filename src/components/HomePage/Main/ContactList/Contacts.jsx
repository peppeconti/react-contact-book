import React, { useContext } from 'react';
import styles from './Contacts.module.scss';
import { Link } from 'react-router-dom';
// FIREBASE
import { auth, db } from '../../../../firebase/firebase';
import { ref, remove } from "firebase/database";
// CONTEXT
import AppContext from '../../../../store/app-context';
// COMPONENT
import ContactList from './ContactList';

const Contacts = () => {

    const removeItem = (id) => {
        remove(ref(db, `${auth.currentUser.uid}/contacts/${id}`)
        )
            .then(() => {
                console.log('item n. ' + id + 'successfully removed')
            })
            .catch((error) => {
                console.log('item not to been removed: ' + error)
            });
    }

    const appCtx = useContext(AppContext);

    let friendsMessage;

    if (appCtx.contacts.length === 0) {
        friendsMessage = `You don't have any contact yet...`;
    }
    if (appCtx.contacts.length === 1) {
        friendsMessage = `You have 1 friend`;
    }
    if (appCtx.contacts.length > 1) {
        friendsMessage = `You have ${appCtx.contacts.length} friends`;
    }


    return (
        <div className={styles.contactsContainer}>
            <h2 className={styles.contactNumber}>{friendsMessage}</h2>
            <div className={appCtx.contacts.length === 0 ? styles.centerContent : styles.inherit}>
                {appCtx.contacts.length > 0 && <ContactList items={appCtx.contacts} removeItem={removeItem} />}
                {appCtx.contacts.length === 0 && <Link to='add-contact' >
                    <button type='button' className={styles.startAdding}>Start adding contacts</button>
                </Link>}
            </div>
        </div>

    )
}
export default Contacts;