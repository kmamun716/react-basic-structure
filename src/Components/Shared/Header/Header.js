import React, { useContext } from 'react';
import { Container, Nav, Navbar } from 'react-bootstrap';
import { LinkContainer } from 'react-router-bootstrap';
import { useLocation } from 'react-router-dom';
import { userContext } from '../../../App';

const Header = ({handleLogOut}) => {
    const [loggedInUser] = useContext(userContext);
    let location = useLocation();
    return (
        <div>
            <Navbar bg="primary" variant="dark">
                <Container>
                    <LinkContainer to="/"><Navbar.Brand>Home</Navbar.Brand></LinkContainer>
                    <Nav className="me-auto">
                        {
                            loggedInUser.isLoggedIn? 
                                <Nav.Link onClick={handleLogOut}>Logout</Nav.Link> : 
                                location.pathname !=="/login" && <LinkContainer to="/login">
                                <Nav.Link>Login</Nav.Link>
                            </LinkContainer>
                        }  
                        <LinkContainer to="/test">
                                <Nav.Link>Protect Page</Nav.Link>
                            </LinkContainer>               
                    </Nav>
                </Container>
            </Navbar>
        </div>
    );
};

export default Header;