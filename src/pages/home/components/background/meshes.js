import React, { useRef, useEffect } from 'react'
import { useFrame, useThree } from '@react-three/fiber'

import Gradient from './gradient';
import Images from './images'

import { getScrollValue } from '../../../../utils/SmoothScroll'

const Meshes = () => {
    const groupRef = useRef()
    const { camera, viewport } = useThree()
    
    useFrame(() => {
        const { scroll } = getScrollValue()
        groupRef.current.position.y = scroll
    })

    useEffect(() => {
        camera.fov = Math.atan((window.innerHeight/2)/100) * 2 * (180/Math.PI)
        camera.updateProjectionMatrix()
        
    }, [camera, viewport])

    return (
        <group ref={groupRef}>
            <Gradient/>
            <Images/>
        </group>
    )
}

export default Meshes