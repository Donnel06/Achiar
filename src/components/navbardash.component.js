import React, { useEffect, useState } from "react";

import axios from "axios";
import { useDispatch } from "react-redux";
import { getUser } from "../actions/user.actions";
import { Navbar, Container, Nav, NavDropdown, Button } from 'react-bootstrap';
import { Link } from 'react-router-dom'
import '../styles/styles.css';
import Logout from "./logout.component";


const Navdash = () => {
    const [uid, setUid] = useState(null);
  const dispatch = useDispatch();

  useEffect(() => {
    const fetchToken = async () => {
      await axios({
        method: "get",
        url: `${process.env.REACT_APP_API_URL}jwtid`,
        withCredentials: true,
      })
        .then((res) => {
          setUid(res.data);
        })
        .catch((err) => console.log("No token"));
    };
    fetchToken();

    if (uid) dispatch(getUser(uid));
  }, [uid, dispatch]);

    return (
        <div>
            <Navbar expand="lg" bg="light">
                <Container>
                    <Navbar.Brand href="/Dashbord">Dashboard</Navbar.Brand>
                    <Navbar.Toggle aria-controls="navbarScroll" />
                    <Navbar.Collapse id="navbarScroll">
                        <Nav className="me-auto my-2 my-lg-0" style={{ maxHeight: '100px' }} navbarScroll>
                            <li className="nav-item">
                                <Link className="nav-link" to={'/Dashbord'}>
                                    <Button variant="outline-primary" class="btn btn-outline-primary">Users</Button>
                                </Link>
                            </li>
                            <li className="nav-item">
                                <Link className="nav-link" to={'/add-user'}>
                                    <Button variant="outline-primary" class="btn btn-outline-primary">Add +</Button>
                                </Link>
                            </li>
                            {uid ? (
                                <NavDropdown title="Compte" id="navbarScrollingDropdown">
                                    <NavDropdown.Item href="/profil">Profil</NavDropdown.Item>
                                    <Logout/>
                                </NavDropdown>
                            ) : (
                                <>
                                    <ul className="navbar-nav ml-auto">
                                        <li className="nav-item">
                                            <Link className="nav-link" to={'/sign-in'}>
                                                <Button variant="outline-primary" class="btn btn-outline-primary">Login</Button>
                                            </Link>
                                        </li>
                                    </ul>
                                </>
                            )}
                        </Nav>
                    </Navbar.Collapse>
                </Container>
            </Navbar>
        </div>
    );
};

export default Navdash;