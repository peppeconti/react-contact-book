import React from 'react';
import styles from './AddContact.module.scss';
// BOOTSTRAP COMPS
import Container from 'react-bootstrap/Container';
import Col from 'react-bootstrap/Col';
// COMPONENT
import Card from '../../../UI/Styled-Components/Card';
import AddContactForm from './AddContactForm';

const AddContact = (props) => {

    return (
        <div className={styles['overflow-visible']}>
            <Container className='h-100 d-flex justify-content-center align-items-center' fluid='sm'>
                <Col className={styles['form-container']} xs={12}>
                    <Card dark='#8bbc94' light='#b7ffc4' vertical edges>
                        <AddContactForm {...props} />
                    </Card>
                </Col>
            </Container>
        </div>
    )
}
export default AddContact;