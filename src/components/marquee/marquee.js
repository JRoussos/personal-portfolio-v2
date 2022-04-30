import React, { useCallback, useEffect, useRef } from 'react'
import { getScrollValue } from '../../utils/SmoothScroll'
import './marquee-style.scss'

const Marquee = ({ text }) => {
    const animationFrameID = useRef()
    const current_position = useRef(0)
    
    const marqueeRef = useRef()
    
    const animate = useCallback((width) => {
        if (!marqueeRef.current) return
        const { delta } = getScrollValue()
        
        current_position.current += 1 + Math.abs(delta)
        if (current_position.current > width ) current_position.current = 0

        marqueeRef.current.style.transform = `translate3d(-${current_position.current}px, 0, 0)`
        animationFrameID.current = requestAnimationFrame(() => animate(width))
    }, [])

    
    useEffect(() => {
        const initializePositions = () => {
            animate(marqueeRef.current.clientWidth/2)
        }

        setTimeout(initializePositions, 100)
        return () => cancelAnimationFrame(animationFrameID.current)
    }, [animate])

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