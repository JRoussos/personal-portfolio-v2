import React, { useRef, useLayoutEffect, useCallback } from 'react';
import { gsap } from 'gsap';

const cursor_styles = {
    position: 'fixed',
    top: '-109px',
    left: '-109px',
    opacity: 0,
    mixBlendMode: 'difference',
    pointerEvents: 'none',
    willChange: 'transform',
    zIndex: 90
}

export const mouseListeners = handle => {
    const smallCircle = () => gsap.to('#circle', {duration: 0.2, r: 30})
    const largeCircle = () => gsap.to('#circle', {duration: 0.2, r: 50})

    document.querySelectorAll('.link-element').forEach( element => {
        if( handle === 'add' ){
            element.addEventListener('mouseover', largeCircle )
            element.addEventListener('mouseleave', smallCircle )
        }
        
        if( handle === 'remove' ){
            element.removeEventListener('mouseover', largeCircle )
            element.removeEventListener('mouseleave', smallCircle )
        }

    })
}

const Mouse = () => {
    const mousePreviousPosition = useRef({x: 0, y: 0})
    const mouseCurrentPosition = useRef({x: 0, y: 0})

    const isMouseOffScreen = useRef(true)

    const quickSet = useRef({x: null, y: null, rotate: null, scaleX: null, scaleY: null})
    
    const onTick = useCallback(() => {
        const getRotation = (x, y) => Math.atan2(y, x) * 180 / Math.PI // return the angle converted in degrees from radians
        const getDistance = (x, y) => Math.min(Math.hypot(x, y) / 300, 0.4) // return the distance between the x and y value of the previous position 
        // Math.sqrt(Math.pow(x, 2) + Math.pow(y, 2)) - As it turns out there is a deicated math function for than 

        const rotation = getRotation(mousePreviousPosition.current.x, mousePreviousPosition.current.y)
        const distance = getDistance(mousePreviousPosition.current.x, mousePreviousPosition.current.y)

        quickSet.current.x(mouseCurrentPosition.current.x)
        quickSet.current.y(mouseCurrentPosition.current.y)

        quickSet.current.scaleX(1 + distance)
        quickSet.current.scaleY(1 - distance)
        
        quickSet.current.rotate(rotation)
    }, [])

    const handleMouseLeave = useCallback(() => {
        isMouseOffScreen.current = true
        gsap.to('#cursor', { id: 'hideCursor', duration: 0.5, delay: 1, opacity: 0 })
    }, [])

    const handleMouseMove = useCallback( ({ clientX, clientY }) => {
        if( isMouseOffScreen.current ) {
            mouseCurrentPosition.current.x = clientX
            mouseCurrentPosition.current.y = clientY
            
            isMouseOffScreen.current = false 
            
            gsap.getById('hideCursor')?.kill()
            gsap.to('#cursor', { duration: 0.5, opacity: 1 })
            return
        }

        gsap.to(mouseCurrentPosition.current, { duration: 1.2, x: clientX, y: clientY, ease: 'expo.out', onUpdate: () => {
            mousePreviousPosition.current.x = clientX - mouseCurrentPosition.current.x // distance from the actual x position to the current position one
            mousePreviousPosition.current.y = clientY - mouseCurrentPosition.current.y // distance from the actual y position to the current position one
        }})
    }, [])

    useLayoutEffect(() => {
        quickSet.current.x      = gsap.quickSetter('#cursor', 'x', 'px')
        quickSet.current.y      = gsap.quickSetter('#cursor', 'y', 'px')

        quickSet.current.rotate = gsap.quickSetter('#cursor', 'rotate', 'deg')
        quickSet.current.scaleX = gsap.quickSetter('#cursor', 'scaleX')
        quickSet.current.scaleY = gsap.quickSetter('#cursor', 'scaleY')

        gsap.ticker.add(onTick)
        
        document.addEventListener('mousemove', handleMouseMove)
        document.addEventListener('mouseleave', handleMouseLeave)

    }, [onTick, handleMouseMove, handleMouseLeave])

    return (
        <svg id="cursor" width="220" height="220" fill="none" viewBox="0 0 220 220" style={cursor_styles}>
            {/* <rect id="rect" x="200" y="110" width="120" height="25" rx="10" strokeWidth="2px" stroke="white" strokeOpacity="0.8"/> */}
            <circle id="circle" cx="110" cy="110" r="30" strokeWidth="2px" stroke="white" strokeOpacity="0.8"/>
        </svg>
    )
}

export default Mouse