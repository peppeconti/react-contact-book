import React, { useState, useEffect, Fragment, useContext, useRef } from 'react';
import styles from './HomePage.module.scss';
import { Switch, Route, useRouteMatch } from 'react-router-dom';
// ASSETS
import background from '../assets/background.svg';
// COMPONENTS
import Header from '../components/HomePage/Header/Header';
import Profile from '../components/HomePage/Main/UserProfile/Profile';
import Contacts from '../components/HomePage/Main/ContactList/Contacts';
import ContactDetail from '../components/HomePage/Main/ContactList/ContactDetail/ContactDetail';
import AddContact from '../components/HomePage/Main/ContactList/AddContact';
import Modal from '../components/UI/Modal';
// CONTEXT
import AppContext from '../store/app-context';

const HomePage = (props) => {

    const appCtxRef = useRef(useContext(AppContext));
    const appCtx = useContext(AppContext);
    const match = useRouteMatch();

    const [userDetails, setUserDetails] = useState(false);
    const [displayError, setDisplayError] = useState('');

    const background_style = {
        background: `url(${background}) no-repeat center center`,
        backgroundSize: 'cover'
    }

    useEffect(() => {
        if (props.loggedIn) {
            appCtxRef.current.fetchUserData();
            appCtxRef.current.fetchContacts();
        } else {
            return
        }
    }, [props.loggedIn]);

    useEffect(() => {
        if (props.errSignOut) {
            setDisplayError(`Sorry, an error occurred...`);
        }
        else {
            return;
        }
    }, [props.errSignOut]);

    const closeModal = () => {
        setDisplayError('');
        props.resetErrSignOut();
    };


    return (
        <div className={styles.homePage} style={background_style}>
            <Fragment>
                <Header userDetails={userDetails} setUserDetails={setUserDetails} signOutUser={props.signOutUser} />
                <main className={styles.main}>
                    <Switch>
                        <Route path={`${match.path}`} exact>
                            <div className={styles.wrapper}>
                                <h1>HOMEPAGE</h1>
                                {(+appCtx.contacts.length > 0) && <p>You have {appCtx.contacts.length} contacts</p>}
                                {(+appCtx.contacts.length === 0) && <p>You don't have any contacts yet...</p>}
                            </div>
                        </Route>
                        <Route path={`${match.path}/contacts`} exact>
                            <Contacts />
                        </Route>
                        <Route path={`${match.path}/add-contact`} exact>
                            <AddContact setContactData={props.setContactData} inputFileHasError={props.inputFileHasError} setInputFileHasError={props.setInputFileHasError} isLoading={props.isLoading} setIsLoading={props.setIsLoading} preparingPhotoURL={props.preparingPhotoURL} blob={props.blob} setBlob={props.setBlob} imageName={props.imageName} setImageName={props.setImageName} enteredFirstName={props.enteredFirstName} presetFirstName={props.presetFirstName} setFirstName={props.setFirstName} firstNameIsValid={props.firstNameIsValid} firstNameHasError={props.firstNameHasError} enteredLastName={props.enteredLastName} presetLastName={props.presetLastName} setLastName={props.setLastName} lastNameIsValid={props.lastNameIsValid} lastNameHasError={props.lastNameHasError} enteredPhone={props.enteredPhone} presetPhone={props.presetPhone} setPhone={props.setPhone} phoneIsValid={props.phoneIsValid} phoneHasError={props.phoneHasError} enteredAddress={props.enteredAddress} presetAddress={props.presetAddress} setAddress={props.setAddress} addressIsValid={props.addressIsValid} addressHasError={props.addressHasError} enteredEmailContact={props.enteredEmailContact} setEnteredEmailContact={props.setEnteredEmailContact} presetEnteredEmailContact={props.presetEnteredEmailContact} enteredEmailContactIsValid={props.enteredEmailContactIsValid} emailContactHasError={props.emailContactHasError} formSubmitted={props.formSubmitted} setFormSubmitted={props.setFormSubmitted} />
                        </Route>
                        <Route path={`${match.path}/profile`} exact>
                            <Profile inputFileHasError={props.inputFileHasError} setInputFileHasError={props.setInputFileHasError} isLoading={props.isLoading} setIsLoading={props.setIsLoading} setUserData={props.setUserData} updateUserProfile={props.updateUserProfile} preparingPhotoURL={props.preparingPhotoURL} blob={props.blob} setBlob={props.setBlob} imageName={props.imageName} setImageName={props.setImageName} formSubmitted={props.formSubmitted} setFormSubmitted={props.setFormSubmitted} enteredDisplayName={props.enteredDisplayName} presetDisplayName={props.presetDisplayName} setDisplayName={props.setDisplayName} displayNameIsValid={props.displayNameIsValid} displayNameHasError={props.displayNameHasError} enteredFirstName={props.enteredFirstName} presetFirstName={props.presetFirstName} setFirstName={props.setFirstName} firstNameIsValid={props.firstNameIsValid} firstNameHasError={props.firstNameHasError} enteredLastName={props.enteredLastName} presetLastName={props.presetLastName} setLastName={props.setLastName} lastNameIsValid={props.lastNameIsValid} lastNameHasError={props.lastNameHasError} enteredPhone={props.enteredPhone} presetPhone={props.presetPhone} setPhone={props.setPhone} phoneIsValid={props.phoneIsValid} phoneHasError={props.phoneHasError} />
                        </Route>
                        <Route path={`${match.path}/contact/:contactId`}>
                            <ContactDetail enteredNoteText={props.enteredNoteText} setEnteredNoteText={props.setEnteredNoteText} resetNoteText={props.resetNoteText} noteTextIsValid={props.noteTextIsValid} setNoteText={props.setNoteText} />
                        </Route>
                    </Switch>
                </main>
                {displayError && <Modal closeModal={closeModal}>{displayError}</Modal>}
            </Fragment>
        </div>
    )
}

export default HomePage;