import React, { useState } from 'react';
import PersonalDetails from './PersonalDetails';
import WorkExperience from './WorkExperience';
import NewUserProfile from './NewUserProfile';

function NewUser() {
    const [step, setStep] = useState(1);
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [address, setAddress] = useState('');
    const [specialization, setSpecialization] = useState('');
    const [country, setCountry] = useState('');
    const [nationality, setNationality] = useState('');
    const [skills, setSkills] = useState('');
    const [position, setPosition] = useState('');
    const [company, setCompany] = useState('');
    const [startDate, setStartDate] = useState('');
    const [endDate, setEndDate] = useState('');
    const [profilePic, setProfilePic] = useState(null);
    const [resume, setResume] = useState(null);

    const handleNext = () => {
        setStep(step + 1);
    };

    const handleBack = () => {
        setStep(step - 1);
    };

    // const handleSubmit = () => {
    //     const formData = {
    //         firstName,
    //         lastName,
    //         email,
    //         password,
    //         address,
    //         specialization,
    //         country,
    //         nationality,
    //         skills,
    //         profilePic,
    //     };

    //     console.log(formData);
    // };

    switch (step) {
        case 1:
            return (
                <PersonalDetails
                    onNext={handleNext}
                    onBack={handleBack}
                    firstName={firstName}
                    setFirstName={setFirstName}
                    lastName={lastName}
                    setLastName={setLastName}
                    email={email}
                    setEmail={setEmail}
                    password={password}
                    setPassword={setPassword}
                    profilePic={profilePic}
                    setProfilePic={setProfilePic}
                    country={country}
                    setCountry={setCountry}
                    nationality={nationality}
                    setNationality={setNationality}
                    skills={skills}
                    setSkills={setSkills}
                    address={address}
                    setAddress={setAddress}
                    resume={resume}
                />
            );
        case 2:
            return (
                <WorkExperience
                    onNext={handleNext}
                    onBack={handleBack}
                    specialization={specialization}
                    setSpecialization={setSpecialization}
                    position={position}
                    setPosition={setPosition}
                    company={company}
                    setCompany={setCompany}
                    startDate={startDate}
                    setStartDate={setStartDate}
                    endDate={endDate}
                    setEndDate={setEndDate}
                    skills={skills}
                    setSkills={setSkills}
                    profilePic={profilePic}
                    setProfilePic={setProfilePic}
                    resume={resume}
                />
            );
        case 3:
            return (
                <NewUserProfile
                    onPrevious={handleBack}
                    firstName={firstName}
                    lastName={lastName}
                    email={email}
                    password={password}
                    address={address}
                    specialization={specialization}
                    country={country}
                    nationality={nationality}
                    skills={skills}
                    profilePic={profilePic}
                    setProfilePic={setProfilePic}
                    resume={resume}
                    setResume={setResume}
                />
            );
        default:
            return null;
    }
}

export default NewUser;
