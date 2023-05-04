import React, { useState } from 'react';

function Skills() {
    const [skills, setSkills] = useState([]);
    const [expertise, setExpertise] = useState('');

    const handleExpertiseChange = (event) => {
        setExpertise(event.target.value);
    };

    const handleAddSkillClick = () => {
        if (expertise.trim() !== '') {
            setSkills([...skills, expertise.trim()]);
            setExpertise('');
        }
    };

    return (
        <div>
            <h2>Add Your Skills and Expertise</h2>
            <label>
                Expertise:
                <input type="text" value={expertise} onChange={handleExpertiseChange} />
            </label>
            <button onClick={handleAddSkillClick}>Add Skill</button>
            <ul>
                {skills.map((skill, index) => (
                    <li key={index}>{skill}</li>
                ))}
            </ul>
        </div>
    );
}

export default Skills;
