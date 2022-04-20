import React, { useState } from 'react';
import styles from './Note.module.scss';
import { useGesture } from '@use-gesture/react';

const Note = ({ boundaries, text, bin, removeNote, id, setBinActive }) => {

    const [notePosition, setNotePosition] = useState({ x: 0, y: 0 });
    const [noteOffset, setNoteOffset] = useState({ x: undefined, y: undefined });
    const [noteSize, setNoteSize] = useState({ width: undefined, height: undefined });
    const [binIsTargeted, setBinIsCenterd] = useState(false);

    const dragActive = (state) => {
        
        setNotePosition({
            x: state.offset[0],
            y: state.offset[1]
        });
        setNoteSize({
            width: state.currentTarget.clientWidth,
            height: state.currentTarget.clientHeight
        });
        setNoteOffset({
            x: (state.currentTarget.offsetLeft + (noteSize.width / 2)),
            y: (state.currentTarget.offsetTop + (noteSize.height / 2))
        });
        const binPositionX = bin.current.offsetLeft + (bin.current.clientWidth / 2);
        const binPositionY = bin.current.offsetTop + (bin.current.clientHeight / 2);
        setBinIsCenterd((Math.abs(binPositionX - noteOffset.x) < 60) && (Math.abs(binPositionY - noteOffset.y) < 60));
        binIsTargeted ? setBinActive(true) : setBinActive(false);
    };

    const dragEnd = () => {
        if (binIsTargeted) {
            removeNote(id);
            setBinActive(false);
        }
    };

    
    const dragOptions = {
        bounds: boundaries
    }

    const bindNotePosition = useGesture(
        {
          onDrag: (state) => dragActive(state),
          onDragEnd: () => dragEnd(),
        },
        { drag: dragOptions }
      )

    return (
        <li {...bindNotePosition()} style={
            {
                position: 'relative',
                top: notePosition.y,
                left: notePosition.x
            }
        } className={binIsTargeted ? `${styles['draggable-note']} ${styles.drop}` : styles['draggable-note']}>
            <p>{text}</p>
        </li>
    )
}
export default Note;