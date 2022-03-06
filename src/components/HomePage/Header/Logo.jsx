import React from 'react';
import styles from './Logo.module.scss';
// COMPONENTS
import Card from '../../UI/Styled-Components/Card';

const Logo = () => {

    return (
        <h1 className={styles.logo}>
            <Card vertical/>
        </h1>
    )
}
export default Logo;