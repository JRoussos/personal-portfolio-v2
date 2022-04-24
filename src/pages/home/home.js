import React, { useEffect, useLayoutEffect, useRef, useState } from 'react'

import Projects from '../../pages/home/components/projects/projects'
import './home-style.scss'

const Title = () => {
    const centerRef = useRef()

    useLayoutEffect(() => {

    },[])

    return (
        <React.Fragment>
            <div ref={centerRef} className="center">
                <div className='title-wrapper'>
                    <h1>J<span>O</span>HN</h1>
                    <h1>RO<span>U</span>SSOS</h1>
                </div>
                <div className='subtitle left'>
                    <div className="subtitle-wrapper">
                        <p>Hey, I'm a front-end developer most of the time. I also enjoy working out, go on explorations, oh.. and I love coffee</p>
                        <a className='link-wrapper'>
                            <span>Get to know me</span>
                            <svg width="51" height="51" viewBox="0 0 51 51" fill="none">
                                <path d="M40.7988 5.97753H2.43625V0.330078H50.4396V48.3334H44.7921V9.97088L4.43293 50.3301L0.439575 46.3367L40.7988 5.97753Z" fill="white" fillOpacity="0.8"/>
                            </svg>
                        </a>
                    </div>
                </div>
                <div className='subtitle right'>
                    <div className="subtitle-wrapper">
                        <p className='scroll-indicator'><span>(</span>SCROLL<span>)</span></p>
                    </div>
                </div>
            </div>
            <Projects/>
        </React.Fragment>
    )
}

export default Title
