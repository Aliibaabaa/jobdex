import React from 'react';
import {
    MDBFooter,
    MDBContainer,
    MDBIcon,
    MDBInput,
    MDBCol,
    MDBRow,
    MDBBtn
} from 'mdb-react-ui-kit';
import Container from 'react-bootstrap/esm/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import './css/footer.css';

export default function Footer() {
    return (
        <MDBFooter className='footer_container text-center' color='white'>
            <MDBContainer className='p-4'>
                <p className='pt-2' id='topp'>
                    <strong>Keep in touch with us</strong>
                </p>
                <section className='mb-4'>
                    <MDBBtn outline color="light" floating className='m-1' href='https://www.facebook.com/' role='button'>
                        <MDBIcon fab icon='facebook-f' />
                    </MDBBtn>

                    <MDBBtn outline color="light" floating className='m-1' href='https://www.twitter.com/' role='button'>
                        <MDBIcon fab icon='twitter' />
                    </MDBBtn>

                    <MDBBtn outline color="light" floating className='m-1' href='https://www.google.com/' role='button'>
                        <MDBIcon fab icon='google' />
                    </MDBBtn>

                    <MDBBtn outline color="light" floating className='m-1' href='https://www.instagram.com/' role='button'>
                        <MDBIcon fab icon='instagram' />
                    </MDBBtn>

                    <MDBBtn outline color="light" floating className='m-1' href='https://www.linkedin.com/' role='button'>
                        <MDBIcon fab icon='linkedin-in' />
                    </MDBBtn>

                    <MDBBtn outline color="light" floating className='m-1' href='https://www.github.com/' role='button'>
                        <MDBIcon fab icon='github' />
                    </MDBBtn>
                </section>

                <section className=''>
                    <form action=''>
                        <MDBRow className='d-flex justify-content-center'>
                            <MDBCol size="auto">
                                <p className='pt-2' id='mail'>
                                    <strong>Sign up to receive great offers and event updates straight to your mailbox!</strong>
                                </p>
                            </MDBCol>

                            <MDBCol md='5' start='12'>
                                <MDBInput contrast type='email' label='Email address' className='mb-4' placeholder='Please enter your e-mail address' />
                            </MDBCol>

                            <MDBCol size="auto">
                                <MDBBtn outline color='light' type='submit' className='mb-4'>
                                    Stay informed
                                </MDBBtn>
                            </MDBCol>
                        </MDBRow>
                    </form>
                </section>

                <section className='mb-4'>
                    <p>
                        By clicking the button above, you agree to our Terms of Service and Privacy Policy of our website.
                    </p>
                </section>
                <hr />
                <section className='mb-4' >
                    <Container>
                        <Row>
                            <h5 className='text-uppercase' id='cont'>CONTACT US</h5>
                        </Row>
                        <Row>
                            <Col lg='4' md='5' className='mb-4 mb-md-0' id='col2'>
                                <a href='#!' className='text-white'>
                                    <i class="fa fa-mobile"> </i> +63(2)4171267 / +63(918)8792611  <br />
                                    <i class="fa fa-phone"> </i> (02) 536-6510 / (02) 536-6511
                                </a>
                            </Col>
                            <Col lg='4' md='5' className='mb-4 mb-md-0' id='col2'>
                                <a href='#!' className='text-white'>
                                    <i class="fa fa-envelope"></i> jobdex.ph@gmail.com
                                </a>
                            </Col>
                            <Col lg='4' md='5' className='mb-4 mb-md-0' id='col2'>
                                <a href='#!' className='text-white'>
                                    <i class="fa fa-map-marker"></i>  8th Avenue cor., 35th Street, North Bonifacio Triangle,  Bonifacio Global City, Taguig City 1635
                                </a>
                            </Col>
                        </Row>
                    </Container>
                </section>

                <hr />
                <section className=''>
                    <MDBRow>
                        <MDBCol lg='3' md='5' className='mb-4 mb-md-0'>

                            <p className='ul-p'>
                                <ul className='list-unstyled mb-0' id='col2'>
                                    <li>
                                        <a href='#!' className='text-white'>
                                            Home
                                        </a>
                                    </li>
                                    <li>
                                        <a href='#!' className='text-white'>
                                            My Profile
                                        </a>
                                    </li>
                                </ul></p>
                        </MDBCol>

                        <MDBCol lg='3' md='5' className='mb-4 mb-md-0'>

                            <p className='ul-p'>
                                <ul className='list-unstyled mb-0' id='col2'>
                                    <li>
                                        <a href='#!' className='text-white'>
                                            Company Reviews
                                        </a>
                                    </li>
                                    <li>
                                        <a href='#!' className='text-white'>
                                            Success Stories
                                        </a>
                                    </li>
                                </ul></p>
                        </MDBCol>

                        <MDBCol lg='3' md='5' className='mb-4 mb-md-0'>

                            <p className='ul-p'>
                                <ul className='list-unstyled mb-0' id='col2'>
                                    <li>
                                        <a href='#!' className='text-white'>
                                            FAQs
                                        </a>
                                    </li>
                                    <li>
                                        <a href='#!' className='text-white'>
                                            About Us
                                        </a>
                                    </li>
                                </ul></p>
                        </MDBCol>

                        <MDBCol lg='3' md='5' className='mb-4 mb-md-0'>

                            <p className='ul-p'>
                                <ul className='list-unstyled mb-0' id='col2'>
                                    <li>
                                        <a href='#!' className='text-white'>
                                            Privacy Policy
                                        </a>
                                    </li>
                                    <li>
                                        <a href='#!' className='text-white'>
                                            Terms of Service
                                        </a>
                                    </li>
                                </ul></p>
                        </MDBCol>
                    </MDBRow>
                </section>
            </MDBContainer>

            <div className='text-center p-3' id='copyryt'>
                ©  {new Date().getFullYear()} Copyright:
                <a className='text-white' href='index.html'>
                    <span> JobDex </span>
                </a>
                <span> 247</span>
            </div>
        </MDBFooter>
    );
}