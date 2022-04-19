import React, { useRef } from 'react'
import ParticleSystem from './ParticleSystem'

export default function CloudParticles({ style }) {
	function randomRange(min, max) {
		return Math.random() * (max - min) + min
	}

	function getParticle(x = 0.0, y = 0.0, vx = 0.0, vy = 0.0, size = 50, colorFactor = 138, opacity = 1.0, boundingBox) {
		const path = new Path2D()
		path.arc(x, y, size, 0, 2 * Math.PI)

		return {
			position: { x: x, y: y },
			velocity: { x: vx, y: vy },
			size: size,
			colorFactor: colorFactor,
			opacity: opacity,
			boundingBox: boundingBox,
			paths: [path],
			fillStyles: [`rgba(${colorFactor}, ${colorFactor}, ${colorFactor}, ${opacity})`]
		}
	}

	function getInitialParticles(canvasWidth, canvasHeight) {
		if (!canvasWidth || !canvasHeight || canvasWidth === 0 || canvasHeight === 0) return null
		const particles = []

		let particleCount = 8
		let bbs = 0.5
		let boundingbox1 = { top: 0, right: bbs * canvasWidth, bottom: bbs * canvasHeight, left: 0 }
		boundingbox1.width = boundingbox1.right - boundingbox1.left
		boundingbox1.height = boundingbox1.bottom - boundingbox1.top
		for (let i = 0; i < particleCount; i++) {
			const size = 0.5 * randomRange(0.8 * boundingbox1.width, 0.8 * boundingbox1.width)
			const colorFactor = 138
			const x = randomRange(size, boundingbox1.width - size)
			const y = randomRange(size, boundingbox1.width - size)
			const vx = randomRange(-0.3, 0.3)
			const vy = randomRange(-0.3, 0.3)
			particles.push(getParticle(x, y, vx, vy, size, colorFactor, 0.8, boundingbox1))
		}

		particleCount = 4
		bbs = 0.1
		let boundingbox2 = { top: 0.95 * boundingbox1.bottom, right: 0.7 * boundingbox1.right + bbs * canvasWidth, bottom: 0.95 * boundingbox1.bottom + bbs * canvasHeight, left: 0.7 * boundingbox1.right }
		boundingbox2.width = boundingbox2.right - boundingbox2.left
		boundingbox2.height = boundingbox2.bottom - boundingbox2.top
		for (let i = 0; i < particleCount; i++) {
			const size = 0.5 * randomRange(0.8 * boundingbox2.width, 0.8 * boundingbox2.width)
			const colorFactor = 138
			const x = randomRange(boundingbox2.left + size, boundingbox2.right - size)
			const y = randomRange(boundingbox2.top + size, boundingbox2.bottom - size)
			const vx = randomRange(-0.15, 0.15)
			const vy = randomRange(-0.15, 0.15)
			particles.push(getParticle(x, y, vx, vy, size, colorFactor, 0.8, boundingbox2))
		}

		particleCount = 4
		bbs = 0.05
		let boundingbox3 = { top: 0.95 * boundingbox2.bottom, right: boundingbox2.right + bbs * canvasWidth, bottom: 0.95 * boundingbox2.bottom + bbs * canvasHeight, left: boundingbox2.right }
		boundingbox3.width = boundingbox3.right - boundingbox3.left
		boundingbox3.height = boundingbox3.bottom - boundingbox3.top
		for (let i = 0; i < particleCount; i++) {
			const size = 0.5 * randomRange(0.8 * boundingbox3.width, 0.8 * boundingbox3.width)
			const colorFactor = 138
			const x = randomRange(boundingbox3.left + size, boundingbox3.right - size)
			const y = randomRange(boundingbox3.top + size, boundingbox3.bottom - size)
			const vx = randomRange(-0.15, 0.15)
			const vy = randomRange(-0.15, 0.15)
			particles.push(getParticle(x, y, vx, vy, size, colorFactor, 0.8, boundingbox3))
		}

		return particles
	}

	function updateParticles(particles, canvasWidth, canvasHeight) {
		const vs = 0.005
		const newParticles = []
		particles.forEach((particle) => {
			let newPosition = { x: particle.position.x + particle.velocity.x, y: particle.position.y + particle.velocity.y }
			let newVelocity = particle.velocity
			let boundingBox = particle.boundingBox

			if (newPosition.x + particle.size > boundingBox.right || newPosition.x - particle.size < boundingBox.left) {
				newVelocity.x = -newVelocity.x
			}
			if (newPosition.y + particle.size > boundingBox.bottom || newPosition.y - particle.size < boundingBox.top) {
				newVelocity.y = -newVelocity.y
			}

			newParticles.push(getParticle(newPosition.x, newPosition.y, particle.velocity.x, particle.velocity.y, particle.size, particle.colorFactor, particle.opacity, particle.boundingBox))
		})

		return newParticles
	}

	return (
		<ParticleSystem style={style} initializeFunction={getInitialParticles} updaterFunction={updateParticles}></ParticleSystem>
	)
}
