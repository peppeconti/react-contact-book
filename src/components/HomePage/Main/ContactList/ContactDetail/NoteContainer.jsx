import React from 'react';
import styles from './NoteContainer.module.scss';
import NoteList from './NoteList';

const NoteContainer = ({ removeNote, setBinActive, bin, notes }) => {
    return (
        <div className={styles['sub-container']}>
            <NoteList notes={notes} bin={bin} removeNote={removeNote} setBinActive={setBinActive} />
        </div>
    )
}
export default NoteContainer;