import React, { useEffect, useRef } from 'react'
import useSize from "../useSize"

export default function ParticleSystem({
	initializeFunction,
	updaterFunction,
	style
}) {
	const canvasRef = useRef(null)
	const contextRef = useRef(null)
	const animationFrameRequestID = useRef(null)

	const canvasSize = useSize(canvasRef)

	const particlesRef = useRef(null)

	useEffect(() => {
		if (!canvasRef.current) return
		contextRef.current = canvasRef.current.getContext("2d")
		animationFrameRequestID.current = requestAnimationFrame(draw)

		return () => {
			cancelAnimationFrame(animationFrameRequestID.current)
		}
	}, [canvasRef])

	useEffect(() => {
		if (!canvasRef.current) return

		canvasRef.current.width = canvasSize.width
		canvasRef.current.height = canvasSize.height
		//particlesRef.current = initializeFunction(canvasSize.width, canvasSize.height)
	}, [canvasSize])

	function draw() {
		if (!canvasRef.current || !contextRef.current) return

		const ctx = contextRef.current
		const width = canvasRef.current.width
		const height = canvasRef.current.height

		var particles = particlesRef.current ? particlesRef.current : initializeFunction(width, height)
		if (!particles) {
			animationFrameRequestID.current = requestAnimationFrame(draw)
			return
		}

		ctx.clearRect(0, 0, width, height)

		particles.forEach(particle => {
			for (let i = 0; i < particle.paths.length; i++) {
				ctx.fillStyle = particle.fillStyles[i]
				ctx.fill(particle.paths[i])
			}
		})

		particles = updaterFunction(particles, width, height)
		particlesRef.current = particles

		animationFrameRequestID.current = requestAnimationFrame(draw)
	}

	return (
		<canvas
			ref={canvasRef}
			style={{
				width: "100%",
				height: "100%",
				display: "block",
				background: "#202020",
				...style
			}}
		/>
	)
}
