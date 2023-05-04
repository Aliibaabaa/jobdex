import React from 'react'
import '../css/workexp.css'

const WorkExp = () => {
    return (
        <div className='Post-Cont'>
            <div className="headPortion">
                <div className="user-info-portion">
                    <div className="user-avatar"></div>
                    <div className="user-info">
                        <div className="userName">Work Experience</div>
                        <hr />
                    </div>
                </div>
                <div className="post-desc">
                </div>
            </div>

            <div className="bodyPortion">
                <h5> Position </h5>
                <h6> Company Name </h6>
                <h6> Joined Duration </h6>
                <p> Job Description/Roles
                    <ul>
                        <li>Sample Role</li>
                        <li>Sample Achievement</li>
                        <li>Sample Experience Description</li>
                    </ul>
                </p>
            </div>
            <hr id="hr-post" />

            <div className="bodyPortion">
                <h5> Position </h5>
                <h6> Company Name </h6>
                <h6> Joined Duration </h6>
                <p> Job Description/Roles
                    <ul>
                        <li>Sample Role</li>
                        <li>Sample Achievement</li>
                        <li>Sample Experience Description</li>
                    </ul>
                </p>
            </div>
            <hr id="hr-post" />

            <div className="bodyPortion">
                <h5> Position </h5>
                <h6> Company Name </h6>
                <h6> Joined Duration </h6>
                <p> Job Description/Roles
                    <ul>
                        <li>Sample Role</li>
                        <li>Sample Achievement</li>
                        <li>Sample Experience Description</li>
                    </ul>
                </p>
            </div>
            <hr id="hr-post" />

            <div className="footerP">
                <div className="postCreateDate">
                    Last updated: 2 days ago
                </div>
                <div className="addInf"></div>
            </div>

        </div>
    )
}

export default WorkExp
