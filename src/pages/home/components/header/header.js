import React from 'react'
import { Link } from 'react-router-dom'

// import Anchor from '../../../../components/anchor/anchor'

import './header-style.scss'

const Header = () => {
    return (
        <header className='main-header'>
            <div className='navbar'>
                <div className="copyright">
                    <p>© {new Date().getFullYear()}, <a target="_blank" rel="noopener noreferrer" href="https://github.com/jroussos">J.R.</a></p>
                </div>
                <Link to={'/about'}>
                    <p>ABOUT</p>
                </Link>
            </div>
            <div id='gradient-container'></div>
            <div className='title-wrapper'>
                <svg viewBox='0 0 116 20'>
                    <text x='4' y='12'>JOHN ROUSSOS</text>
                </svg>
                <div className='subtitle'>
                    <Link to={'/about'} className="subtitle-wrapper">
                        <p>Hey, I'm John, a front-end developer who also enjoys working out, going on explorations, oh.. and I love coffee</p>
                        <p style={{paddingTop: 0}}>Get to know me<span className='arrow'></span></p>
                    </Link>
                </div>
                {/* <div className='subtitle'>
                    <Link to={'/about'} className="subtitle-wrapper">
                        <p>Hey, I'm John, a front-end developer who also enjoys working out, go on explorations, oh.. and I love coffee</p>
                        <Anchor as='div'>Get to know me</Anchor>
                    </Link>
                </div> */}
            </div>
        </header>
    )
}

export default Header