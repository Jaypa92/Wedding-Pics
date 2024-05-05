import React from 'react'

const Navbar = () => {

    document.addEventListener("DOMContentLoaded", function(){
        var scroll = document.getElementById('scroll');

        scroll.addEventListener('click', function() {
            window.scrollTo({
                top:0,
                behavior:"smooth"
            })
        })
    })

    return (
    <nav>
        <div className="nav-logo">
            Parris Family Wedding 
        </div>
        <a href="#" id='scroll'>Back To Top</a>
    </nav>
    )
}

export default Navbar