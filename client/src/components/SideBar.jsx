import { Navbar, Nav, Container } from 'react-bootstrap'
import { NavLink, useNavigate } from 'react-router-dom'
import useAuth from '../hooks/useAuth'

const SideBar = () => {
    const { isAuth, logoutUser } = useAuth();

    const navigate = useNavigate();

    const handleLogout = () => {
        logoutUser();
        navigate('/')
    }

    return (
        <Navbar collapseOnSelect expand="lg" bg="dark" variant="dark">
            <Container>
                <Navbar.Brand to='/' as={NavLink}>Realtime Chat App</Navbar.Brand>
                <Navbar.Toggle aria-controls="responsive-navbar-nav" />
                <Navbar.Collapse id="responsive-navbar-nav">
                    <Nav className="me-auto">
                        <Nav.Link to='/' as={NavLink}>Home</Nav.Link>
                        {
                            isAuth &&
                            <Nav.Link to='/chats' as={NavLink}>Chats</Nav.Link>
                        }
                    </Nav>
                    {
                        isAuth &&
                        <Nav>
                            <Nav.Link onClick={handleLogout}>Logout</Nav.Link>
                        </Nav>
                    }
                </Navbar.Collapse>
            </Container>
        </Navbar>
    )
}

export default SideBar
