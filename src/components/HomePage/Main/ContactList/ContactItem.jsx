import styles from './ContactItem.module.scss';
import default_profile from '../../../../assets/user-solid.svg';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Link } from 'react-router-dom';

const OpenDetailsButton = ({ color, id }) => {

    const background_color = {
        backgroundColor: color || '#f35252'
    }

    return (
        <div className={styles.buttonContainer}>
            <Link to={`contact/${id}`}>
                <button className={styles.details} type="button" style={background_color}>Details</button>
            </Link>
        </div>
    );
};

const ContactItem = (props) => {

    const remove = () => {
        props.removeItem(props.id);
    };

    const background_color = {
        backgroundColor: props.color || 'red'
    }

    return (
        <li className={styles.item} style={background_color}>
            <div className={styles.wrapper}>
                <div className={styles.imgContainer}>
                    <img className={styles.itemImg} src={props.photoURL || default_profile} alt='contact' />
                    {+props.notes !== 0 && <p className={styles['note-alert']}>{props.notes}</p>}
                </div>
                <div className={styles.basicInfo}>
                    <p className={styles.name}>{props.firstName}{props.lastName ? ` ${props.lastName}` : ''}</p>
                    <p className={styles.phone}><span><FontAwesomeIcon className={styles['phone-icon']} icon='phone-alt' /></span>{props.phoneNumber}</p>
                </div>
                <OpenDetailsButton color={props.colorButton} id={props.id} />
            </div>
            <button type='button' className={styles.remove} onClick={remove}><FontAwesomeIcon className={styles['circle-xmark']} icon='circle-xmark' /></button>
        </li>
    );
};

export default ContactItem;