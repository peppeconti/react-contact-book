import React, { Fragment, useContext } from 'react';
import styles from './UserDetails.module.scss';
import profile from '../../../assets/user-solid.svg';
import { Link, useRouteMatch } from 'react-router-dom';
// CONTEXT
import AppContext from '../../../store/app-context';
// COMPONENTS
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

const ProfileImage = () => {

    const appCtx = useContext(AppContext);

    return (
        <div className={styles.userImageContainer}>
            <img className={styles.userDetailsImage} src={appCtx.userData.photoURL || profile} alt='userPhoto' height='100' width='100' />
        </div>
    );
};

const UserName = ({ appCtx }) => {
    return (
        <div className={styles.userNameContainer}>
            {appCtx.userData.displayName ? <p className={styles.displayName}>{appCtx.userData.displayName}</p> : <p className={styles.displayName}>{appCtx.userData.email.slice(0, appCtx.userData.email.indexOf('@'))}</p>}
            {(appCtx.userData.firstName && appCtx.userData.lastName) && <p className={styles.userFullName}>({appCtx.userData.firstName + ' ' + appCtx.userData.lastName})</p>}
        </div>
    );
};

const Settings = () => {
    return (
        <div className={styles.settings}>
            <FontAwesomeIcon className={styles['settings-icon']} icon='cog' />
        </div>
    );
};

const LogoutButton = ({ text, signOutUser }) => {

    return (
        <div className={styles.buttonContainer}>
            <button className={styles.logout} type="button" onClick={signOutUser}>{text}</button>
        </div>
    );
};

const Backdrop = ({ setUserDetails }) => {
    return (
        <div className={styles.backdrop} onClick={() => setUserDetails(false)}></div>
    );
};

const UserDetails = ({ setUserDetails, signOutUser }) => {

    const appCtx = useContext(AppContext);
    const match = useRouteMatch();

    return (
        <Fragment>
            <div className={styles.profileData}>
                <ul className={styles.detailsList}>
                    <li className={styles.item}><ProfileImage /></li>
                    <li className={styles.item}><UserName appCtx={appCtx} /></li>
                    <Link to={`${match.url}/profile`} onClick={() => setUserDetails(false)}>
                        <li className={styles.item}><Settings /></li>
                    </Link>
                    <li className={styles.item}><LogoutButton text='Logout' signOutUser={signOutUser} /></li>
                </ul>
            </div>
            <Backdrop setUserDetails={setUserDetails} />
        </Fragment >
    );
};

export default UserDetails;