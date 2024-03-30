import React from 'react'
import Navbar from './Navbar'
import Button from "./Button";
import Grid from './Grid';
import { useEffect, useState } from "react";
import axios from 'axios';

const Main = () => {

    const [photos, setPhotos] = useState([]);
    const [updateUI, setUpdateUI] = useState('');

    useEffect(() => {
        axios.get('http://localhost:5000/api/get')
            .then((res) => {
                console.log(res.data);
                setPhotos(res.data)
            })
            .catch((err) => console.log(err))
    }, [updateUI]);

    const handleOK = (e) => {
        const intro = document.querySelector('.intro');
        intro.style.visibility = 'hidden';
    }

    return (
        <div>
            <Navbar></Navbar>
            <Grid photos={photos}></Grid>
            <Button setUpdateUI={setUpdateUI}></Button>
            <div className='intro' style={{visibility: 'visible'}} >
                <div>
                    <h1 style={{fontSize:'100px',color:'white'}}><span><img  src='/eiffel-tower-white.png' alt='tower' /></span>Parris<span><img src='/eiffel-tower-white.png' alt='tower' /></span></h1>
                    <h1>Welcome to the photo gallery of the Parris family!</h1>
                    <h1>If you have any files to share, please upload them for all to see!</h1>
                    <button onClick={handleOK} >OK</button>
                </div>
            </div>
        </div>
    )
}

export default Main;