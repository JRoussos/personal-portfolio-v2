import React, { useRef } from 'react'
import { useFrame } from '@react-three/fiber'

import Gradient from './gradient';
import Images from './images'

import { getScrollValue } from '../../../../utils/SmoothScroll'

const Meshes = () => {
    const groupRef = useRef()
    
    useFrame(() => {
        const { scroll } = getScrollValue()
        groupRef.current.position.y = scroll
    })

    return (
        <group ref={groupRef}>
            <Gradient/>
            <Images/>
        </group>
    )
}

export default Meshes