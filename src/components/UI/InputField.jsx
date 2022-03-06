import React, { useState } from 'react';
import styles from './InputField.module.scss';
import loadable from '@loadable/component';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
// BOOTSTRAP COMPS
import Row from 'react-bootstrap/Row';
// LAZY LOADING
const Typewriter = loadable(() => import('typewriter-effect'));

const InputField = (props) => {

    const [typing, setTyping] = useState(false);

    const typingHandler = () => {
        setTyping((prevState) => !prevState);
    };

    const preloadHandler = () => {
        Typewriter.preload();
    };

    const inputStyles = (props.formSubmitted && props.valueHasError) ? `${styles.inputContainer} ${styles.inputError}` : `${styles.inputContainer}`;

    return (
        <Row className='w-100 no-gutters py-2 m-0'>
            {(typing && props.typingText) && <label className={styles.label} htmlFor={props.inputId}>
                <Typewriter
                    options={{
                        strings: [`${props.typingText}`],
                        autoStart: true,
                        loop: true,
                        cursor: '',
                        wrapperClassName: `${styles.typing}`
                    }}
                />
            </label>}
            {(!typing || !props.typingText) && <label className={styles.label} htmlFor={props.inputId}>{props.label}{props.required && <span className={styles.required}> *</span>}</label>}
            <div className={inputStyles}>
                <input className={styles.input} type={props.type} id={props.inputId} onFocus={typingHandler} onBlur={typingHandler} value={props.enteredValue} onChange={props.setEnteredValue} onMouseOver={preloadHandler} readOnly={props.readOnly} />
                {(props.formSubmitted && props.valueHasError) && <p className={styles.warning}>{props.warning}</p>}
                {(props.formSubmitted && props.valueHasError) && <FontAwesomeIcon className={styles['circle-warning']} icon='circle-exclamation' color='rgb(255, 104, 104)' />}
            </div>
        </Row>
    )
}

export default InputField;