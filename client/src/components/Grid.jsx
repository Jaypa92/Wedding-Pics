import React from 'react'
import axios from 'axios'

const Grid = ({photos}) => {

    const handleDelete = (e, id) => {
        e.preventDefault();
        axios.delete(`http://localhost:5000/api/delete/${id}`)
            .then(res=>{
                console.log(res);
            })
    }

    return (
        <>
        <h1>Our Gallery</h1>
        <div className="grid">
            {photos.map(({photo, _id}) => (
                <div className='box'>
                    <div key={_id} className='grid_item'>
                        <img 
                        src={`http://localhost:5000/uploads/${photo}`} 
                        alt="grid_image" />
                    </div>
                    <button onClick={(e) => {handleDelete(e,_id)}} id='download'>Delete</button>
                </div>
            ))}
        </div>
        </>
    )
}

export default Grid