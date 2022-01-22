import React, { useEffect } from 'react'

import './projects-style.scss'

const Projects = () => {
    let position = 0, scale = 1, speed = 0

    useEffect(() => {
        const scroller = document.getElementById('scroller')
        const thumb = document.getElementById('thumb')

        window.addEventListener('wheel', e => {
            speed += e.deltaY*0.0003
        })
    
        const render = () => {
            scale -= speed
            speed *= 0.8

            scale = position = Math.max(Math.min(scale, 1), 0)
            
            scroller.style.transform = `translate3d(0, -${(1 - position) * 80}px, 0)`
            thumb.style.transform = `scaleY(${scale})`
    
            window.requestAnimationFrame(render)
        }

        render()
        
    }, [position, scale, speed])

    return (
        <div className='projects'>
            <div id='scroller'>
                <div id='thumb'></div>
            </div>
        </div>
    )
}

export default Projects;
