import React, { useState, useEffect } from 'react';
import {AiFillPlusCircle} from 'react-icons/ai';
import axios from 'axios';
import {useNavigate} from 'react-router-dom';

const Button = ({setUpdateUI}) => {
    const navigate = useNavigate();
    const [selectedFiles, setSelectedFiles] = useState([]);

    const handleChange = (e) => {
        const files = e.target.files;
        setSelectedFiles([...selectedFiles, ...files]);
    }

    useEffect(() => {
        
    }, [selectedFiles]);

    const handleUpload = async () => {
        
        const formData = new FormData();

        selectedFiles.forEach((file) => {
            formData.append('photo', file);
            console.log(selectedFiles.length)
        })

        try {
            const response = await axios.post('http://localhost:5000/api/save', formData)
            console.log(response.data);
            setUpdateUI(response.data._id);
            navigate('/');
        } catch (error) {
            console.error('Error uploading files', error);
        }
        }

    return (
    <div>
        <label className='button' htmlFor='file_picker'>
            <AiFillPlusCircle/>
            <input 
                hidden 
                multiple
                type='file' 
                name='file_picker' 
                id='file_picker' 
                onChange={handleChange} />
        </label>
        <button onClick={handleUpload}>Upload</button>
    </div>
    )
}

export default Button