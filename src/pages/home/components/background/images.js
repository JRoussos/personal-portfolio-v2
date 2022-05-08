import React, { useRef, useEffect, useMemo } from 'react'

import { useLoader, useFrame } from '@react-three/fiber'
import { TextureLoader, Vector2 } from 'three';

import useObserverSize from "../../../../utils/useObserverSize";
import { getScrollValue } from '../../../../utils/SmoothScroll';

import { fragment, vertex } from './shaders/image'

const Post = ({ img }) => {
    const texture = useLoader(TextureLoader, img.src)
    const meshRef = useRef()
    
    const { uDelta, uSize, uTexture } = useMemo(() => {
        const uDelta   = { value: 0.0 }
        const uSize    = { value: new Vector2(0, 0) }
        const uTexture = { value: texture }

        return { uDelta, uSize, uTexture }
    }, [texture])

    const uniforms = {
        uTexture: uTexture,    
        uDelta: uDelta,
        uSize: uSize
    }

    useFrame(({ viewport }) => {
        meshRef.current.material.uniforms.uDelta.value = getScrollValue().delta
        meshRef.current.material.uniforms.uSize.value = new Vector2(viewport.width, viewport.height)
    })
    
    return(
        <mesh ref={meshRef} position={[img.positionX, img.positionY, 0]}>
            <planeBufferGeometry attach="geometry" args={[img.width, img.height, 1, 64]}/>
            <shaderMaterial attach="material" uniforms={uniforms} fragmentShader={fragment} vertexShader={vertex}/>
        </mesh>
    )
}
 
const Images = () => {
    const loadedImages = useRef([...document.querySelectorAll('img')])
    const obSize = useObserverSize(document.getElementById('scrollableContainer'))

    useEffect(() => {
        loadedImages.current.forEach( img => {
            const { top, left } = img.getBoundingClientRect()
            img.positionY = -top + window.innerHeight/2 - img.height/2 -getScrollValue().scroll
            img.positionX = left - window.innerWidth/2 + img.width/2
        })
    }, [obSize])

    return loadedImages.current.map( img => <Post key={img.alt} img={img}/>)
}

export default Images;