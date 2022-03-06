import React, { useState, Fragment, useEffect } from 'react';
import styles from './AuthForm.module.scss';
// COMPS
import InputField from '../UI/InputField';
import SubmitButton from '../UI/Styled-Components/SubmitButton';
import SwitchLogin from '../UI/SwitchLogin';
import Loading from '../UI/Loading';
import Modal from '../UI/Modal';
// BOOTSTRAP COMPS
import Row from 'react-bootstrap/Row';

const AuthForm = (props) => {

    const [isLogin, setIsLogin] = useState(true);
    const [displayError, setDisplayError] = useState('');

    const loginHandler = () => {
        setIsLogin((prevState) => !prevState);
        props.setFormSubmitted(false);
        props.resetEmail();
        props.resetPassword();
    };

    const submitHandler = (e) => {
        e.preventDefault();
        if (!props.enteredEmailIsValid || !props.enteredPasswordIsValid) {
            props.setFormSubmitted(true);
            return;
        }
        props.setIsLoading(true);
        if (isLogin) {
            setTimeout(() => {
                props.signInUser();
            }, 5000);
        } else if (!isLogin) {
            setTimeout(() => {
                props.createUser();
            }, 5000);
        }
    }

    useEffect(() => {
        if ((props.errCreate || props.errSignIn) === 'auth/email-already-in-use') {
            setDisplayError(`Sorry, an account with the address ${props.enteredEmail} already exists...`);
        }
        else if ((props.errCreate || props.errSignIn === 'auth/user-not-found')) {
            setDisplayError(`Sorry, the email you entered doesn't exist in our database...`);
        }
        else if ((props.errCreate || props.errSignIn === 'auth/wrong-password')) {
            setDisplayError(`Sorry, the password you entered is wrong...`);
        }
        else if ((props.errCreate || props.errSignIn !== '')) {
            setDisplayError(`An Error has occurred. Please, control you entered a correct email and password.`);
        }
        else if ((!props.errCreate && !props.errSignIn)) {
            return;
        }
    }, [props.enteredEmail, props.errCreate, props.errSignIn]);

    const closeModal = () => {
        setDisplayError('');
        props.resetErrCreate();
        props.resetErrSignIn();
    }

    return (
        <Fragment>
            <form className={styles.form} onSubmit={submitHandler}>
                {!props.isLoading && <Fragment>
                    <Row className='h-100 align-items-center justify-content-center'>
                        <InputField inputId='email' label='email' type='text' typingText='insert your email...' warning='please, insert a valid email' enteredValue={props.enteredEmail} setEnteredValue={props.setEnteredEmail} formSubmitted={props.formSubmitted} valueHasError={props.emailHasError} />
                        <InputField inputId='password' label='password' type='password' typingText='insert your password...' warning='please, insert at least 6 chars' enteredValue={props.enteredPassword} setEnteredValue={props.setEnteredPassword} formSubmitted={props.formSubmitted} valueHasError={props.passwordHasError} />
                    </Row>
                    <Row className='h-100 align-items-center justify-content-center'>
                        <div className={styles.buttonContainer}>
                            {isLogin && <SubmitButton color='#557acf' text='LOGIN' />}
                            {!isLogin && <SubmitButton color='#557acf' text='SIGN UP' />}
                            <SwitchLogin text={isLogin ? 'New User? SIGN UP' : 'Already a User? SIGN IN'} loginHandler={loginHandler} />
                        </div>
                    </Row>
                </Fragment>}
                {props.isLoading && <Loading />}
            </form>
            {displayError && <Modal closeModal={closeModal}>{displayError}</Modal>}
        </Fragment>
    );
}

export default AuthForm;