import React, { useRef, useMemo, useEffect } from 'react'
import { useFrame } from '@react-three/fiber'
import { Vector3, Vector2 } from 'three'

import gsap from 'gsap';

import { makeTexture } from './makeTexture'
import { fragment, vertex } from './shaders/shaders'

import useObserverSize from "../../../../utils/useObserverSize";
import { getScrollValue } from '../../../../utils/SmoothScroll';

import { blue_red } from './colors'

const Gradient = () => {
    const obSize = useObserverSize(document.getElementById('scrollableContainer'))
    const meshRef = useRef()

    const { uTime, uSize, uDelta, uProgress, uColorTexture } = useMemo(() => {
        const uTime         = { value: 0.0 }
        const uSize         = { value: new Vector2(0, 0) }
        const uDelta        = { value: 0.0 }
        const uProgress     = { value: 0.0 }
        const uColorTexture = { value: makeTexture(blue_red) }

        return { uTime, uSize, uDelta, uProgress, uColorTexture }
    }, [])

    useEffect(() => {
        const changeBackgroundProgress = ( ref, state, delay=0, callback=() => {} ) => {
            state ? 
                gsap.to(ref, { duration: 1.0, delay: delay, value: 1.0, ease: "sine.inOut", onComplete: callback}) :
                gsap.to(ref, { duration: 0.7, delay: delay, value: 0.0, ease: "sine.inOut", onComplete: callback}) 
        }

        changeBackgroundProgress(uProgress, true, 0.2)
    }, [uProgress])

    useFrame(({ clock, viewport }) => {
        meshRef.current.material.uniforms.uTime.value = clock.elapsedTime
        meshRef.current.material.uniforms.uProgress.value = uProgress.value
        meshRef.current.material.uniforms.uSize.value = new Vector2(viewport.width, viewport.height)

        meshRef.current.material.uniforms.uDelta.value = getScrollValue().delta
    })

    const uniforms = {
        uTime: uTime,
        uSize: uSize,
        uColorTexture: uColorTexture,
        uProgress: uProgress,
        uDelta: uDelta
    }

    useEffect(() => {
        const { top, left, width, height } = document.getElementById('gradient-container').getBoundingClientRect()
        
        meshRef.current.position.y = -top + window.innerHeight/2 - height/2 -getScrollValue().scroll
        meshRef.current.position.x = left - window.innerWidth/2 + width/2

        meshRef.current.scale.copy(new Vector3(width, height, 1))
    }, [obSize])

    return (
        <mesh ref={meshRef}>
            <planeBufferGeometry attach="geometry" args={[1, 1, 1, 64]}/>
            <shaderMaterial attach="material" uniforms={uniforms} fragmentShader={fragment} vertexShader={vertex}/>
        </mesh>
    )
}

export default Gradient;