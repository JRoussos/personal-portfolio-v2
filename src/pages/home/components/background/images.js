import React, { useRef, useEffect } from 'react'

import { useLoader } from '@react-three/fiber'
import { TextureLoader } from 'three';

import useObserverSize from "../../../../utils/useObserverSize";
import { getScrollValue } from '../../../../utils/SmoothScroll';

const Post = ({ img }) => {
    const texture = useLoader(TextureLoader, img.src)
    
    return(
        <mesh position={[img.positionX, img.positionY-getScrollValue().scroll, 0]}>
            <planeBufferGeometry attach="geometry" args={[img.width, img.height]}/>
            <meshBasicMaterial attach='material' map={texture}/>
        </mesh>
    )
}
 
const Images = () => {
    const loadedImages = useRef([...document.querySelectorAll('img')])
    const obSize = useObserverSize(document.getElementById('scrollableContainer'))

    useEffect(() => {
        loadedImages.current.forEach( img => {
            const { top, left } = img.getBoundingClientRect()
            img.positionY = -top + window.innerHeight/2 - img.height/2
            img.positionX = left - window.innerWidth/2 + img.width/2
        })
    }, [obSize])

    return loadedImages.current.map( img => <Post key={img.alt} img={img}/>)
}

export default Images;