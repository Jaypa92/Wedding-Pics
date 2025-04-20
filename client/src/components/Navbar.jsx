import React, { useEffect, useRef } from 'react'

const Navbar = () => {

    const navbarRef = useRef(null);

    useEffect(() => {

        const navbar = navbarRef.current;

        const handleScroll = () => {
            
            if (window.scrollY > 50) {
                navbar.classList.add("show");
            } else {
                navbar.classList.remove("show");
            }
        };


        window.addEventListener("scroll", handleScroll);

        return () => window.removeEventListener("scroll", handleScroll);
    }, []);

    return (
        <nav ref={navbarRef}>
            <div className="nav-logo">
                Parris Family Wedding
            </div>
            <a href="#" id='scroll'>Back To Top</a>
        </nav>
    )
}

export default Navbar