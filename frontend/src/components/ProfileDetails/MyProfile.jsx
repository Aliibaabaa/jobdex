import React, { useState } from 'react';
import '../css/MyProfile.css';
import '../css/myprofile-sidebar.css';
import {
    FaLightbulb,
    FaBars,
    FaBriefcase,
    FaGraduationCap,
    FaUserAlt,
    FaPaperclip
} from "react-icons/fa";
import {
    BsReverseListColumnsReverse
} from "react-icons/bs";
import { NavLink } from 'react-router-dom';
import AddInfo from './AddInfo';
import Education from './Education';
import WorkExp from './WorkExp';
import RightDetails from './RightDetails';
import UploadResume from './UploadResume';
import Footer from '../Footer';
import Skills from './Skills';
// import { SkillsContext } from './SkillsContext';

const MyProfile = ({ children }) => {
    const [isOpen, setIsOpen] = useState(false);
    const toggle = () => setIsOpen(!isOpen);
    const menuItem = [
        {
            path: "/myprofile",
            name: "My Profile",
            icon: <BsReverseListColumnsReverse />
        },
        {
            path: "/prof-workexp",
            name: "Work Experience",
            icon: <FaBriefcase />
        },
        {
            path: "/prof-educ",
            name: "Education",
            icon: <FaGraduationCap />
        },
        {
            path: "/skills",
            name: "Skills and Expertise",
            icon: < FaLightbulb />
        },
        {
            path: "/addinfo",
            name: "AboutMe",
            icon: <FaUserAlt />
        },
        {
            path: "/upresume",
            name: "Uploaded Resume",
            icon: <FaPaperclip />
        }
    ]

    return (
        <>
            <div className='prof-wrapper'>
                <div className='MainProfile1'>
                    <div className="profile-container1" >
                        <div className="top-seg">
                            <div className="user-profile-bg-image">
                                <img id='bg-prf-img' src="https://limitlessdesigns.io/wp-content/uploads/2018/06/facebook-cover-photo-best-practices.jpg" alt="" srcset="" />
                            </div>
                            <div className="user-profile-image">
                                <img id='prf-img' src="https://www.mohenesh.com/wp-content/uploads/2021/11/Doge-meme-2.webp" alt="" srcset="" />
                            </div>
                            <div className="UserName">
                                Put a Sample Name here

                            </div>
                            {/* <div className="UserDetails">
                            Web Developer
                        </div> */}
                        </div>
                    </div>
                </div>
                <div className='MainProfile'>
                    <div className="profile-container" >
                        {/* <div className="top-seg">
                        <div className="user-profile-bg-image">
                            <img id='bg-prf-img' src="https://limitlessdesigns.io/wp-content/uploads/2018/06/facebook-cover-photo-best-practices.jpg" alt="" srcset="" />
                        </div>
                        <div className="user-profile-image">
                            <img id='prf-img' src="https://www.mohenesh.com/wp-content/uploads/2021/11/Doge-meme-2.webp" alt="" srcset="" />
                        </div>
                        <div className="UserName">
                            Ahmed Muhammad Kaur
                        </div>
                        {/* <div className="UserDetails">
                            Web Developer
                        </div> 
                    </div> */}
                        <div className="bottom-seg">
                            <div className="right-side">
                                {/* <RightDetails /> */}
                                <WorkExp />

                            </div>
                            <div className="left-side">
                                <Education />
                                <AddInfo />
                                <UploadResume />
                                {/* <Skills /> */}
                            </div>
                        </div>
                    </div>
                    <div className="container1">
                        <div style={{ width: isOpen ? "200px" : "50px" }} className="sidebar">

                            <div className="top_section">
                                <div style={{ marginLeft: isOpen ? "50px" : "0px" }} className="bars">
                                    <FaBars onClick={toggle} />
                                </div>
                            </div>
                            {
                                menuItem.map((item, index) => (
                                    <NavLink to={item.path} key={index} className="link" activeclassName="active">
                                        <div className="icon">{item.icon}</div>
                                        <div style={{ display: isOpen ? "block" : "none" }} className="link_text">{item.name}</div>
                                    </NavLink>
                                ))
                            }
                        </div>
                    </div>
                </div>


                <div className="main1">{children}</div>


            </div>
        </>
    )
}

export default MyProfile