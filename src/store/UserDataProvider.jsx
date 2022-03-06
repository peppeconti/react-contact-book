import React, { useReducer } from 'react';
import AppContext from './app-context';
import { auth, db } from '../firebase/firebase';
import { onValue, ref } from 'firebase/database';
// import { uid } from 'uid';

const defaultState = {
    userData: {
        creationTime: '',
        displayName: '',
        firstName: '',
        lastName: '',
        phoneNumber: '',
        email: '',
        photoName: '',
        photoURL: ''
    },
    contacts: [],
    notes: []
}

const types = {
    FETCH_USER_DATA: 'FETCH-USER-DATA',
    FETCH_CONTACTS: 'FETCH-CONTACTS',
    FETCH_NOTES: 'FETCH-NOTES',
    RESET_STATE: 'RESET',
}

const appReducer = (state, action) => {
    switch (action.type) {
        case types.FETCH_USER_DATA:
            return { ...state, userData: { ...action.userData } }
        case types.FETCH_CONTACTS:
            return { ...state, contacts: [...action.contacts] }
        case types.FETCH_NOTES:
            return { ...state, notes: [...action.notes] }
        case types.RESET_STATE:
            return { ...action.initialState }
        default:
            return state
    }
}

const UserDataProvider = (props) => {

    const [state, dispatch] = useReducer(appReducer, defaultState);

    const fetchUserData = () => {
        const refUserData = ref(db, `/${auth.currentUser.uid}/userData`);
        onValue(refUserData, (snapshot) => {
            if (snapshot) {
                const fetchData = snapshot.val();
                const data = fetchData[Object.keys(fetchData)[0]];
                dispatch({ type: 'FETCH-USER-DATA', userData: { ...data } })
            } else {
                return;
            }
        });
    }

    const fetchContacts = () => {
        const refContactList = ref(db, `/${auth.currentUser.uid}/contacts`);
        onValue(refContactList, (snapshot) => {
            if (snapshot) {
                const data = snapshot.val();
                const contacts = [];
                for (const key in data) {
                    const contact = {
                        id: key,
                        ...data[key]
                    }
                    contacts.push(contact);
                }
                dispatch({ type: 'FETCH-CONTACTS', contacts: [...contacts] })
            } else {
                return;
            }
        })
    }

    const fetchNotes = (contactId) => {
        const refContact = ref(db, `/${auth.currentUser.uid}/contacts/${contactId}/notes`);
        onValue(refContact, (snapshot) => {
            if (snapshot) {
                const data = snapshot.val();
                const notes = [];
                // console.log(data);
                for (const key in data) {
                    const note = {
                        id: key,
                        ...data[key]
                    }
                    notes.push(note);
                }
                dispatch({ type: 'FETCH-NOTES', notes: [...notes] });
            } else {
                return;
            }
        })
    }


    const resetState = () => {
        dispatch({ type: 'RESET', initialState: { ...defaultState } })
    };

    const initial_state = {
        userData: {
            creationTime: state.userData.creationTime,
            displayName: state.userData.displayName,
            firstName: state.userData.firstName,
            lastName: state.userData.lastName,
            phoneNumber: state.userData.phoneNumber,
            email: state.userData.email,
            photoName: state.userData.photoName,
            photoURL: state.userData.photoURL,
        },
        contacts: state.contacts,
        notes: state.notes,
        fetchUserData,
        fetchContacts,
        fetchNotes,
        resetState,
    }

    return (
        <AppContext.Provider value={initial_state}>
            {props.children}
        </AppContext.Provider>
    )
}

export default UserDataProvider;