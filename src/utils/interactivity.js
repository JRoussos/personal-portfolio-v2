import React, { useEffect } from 'react';
import { useFrame } from '@react-three/fiber'
import { Texture } from 'three';

const size = 32
let trail = []

const easeOutSine = (currentTime, startValue, changeInValue, duration) => {
	return changeInValue * Math.sin(currentTime/duration * (Math.PI/2)) + startValue;
}

const canvas = document.createElement('canvas')
canvas.width = size
canvas.height = size

const ctx = canvas.getContext('2d')
ctx.fillStyle = '#000000'
ctx.fillRect(0, 0, size, size)

export const texture = new Texture(canvas)

const Interactivity = ({maxAge=60}) => {
    const drawTouch = point => {
        const pos = {
            x: point.x * size,
			y: (1 - point.y) * size
		}
        
        let intensity = 1
		if (point.age < maxAge * 0.3) intensity = easeOutSine(point.age / (maxAge * 0.3), 0, 1, 1)
		else intensity = easeOutSine(1 - (point.age - maxAge * 0.3) / (maxAge * 0.7), 0, 1, 1)

		intensity *= point.force

		const radius = size * 0.15 * intensity
		const grd = ctx.createRadialGradient(pos.x, pos.y, radius * 0.25, pos.x, pos.y, radius)

		grd.addColorStop(0, 'rgba(255, 255, 255, 0.2)')
		grd.addColorStop(1, 'rgba(	0,	 0,	  0, 0.0)')

		ctx.beginPath()
		ctx.fillStyle = grd
		ctx.arc(pos.x, pos.y, radius, 0, Math.PI * 2)
		ctx.fill()
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
        ctx.fillStyle = 'black'
        ctx.fillRect(0, 0, size, size)

        trail.forEach( (point, index, array) => {
            point.age++

            if(point.age > maxAge) array.splice(index, 1)
            else drawTouch(point)
        })

        texture.needsUpdate = true
    })

	useEffect(() => {
		const handlePointerMove = e => {
			const x = e.clientX / window.innerWidth
			const y = Math.abs(1 - (e.clientY / window.innerHeight))
	
			addTouch({x, y})
		}

		document.addEventListener('pointermove', handlePointerMove)
		return () => document.removeEventListener('pointermove', handlePointerMove)
	}, [])

    return(
		<mesh>
			<planeBufferGeometry attach="geometry"/>
			<meshBasicMaterial attach="material" transparent={true} opacity={0.0}/>
		</mesh>
    )
}

export default Interactivity