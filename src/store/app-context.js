import React from 'react';

const AppContext = React.createContext({
    userData: {
        creationTime: String,
        displayName: String,
        firstName: String,
        lastName: String,
        phoneNumber: String,
        email: String,
        photoName: String,
        photoURL: String
    },
    contacts: Array,
    notes: Array,
    fetchUserData: () => { },
    fetchContacts: () => { },
    fetchNotes: () => { },
    resetState: () => { }
})

export default AppContext;