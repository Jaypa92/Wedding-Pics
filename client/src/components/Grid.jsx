import React from 'react'
import axios from 'axios'
import { useNavigate } from 'react-router-dom';

const Grid = ({photos}) => {

    const navigate = useNavigate();

    const handleDelete = (e, id) => {
        e.preventDefault();
        axios.delete(`http://localhost:5000/api/delete/${id}`)
            .then(res=>{
                console.log(res);
                navigate('/');
            });
    }

    return (
        <>
        <h1 className='heading' >Our Gallery</h1>
        <div className="grid">
            {photos.map(({photo, _id}) => (
                <div key={_id} className='box'>
                    <div className='grid_item'>
                        {photo.includes('.jpg') || photo.includes('.jpeg') || photo.includes('.png') ? (
                            <img 
                            src={`http://localhost:5000/uploads/${photo}`} 
                            alt="grid_image" />
                        ) : photo.includes('.mp4') || photo.includes('.av1') || photo.includes('.mov') ? (
                            <video src={`http://localhost:5000/uploads/${photo}`} controls></video>
                        ) : null}
                    </div>
                </div>
            ))}
        </div>
        </>
    )
}

export default Grid