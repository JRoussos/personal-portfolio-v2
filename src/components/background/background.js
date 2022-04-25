import React, { Suspense } from 'react';
import { useLocation } from 'react-router-dom';
import { Canvas } from '@react-three/fiber';

import Meshes from './meshes'

import './background-style.scss';

const Background = () => {
    const { pathname } = useLocation()

    const cameraProps = {
		fov: Math.atan((window.innerHeight/2)/100) * 2 * (180/Math.PI),
		near: 0.1,
		far: 1000,
		position: [0, 0, 100]
	}

    return (
        <div id="canvas-container">
            <Canvas dpr={[window.devicePixelRatio, 2]} camera={cameraProps} colorManagement={true}>
                <Suspense fallback={null}>
                    <Meshes pathname={pathname}/>
                </Suspense>
            </Canvas>
        </div>
    )
}

export default Background
