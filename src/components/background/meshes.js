import React, { useRef, useLayoutEffect, useState } from 'react'
import { useFrame } from '@react-three/fiber'

import imagesloaded from 'imagesloaded';

import Gradient from './gradient';
import Images from './images'

import { getScrollValue } from '../../utils/SmoothScroll'

const Meshes = ({ pathname }) => {
    const [ loadedImages, setLoadedImages ] = useState([])
    const groupRef = useRef()

    useLayoutEffect(() => {
        imagesloaded(document.querySelectorAll('img'), ({ images }) => {
            setLoadedImages(images.map( _ => _.img))
        })
    }, []) 
    
    useFrame(() => {
        const { scroll } = getScrollValue()
        groupRef.current.position.y = scroll
    })

    return (
        <group ref={groupRef}>
            <Gradient location={pathname}/>
            <Images location={pathname} images={loadedImages}/>
        </group>
    )
}

export default Meshes