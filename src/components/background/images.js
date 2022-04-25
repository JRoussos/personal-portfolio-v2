import React, { useRef, useInsertionEffect } from 'react'
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
    const { viewport } = useThree()
    const images = useRef([...document.querySelectorAll('img')])
    
    useInsertionEffect(() => {
        const setPositions = () => {
            images.current.forEach( img => {
                const { top, left } = img.getBoundingClientRect()
                img.positionY = -top + viewport.height/2 - img.height/2
                img.positionX = left - viewport.width/2 + img.width/2
            })
        }
        setPositions()
        // window.addEventListener('resize', setPositions)
        
        // return window.removeEventListener('resize', setPositions)
    }, [viewport])

    return images.current.map( (img, i) => <Post key={img.alt} img={img}/>)
}

export default Images;