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

    return (
        <div>
            <Navbar></Navbar>
            <Grid photos={photos}></Grid>
            <Button setUpdateUI={setUpdateUI}></Button>
        </div>
    )
}

export default Main;