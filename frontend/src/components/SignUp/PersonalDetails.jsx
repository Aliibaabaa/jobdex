import React from 'react';

function PersonalDetails(props) {
    const {
        onNext,
        firstName,
        setFirstName,
        lastName,
        setLastName,
        address,
        setAddress,
        country,
        setCountry,
        nationality,
        setNationality,
        skills,
        setSkills,
        email,
        setEmail,
        password,
        setPassword,
        profilePic,
        setProfilePic,
    } = props;

    const handleSubmit = (event) => {
        event.preventDefault();
        onNext();
    };

    // const handleProfilePicChange = (event) => {
    //     const file = event.target.files[0];
    //     const reader = new FileReader();

    //     reader.readAsDataURL(file);

    //     reader.onload = (e) => {
    //         setProfilePic(e.target.result);
    //     };
    // };


    const handleProfilePicChange = (event) => {
        setProfilePic(event.target.files[0]);
    };

    const handleSaveProfile = () => {
        const profilePic = URL.createObjectURL(profilePic);
        const profile = { firstName, lastName, email, password, profilePic };
        console.log(profile);
    };

    return (
        <div>
            <h2>Personal Details</h2>
            <form onSubmit={handleSubmit}>
                <div>
                    <label htmlFor="firstName">First Name:</label>
                    <input
                        type="text"
                        id="firstName"
                        name="firstName"
                        value={firstName}
                        onChange={(event) => setFirstName(event.target.value)}
                        required
                    />
                </div>
                <div>
                    <label htmlFor="lastName">Last Name:</label>
                    <input
                        type="text"
                        id="lastName"
                        name="lastName"
                        value={lastName}
                        onChange={(event) => setLastName(event.target.value)}
                        required
                    />
                </div>
                <div>
                    <label htmlFor="email">Email:</label>
                    <input
                        type="email"
                        id="email"
                        name="email"
                        value={email}
                        onChange={(event) => setEmail(event.target.value)}
                        required
                    />
                </div>
                <div>
                    <label htmlFor="password">Password:</label>
                    <input
                        type="password"
                        id="password"
                        name="password"
                        value={password}
                        onChange={(event) => setPassword(event.target.value)}
                        required
                    />
                </div>
                <div>
                    <label htmlFor="profilePic">Profile Picture:</label>
                    {/* <input
                        type="file"
                        id="profilePic"
                        name="profilePic"
                        accept="image/*"
                        onChange={handleProfilePicChange}
                        required
                    /> */}
                    <input type="file" accept="image/*" onChange={handleProfilePicChange} />
                </div>
                <div>
                    <label htmlFor="address">Address:</label>
                    <input
                        type="text"
                        id="address"
                        name="address"
                        value={address}
                        onChange={(event) => setAddress(event.target.value)}
                        required
                    />
                </div>
                <div>
                    <label htmlFor="country">Country:</label>
                    <input
                        type="text"
                        id="country"
                        name="country"
                        value={country}
                        onChange={(event) => setCountry(event.target.value)}
                        required
                    />
                </div>
                <div>
                    <label htmlFor="nationality">Nationality:</label>
                    <input
                        type="text"
                        id="nationality"
                        name="nationality"
                        value={nationality}
                        onChange={(event) => setNationality(event.target.value)}
                        required
                    />
                </div>
                <button type="submit">Next</button>
            </form>
        </div>
    );
}

export default PersonalDetails;