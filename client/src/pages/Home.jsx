import React, { useEffect, useState } from 'react'
import { Container, Button } from 'react-bootstrap'
import { useNavigate } from 'react-router-dom';
import useAuth from '../hooks/useAuth'
import LoginModal from '../components/LoginModal';
import SignUpModal from '../components/SignUpModal';

const Home = () => {
    const { isAuth,
        closeModal,
        activeUser } = useAuth();

    const [showLogin, setShowLogin] = useState(false);
    const [showSignUp, setShowSignUp] = useState(false);

    const navigate = useNavigate();

    useEffect(() => {
        handleCloseSignUp();
        handleCloseLogin();
    }, [closeModal])

    const handleCloseLogin = () => setShowLogin(false);
    const handleShowLogin = () => setShowLogin(true);
    const handleCloseSignUp = () => setShowSignUp(false);
    const handleShowSignUp = () => setShowSignUp(true);

    return (
        <Container className='mt-5 pt-5 container'>
            <h1 className='display-6'>Hi {!isAuth ? 'Guest' : activeUser.name},</h1>
            <h1 className='display-1 pt-5 mt-3 text-center welcome'>Welcome to Realtime Chat App</h1>
            {
                !isAuth &&
                <Container className='text-center display-6 fs-3 bg-tranparent pt-3 pb-4 w-50 border-none pets-page'>
                    <Button className='mt-3' variant="outline-dark" onClick={handleShowLogin} >
                        Login here!
                    </Button>

                    <Button className='mt-3' variant="outline-dark" onClick={handleShowSignUp} >
                        Sign Up Today!
                    </Button>
                </Container>
            }
            <LoginModal show={showLogin} handleClose={handleCloseLogin} />
            <SignUpModal show={showSignUp} handleClose={handleCloseSignUp} />

        </Container>
    )
}

export default Home
