import React, { useRef, useState } from 'react';
import '../css/addinfo.css'

function UploadResume() {
    const [selectedFile, setSelectedFile] = useState(null);
    const [showSaveButton, setShowSaveButton] = useState(false);
    const inputRef = useRef(null);

    const handleUploadClick = () => {
        inputRef.current.click();
    };

    const handleFileChange = (event) => {
        const file = event.target.files[0];
        setSelectedFile(file);
        setShowSaveButton(true);
    };

    const handleSaveClick = () => {
        // Do something with the selected file, such as uploading it to a server
        setShowSaveButton(false);
    };

    return (
        <>
            <div className='Userinfo-main-cont'>
                <h4>Upload Resume/CV</h4>
                <button onClick={handleUploadClick}>Upload File</button>
                <hr id="hr_info" />
                <div className="info-container">
                    <div className="birthday">
                        <h6>Uploaded File:</h6>
                        <input
                            type="file"
                            ref={inputRef}
                            style={{ display: 'none' }}
                            onChange={handleFileChange}
                        />
                        {showSaveButton && (
                            <button className='upload-btn' onClick={handleSaveClick}>Save File</button>
                        )}
                        {selectedFile && (
                            <div>
                                <p>{selectedFile.name}</p>
                            </div>
                        )}
                    </div>

                </div>
            </div>
        </>

    );
}

export default UploadResume;
