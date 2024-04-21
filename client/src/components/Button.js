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

    const handleClose = (e) => {
        setSelectedFiles([]);
    }

    const handleUpload = async () => {
        
        const formData = new FormData();

        selectedFiles.forEach((file) => {
            formData.append('photo', file);
            console.log(selectedFiles.length)
        })

        try {
            const response = await axios.post('http://18.216.28.90/api/save', formData)
            console.log(response.data);
            setUpdateUI(response.data._id);
            navigate('/');
        } catch (error) {
            console.error('Error uploading files', error);
        }
        }

    const previewDel = (indexDel) => {
        const updatedFiles = selectedFiles.filter((file, index) => index !== indexDel);
        setSelectedFiles(updatedFiles);
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
        {selectedFiles.length > 0 && (
            <div className='container' >
                <div className='head'>
                    <img src='/close.png' alt='close' onClick={handleClose} />
                </div>
                <div className='preview' >
                    {selectedFiles.map((file, index) => (
                        <div className='preview_grid' key={file.name}>
                            <div className='preview_item' >
                                {file.name.includes('.jpg') || file.name.includes('.jpeg') || file.name.includes('.png') ? (
                                    <img src={URL.createObjectURL(file)} alt="file"/>
                                    ) : file.name.includes('.mp4') || file.name.includes('.mov') || file.name.includes('.av1') ? (
                                        <video src={URL.createObjectURL(file)} type={file.type} controls></video>
                                        ): null}
                            </div>
                            <button className='delete' onClick={() => previewDel(index)} >Delete</button>
                        </div>
                        ))}
                </div>
                <button className='upload' onClick={handleUpload}>Upload</button>
            </div>
        )}
    </div>
    )
}

export default Button