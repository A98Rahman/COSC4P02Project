import React, { useEffect, useRef, useState } from 'react'
import FlexContainer from "../FlexContainer"
import { useTheme } from "../ThemeContext"
import WavingBadger from "../../waving-badger.png"

export default function LandingPageRow({ title = "Title", text = "text...", reverseDirection = false }) {
	const [theme, setTheme] = useTheme()
	const imgContainerRef = useRef()
	const textContainerRef = useRef()
	const containerRef = useRef()

	const [textWidth, setTextWidth] = useState("33vw")

	useEffect(() => {
		function responseToWrap() {
			if (!imgContainerRef.current || !textContainerRef.current || !containerRef.current) return

			const imgContainerWidth = imgContainerRef.current.getBoundingClientRect().width
			const textContainerWidth = textContainerRef.current.getBoundingClientRect().width
			const marginWidth = 0.04 * window.innerWidth
			const containerWidth = containerRef.current.getBoundingClientRect().width

			//console.log(containerWidth)
		//	console.log((imgContainerWidth + textContainerWidth + marginWidth))
			if (containerWidth - (imgContainerWidth + textContainerWidth + marginWidth) < 0) {
				setTextWidth("100%")
			} else {
				setTextWidth("33vw")
			}
		}
		responseToWrap()

		window.addEventListener("resize", responseToWrap)
	}, [])


	function calculateRowWidth() {

	}
	return (
		<FlexContainer refs={containerRef} flexDirection={reverseDirection ? "row-reverse" : "row"} flexWrap={reverseDirection ? "wrap" : "wrap-reverse"} alignItems="center" justifyContent="center" style={{ rowGap: "30px", margin: "62px 16px 62px 16px" }}>

			<FlexContainer refs={textContainerRef} flexDirection="column" justifyContent="center" style={{ width: textWidth, minWidth: "270px", margin: reverseDirection ? "0px 0vw 0px 4vw" : "0px 4vw 0px 0vw" }}>
				<h2 style={{ fontSize: "64px", marginBottom: "8px", color: theme.colors.primaryColor }}>{title}</h2>
				<p style={{ fontSize: "24px", color: theme.colors.secondaryColorText }}>{text}</p>
			</FlexContainer>

			<div ref={imgContainerRef} style={{ width: "250px", height: "250px", borderRadius: "50%", background: theme.colors.secondaryColor }}>
				<img src={WavingBadger} style={{ width: "100%", marginTop: "-10px" }} />
			</div>

		</FlexContainer>
	)
}
