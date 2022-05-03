import React, { useRef, useLayoutEffect, useMemo } from 'react'

import { useFrame, useLoader } from '@react-three/fiber'
import { TextureLoader, Vector3, Vector2 } from 'three'
import { gsap } from 'gsap'

import profile from '../../../../assets/imgs/profile-small-01.jpeg'
import { fragment, vertex } from './shaders'

const Profile = () => {
    const texture = useLoader(TextureLoader, profile)
    const meshRef = useRef()

    const { uTexture, uOpacity, uOffset, position } = useMemo(() => {
        const uOpacity = { value: 0.0 }
        const uTexture = { value: texture }
        const uOffset  = { value: new Vector2(0.0, 0.0) }
        const position = { value: new Vector3(0.0, 0.0, 0.0) }

        return { uTexture, uOpacity, uOffset, position }
    }, [texture])

    useLayoutEffect(() => {
        const header = document.getElementById('profile-header')

        const { naturalHeight, naturalWidth } = texture.image
        const scale = naturalWidth / naturalHeight
        
        meshRef.current.scale.copy(new Vector3(scale, 1, 1))

        const handleOpacityChange_on = () => gsap.to(uOpacity, {duration: 1, value: 1.0, ease: 'power4.out'})
        const handleOpacityChange_off = () => gsap.to(uOpacity, {duration: 1, value: 0.0, ease: 'power4.out'})

        const handlePositionChange = event => {
            const { clientX, clientY } = event
            const normalizeValue = (value, min, max) => ((value - min) * 2) / (max - min) -1

            gsap.to(position.value, { duration: 1.0, x: normalizeValue(clientX, 0, window.innerWidth), y: normalizeValue(clientY, 0, window.innerHeight), ease: 'power4.out', onUpdate: () => {
                uOffset.value.x = normalizeValue(clientX, 0, window.innerWidth)  - position.value.x
                uOffset.value.y = normalizeValue(clientY, 0, window.innerHeight) - position.value.y
            }})
        }
        
        header.addEventListener('mouseover',  handleOpacityChange_on )
        header.addEventListener('mouseleave', handleOpacityChange_off )

        document.addEventListener('mousemove', handlePositionChange )

        return () => {
            header.removeEventListener('mouseover',  handleOpacityChange_on )
            header.removeEventListener('mouseleave', handleOpacityChange_off )

            document.removeEventListener('mousemove', handlePositionChange )
        }
    }, [texture, position, uOffset, uOpacity])

    useFrame(() => {        
        meshRef.current.material.uniforms.uOpacity.value = uOpacity.value
        
        meshRef.current.position.x = position.value.x
        meshRef.current.position.y = -position.value.y
    })

    const uniforms = {
        uTexture: uTexture,
        uOpacity: uOpacity,
        uOffset: uOffset
    }

    return (
        <mesh ref={meshRef}>
            <planeBufferGeometry attach="geometry" args={[1, 1, 32, 32]}/>
            <shaderMaterial attach="material" uniforms={uniforms} fragmentShader={fragment} vertexShader={vertex} transparent={true}/>
        </mesh>
    )
}

export default Profile