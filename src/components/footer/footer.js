import React from 'react'

import './footer-style.scss'

const Footer = () => {  
    return (
        <div className="copyright">
            <p>© {new Date().getFullYear()}, <a className="link-element" target="_blank" rel="noopener noreferrer" href="https://github.com/jroussos">J.R.</a></p>
        </div>
    )
}

export default Footer   
