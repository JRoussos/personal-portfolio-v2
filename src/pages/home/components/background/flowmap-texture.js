import { useEffect } from 'react';
import { useFrame } from '@react-three/fiber'
import { Texture } from 'three';

let trail = []
let options = {
    canvaSize: 64,
    radius: 5
}

const easeOutSine = (currentTime, startValue, changeInValue, duration) => {
	return changeInValue * Math.sin(currentTime/duration * (Math.PI/2)) + startValue;
}

const easeOutQuad = (currentTime, startValue, changeInValue, duration) => {
    currentTime /= duration
    return -changeInValue * currentTime * (currentTime - 2) + startValue
}

const canvas = document.createElement('canvas')

canvas.id = 'FlowmapTexture'
canvas.width = options.canvaSize
canvas.height = options.canvaSize 

const ctx = canvas.getContext('2d', { alpha: true, willReadFrequently: false })

ctx.fillStyle = '#000000'
ctx.fillRect(0, 0, options.canvaSize, options.canvaSize)

export const texture = new Texture(canvas)

const FlowmapTexture = ({ maxAge=64, momentum=false }) => {
    const getting_older = 1 /maxAge

	const drawTexture = point => {
		const pos = {
            x: point.x * options.canvaSize,
			y: point.y * options.canvaSize
		}

        let intensity = 1

        if (point.age < maxAge * 0.3) intensity = easeOutSine(point.age /( maxAge * 0.3), 0, 1, 1)
        else  intensity = easeOutQuad(1 - (point.age - maxAge * 0.3) /(maxAge * 0.7), 0, 1, 1)

        intensity *= point.point_force.value
        // intensity = 1 - point.age / maxAge

        const offset = options.canvaSize * 5
        const rChannel = ((point.point_force.vX + 1) /2) * 255
        const gChannel = ((point.point_force.vY + 1) /2) * 255
        const bChannel = intensity * 255

        ctx.shadowOffsetX = ctx.shadowOffsetY = offset
        ctx.shadowBlur = options.radius

        ctx.shadowColor = `rgba(${rChannel}, ${gChannel}, ${bChannel}, ${0.2 * intensity})`
	
		ctx.beginPath()
        ctx.fillStyle = 'rgb(255, 0, 0)'
		ctx.arc(pos.x - offset, pos.y - offset, options.radius, 0, Math.PI * 2, false)
		ctx.fill()
	}

    const addTouch = point => {
		const last = trail[ trail.length - 1 ]
        let point_force = {
            value: 0,
            vX: 0,
            vY: 0   
        }

		if (last) {
			const dx = point.x - last.x
			const dy = point.y - last.y
			const dd = dx * dx + dy * dy

			point_force.value = Math.min(dd * 10000, 1)
            
            const dSqr = Math.sqrt(dd)
            point_force.vX = dx /dSqr
            point_force.vY = dy /dSqr
		}

		trail.push({ x: point.x, y: point.y, age: 0, point_force })
	}
	
    useFrame( () => {
        ctx.fillStyle = 'rgb(0, 0, 0)' // trail fade over time
		ctx.fillRect(0, 0, options.canvaSize, options.canvaSize)

        if(momentum) {
            trail.forEach( (point, index, array) => {
                const slowAsOlder = ( 1 - point.age /maxAge )
                const force = point.point_force.value * getting_older * slowAsOlder
                
                point.x += point.point_force.vX * force;
                point.y += point.point_force.vY * force;
                point.age++

                if(point.age > maxAge) array.splice(index, 1)
                else drawTexture(point)
            })
        }else {
            trail.forEach( (point, index, array) => {
                point.age++
    
                if(point.age > maxAge) array.splice(index, 1)
                else drawTexture(point)
            })
        }

        texture.needsUpdate = true
    })

	useEffect(() => {
		const handlePointerMove = e => {
			const x = e.clientX / window.innerWidth
			const y = e.clientY / window.innerHeight
	
			addTouch({ x, y })
		}

		document.addEventListener('pointermove', handlePointerMove)

		return () => {
			document.removeEventListener('pointermove', handlePointerMove)
		}
	}, [])

    return null
}

export default FlowmapTexture