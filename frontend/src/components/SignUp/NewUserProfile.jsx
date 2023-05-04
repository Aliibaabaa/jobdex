import React from 'react';
import { Link as Router } from "react-router-dom";

function NewUserProfile(props) {
    const { firstName, lastName, email, password, profilePic, workExperience, onSaveInfo, onProceedToHomepage } = props;

    return (
        <div>
            <h2>New User Profile</h2>
            <div>
                <h3>Personal Details</h3>
                {/* <img src={URL.createObjectURL(profilePic)} alt="Profile" width="200" height="200" /> */}
                {profilePic && (
                    <img src={URL.createObjectURL(profilePic)} alt="Profile" width="200" height="200" />
                )}
                <p>
                    <strong>First Name:</strong> {firstName}
                </p>
                <p>
                    <strong>Last Name:</strong> {lastName}
                </p>
                <p>
                    <strong>Email:</strong> {email}
                </p>
                <p>
                    <strong>Password:</strong> {password}
                </p>
            </div>
            <div>
                {workExperience && (
                    <div>
                        <h3>Work Experience</h3>
                        {workExperience.map((experience) => (
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
                        ))}
                    </div>
                )}
            </div>
            <Router to="/myprofile">
                <button onClick={onSaveInfo}>Save Info</button>
            </Router>

        </div>
    );
}

export default NewUserProfile;