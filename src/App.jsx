import React, { useState, useEffect, useContext } from 'react';
import { Route, Switch, Redirect, useHistory } from 'react-router-dom';
import './App.scss';
// FONTAWESOME
import { library } from '@fortawesome/fontawesome-svg-core';
import { faPhoneAlt, faCog, faCircleExclamation, faAddressBook, faCirclePlus, faHouse, faCircleXmark, faCircleCheck, faNoteSticky, faEnvelope, faTrash } from '@fortawesome/free-solid-svg-icons';
// HOOKS
import useInput from './hooks/use-input';
import useAuth from './hooks/use-auth';
// BOOTSTRAP STYLES
import 'bootstrap/dist/css/bootstrap.min.css';
// FIREBASE
import { auth, db, storage } from './firebase/firebase';
import { onAuthStateChanged, createUserWithEmailAndPassword, signInWithEmailAndPassword, signOut, updateProfile } from 'firebase/auth';
import { ref as stgRef, uploadBytes, getDownloadURL, deleteObject } from 'firebase/storage';
import { set, ref } from 'firebase/database';
// UID
import { uid } from 'uid';
// MANAGING DATE FORMAT
import moment from 'moment';
// COMPONENTS
import AuthPage from './pages/AuthPage';
import HomePage from './pages/HomePage';
import Preloader from './components/UI/Preloader';
// CONTEXT
import AppContext from './store/app-context';

library.add(faPhoneAlt, faCirclePlus, faHouse, faAddressBook, faCog, faCircleExclamation, faCircleXmark, faCircleCheck, faNoteSticky, faEnvelope, faTrash);

function App() {

  const appCtx = useContext(AppContext);

  const history = useHistory();

  const [loggedIn, setLoggedIn] = useState(false);
  const [formSubmitted, setFormSubmitted] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [preloader, setPreloader] = useState(true);
  // UPDATE PROFILE STATES
  const [blob, setBlob] = useState(null);
  const [imageName, setImageName] = useState('');
  const [inputFileHasError, setInputFileHasError] = useState(false);

  // UPDATE PROFILE FUNCTIONS
  const preparingPhotoURL = async (folder) => {
    if (blob) {
      const storageRef = stgRef(storage, folder);
      await uploadBytes(storageRef, blob).then(() => {
      });
      const photoURL = await getDownloadURL(stgRef(storage, folder))
        .then((url) => {
          const photoURL = url;
          return photoURL;
        })
        .catch((error) => {
          console.log(error)
        });
      return photoURL;
    };
  };

  const updateUserProfile = async (photoURL) => {
    const previousImageDelete = async () => {
      const previousImage = appCtx.userData.photoName;
      const previousImageRef = stgRef(storage, `/${auth.currentUser.uid}/${previousImage}`);
      await deleteObject(previousImageRef).then(() => {
        console.log('Image successfully deleted!');
      }).catch((error) => {
        console.log('Image couldn\'t be deleted: ' + error);
      });
    }
    if (blob && appCtx.userData.photoURL !== '') {
      await previousImageDelete();
    }
    await updateProfile(auth.currentUser, {
      displayName: enteredDisplayName || auth.currentUser.displayName || '', photoURL: photoURL || auth.currentUser.photoURL || ''
    }).then(() => {
      console.log('Data successfully updated!');
    }).catch((error) => {
      console.log('Error by updating profile: ' + error);
    });
  };

  const setUserData = async (key) => {
    const creation = auth.currentUser.metadata.createdAt;
    await set(ref(db, `/${auth.currentUser.uid}/userData/${key}`), {
      email: auth.currentUser.email,
      displayName: auth.currentUser.displayName || appCtx.userData.displayName,
      firstName: enteredFirstName || appCtx.userData.firstName,
      lastName: enteredLastName || appCtx.userData.lastName,
      phoneNumber: enteredPhone || appCtx.userData.phoneNumber,
      photoName: imageName || appCtx.userData.photoName,
      photoURL: auth.currentUser.photoURL || appCtx.userData.photoURL,
      creationTime: moment(+creation).format('MMMM DD YYYY')
    });
  };

  const setContactData = async (photoURL) => {
    const dataId = uid();
    await set(ref(db, `/${auth.currentUser.uid}/contacts/${dataId}`), {
      firstName: enteredFirstName,
      lastName: enteredLastName,
      phoneNumber: enteredPhone,
      address: enteredAddress,
      email: enteredEmailContact,
      photoName: imageName || '',
      photoURL: photoURL || ''
    });
  };

  const setNoteText = async (contactId) => {
    const dataId = uid();
    await set(ref(db, `/${auth.currentUser.uid}/contacts/${contactId}/notes/${dataId}`), {
      text: enteredNoteText,
    });
  };

  useEffect(() => {
    setTimeout(() => {
      setPreloader(false);
    }, 8000);
  }, []);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        setLoggedIn(true);
      } else if (!user) {
        setLoggedIn(false);
      }
    });
    return unsubscribe;
  });

  // LOGIN
  const emailPattern = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

  const emailPatternContact = /^(\s*|(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,})))$/;

  const { value: enteredEmail,
    isValid: enteredEmailIsValid,
    valueChangeHandler: setEnteredEmail,
    resetValue: resetEmail,
    hasError: emailHasError,
  } = useInput(value => value.toLowerCase()
    .match(emailPattern));

  const { value: enteredEmailContact,
    isValid: enteredEmailContactIsValid,
    setEnteredValue: presetEnteredEmailContact,
    valueChangeHandler: setEnteredEmailContact,
    resetValue: resetEmailContact,
    hasError: emailContactHasError,
  } = useInput(value => value.toLowerCase()
    .match(emailPatternContact));

  const { value: enteredPassword,
    isValid: enteredPasswordIsValid,
    valueChangeHandler: setEnteredPassword,
    resetValue: resetPassword,
    hasError: passwordHasError,
  } = useInput(value => value.trim().length >= 6);

  const phoneNumberPattern = /^(\s*|\d+)$/;

  // UPDATE PROFILE
  const { value: enteredDisplayName,
    setEnteredValue: presetDisplayName,
    valueChangeHandler: setDisplayName,
    resetValue: resetDisplayName,
    isValid: displayNameIsValid,
    hasError: displayNameHasError,
  } = useInput(value => value.trim().length <= 15);

  const { value: enteredFirstName,
    setEnteredValue: presetFirstName,
    valueChangeHandler: setFirstName,
    resetValue: resetFirstName,
    isValid: firstNameIsValid,
    hasError: firstNameHasError,
  } = useInput(value => value.trim().length <= 15);

  const { value: enteredLastName,
    setEnteredValue: presetLastName,
    valueChangeHandler: setLastName,
    resetValue: resetLastName,
    isValid: lastNameIsValid,
    hasError: lastNameHasError,
  } = useInput(value => value.trim().length <= 15);

  const { value: enteredPhone,
    setEnteredValue: presetPhone,
    valueChangeHandler: setPhone,
    resetValue: resetPhone,
    isValid: phoneIsValid,
    hasError: phoneHasError,
  } = useInput(value => value.match(phoneNumberPattern));

  const { value: enteredAddress,
    setEnteredValue: presetAddress,
    valueChangeHandler: setAddress,
    resetValue: resetAddress,
    isValid: addressIsValid,
    hasError: addressHasError,
  } = useInput(value => value.trim().length <= 25);

  const { value: enteredNoteText,
    valueChangeHandler: setEnteredNoteText,
    resetValue: resetNoteText,
    isValid: noteTextIsValid,
  } = useInput(value => value.trim().length !== 0);

  const successCreate = (data) => {
    const dataId = uid();
    const creation = new Date(+data.user.metadata.createdAt)
    set(ref(db, `/${auth.currentUser.uid}/userData/${dataId}`), {
      email: data.user.email,
      displayName: '',
      firstName: '',
      lastName: '',
      phoneNumber: '',
      photoName: '',
      photoURL: '',
      creationTime: moment(creation).format('MMMM DD YYYY')
    });
    resetPassword();
    resetEmail();
    setIsLoading(false);
    setLoggedIn(false);
  };

  const successLogin = () => {
    resetPassword();
    resetEmail();
    setIsLoading(false);
    setLoggedIn(false);
  };

  const failure = () => {
    setFormSubmitted(false);
    setIsLoading(false);
  };

  const successSignOut = () => {
    appCtx.resetState();
    setFormSubmitted(false);
    resetDisplayName();
    resetFirstName();
    resetLastName();
    resetPhone();
    resetAddress();
    resetEmail();
    resetEmailContact();
    history.push('/login');
  };

  const failureSignOut = () => {
    console.log('error signOut');
  };

  const { authFunctionHandler: createUser, errorMessage: errCreate, resetError: resetErrCreate
  } = useAuth(createUserWithEmailAndPassword, successCreate, failure, auth, enteredEmail, enteredPassword);

  const { authFunctionHandler: signInUser, errorMessage: errSignIn, resetError: resetErrSignIn
  } = useAuth(signInWithEmailAndPassword, successLogin, failure, auth, enteredEmail, enteredPassword);

  const { authFunctionHandler: signOutUser, errorMessage: errSignOut, resetError: resetErrSignOut
  } = useAuth(signOut, successSignOut, failureSignOut, auth);

  const props_login = {
    resetPassword, resetEmail, passwordHasError, emailHasError, enteredPasswordIsValid, enteredEmailIsValid, enteredPassword, setEnteredPassword, enteredEmail, setEnteredEmail, formSubmitted, setFormSubmitted, isLoading, setIsLoading, createUser, signInUser, errCreate, errSignIn, resetErrCreate, resetErrSignIn
  };

  const props_home = {
    setContactData, inputFileHasError, setInputFileHasError, isLoading, setIsLoading, setUserData, updateUserProfile, preparingPhotoURL, blob, setBlob, imageName, setImageName, formSubmitted, setFormSubmitted, loggedIn, signOutUser, errSignOut, resetErrSignOut, enteredDisplayName, presetDisplayName, setDisplayName, displayNameIsValid, displayNameHasError, enteredFirstName, presetFirstName, setFirstName, firstNameIsValid, firstNameHasError, enteredLastName, presetLastName, setLastName, lastNameIsValid, lastNameHasError, enteredPhone, presetPhone, setPhone, phoneIsValid, phoneHasError, enteredAddress, presetAddress, setAddress, addressIsValid, addressHasError, enteredEmailContact, setEnteredEmailContact, presetEnteredEmailContact, enteredEmailContactIsValid, emailContactHasError, enteredNoteText, setEnteredNoteText, resetNoteText, noteTextIsValid, setNoteText
  };

  return (
    <Switch>
      <Route path='/' exact>
        <Redirect to='/login' />
      </Route>
      <Route path='/login' exact>
        {(preloader) && <Preloader />}
        {(!preloader && !loggedIn) && <AuthPage {...props_login} />}
        {(loggedIn && !preloader) && <Redirect to='/homepage' />}
      </Route>
      <Route path='/homepage'>
        {loggedIn && <HomePage {...props_home} />}
        {!loggedIn && <Redirect to='/login' />}
      </Route>
      <Route path='/*'>
        <h1>Error 404</h1>
      </Route>
    </Switch>
  );
}

export default App;