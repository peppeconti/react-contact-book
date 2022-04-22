import React from 'react';
import { Link, useRouteMatch } from 'react-router-dom';
import styles from './Logo.module.scss';
// COMPONENTS
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

const Logo = () => {

    const match = useRouteMatch();

    return (
        <h1 className={styles.logo}>
             <Link to={`${match.url}`} >
                <FontAwesomeIcon className={styles.icon} icon='fa-house'/>
            </Link>
        </h1>
    )
}
export default Logo;