import React, { Suspense, useRef, useMemo, useCallback, useEffect } from 'react';

import gsap from 'gsap';
import { Canvas, useFrame, useLoader, useThree } from '@react-three/fiber';
import { TextureLoader } from 'three';

import { fragment, vertex } from './shaders';

import Interactivity, { texture } from '../../utils/interactivity/interactivity';

import colors from '../../assets/imgs/image.png';
import './background-style.scss';

const FluidBackground = () => {
    const total = useRef(document.body.clientHeight - window.innerHeight)
    const { uScroll, uProgress, scrollPreviousPosition, scrollCurrentPosition } = useMemo(() => {
        const uScroll   = { value: 0.0 }
        const uProgress = { value: 0.0 }

        const scrollCurrentPosition  = { value: 0 }
        const scrollPreviousPosition = { value: 0 }

        return { uScroll, uProgress, scrollPreviousPosition, scrollCurrentPosition }
    }, [])
    
    const shaderMaterialRef = useRef()

    const { viewport } = useThree()
    const colorTexture = useLoader(TextureLoader, colors)

    const handleScroll = useCallback(() => {
        gsap.to(scrollCurrentPosition, { duration: 1.0, value: window.scrollY, ease: 'sine.out', onUpdate: () => {
            scrollPreviousPosition.value = total.current - scrollCurrentPosition.value 
        }})
    }, [total, scrollCurrentPosition, scrollPreviousPosition])

    const handleWaveProgress = useCallback(( delay=0 ) => {
        if(uProgress.value) gsap.to(uProgress, { duration: 1.5, delay: delay, value: 0.0, ease: "sine.inOut" })
        else gsap.to(uProgress, { duration: 1.5, delay: delay, value: 1.0, ease: "sine.inOut" })
    }, [uProgress])
    
    useEffect(() => {
        handleWaveProgress()
    }, [])
    
    window.addEventListener('resize', () => {
        total.current = document.body.clientHeight - window.innerHeight
        // console.log(total.current);
    })
    window.addEventListener('scroll', handleScroll, { passive: true })
    window.addEventListener('click',  handleWaveProgress, { passive: true })

    useFrame(({ clock }) => {  
        shaderMaterialRef.current.uniforms.uProgress.value = uProgress.value  
        shaderMaterialRef.current.uniforms.uTime.value = clock.elapsedTime
        shaderMaterialRef.current.uniforms.uScroll.value = scrollCurrentPosition.value / total.current  // window.scrollY / (document.body.clientHeight - window.innerHeight)
    })

    const uniforms = useMemo(() => ({
        uTime: { value: 0.0 },
        uColorTexture: { value: colorTexture },
        uInteractiveTexture: { value: texture },
        uProgress: uProgress,
        uScroll: uScroll
    }), [colorTexture, uProgress, uScroll])

    return(
        // <React.Fragment>
            <mesh>
                <planeBufferGeometry attach="geometry" args={[viewport.width, viewport.height]}/>
                <shaderMaterial ref={shaderMaterialRef} attach="material" uniforms={uniforms} fragmentShader={fragment} vertexShader={vertex}/>
            </mesh>
            // <Interactivity width={200} height={200}/>
        // </React.Fragment>
    )
}

const Background = () => {
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
                    <FluidBackground/>
                </Suspense>
            </Canvas>
        </div>
    )
}

export default Background
