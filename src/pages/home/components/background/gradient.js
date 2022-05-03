import React, { useRef, useMemo, useEffect } from 'react'
import { useFrame, useThree } from '@react-three/fiber'

import gsap from 'gsap';

import { makeTexture } from './makeTexture'
import { fragment, vertex } from './shaders'

import { blue_red } from './colors'

const Gradient = ({ texture }) => {
    const { viewport } = useThree()
    const shaderMaterialRef = useRef()

    const { uTime, uProgress, uColorTexture, uInteractiveTexture } = useMemo(() => {
        const uTime               = { value: 0.0 }
        const uProgress           = { value: 0.0 }
        const uColorTexture       = { value: makeTexture(blue_red) }
        const uInteractiveTexture = { value: texture }

        return { uTime, uProgress, uColorTexture, uInteractiveTexture }
    }, [texture])

    useEffect(() => {
        const changeBackgroundProgress = ( ref, state, callback=() => {}, delay=0 ) => {
            state ? 
                gsap.to(ref, { duration: 1.0, delay: delay, value: 0.3, ease: "sine.inOut", onComplete: callback}) :
                gsap.to(ref, { duration: 0.7, delay: delay, value: 0.0, ease: "sine.inOut", onComplete: callback}) 
        }

        changeBackgroundProgress(uProgress, true)
    }, [uProgress])

    useFrame(({ clock }) => {         
        shaderMaterialRef.current.uniforms.uTime.value = clock.elapsedTime
        shaderMaterialRef.current.uniforms.uProgress.value = uProgress.value
    })

    const uniforms = {
        uTime: uTime,
        uColorTexture: uColorTexture,
        uProgress: uProgress,
        uInteractiveTexture: uInteractiveTexture
    }

    return (
        <mesh>
            <planeBufferGeometry attach="geometry" args={[viewport.width, viewport.height]}/>
            <shaderMaterial ref={shaderMaterialRef} attach="material" uniforms={uniforms} fragmentShader={fragment} vertexShader={vertex}/>
        </mesh>
    )
}

export default Gradient;