import React, { useRef, useLayoutEffect, useCallback } from 'react';
import { gsap } from 'gsap';

import './mouse-style.css';

const Mouse = () => {
    const mousePreviousPosition = useRef({x: 0, y: 0})
    const mouseCurrentPosition = useRef({x: 0, y: 0})

    const quickSet = useRef({x: null, y: null, rotate: null, scaleX: null, scaleY: null})

    const getAngle = (x, y) => Math.atan2(y, x) * 180 / Math.PI // get the angle and convert in degrees from radians
    const getScale = (x, y) => Math.min(Math.sqrt(Math.pow(x, 2) + Math.pow(y, 2)) / 300, 0.2)

    const onTick = useCallback(() => {
        const rotation = getAngle(mousePreviousPosition.current.x, mousePreviousPosition.current.y)
        const distance = getScale(mousePreviousPosition.current.x, mousePreviousPosition.current.y)

        quickSet.current.x(mouseCurrentPosition.current.x)
        quickSet.current.y(mouseCurrentPosition.current.y)

        quickSet.current.scaleX(1 + distance)
        quickSet.current.scaleY(1 - distance)
        
        quickSet.current.rotate(rotation)
    }, [])

    useLayoutEffect(() => {
        quickSet.current.x      = gsap.quickSetter('#cursor', 'x', 'px')
        quickSet.current.y      = gsap.quickSetter('#cursor', 'y', 'px')

        quickSet.current.rotate = gsap.quickSetter('#cursor', 'rotate', 'deg')
        quickSet.current.scaleX = gsap.quickSetter('#cursor', 'scaleX')
        quickSet.current.scaleY = gsap.quickSetter('#cursor', 'scaleY')

        gsap.ticker.add(onTick)
        
        window.addEventListener('mousemove', e => handleMouseMove(e))
    }, [onTick])

    const handleMouseMove = ({ clientX, clientY }) => {
        gsap.to(mouseCurrentPosition.current, { duration: 1, x: clientX, y: clientY, ease: 'expo.out', onUpdate: () => {
            mousePreviousPosition.current.x = clientX - mouseCurrentPosition.current.x
            mousePreviousPosition.current.y = clientY - mouseCurrentPosition.current.y
        }})
    }


    return (
        <svg id="cursor" width="220" height="220" fill="none" viewBox="0 0 220 220" >
            <circle cx="110" cy="110" r="20" strokeWidth="2px" stroke="white" strokeOpacity="0.8"/>
        </svg>
    )
}

export default Mouse