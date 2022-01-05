import React, { useRef, useMemo, useEffect } from 'react'

import gsap from 'gsap';
import { useFrame, useThree } from '@react-three/fiber'

import { makeTexture } from './makeTexture'
import { fragment, vertex } from './shaders'

import { red_blue } from './colors'

const Animation = ({ location, texture }) => {
    const { viewport } = useThree()
    const shaderMaterialRef = useRef()

    const { uTime, uProgress, uColorTexture, uInteractiveTexture } = useMemo(() => {
        const uTime               = { value: 0.0 }
        const uProgress           = { value: 0.0 }
        const uColorTexture       = { value: makeTexture(red_blue) }
        const uInteractiveTexture = { value: texture }

        return { uTime, uProgress, uColorTexture, uInteractiveTexture }
    }, [texture])

    useEffect(() => {
        const changeBackgroundProgress = ( ref, state, callback=() => {}, delay=0 ) => {
            state && gsap.to(ref, { duration: 1.5, delay: delay, value: 1.0, ease: "sine.inOut", onComplete: callback})
            state || gsap.to(ref, { duration: 1.5, delay: delay, value: 0.0, ease: "sine.inOut", onComplete: callback})
        }

        changeBackgroundProgress(uProgress, location === '/')
    }, [uProgress, location])

    useFrame(({ clock }) => {         
        shaderMaterialRef.current.uniforms.uProgress.value = uProgress.value  
        shaderMaterialRef.current.uniforms.uTime.value = clock.elapsedTime
    })

    const uniforms = {
        uTime: uTime,
        uColorTexture: uColorTexture,
        uProgress: uProgress,
        uInteractiveTexture: uInteractiveTexture,
    }

    return(
        <mesh>
            <planeBufferGeometry attach="geometry" args={[viewport.width, viewport.height]}/>
            <shaderMaterial ref={shaderMaterialRef} attach="material" uniforms={uniforms} fragmentShader={fragment} vertexShader={vertex}/>
        </mesh>
    )
}

export default Animation;