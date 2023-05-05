import React from 'react';
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import Button from 'react-bootstrap/Button';
import './css/Navbarr.css';
import logoo1 from './images/sample-logo.png'
import Image from 'react-bootstrap/Image'
import { Link } from "react-router-dom";
import { useNavigate } from 'react-router-dom';

function Navbarr() {
  const navigate = useNavigate();

  function handleclick() {
    navigate("/signin")
  }
  return (
    <Navbar collapseOnSelect expand="lg" variant="dark" id="nav-cont" className='h-navbar'>
      <Container>
        <Navbar.Brand href="/joblist">
          <Image className="logo" src={logoo1} responsive />
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="responsive-navbar-nav" >
          <i class="fa-solid fa-bars"></i>
        </Navbar.Toggle>
        <Navbar.Collapse id="responsive-navbar-nav">
          <Nav className="me-auto" id="nav-list">
            {/* <Link to="/" className='navlinkk'>Home</Link> */}
            <Link to="/joblist" className='navlinkk'>Job Search</Link>
            {/* <Link to="/myprofile" className='navlinkk'>My Profile</Link> */}
            <Link to="#" className='navlinkk'>Company Reviews</Link>
          </Nav>

          <Nav>
            {/* <Link to="/signin">
              <Button variant="light" className='signInBtn' id='signinbtn'>
                <i className="fa fa-user"></i> Sign in
              </Button>
            </Link> */}

            <Button variant="light" className='signInBtn' id='signinbtn' onClick={handleclick}>
              <i class="fa fa-user"></i> Sign in
            </Button>

            <Link to="#">
              <Button variant="light" className='employersBtn' id='employersBtn' >
                <i class="fas fa-address-book"></i> For Employers
              </Button>
            </Link>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

export default Navbarr;