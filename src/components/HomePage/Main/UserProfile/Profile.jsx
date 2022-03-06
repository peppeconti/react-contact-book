import React from 'react';
import styles from './Profile.module.scss';
// BOOTSTRAP COMPS
import Container from 'react-bootstrap/Container';
import Col from 'react-bootstrap/Col';
// COMPONENT
import Card from '../../../UI/Styled-Components/Card';
import UserProfilForm from './UserProfileForm';

const Profile = (props) => {

    return (
        <div className={styles['overflow-visible']}>
            <Container className='h-100 d-flex justify-content-center align-items-center' fluid='sm'>
                <Col className={styles['form-container']} xs={12}>
                    <Card dark='#a7b7db' light='#d5e0f9' vertical edges>
                        <UserProfilForm {...props} />
                    </Card>
                </Col>
            </Container>
        </div>
    )
}
export default Profile;