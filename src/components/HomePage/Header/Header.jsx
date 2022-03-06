import React from 'react';
import styles from './Header.module.scss';
// COMPONENTS
import Logo from './Logo';
import NavBar from './NavBar';

const Header = ({ userDetails, setUserDetails, signOutUser }) => {

    return (
        <header className={styles.header}>
            <Logo />
            <NavBar userDetails={userDetails} setUserDetails={setUserDetails} signOutUser={signOutUser} />
        </header>
    )
}
export default Header;