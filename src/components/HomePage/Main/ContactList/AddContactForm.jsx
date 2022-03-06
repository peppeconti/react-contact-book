import React, { Fragment, useState, useEffect, useRef } from 'react';
import ReactDOM from 'react-dom';
import styles from './AddContactForm.module.scss';
// FIREBASE
import { auth } from '../../../../firebase/firebase';
// import { ref, onValue } from "firebase/database";
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
// import AppContext from '../../../../store/app-context';

const AddContactForm = ({ setContactData, preparingPhotoURL, inputFileHasError, setInputFileHasError, isLoading, setIsLoading, blob, setBlob, imageName, setImageName, enteredFirstName, presetFirstName, setFirstName, firstNameIsValid, firstNameHasError, enteredLastName, presetLastName, setLastName, lastNameIsValid, lastNameHasError, enteredPhone, presetPhone, setPhone, phoneIsValid, phoneHasError, enteredAddress, presetAddress, setAddress, addressIsValid, addressHasError, enteredEmailContact, setEnteredEmailContact, presetEnteredEmailContact, enteredEmailContactIsValid, emailContactHasError, formSubmitted, setFormSubmitted }) => {

    // const appCtx = useContext(AppContext);

    const portalElement = document.getElementById('overlays');
    // REFERENCE TO RESET THE FILELIST
    const fileList = useRef(null);

    const [inputImg, setInputImg] = useState('');
    const [image, setImage] = useState('');

    useEffect(() => {
        presetFirstName('')
        presetLastName('');
        presetPhone('');
        presetAddress('');
        presetEnteredEmailContact('');
        setFormSubmitted(false);
    }, [presetFirstName, presetLastName, presetPhone, presetAddress, presetEnteredEmailContact, setFormSubmitted]);

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

    const formIsValid = firstNameIsValid && lastNameIsValid && phoneIsValid && enteredEmailContactIsValid && addressIsValid;

    const submitHandler = async (e) => {
        e.preventDefault();
        if (!formIsValid) {
            setFormSubmitted(true);
            return
        }
        setIsLoading(true);
        const folder = `/${auth.currentUser.uid}/contacts/${imageName}`;
        const photoURL = await preparingPhotoURL(folder);
        await setContactData(photoURL);
        console.log(enteredFirstName);
        console.log(enteredLastName);
        console.log(enteredPhone);
        console.log(enteredAddress);
        console.log(enteredEmailContact);
        console.log(photoURL);
        setTimeout(() => {
            setImage('');
            setBlob(null);
            setFormSubmitted(false);
            setIsLoading(false);
        }, 2000)
    }

    return (
        <Fragment>
            <form className={styles.form} onSubmit={submitHandler}>
                <Fragment>
                    <Row className={`${styles.main_row} px-4 py-4 m-0 w-100 d-flex justify-content-center align-items-center`}>
                        <Col className='px-4 m-0' lg={6} md={10} sm={12} xs={12}>
                            <InputField inputId='firstName' label='first name' type='text' typingText='insert the fist name...' warning='please, not more than 20 chars..' enteredValue={enteredFirstName} setEnteredValue={setFirstName} formSubmitted={formSubmitted} valueHasError={firstNameHasError} required />
                            <InputField inputId='lastName' label='last name' type='text' typingText='insert the last name...' warning='please, not more than 20 chars..' enteredValue={enteredLastName} setEnteredValue={setLastName} formSubmitted={formSubmitted} valueHasError={lastNameHasError} />
                            <InputField inputId='phone-number' label='phone number' type='text' typingText='insert the phone number...' warning='please, type something...' enteredValue={enteredPhone} setEnteredValue={setPhone} formSubmitted={formSubmitted} valueHasError={phoneHasError} required />
                            <InputField inputId='address' label='address' type='text' typingText='insert the address...' warning='please, not more than 15 chars...' enteredValue={enteredAddress} setEnteredValue={setAddress} formSubmitted={formSubmitted} valueHasError={addressHasError} />
                        </Col>
                        <Col className='px-4 m-0' lg={6} md={10} sm={12} xs={12}>
                            <InputField inputId='email' label='email' type='text' typingText='insert the email...' warning='please, insert valid email...' enteredValue={enteredEmailContact} setEnteredValue={setEnteredEmailContact} formSubmitted={formSubmitted} valueHasError={emailContactHasError} />
                            <InputFile inputFileHasError={inputFileHasError} fileList={fileList} inputId='contact-image' label='profile image' warning='only jpg, png or webp allowed...' onInputChange={onInputChange} />
                            <Row className='w-100 no-gutters py-2 m-0'>
                                <div className={styles.preview}>
                                    <div className={styles.selectedInfo}>
                                        <p className={styles.selected}>{image ? 'Image selected' : 'Select an image'}</p>
                                    </div>
                                    <div className={styles.previewContainer}>
                                        <img className={styles.previewImg} src={image || default_img} alt='default profile' />
                                        {image && <button className={styles.removePreview} type='button' onClick={resetInputFile}><FontAwesomeIcon className={styles['circle-xmark']} icon='circle-xmark' /></button>}
                                    </div>
                                </div>
                            </Row>
                        </Col>
                    </Row>
                    <Row className={`${styles.main_row} px-4 pb-4 m-0 w-100 d-flex justify-content-center align-items-center`} >
                        <Col className='m-0 px-4' lg={12} md={10} sm={12} xs={12}>
                            <SubmitButton color='#5ebc6e' text='SUBMIT' />
                        </Col>
                    </Row>
                </Fragment>
                {isLoading && <Loading />}
            </form>
            {ReactDOM.createPortal(inputImg && <CropImg fileList={fileList} blob={blob} setBlob={setBlob} getBlob={getBlob} inputImg={inputImg} setInputImg={setInputImg} setImage={setImage} />, portalElement)}
        </Fragment>
    );
}
export default AddContactForm;