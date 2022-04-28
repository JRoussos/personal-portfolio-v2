import React, { useRef, useEffect } from 'react'
import { useThree, useLoader } from '@react-three/fiber'

import { TextureLoader } from 'three';

const Post = ({ img }) => {
    const texture = useLoader(TextureLoader, img.src)

    return(
        <mesh position={[img.positionX, img.positionY, 0]} onPointerMove={() => console.log('hello')}>
            <planeBufferGeometry attach="geometry" args={[img.width, img.height]}/>
            <meshBasicMaterial attach='material' map={texture}/>
        </mesh>
    )
}
 
const Images = () => {
    const images = useRef([...document.querySelectorAll('img')])
    // const { viewport } = useThree()
    
    useEffect(() => {
        const setPositions = () => {
            images.current.forEach( img => {
                const { top, left } = img.getBoundingClientRect()
                img.positionY = -top + window.innerHeight/2 - img.height/2
                img.positionX = left - window.innerWidth/2 + img.width/2
            })
        }
        setPositions()
    }, [])

    return images.current.map( img => <Post key={img.alt} img={img}/>)
}

export default Images;