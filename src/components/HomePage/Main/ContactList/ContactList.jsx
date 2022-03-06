import React from 'react';
import styles from './ContactList.module.scss';
// COMPONENT
import ContactItem from './ContactItem';

const ContactList = ({ items, removeItem }) => {

  const manageColor = (index, el) => {
    // rosa
    if (index % 3 === 0 && el === 'card') {
      return '#ecb2ba';
    }
    if (index % 3 === 0 && el === 'button') {
      return '#f35252';
    }
    // verde
    if (index % 2 === 0 && el === 'card') {
      return '#9CD6A6';
    }
    if (index % 2 === 0 && el === 'button') {
      return '#6dc67d';
    }
    // azzurro
    if (index % 1 === 0 && el === 'card') {
      return '#a7b7db';
    }
    if (index % 1 === 0 && el === 'button') {
      return '#557acf';
    }
  };

  const countNotes = (notes) => {
    if (notes) {
      const noteNumber = Object.keys(notes).length.toString();
      return noteNumber;
    } else {
      return '0';
    }
  }

  return (
    <ul className={styles.contactList}>
      {items.map((item, index) => (
        <ContactItem
          key={item.id}
          id={item.id}
          photoURL={item.photoURL}
          firstName={item.firstName}
          lastName={item.lastName}
          phoneNumber={item.phoneNumber}
          removeItem={removeItem}
          color={manageColor(index, 'card')}
          colorButton={manageColor(index, 'button')}
          notes={countNotes(item.notes)}
        />
      ))}
    </ul>
  )
}
export default ContactList;