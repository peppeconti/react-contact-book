import React from 'react';
import styles from './SwitchLogin.module.scss';

const SwitchLogin = ({ loginHandler, text }) => {

    return (
        <p className={styles.switchLogin} onClick={loginHandler}>{text}</p>
    )
}

export default SwitchLogin;