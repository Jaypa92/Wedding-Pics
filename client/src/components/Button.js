import React, { useState, useEffect } from 'react';
import { AiFillPlusCircle } from 'react-icons/ai';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { FilePlus2 } from 'lucide-react';

const Button = ({ setUpdateUI, uploadAuthorized, onRequestUpload, fileInputRef, passwordError, setPasswordError }) => {
    const navigate = useNavigate();
    const [selectedFiles, setSelectedFiles] = useState([]);

    const handleChange = (e) => {
        const files = Array.from(e.target.files).map(file => {
            file.preview = URL.createObjectURL(file);
            return file;
        });

        setSelectedFiles(prev => [...prev, ...files]);
        e.target.value = '';
    }

    useEffect(() => {
        console.log(selectedFiles);

        const overlayOpen = selectedFiles.length > 0;

        document.body.style.overflow = overlayOpen ? "hidden" : "";

        return () => {
            document.body.style.overflow = '';
        }
    }, [selectedFiles]);

    useEffect(() => {
        return () => {
            selectedFiles.forEach(file => URL.revokeObjectURL(file.preview));
        };
    }, [selectedFiles]);

    const handleClose = () => {
        setSelectedFiles([]);
        if (fileInputRef.current) {
            fileInputRef.current.value = '';
        }
    }

    const handleUpload = async () => {

        if (selectedFiles.length === 0) {
            setPasswordError("Please select files to upload!");
            return;
        }

        const formData = new FormData();

        selectedFiles.forEach((file) => {
            formData.append('photo', file);
            console.log(selectedFiles.length)
        })

        try {
            const response = await axios.post('http://localhost:5000/api/upload/api/save', formData)
            console.log(response.data);
            setUpdateUI(Date.now());
            setSelectedFiles([]);
            navigate('/');
        } catch (error) {
            console.error('Error uploading files', error);
            alert(error.response?.data?.error || "Upload Failed");
        }
    }

    const previewDel = (indexDel) => {
        const updatedFiles = selectedFiles.filter((_, index) => index !== indexDel);
        setSelectedFiles(updatedFiles);
    }

    return (
        <div>
            <button className='button' 
            onClick={() => {
                if(!uploadAuthorized) {
                    onRequestUpload();
                } else {
                    fileInputRef.current.click();
                }
            }}
                style={{
                    background: 'transparent',
                    border: 'none',
                    padding: 0,
                    cursor: 'pointer',
                    display: 'inline-flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                }}>
                <AiFillPlusCircle />
            </button>
                <input
                    hidden
                    multiple
                    type='file'
                    onChange={handleChange}
                    ref={fileInputRef} 
                />
            {uploadAuthorized && selectedFiles.length > 0 && (
                <div className='container' >
                    <div className='head'>
                        <img src='/close.png' alt='close' onClick={handleClose} />
                    </div>
                    <div className='preview' >
                        {selectedFiles.map((file, index) => (
                            <div className='preview_grid' key={file.name}>
                                {passwordError && <div className='error-message'>{passwordError}</div>}
                                <div className='preview_item' style={{ position: 'relative' }} >
                                    {file.type.startsWith("image/") && (
                                        <img src={file.preview} alt=''/>
                                    )}

                                    {file.type.startsWith("video/") && (
                                        <video src={file.preview} controls/>
                                    )}
                                    <span
                                        className="delete-x"
                                        onClick={() => previewDel(index)}
                                    >
                                        X
                                    </span>
                                </div>
                            </div>
                        ))}
                        <div className="grid_item grid_label">
                            <label className='label-default'>
                                <FilePlus2 size={100} />
                                <h2>Upload File</h2>
                            </label>
                        </div>
                    </div>
                    <div className='upload-button'>
                        <button className='upload' onClick={handleUpload}>Upload</button>
                    </div>
                </div>
            )}
        </div>
    )
}

export default Button