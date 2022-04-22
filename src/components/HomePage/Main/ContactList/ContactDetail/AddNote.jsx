import React from 'react';
import styles from './AddNote.module.scss';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';


const AddNote = ( { submitHandler, enteredNoteText, setEnteredNoteText, binActive, bin } ) => {
    return (
        <div className={styles['sub-container']}>
            <form className={styles.form} onSubmit={submitHandler}>
                <label className={styles.label} htmlFor='noteText'></label>
                <textarea className={styles['note-input']} id="noteText" name="noteText" rows="4" cols="50" onChange={setEnteredNoteText} value={enteredNoteText} maxLength='40' />
                <button className='add-note' type='submit'>Add note</button>
            </form>
            <div ref={bin} className={binActive ? `${styles.bin} ${styles.active}` : styles.bin}><FontAwesomeIcon className={styles['bin-icon']} icon='trash' /></div>
        </div>
    )
}
export default AddNote;