import React, { Fragment, useContext, useState, useEffect, useRef } from 'react';
import ReactDOM from 'react-dom';
import styles from './UserProfileForm.module.scss';
// FIREBASE
import { auth, db } from '../../../../firebase/firebase';
import { ref, onValue } from "firebase/database";
// UID
import { uid } from 'uid';
// ASSETS
import default_img from '../../../../assets/user-solid.svg';
// COMPS
import Loading from '../../../UI/Loading';
import InputField from '../../../UI/InputField';
import InputFile from '../../../UI/Styled-Components/InputFile';
import SubmitButton from '../../../UI/Styled-Components/SubmitButton';
import CropImg from '../../../UI/CropImg';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
// BOOTSTRAP COMPS
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
// CONTEXT
import AppContext from '../../../../store/app-context';

const UserProfilForm = ({ inputFileHasError, setInputFileHasError, isLoading, setIsLoading, setUserData, updateUserProfile, preparingPhotoURL, blob, setBlob, imageName, setImageName, formSubmitted, setFormSubmitted, enteredDisplayName, presetDisplayName, setDisplayName, displayNameIsValid, displayNameHasError, enteredFirstName, presetFirstName, setFirstName, firstNameIsValid, firstNameHasError, enteredLastName, presetLastName, setLastName, lastNameIsValid, lastNameHasError, enteredPhone, presetPhone, setPhone, phoneIsValid, phoneHasError }) => {

    const appCtx = useContext(AppContext);

    const portalElement = document.getElementById('overlays');
    // REFERENCE TO RESET THE FILELIST
    const fileList = useRef(null);

    const [inputImg, setInputImg] = useState('');
    const [image, setImage] = useState('');
    const [key, setKey] = useState('');

    useEffect(() => {
        const refUserData = ref(db, `/${auth.currentUser.uid}/userData`);
        const unsubscribe = onValue(refUserData, (snapshot) => {
            if (snapshot) {
                let userDataObj = snapshot.val();
                setKey(Object.keys(userDataObj)[0]);
            } else {
                return;
            }
        });
        setFormSubmitted(false);
        return unsubscribe;
    }, [setFormSubmitted]);

    useEffect(() => {
        if (appCtx.userData.displayName !== '') {
            presetDisplayName(appCtx.userData.displayName);
        }
        if (appCtx.userData.firstName !== '') {
            presetFirstName(appCtx.userData.firstName);
        }
        if (appCtx.userData.lastName !== '') {
            presetLastName(appCtx.userData.lastName);
        }
        if (appCtx.userData.phoneNumber !== '') {
            presetPhone(appCtx.userData.phoneNumber);
        }
        // console.log(auth.currentUser.displayName);
    }, [presetDisplayName, presetFirstName, presetLastName, presetPhone, appCtx.userData.displayName, appCtx.userData.firstName, appCtx.userData.lastName, appCtx.userData.phoneNumber]);

    const getBlob = (blob) => {
        // pass blob up from the ImageCropper component
        setBlob(blob)
    };

    const onInputChange = (e) => {
        // convert image file to base64 string
        const file = e.target.files[0];
        const notAllowed = file.type !== "image/webp" && file.type !== "image/png" && file.type !== "image/jpeg";
        if (notAllowed) {
            // RESETTING FILELIST IN INPUTFILE
            fileList.current.value = '';
            setInputFileHasError(true);
            return;
        } 
        if (file) {
            setInputFileHasError(false);
            const fileName = file.name;
            const fileId = uid();
            setImageName(fileName.substring(0, fileName.lastIndexOf('.')) + '_' + fileId);
            const reader = new FileReader();
            reader.addEventListener('load', () => {
                setInputImg(reader.result);
            }, false)
            reader.readAsDataURL(file);
        }
    };

    const resetInputFile = () => {
        setImage('');
        setBlob(null);
    }

    const formDidChanged = blob || enteredDisplayName !== appCtx.userData.displayName || enteredFirstName !== appCtx.userData.firstName || enteredLastName !== appCtx.userData.lastName || enteredPhone !== appCtx.userData.phoneNumber;

    const formIsValid = displayNameIsValid && firstNameIsValid && lastNameIsValid && phoneIsValid;

    const profileIsComplete = Object.values(appCtx.userData).every(x => x !== '');

    const submitHandler = async (e) => {
        e.preventDefault();
        if (!formIsValid) {
            setFormSubmitted(true);
            return;
        }
        setIsLoading(true);
        const folder =  `/${auth.currentUser.uid}/${imageName}`;
        const photoURL = await preparingPhotoURL(folder);
        const previousImage = await updateUserProfile(photoURL);
        await setUserData(key, previousImage);
        setImage('');
        setBlob(null);
        setFormSubmitted(false);
        setIsLoading(false);
    };

    return (
        <Fragment>
            <form className={styles.form} onSubmit={submitHandler}>
                {!isLoading && <Fragment>
                    <Row className={`${styles.main_row} px-4 py-4 m-0 w-100 d-flex justify-content-center align-items-center`}>
                        <Col className='px-4 m-0' lg={6} md={10} sm={12} xs={12}>
                            <InputField inputId='displayName' label='nickname' type='text' typingText='insert your Nickname...' warning='please, not more than 15 chars...' enteredValue={enteredDisplayName} setEnteredValue={setDisplayName} formSubmitted={formSubmitted} valueHasError={displayNameHasError} />
                            <InputField inputId='firstName' label='first name' type='text' typingText='insert your fist name...' warning='please, not more than 20 chars..' enteredValue={enteredFirstName} setEnteredValue={setFirstName} formSubmitted={formSubmitted} valueHasError={firstNameHasError} />
                            <InputField inputId='lastName' label='last name' type='text' typingText='insert your last name...' warning='please, not more than 20 chars..' enteredValue={enteredLastName} setEnteredValue={setLastName} formSubmitted={formSubmitted} valueHasError={lastNameHasError} />
                            <InputField inputId='phone-number' label='phone number' type='text' typingText='insert your phone number...' warning='please, type something...' enteredValue={enteredPhone} setEnteredValue={setPhone} formSubmitted={formSubmitted} valueHasError={phoneHasError} />
                        </Col>
                        <Col className='px-4 m-0' lg={6} md={10} sm={12} xs={12}>
                            {/* EMAIL CAN'T BE CHANGED FROM THIS FORM */}
                            <InputField inputId='email' label='email' type='text' enteredValue={appCtx.userData.email} readOnly />
                            <InputFile inputFileHasError={inputFileHasError} fileList={fileList} inputId='profile-image' label='profile image' warning='only jpg, png or webp allowed...' onInputChange={onInputChange} />
                            <Row className='w-100 no-gutters py-2 m-0'>
                                <div className={styles.preview}>
                                    <div className={styles.selectedInfo}>
                                        <p className={styles.selected}>{image ? 'Image selected' : 'Select an image'}</p>
                                        <p className={appCtx.userData.photoURL ? styles.imageIsSet : styles.imageIsNotSet}>{appCtx.userData.photoURL ? 'profile image setted' : 'no profile image'} <span>{appCtx.userData.photoURL ? <FontAwesomeIcon className={styles.circle} icon='circle-check' /> : <FontAwesomeIcon className={styles.circle} icon='circle-exclamation' />}</span></p>
                                    </div>
                                    <div className={styles.previewContainer}>
                                        <img className={styles.previewImg} src={image || default_img} alt='default profile' />
                                        {image && <button className={styles.removePreview} type='button' onClick={resetInputFile}><FontAwesomeIcon className={styles['circle-xmark']} icon='circle-xmark' /></button>}
                                    </div>
                                </div>
                            </Row>
                        </Col>
                    </Row>
                    <Row className={`${styles.main_row} px-4 py-0 m-0 w-100 d-flex justify-content-center align-items-center`} >
                        <Col className='m-0 px-4' lg={12} md={10} sm={12} xs={12}>
                            <SubmitButton color='#557acf' text='SUBMIT' disabled={!formDidChanged} />
                        </Col>
                    </Row>
                    <Row className={`${styles.main_row} px-4 py-4 m-0 w-100 d-flex justify-content-center align-items-center`}>
                        <Col className={`${styles.column} m-0 px-4 d-flex justify-content-between`} lg={12} md={10} sm={12} xs={12}>
                            <p className={styles.creationTime}>account created at {appCtx.userData.creationTime}</p>
                            <p className={profileIsComplete? styles.profileComplete : styles.profileIncomplete}>{profileIsComplete? 'profile setting complete' : 'your profile is incomplete'}<span>{profileIsComplete? <FontAwesomeIcon className={styles.circle} icon='circle-check' /> : <FontAwesomeIcon className={styles.circle} icon='circle-exclamation' />}</span></p>
                        </Col>
                    </Row>
                </Fragment>}
                {isLoading && <Loading />}
            </form>
            {ReactDOM.createPortal(inputImg && <CropImg fileList={fileList} blob={blob} setBlob={setBlob} getBlob={getBlob} inputImg={inputImg} setInputImg={setInputImg} setImage={setImage} />, portalElement)}
        </Fragment>
    );
}
export default UserProfilForm;