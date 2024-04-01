import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import Button from 'react-bootstrap/Button';
import Container from 'react-bootstrap/Container';
import Form from 'react-bootstrap/Form';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';
import { UidContext } from "../Appcontent";
import { useSelector } from "react-redux";
import Logout from './logout.component';
import { NavLink } from "react-router-dom";
import { useNavigate } from 'react-router-dom';


const Navbars = () => {
    const uid = useContext(UidContext);
    const userData = useSelector((state) => state.userReducer);
    const navigate = useNavigate();

    const handleDashbordRedirect = () => {
        if (!userData._id) {
            navigate('/sign-in');
        } else if (userData.role === 'ADMIN' || userData.role === 'SOUS-ADMIN') {
            navigate('/Dashbord');
        } else {
            navigate('/');
        }
    };

    return (
        <>
            <Navbar expand="lg" className="navbar-light bg-body-tertiary">
                <Container fluid>
                    <Navbar.Brand href="/"><Button variant="outline-success">ACHIAR</Button></Navbar.Brand>

                    <Navbar.Toggle aria-controls="navbarScroll" />
                    <Navbar.Collapse id="navbarScroll">

                        <Nav
                            className="me-auto my-2 my-lg-0"
                            style={{ maxHeight: '100px' }}
                            navbarScroll
                        >
                            {userData._id && (userData.role === 'ADMIN' || userData.role === 'SOUS-ADMIN') && (
                                <Nav.Link onClick={handleDashbordRedirect}>Dashbord</Nav.Link>
                            )}
                            <NavDropdown title="A Propos" id="navbarScrollingDropdown">
                                <NavDropdown.Item href="#action3">Action</NavDropdown.Item>
                                <NavDropdown.Item href="#action4">
                                    Another action
                                </NavDropdown.Item>
                                <NavDropdown.Item href="#action5">
                                    Something else here
                                </NavDropdown.Item>
                            </NavDropdown>
                            <Nav.Link href="#" >
                                Nous Contactez
                            </Nav.Link>
                            <Form className="d-flex">
                                <Form.Control
                                    type="search"
                                    placeholder="Search"
                                    className="me-2"
                                    aria-label="Search"
                                />
                                <Button variant="outline-success">Search</Button>
                            </Form>
                        </Nav>

                        {userData._id ? (
                            <ul>
                                <h5><span>Bienvenue</span>  <NavLink exact to="/profil">{userData.pseudo}</NavLink></h5>
                                <Logout />
                            </ul>
                        ) : (
                            <ul className="navbar-nav ml-auto">
                                <li className="nav-item">
                                    <Link className="nav-link" to={'/sign-in'}>
                                        <Button variant="outline-primary" class="btn btn-outline-primary"><img src="./img/icons/login.svg" alt="login" /></Button>
                                    </Link>
                                </li>
                            </ul>
                        )}



                    </Navbar.Collapse>
                </Container>
            </Navbar>
        </>
    )
}
export default Navbars;
