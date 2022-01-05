import React, { useEffect } from 'react';
import { useFrame } from '@react-three/fiber'
import { Texture } from 'three';

import ripple from '../assets/imgs/mouse.png';

let trail = []
let size = {
	w: window.innerWidth,
	h: window.innerHeight
}

const easeOutSine = (currentTime, startValue, changeInValue, duration) => {
	return changeInValue * Math.sin(currentTime/duration * (Math.PI/2)) + startValue;
}

const canvas = document.createElement('canvas')
canvas.width = size.w
canvas.height = size.h

const ctx = canvas.getContext('2d', { alpha: true, willReadFrequently: false })
ctx.fillStyle = '#000000'
ctx.fillRect(0, 0, size.w, size.h)

const img = document.createElement('img')
img.src = ripple

let rippleSize = img.width

export const texture = new Texture(canvas)

const Interactivity = ({maxAge=60}) => {
    const drawTouch = point => {
        const pos = {
            x: point.x * size.w,
			y: (1 - point.y) * size.h
		}
        
        let intensity = 1
		if (point.age < maxAge * 0.3) intensity = easeOutSine(point.age / (maxAge * 0.3), 0, 1, 1)
		else intensity = easeOutSine(1 - (point.age - maxAge * 0.3) / (maxAge * 0.7), 0, 1, 1)

		intensity *= point.force

		const radius = rippleSize * 0.15 * intensity
		const grd = ctx.createRadialGradient(pos.x, pos.y, 0, pos.x, pos.y, radius)

		grd.addColorStop(0, 'rgba(255, 255, 255, 0.1)')
		grd.addColorStop(1, 'rgba(255, 255, 255, 0.0)')
	
		ctx.beginPath()
		ctx.arc(pos.x, pos.y, radius, 0, Math.PI * 2, false)
		ctx.fillStyle = grd
		ctx.fill()
	}

	const drawTexture = point => {
		const pos = {
            x: point.x * size.w,
			y: (1 - point.y) * size.h
		}
        
        let intensity = 1
		if (point.age < maxAge * 0.3) intensity = easeOutSine(point.age / (maxAge * 0.3), 0, 1, 1)
		else intensity = easeOutSine(1 - (point.age - maxAge * 0.3) / (maxAge * 0.7), 0, 1, 1)

		intensity *= point.force

		let radius = rippleSize * 0.5 * intensity
		radius = radius < 50 ? 0 : radius

		ctx.drawImage(img, pos.x - radius/2, pos.y - radius/2, radius, radius)
	}

    const addTouch = point => {
		let force = 0
		const last = trail[ trail.length - 1 ]

		if (last) {
			const dx = last.x - point.x
			const dy = last.y - point.y
			const dd = dx * dx + dy * dy

			force = Math.min(dd * 10000, 1)
		}

		trail.push({ x: point.x, y: point.y, age: 0, force })
	}
	
    useFrame( () => {
        ctx.fillStyle = 'rgba(0, 0, 0, 0.1)' // trail fade over time
		ctx.fillRect(0, 0, size.w, size.h)

        trail.forEach( (point, index, array) => {
            point.age++

            if(point.age > maxAge) array.splice(index, 1)
            else drawTexture(point)
        })

        texture.needsUpdate = true
    })

	useEffect(() => {
		const handlePointerMove = e => {
			const x = e.clientX / window.innerWidth
			const y = Math.abs(1 - (e.clientY / window.innerHeight))
	
			addTouch({x, y})
		}

		const handleResize = () => {
			size.w = window.innerWidth
			size.h = window.innerHeight
		}

		document.addEventListener('pointermove', handlePointerMove)
		document.addEventListener('resize', handleResize)

		return () => {
			document.removeEventListener('pointermove', handlePointerMove)
			document.removeEventListener('resize', handleResize)
		}
	}, [])

    return(
		<mesh>
			<planeBufferGeometry attach="geometry"/>
			<meshBasicMaterial attach="material" transparent={true} opacity={0.0}/>
		</mesh>
    )
}

export default Interactivity