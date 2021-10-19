import React, { Suspense, useRef, useMemo, useEffect } from 'react';

import gsap from 'gsap';
import { Canvas, useFrame, useLoader, useThree } from '@react-three/fiber';
import { TextureLoader } from 'three';

import { makeTexture } from './makeTexture';
import { fragment, vertex } from './shaders';

// import Interactivity, { texture } from '../../utils/interactivity/interactivity';
import './background-style.scss';

const FluidBackground = ({getScrollValue}) => {
    const { uScroll, uProgress } = useMemo(() => {
        const uScroll   = { value: 0.0 }
        const uProgress = { value: 0.0 }

        return { uScroll, uProgress }
    }, [])
    
    const shaderMaterialRef = useRef()

    const { viewport } = useThree()
    const colorTexture = useLoader(TextureLoader, makeTexture())
    
    useEffect(() => {
        const handleProgress = ( delay=0 ) => {
            if(uProgress.value) gsap.to(uProgress, { duration: 1.5, delay: delay, value: 0.0, ease: "sine.inOut" })
            else gsap.to(uProgress, { duration: 1.5, delay: delay, value: 1.0, ease: "sine.inOut" })
        }

        handleProgress()
        window.addEventListener('click',  handleProgress, { passive: true })
    }, [uProgress])

    useFrame(({ clock }) => {         
        shaderMaterialRef.current.uniforms.uProgress.value = uProgress.value  
        shaderMaterialRef.current.uniforms.uTime.value = clock.elapsedTime
        shaderMaterialRef.current.uniforms.uScroll.value = getScrollValue()/document.body.clientHeight
    })

    const uniforms = useMemo(() => ({
        uTime: { value: 0.0 },
        uColorTexture: { value: colorTexture },
        // uInteractiveTexture: { value: texture },
        uProgress: uProgress,
        uScroll: uScroll
    }), [colorTexture, uProgress, uScroll])

    return(
        <React.Fragment>
            <mesh>
                <planeBufferGeometry attach="geometry" args={[viewport.width, viewport.height]}/>
                <shaderMaterial ref={shaderMaterialRef} attach="material" uniforms={uniforms} fragmentShader={fragment} vertexShader={vertex}/>
            </mesh>
            {/* <Interactivity width={200} height={200}/> */}
        </React.Fragment>
    )
}

const Background = ({ getScrollValue }) => {
    const cameraProps = {
		fov: 24,
		near: 0.1,
		far: 15,
		position: [0, 0, 7]
	}

    return (
        <div id="canvas-container">
            <Canvas dpr={[window.devicePixelRatio, 2]} camera={cameraProps} colorManagement={true}>
                <Suspense fallback={null}>
                    <FluidBackground getScrollValue={getScrollValue}/>
                </Suspense>
            </Canvas>
        </div>
    )
}

export default Background
