import React from 'react';
import styles from './NoteList.module.scss';
// COMPONENT
import Note from './Note';


const NoteList = ({ notes, bin, removeNote, setBinActive }) => {

    return (
        <ul className={styles['note-list']}>
            {notes.map((note) => (
                <Note
                    key={note.id}
                    id={note.id}
                    text={note.text}
                    bin={bin}
                    removeNote={removeNote}
                    setBinActive={setBinActive}
                />
            ))}
        </ul>
    )
}
export default NoteList;