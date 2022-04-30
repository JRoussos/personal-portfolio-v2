import React, { useRef, useLayoutEffect, useState } from 'react'
import { useFrame } from '@react-three/fiber'

import imagesloaded from 'imagesloaded';

import Gradient from './gradient';
import Images from './images'

import { getScrollValue } from '../../utils/SmoothScroll'

const Meshes = ({ pathname }) => {
    const [ imgLoadingState, setLoadingState ] = useState([])
    const groupRef = useRef()
    // const { camera, viewport } = useThree()

    // useLayoutEffect(() => {
    //     camera.fov = Math.atan((viewport.height/2)/100) * 2 * (180/Math.PI)
    // }, [viewport])
        
    useLayoutEffect(() => {
            imagesloaded(document.querySelectorAll('img'), ({ images }) => {
                setLoadingState(images.map( _ => _.img))
            })
    }, [])

    useFrame(() => {
        groupRef.current.position.y = getScrollValue()
    })

    return (
        <group ref={groupRef}>
            <Gradient location={pathname}/>
            <Images images={imgLoadingState}/>
        </group>
    )
}

export default Meshes