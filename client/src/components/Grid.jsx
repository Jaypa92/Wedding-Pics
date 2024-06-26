import axios from 'axios'
import { useNavigate } from 'react-router-dom';

const Grid = ({photos}) => {

    const navigate = useNavigate();

    const handleDelete = (e, id) => {
        e.preventDefault();
        axios.delete(`http://18.216.28.90/api/delete/${id}`)
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
                            src={`http://18.216.28.90/uploads/${photo}`} 
                            alt="grid_image" />
                        ) : photo.includes('.mp4') || photo.includes('.av1') || photo.includes('.mov') ? (
                            <video src={`http://18.216.28.90/uploads/${photo}`} controls></video>
                        ) : null}
                    </div>
                    <button onClick={(e) => {handleDelete(e,_id)}} id='download'style={{display:'none'}}>Delete</button>
                </div>
            ))}
        </div>
        </>
    )
}

export default Grid