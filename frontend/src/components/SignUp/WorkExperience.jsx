import React from 'react';
import '../css/personaldetails.css';
import { BsArrowLeftShort, BsArrowRightShort } from 'react-icons/bs';

function WorkExperience(props) {
    const {
        onNext,
        onBack,
        specialization,
        setSpecialization,
        skills,
        setSkills,
        position,
        setPosition,
        company,
        setCompany,
        startDate,
        setStartDate,
        endDate,
        setEndDate,
        setProfilePic,
    } = props;

    const handleSubmit = (event) => {
        event.preventDefault();
        onNext();
    };

    const handleBack = () => {
        onBack();
    };

    const handleProfilePicChange = (event) => {
        const file = event.target.files[0];
        const objectUrl = URL.createObjectURL(file);
        setProfilePic(objectUrl);
    };

    return (
        <>
            <div className='wrapper-pd'>
                <h2 className='header1' >Work Experience</h2>
                <form onSubmit={handleSubmit} className='wrapper2-pd'>
                    <div>
                        <label htmlFor="specialization">Specialization:</label>
                        <input
                            type="text"
                            id="specialization"
                            name="specialization"
                            value={specialization}
                            onChange={(event) => setSpecialization(event.target.value)}
                            required
                        />
                    </div>
                    {/* <div>
                        <label htmlFor="skills">Skills:</label>
                        <input
                            type="text"
                            id="skills"
                            name="skills"
                            value={skills}
                            onChange={(event) => setSkills(event.target.value)}
                            required
                        />
                    </div> */}
                    <div>
                        <label htmlFor="position">Position:</label>
                        <input type="text" id="position" name="position" value={position} onChange={(event) => setPosition(event.target.value)} required />
                    </div>
                    <div>
                        <label htmlFor="company">Company:</label>
                        <input type="text" id="company" name="company" value={company} onChange={(event) => setCompany(event.target.value)} required />
                    </div>
                    <div>
                        <label htmlFor="startDate">Start Date:</label>
                        <input type="date" id="startDate" name="startDate" value={startDate} onChange={(event) => setStartDate(event.target.value)} required />
                    </div>
                    <div>
                        <label htmlFor="endDate">End Date:</label>
                        <input type="date" id="endDate" name="endDate" value={endDate} onChange={(event) => setEndDate(event.target.value)} required />
                    </div>
                    <div></div>
                    {/* <div>
                    <label htmlFor="profilePic">Profile Picture:</label>
                    <input type="file" id="profilePic" name="profilePic" onChange={handleProfilePicChange} />
                </div> */}
                    <div className='divbtn'>
                        <button type="button" onClick={onBack} className='signup-btn'>
                            <BsArrowLeftShort /> Back
                        </button>
                        <button type="submit" className='signup-btn'>Next <BsArrowRightShort /></button>
                    </div>

                </form>
            </div>
        </>

    );
}

export default WorkExperience;