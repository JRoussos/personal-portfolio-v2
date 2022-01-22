import React from 'react'
import { useLocation, Link } from 'react-router-dom';

import './hamburger-style.scss'

const Hamburger = () => {
    const { pathname } = useLocation()
    const whereAreWe = () => pathname === '/project'

    return (
        <Link to={ whereAreWe() ? "/" : "/project" }>
            <div className={`menu-wrapper link-element ${ whereAreWe() && "open" }`}>
                <div className='line'></div>
                <div className='line'></div>
            </div>
        </Link>
    )
}

export default Hamburger
