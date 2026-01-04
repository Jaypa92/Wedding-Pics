import React, { useRef } from 'react'
import Navbar from './Navbar'
import Button from "./Button";
import Grid from './Grid';
import { useEffect, useState } from "react";
import axios from 'axios';

const Main = () => {

    const fileInputRef = useRef(null);

    const [photos, setPhotos] = useState([]);
    const [updateUI, setUpdateUI] = useState('');
    const [showIntro, setIntro] = useState(false);
    const [showPasswordModal, setShowPasswordModal] = useState(false);
    const [uploadAuthorized, setUploadAuthorized] = useState(false);
    const [uploadKey, setUploadKey] = useState("");
    const [passwordError, setPasswordError] = useState("");

    useEffect(() => {

        axios.get('http://localhost:5000/api/upload/get')
            .then((res) => {
                console.log(res.data);
                setPhotos(res.data);
            })
            .catch((err) => console.log(err))

        const introState = localStorage.getItem('showIntro');
        if (introState === null) {
            setIntro(true);
            localStorage.setItem('showIntro', 'true');
        }

    }, [updateUI]);

    useEffect(() => {

        const handlebeforeunload = () => {
            localStorage.removeItem('showIntro');
        }

        window.addEventListener('beforeunload', handlebeforeunload);

        return () => {
            window.removeEventListener('beforeunload', handlebeforeunload);
        }

    }, []);

    useEffect(() => {
        if (showIntro) {
            document.body.style.overflow = "hidden";
        } else {
            document.body.style.overflow = "auto";
        }

        return () => {
            document.body.style.overflow = "auto";
        }
    }, [showIntro]);

    const handleOK = (e) => {
        setIntro(false);
    }

    const verifyPassword = async () => {

        try {
            const res = await axios.post(
                "http://localhost:5000/api/upload/verify-password",
                { password: uploadKey}
            );

            if(res.data.success) {
                handlePasswordSuccess();
            }
        } catch {
            if(uploadKey.length === 0){
                setPasswordError("Please Enter Password")
            } else {
                setPasswordError("Incorrect Password");
            }
        }
    }

    const handleClose = () => {
        setShowPasswordModal(false);
        setUploadKey("");
        setPasswordError("");
    }

    const handlePasswordSuccess = () => {
        setUploadAuthorized(true);
        setShowPasswordModal(false);
        setUploadKey("");
        setPasswordError("");

        setTimeout(() => {
            fileInputRef.current?.click();
        }, 100);
    }

    return (
        <div className='body'>
            {showPasswordModal && (
                <div className="container">
                    <div className='head'>
                        <img src='/close.png' alt='close' onClick={handleClose} />
                    </div>
                    <div className="modal-content">
                        <h1>Enter Upload Password</h1>
                        <input
                            type="password"
                            placeholder="Password"
                            value={uploadKey}
                            onChange={(e) => setUploadKey(e.target.value)}
                        />
                        {passwordError && <div className='error-message'>{passwordError}</div>}
                        <div className="modal-buttons">
                            <button onClick={handleClose}>Cancel</button>
                            <button onClick={verifyPassword}>Submit</button>
                        </div>
                    </div>
                </div>
            )}
            <div className="main-content">
                {!showIntro && <Navbar></Navbar>}
                <Grid photos={photos}
                    uploadAuthorized={uploadAuthorized}
                    onRequestUpload={() => setShowPasswordModal(true)}
                    fileInputRef={fileInputRef}>
                </Grid>
                <Button 
                    setUpdateUI={setUpdateUI}
                    uploadAuthorized={uploadAuthorized}
                    onRequestUpload={() => setShowPasswordModal(true)}
                    fileInputRef={fileInputRef}
                    passwordError={passwordError}
                    setPasswordError={setPasswordError}>
                </Button>
                {showIntro && (
                    <div className='intro' style={{ visibility: 'visible' }} >
                        <div className='intro-box'>
                            <h1 className='name'><span><img src='/eiffel-tower-white.png' alt='tower' /></span>Parris<span><img src='/eiffel-tower-white.png' alt='tower' /></span></h1>
                            <h1>Welcome to the photo gallery of the newlywed Parris family!</h1>
                            <h1>If you have any files to share from the wedding, please upload them for all to see and thank you again for attending!</h1>
                            <button onClick={handleOK} >OK</button>
                        </div>
                    </div>
                )
                }
            </div>
            <footer>
                <p>© 2024 Website Made By Justin Parris</p>
            </footer>
        </div>
    )
}

export default Main;