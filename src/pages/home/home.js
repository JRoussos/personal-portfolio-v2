import React, { useRef } from 'react'
import { Link } from 'react-router-dom'

import Anchor from '../../components/anchor/anchor'
import Projects from '../../pages/home/components/projects/projects'
import Topper from '../../components/topper/topper'

import './home-style.scss'

const Title = () => {
    const centerRef = useRef()

    return (
        <Topper>
            <div ref={centerRef} className="center">
                <div className='title-wrapper'>
                    <h1>J<span>O</span>HN</h1>
                    <h1>RO<span>U</span>SSOS</h1>
                </div>
                <div className='subtitle left'>
                    <Link to={'/contact'} className="subtitle-wrapper">
                        <p>Hey, I'm a front-end developer most of the time. I also enjoy working out, go on explorations, oh.. and I love coffee</p>
                        <Anchor as='div' className='white'>Get to know me</Anchor>
                    </Link>
                </div>
                <div className='subtitle right'>
                    <div className="subtitle-wrapper">
                        <p className='scroll-indicator'><span>(</span>SCROLL<span>)</span></p>
                    </div>
                </div>
            </div>
            <Projects/>
        </Topper>
    )
}

export default Title
