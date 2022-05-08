import React, { useLayoutEffect } from 'react'

import Topper from '../../components/topper/topper'
import Header from './components/header/header'
import Projects from '../../pages/home/components/projects/projects'
import Background from './components/background/background'

// import { Link } from 'react-router-dom'
// import Anchor from '../../components/anchor/anchor'

import './home-style.scss'

const Title = () => {

    const handleResize = () => {
        const center = document.getElementById('center')
        const header = document.querySelector('header')

        const { height } = header.getBoundingClientRect()
        center.style.height = `${height}px`
    }

    useLayoutEffect(() => {
        window.addEventListener('resize', handleResize)
        handleResize()
    }, [])

    return (
        <Topper>
            <Header/>
            <div id='center'/>
            <Projects/>
            <Background/>
        </Topper>
    )
}

export default Title
