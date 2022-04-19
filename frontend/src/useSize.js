import { useState, useEffect, useRef } from "react";

export default function useSize(elementRef) {
	const [size, setSize] = useState({ width: 0, height: 0 })
	const observerRef = useRef()

	function onResize() {
		if (!elementRef || !elementRef.current) return
		setSize({
			width: elementRef.current.getBoundingClientRect().width,
			height: elementRef.current.getBoundingClientRect().height
		})
	}

	useEffect(() => {
		if (!elementRef || !elementRef.current) return

		onResize()
		window.addEventListener("resize", onResize)

		observerRef.current = new ResizeObserver(onResize).observe(elementRef.current)

		return () => {
			window.removeEventListener("resize", onResize)
			if (observerRef.current) observerRef.current.disconnect()
		}
	}, [])

	return size
}     