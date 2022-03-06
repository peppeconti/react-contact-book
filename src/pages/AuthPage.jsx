import React from 'react';
import styles from './AuthPage.module.scss';
// ASSETS
import background from '../assets/background.svg';
// BOOTSTRAP COMPS
import Container from 'react-bootstrap/Container';
import Col from 'react-bootstrap/Col';
// COMPS
import AuthForm from '../components/AuthPage/AuthForm';
import Card from '../components/UI/Styled-Components/Card';

const AuthPage = (props) => {

    const background_style = {
        background: `url(${background}) no-repeat center center`,
        backgroundSize: 'cover'
    }

    return (
        <div className={styles['overflow-hidden']} style={background_style}>
            <Container className='vh-100 d-flex justify-content-center align-items-center' fluid='sm'>
                <Col className={styles['form-container']} xs={12}>
                    <Card dark='#a7b7db' light='#d5e0f9' edges>
                        <AuthForm {...props} />
                    </Card>
                </Col>
            </Container>
        </div>
    );
}

export default AuthPage;
