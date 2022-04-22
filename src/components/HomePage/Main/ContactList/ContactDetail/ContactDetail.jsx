import React, { useContext, useEffect, useState, useRef } from 'react';
import { useParams } from 'react-router-dom';
import styles from './ContactDetail.module.scss';
// FIREBASE
import { auth, db } from '../../../../../firebase/firebase';
import { ref, remove } from "firebase/database";
// CONTEXT
import AppContext from '../../../../../store/app-context';
// COMPONENT
import ContactImg from './ContactImg';
import ContactInfo from './ContactInfo';
import AddNote from './AddNote';
import NoteContainer from './NoteContainer';

const ContactDetail = ({ enteredNoteText, setEnteredNoteText, resetNoteText, noteTextIsValid, setNoteText }) => {

    const appCtx = useContext(AppContext);
    const AppCtxRef = useRef(useContext(AppContext));
    const bin = useRef(null);
    const boundaries = useRef(null);

    const [contact, setContact] = useState({});
    const [binActive, setBinActive] = useState(false);

    const { contactId } = useParams();

    useEffect(() => {
        const filteredContacts = appCtx.contacts.filter(contact => contact.id === contactId);
        setContact({ ...filteredContacts[0] });
    }, [appCtx.contacts, contactId, setContact]);

    useEffect(() => {
        AppCtxRef.current.fetchNotes(contactId);
    }, [contactId]);


    const removeNote = (noteId) => {
        remove(ref(db, `${auth.currentUser.uid}/contacts/${contactId}/notes/${noteId}`)
        )
            .then(() => {
                console.log('note n. ' + noteId + 'successfully removed')
            })
            .catch((error) => {
                console.log('note not to been removed: ' + error)
            });
    }

    const submitHandler = async (e) => {
        e.preventDefault();
        if (!noteTextIsValid) {
            return
        }
        console.log(enteredNoteText);
        await setNoteText(contactId);
        resetNoteText();
    }

    return (
        <section ref={boundaries} className={styles['contact-container']}>
            <ContactImg contact={contact} />
            <ContactInfo contact={contact} />
            <AddNote submitHandler={submitHandler} setEnteredNoteText={setEnteredNoteText} enteredNoteText={enteredNoteText} binActive={binActive} bin={bin} />
            <NoteContainer boundaries={boundaries} notes={appCtx.notes} bin={bin} setBinActive={setBinActive} removeNote={removeNote} />
        </section>
    )
}
export default ContactDetail;