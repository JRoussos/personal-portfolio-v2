import React from 'react';
import { isMobile } from 'react-device-detect'
import { useLocation } from 'react-router-dom';

import { Canvas } from '@react-three/fiber';

import Interactivity, { texture } from '../../utils/interactivity';
import Animation from './animation';

import './background-style.scss';

const Background = () => {
    const { pathname } = useLocation()

    const cameraProps = {
		fov: 24,
		near: 0.1,
		far: 15,
		position: [0, 0, 7]
	}

    return (
        <div id="canvas-container">
            <Canvas dpr={[window.devicePixelRatio, 2]} camera={cameraProps} colorManagement={true}>
                { isMobile || <Interactivity maxAge={40}/> }
                <Animation location={pathname} texture={texture}/>
            </Canvas>
        </div>
    )
}

export default Background
