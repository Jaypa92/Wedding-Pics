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

    const scrollToTop = () => {
        window.scrollTo({top: 0, behavior: 'smooth'});
    }

    return (
        <nav ref={navbarRef}>
            <div className="nav-logo">
                Parris Family Wedding
            </div>
            <button
                onClick={scrollToTop}
                className='nav-link'
                aria-label='Scroll to top'>
                Back To Top
            </button>
        </nav>
    )
}

export default Navbar