import React from 'react';
import { Link as Router } from "react-router-dom";
import { Container, Row, Col } from 'react-bootstrap';

function NewUserProfile(props) {
    const {
        fullName,
        firstName,
        lastName,
        email,
        password,
        profilePic,
        // workExperience,
        specialization,
        position,
        company,
        startDate,
        endDate,
        onSaveInfo,
        onProceedToHomepage } = props;

    return (
        <>
            <div className='wrapper-pd'>
                <Container fluid>
                    <Row>
                        <Col lg={true}>
                            <h2 className='header1'>New User Profile</h2>
                        </Col>
                    </Row>
                    <Row >
                        {profilePic && (
                            <img src={URL.createObjectURL(profilePic)} alt="Profile" className='wrapper2-img' />
                        )}
                    </Row>
                    <hr />
                    <Row xs={1} md={2}>
                        <Col lg={true}>
                            <div className='wrapper2'>
                                <h3 >Personal Details</h3>
                                {/* <img src={URL.createObjectURL(profilePic)} alt="Profile" width="200" height="200" /> */}

                                <p>
                                    <strong>Full Name:</strong> {fullName}
                                </p>
                                {/* <p>
                                    <strong>First Name:</strong> {firstName}
                                </p>
                                <p>
                                    <strong>Last Name:</strong> {lastName} 
                                </p>*/}
                                <p>
                                    <strong>Email:</strong> {email}
                                </p>
                                <p>
                                    <strong>Password:</strong> {password}
                                </p>
                            </div>
                        </Col>

                        <Col>
                            <div className='wrapper2'>
                                <h3 >Work Experience</h3>

                                <p>
                                    <strong>Position:</strong> {position}
                                </p>
                                <p>
                                    <strong>Company:</strong> {company}
                                </p>
                                <p>
                                    <strong>Specializiation:</strong> {specialization}
                                </p>
                                <p>
                                    <strong>Start Date:</strong> {startDate}
                                </p>
                                <p>
                                    <strong>End Date:</strong> {endDate}
                                </p>

                                {/* {workExperience.map((experience) => (
                            <div key={experience.id}>
                                <p>
                                    <strong>Position:</strong> {experience.position}
                                </p>
                                <p>
                                    <strong>Company:</strong> {experience.company}
                                </p>
                                <p>
                                    <strong>Start Date:</strong> {experience.startDate}
                                </p>
                                <p>
                                    <strong>End Date:</strong> {experience.endDate}
                                </p>
                            </div> 
                        ))}*/}
                            </div>
                        </Col>
                    </Row>
                </Container>

                <hr />
                <div className='divbtn'>
                    <Router to="/myprofile">
                        <button className='signup-btn2' onClick={onSaveInfo}> Save Info</button>
                    </Router>
                </div>

            </div>
        </>

    );
}

export default NewUserProfile;