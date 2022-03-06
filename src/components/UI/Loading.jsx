import React from 'react';
import styles from './Loading.module.scss';


const Loading = () => {

    return (
        <div className={styles.loading}>
            <div className={styles.dot1}></div>
            <div className={styles.dot2}></div>
        </div>
    )
}
export default Loading;