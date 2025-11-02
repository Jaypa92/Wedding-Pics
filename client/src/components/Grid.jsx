import axios from 'axios'
import { useNavigate } from 'react-router-dom';
import { FilePlus2 } from 'lucide-react';

const Grid = ({ photos }) => {

    const navigate = useNavigate();

    const handleDelete = (e, id) => {
        e.preventDefault();
        axios.delete(`http://localhost:5000/api/upload/delete/${id}`)
            .then(res => {
                console.log(res);
                navigate('/');
            });
    }

    return (
        <>  
            <h1 className='heading' >Brittney & Justin Parris</h1>
            <h2 className='date'>04|14|2024</h2>
            <div className="gallery">
                <div className="grid">
                    {photos.length > 0 && photos.map(({ photo, fileType, _id }) => (
                        <div key={_id} className='box'>
                            <div className='grid_item'>
                                {fileType?.startsWith('image') ? (
                                    <img
                                        src={photo}
                                        alt="grid_image" />
                                ) : fileType?.startsWith('video') ? (
                                    <video src={photo} controls></video>
                                ) : null}
                            </div>
                            <button onClick={(e) => { handleDelete(e, _id) }} id='download' style={{ display: 'none' }}>Delete</button>
                        </div>
                    ))}
                    <div className="grid_item grid_label">
                        <label htmlFor='file_picker' className='label-default'>
                            {/* <img className='label-icon' src="/addFiles.png" alt='img' /> */}
                            <FilePlus2 size={100}/>
                        </label>
                        <h2>Upload File</h2>
                    </div>
                </div>
            </div>
        </>
    )
}

export default Grid