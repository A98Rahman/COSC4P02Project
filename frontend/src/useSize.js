import { useState, useEffect, useRef } from "react";

export default function useSize(elementRef) {
	const [size, setSize] = useState({ width: undefined, height: undefined })
	const observerRef = useRef()

	function onResize() {
		setSize({
			width: elementRef.current.getBoundingClientRect().width,
			height: elementRef.current.getBoundingClientRect().height
		})
	}

	useEffect(() => {
		if (!elementRef || !elementRef.current) return

		onResize()
		window.addEventListener("resize", onResize)
		elementRef.current.addEventListener("resize", onResize)

		observerRef.current = new ResizeObserver(onResize).observe(elementRef.current)

		return () => {
			window.removeEventListener("resize", onResize)
			elementRef.current.removeEventListener("resize", onResize)
		}
	}, [elementRef, elementRef.current])

	return size
}     