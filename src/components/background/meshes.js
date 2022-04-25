import React, { useRef } from 'react'
import { useFrame } from '@react-three/fiber'

import Gradient from './gradient';
import Images from './images'

import { getScrollValue } from '../../utils/SmoothScroll'

const Meshes = ({ pathname }) => {
    const groupRef = useRef()

    useFrame(() => {
        groupRef.current.position.y = getScrollValue()
    })

    return (
        <group ref={groupRef}>
            <Gradient location={pathname}/>
            <Images/>
        </group>
    )
}

export default Meshes