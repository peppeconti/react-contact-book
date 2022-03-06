import React from 'react';
import styles from './Preloader.module.scss';
// ASSETS
import background_img from '../../assets/background.svg';
import pencil_img from '../../assets/pencil.svg';

const Preloader = () => {

    const background = {
        background: `url(${background_img}) no-repeat center center`,
        backgroundSize: 'cover'
    }

    const pencil = {
        background: `url(${pencil_img}) no-repeat center center`,
        backgroundSize: 'contain'
    }

    return (
        <div className={styles.preloader} style={background}>
            <div className={styles['animation-container']}>
                <div className={styles.pencil} style={pencil} />
                <div className={styles.line} />
            </div>
        </div>
    );
}

export default Preloader;