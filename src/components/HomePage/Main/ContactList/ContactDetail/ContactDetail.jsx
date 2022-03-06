import React, { useContext, useEffect, useState, useRef } from 'react';
import { useParams, useLocation } from 'react-router-dom';
import styles from './ContactDetail.module.scss';
// BOOTSTRAP COMPS
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
// FIREBASE
import { auth, db } from '../../../../../firebase/firebase';
import { ref, remove } from "firebase/database";
// CONTEXT
import AppContext from '../../../../../store/app-context';
// COMPONENT
import Card from '../../../../UI/Styled-Components/Card';
import ContactImg from './ContactImg';
import ContactInfo from './ContactInfo';
import AddNote from './AddNote';
import NoteContainer from './NoteContainer';

const ContactDetail = ({ enteredNoteText, setEnteredNoteText, resetNoteText, noteTextIsValid, setNoteText }) => {

    const appCtx = useContext(AppContext);
    const AppCtxRef = useRef(useContext(AppContext));
    const location = useLocation();
    const bin = useRef(null);

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
        <section className={styles['overflow-visible']}>
            <Container className='h-100 d-flex justify-content-center align-items-center' fluid='md'>
                <Col className={styles['contact-container']} lg={12} md={10} sm={10} xs={12}>
                    <Card dark={location.state} light={location.state} vertical edges>
                        <Row className={`${styles.main_row} px-4 py-4 m-0 w-100 d-flex justify-content-center align-items-center`}>
                            <Col className='p-0 m-0' lg={6} md={12} sm={12} xs={12}>
                                <ContactImg contact={contact} />
                                <ContactInfo contact={contact} />
                            </Col>
                            <Col className='p-0 m-0' lg={6} md={12} sm={12} xs={12}>
                                <AddNote submitHandler={submitHandler} setEnteredNoteText={setEnteredNoteText} enteredNoteText={enteredNoteText} binActive={binActive} bin={bin} />
                                <NoteContainer notes={appCtx.notes} bin={bin} setBinActive={setBinActive} removeNote={removeNote} />
                            </Col>
                        </Row>
                    </Card>
                </Col>
            </Container>
        </section>
    )
}
export default ContactDetail;