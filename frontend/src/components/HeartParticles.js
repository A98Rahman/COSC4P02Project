import React, { useRef } from 'react'
import ParticleSystem from './ParticleSystem'

export default function HeartParticles({ style }) {
	const nextSpawnTimer = useRef(1.0)

	function randomRange(min, max) {
		return Math.random() * (max - min) + min
	}

	function getParticle(x = 0.0, y = 0.0, vx = 0.0, vy = 0.0, size = 1.0, opacity = 1.0) {
		const matrix = new DOMMatrix([
			size, 0,
			0, size,
			x - 0.5 * size * 24, y - 0.5 * size * 24
		]);
		const path = new Path2D()
		path.addPath(new Path2D("m7,2.99998c-1.5355,0 -3.0784,0.5 -4.25,1.7c-2.3431,2.4 -2.2788,6.1 0,8.5l9.25,9.8l9.25,-9.8c2.279,-2.4 2.343,-6.1 0,-8.5c-2.343,-2.3 -6.157,-2.3 -8.5,0l-0.75,0.8l-0.75,-0.8c-1.172,-1.2 -2.7145,-1.7 -4.25,-1.7z"), matrix)
		//path.rect(x - 0.5 * size, y - 0.5 * size, size, size)

		return {
			position: { x: x, y: y },
			velocity: { x: vx, y: vy },
			size: size,
			opacity: opacity,
			paths: [path],
			fillStyles: [`rgba(255, 0, 0, ${opacity})`]
		}
	}

	function getInitialParticles(canvasWidth, canvasHeight) {
		const particles = []

		const x = randomRange(0.2 * canvasWidth, 0.8 * canvasWidth)
		const y = randomRange(0.5 * canvasHeight, 0.8* canvasHeight)
		const vx = randomRange(-0.02, 0.02)
		const vy = -0.05
		particles.push(getParticle(x, y, vx, vy, 0))


		return particles
	}

	function updateParticles(particles, canvasWidth, canvasHeight) {
		const vs = 0.005
		const newParticles = []
		particles.forEach((particle) => {
			if (particle.opacity > 0) {
				newParticles.push(getParticle(particle.position.x + particle.velocity.x, particle.position.y + particle.velocity.y, particle.velocity.x, particle.velocity.y, particle.size + vs, particle.opacity - 0.002))
			}
			if (nextSpawnTimer.current <= 0) {
				nextSpawnTimer.current = randomRange(0.5, 2.0)
				const x = randomRange(0.2 * canvasWidth, 0.8 * canvasWidth)
				const y = randomRange(0.5 * canvasHeight, 0.8 * canvasHeight)
				const vx = randomRange(-0.02, 0.02)
				const vy = -0.05
				newParticles.push(getParticle(x, y, vx, vy, 0, 1.3))

			}
		})

		nextSpawnTimer.current = nextSpawnTimer.current - 0.01
		return newParticles
	}

	return (
		<ParticleSystem style={style} initializeFunction={getInitialParticles} updaterFunction={updateParticles}></ParticleSystem>
	)
}
