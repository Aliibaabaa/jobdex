import React from 'react'
import '../css/addinfo.css';

export default function AddInfo() {
    return (
        <div className='Userinfo-main-cont'>
            <h4>User Info</h4>
            <hr id="hr_info" />
            <div className="info-container">
                <div className="birthday">
                    <h6>Email:</h6>
                    <h5>January 1, 1111</h5>
                </div>
                <div className="birthday">
                    <h6>Contact Number:</h6>
                    <h5>January 1, 1111</h5>
                </div>
                {/* <div className="birthday">
                    <h6>Birthday:</h6>
                    <h5>January 1, 1111</h5>
                </div>
                <div className="address">
                    <h6>Address:</h6>
                    <h5>Philippines</h5>
                </div>
                <div className="nationality">
                    <h6>Nationality</h6>
                    <h5>College University</h5>
                </div> */}
                <div className="country">
                    <h6>Country:</h6>
                    <h5>Philippines</h5>

                </div>
            </div>
        </div>
    )
}
