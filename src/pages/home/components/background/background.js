import React, { Suspense, useEffect } from 'react';
import { createPortal } from 'react-dom';
import { Canvas } from '@react-three/fiber';

import { useStore } from '../../../../contexts/store';
import Meshes from './meshes'

const FallbackElement = () => {
    const { dispatch } = useStore()    
    
    useEffect(() => {
        return () => dispatch({ type: 'CHANGE_CANVAS_LOADED', canvasReady: true })
    }, [dispatch])

    return null
}

const Background = () => {
    const cameraProps = {
		fov: Math.atan((window.innerHeight/2)/100) * 2 * (180/Math.PI),
		near: 0.1,
		far: 1000,
		position: [0, 0, 100]
	}

    const { dispatch } = useStore()    
    
    useEffect(() => {
        return () => dispatch({ type: 'CHANGE_CANVAS_LOADED', canvasReady: false})
    }, [dispatch])

    return createPortal(
        <div id="canvas-container">
            <Suspense fallback={<FallbackElement/>}>
                <Canvas dpr={[window.devicePixelRatio, 2]} camera={cameraProps} colorManagement={true}>
                    <Meshes/>
                </Canvas>
            </Suspense>
        </div>, document.getElementById('root')
    )
}

export default Background
