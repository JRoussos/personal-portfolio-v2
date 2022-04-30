import React, { useEffect, useRef } from 'react'
import './marquee-style.scss'

const Marquee = ({ text }) => {
    const marqueeRef = useRef()
    const animationFrameID = useRef()

    let current_position = 0

    const animate = (width) => {
        if (!marqueeRef.current) return

        current_position += 1
        if (current_position > width ) current_position = 0

        marqueeRef.current.style.transform = `translate3d(-${current_position}px, 0, 0)`
        animationFrameID.current = requestAnimationFrame(() => animate(width))
    }

    
    useEffect(() => {
        const initializePositions = () => {
            animate(marqueeRef.current.clientWidth/2)
        }

        setTimeout(initializePositions, 100)
        return () => cancelAnimationFrame(animationFrameID.current)
    }, [])

    return (
        <div className='marquee-container'>
            <div ref={marqueeRef} className='marquee'>
                <h1>{`${text} —`}&nbsp;</h1>
                <h1>{`${text} —`}&nbsp;</h1>
                <h1>{`${text} —`}&nbsp;</h1>
                <h1>{`${text} —`}&nbsp;</h1>
            </div>
        </div>
    )
}

export default Marquee;