import React from 'react'
import Navbar from './Navbar'
import Button from "./Button";
import Grid from './Grid';
import { useEffect, useState } from "react";
import axios from 'axios';

const Main = () => {

    const [photos, setPhotos] = useState([]);
    const [updateUI, setUpdateUI] = useState('');
    const [showIntro, setIntro] = useState(false);

    useEffect(() => {

        axios.get('http://18.116.44.77/api/get')
            .then((res) => {
                console.log(res.data);
                setPhotos(res.data);
            })
            .catch((err) => console.log(err))

            const introState = localStorage.getItem('showIntro');
            if(introState === null) {
                setIntro(true);
                localStorage.setItem('showIntro','true');
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

    const handleOK = (e) => {
            setIntro(false);
    }

    return (
        <div className='body'>
            {!showIntro && <Navbar></Navbar>}
            <Grid photos={photos}></Grid>
            <Button setUpdateUI={setUpdateUI}></Button>
            { showIntro && (
            <div className='intro' style={{visibility: 'visible'}} >
                <div className='intro-box'>
                    <h1 className='name'><span><img  src='/eiffel-tower-white.png' alt='tower' /></span>Parris<span><img src='/eiffel-tower-white.png' alt='tower' /></span></h1>
                    <h1>Welcome to the photo gallery of the newlywed Parris family!</h1>
                    <h1>If you have any files to share from the wedding, please upload them for all to see and thank you again for attending!</h1>
                    <button onClick={handleOK} >OK</button>
                </div>
            </div>
            )
            }
        </div>
    )
}

export default Main;