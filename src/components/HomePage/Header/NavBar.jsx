import React, { useContext } from 'react';
import styles from './NavBar.module.scss';
import profile from '../../../assets/user-solid.svg';
import { Link, useRouteMatch } from 'react-router-dom';
// CONTEXT
import AppContext from '../../../store/app-context';
// COMPONENTS
import UserDetails from './UserDetails';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

const NavBar = ({ userDetails, setUserDetails, signOutUser }) => {

    const appCtx = useContext(AppContext);
    const match = useRouteMatch();

    const profileIsComplete = Object.values(appCtx.userData).every(x => x !== '');

    return (
        <ul className={styles.list}>
            <Link to={`${match.url}/contacts`} >
                <li className={styles.navItem}><FontAwesomeIcon className={styles.icon} icon='fa-address-book'/></li>
            </Link>
            <Link to={`${match.url}/add-contact`} >
                <li className={styles.navItem}><FontAwesomeIcon className={styles.icon} icon='fa-circle-plus'/></li>
            </Link>
            <li className={styles.navItem}>
                <div className={styles.imgContainer}>
                    <img className={styles.profileImage} src={appCtx.userData.photoURL || profile} alt='userPhoto' height='100' width='100' onClick={() => setUserDetails(true)} />
                    {!profileIsComplete && <div className={styles.alert} />}
                    {userDetails && <UserDetails setUserDetails={setUserDetails} signOutUser={signOutUser} />}
                </div>
            </li>
        </ul>
    );
};
export default NavBar;