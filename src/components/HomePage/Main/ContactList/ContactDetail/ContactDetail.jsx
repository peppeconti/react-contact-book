import React, { useContext, useEffect, useState, useRef } from 'react';
import { useParams } from 'react-router-dom';
// BOOTSTRAP COMPS
import Col from 'react-bootstrap/Col';
import Container from 'react-bootstrap/Container';
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
        <Container ref={boundaries} className='contact'>
            <Col className='p-0 m-0' lg={6} md={12} sm={12} xs={12}>
                <ContactImg contact={contact} />
            </Col>
            <Col className='p-0 m-0' lg={6} md={12} sm={12} xs={12}>
                <ContactInfo contact={contact} />
            </Col>
            <Col className='p-0 m-0' lg={6} md={12} sm={12} xs={12}>
                <AddNote submitHandler={submitHandler} setEnteredNoteText={setEnteredNoteText} enteredNoteText={enteredNoteText} binActive={binActive} bin={bin} />
            </Col>
            <Col className='p-0 m-0' lg={6} md={12} sm={12} xs={12}>
                <NoteContainer boundaries={boundaries} notes={appCtx.notes} bin={bin} setBinActive={setBinActive} removeNote={removeNote} />
            </Col>
        </Container>
    )
}
export default ContactDetail;



/**
 * 
 *  <Col className='p-0 m-0' lg={12} md={12} sm={12} xs={12}>
                    <AddNote submitHandler={submitHandler} setEnteredNoteText={setEnteredNoteText} enteredNoteText={enteredNoteText} binActive={binActive} bin={bin} />
                    <NoteContainer boundaries={boundaries} notes={appCtx.notes} bin={bin} setBinActive={setBinActive} removeNote={removeNote} />
                </Col>
 * 
 */