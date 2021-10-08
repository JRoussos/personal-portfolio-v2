import React, { useRef } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';

import { fragment, vertex } from './shaders';

import './background-style.css'

const Sphere = () => {
    const meshRef = useRef()
    
    const uniforms = {
		uTime: { value: 0.0 }
	}

    useFrame( ({ clock }) => {
        meshRef.current.material.uniforms.uTime.value = clock.elapsedTime
    })

    return(
        <mesh ref={meshRef}>
            <sphereBufferGeometry attach="geometry" args={[1, 256, 256]}/>
            <shaderMaterial attach="material" uniforms={uniforms} vertexShader={vertex} fragmentShader={fragment}/>
        </mesh>
    )
}

const Background = () => {
    const cameraProps = {
		fov: 25,
		near: 0.1,
		far: 15,
		position: [0, 0, 7]
	}

    return (
        <div id="canvas-container">
            <Canvas dpr={[window.devicePixelRatio, 2]} camera={cameraProps} colorManagement={true}>
                <Sphere/>
            </Canvas>
        </div>
    )
}

export default Background
