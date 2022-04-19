import React, { useEffect, useRef, useState } from 'react'
import FlexContainer from "../FlexContainer"
import { useTheme } from "../ThemeContext"
import useSize from "../../useSize"
import HeartParticles from '../HeartParticles'
import CloudParticles from '../CloudParticles'

function LandingPageRow({ title = "Title", text = "text...", image, particalSystemType, transform, reverseDirection = false }) {
	const [theme, setTheme] = useTheme()
	const imgContainerRef = useRef()
	const textContainerRef = useRef()
	const containerRef = useRef()
	const particalSystemSize = useSize(imgContainerRef)

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

	function getTextMargin() {
		//if we wrapped
		if (textWidth === "100%") {
			return "0"
		}
		return !reverseDirection ? "0px 0vw 0px 4vw" : "0px 4vw 0px 0vw"
	}

	function getCloudOffset() {
		//if we wrapped
		if (textWidth === "100%") {
			return { top: -0.6 * particalSystemSize.height, left: -0.2 * particalSystemSize.width }

		}
		return { top: -0.6 * particalSystemSize.height, left: -0.5 * particalSystemSize.width }
	}

	return (
		<FlexContainer
			refs={containerRef}
			flexDirection={!reverseDirection ? "row-reverse" : "row"}
			flexWrap={!reverseDirection ? "wrap" : "wrap-reverse"}
			alignItems="center"
			justifyContent="center"
			style={{
				rowGap: "30px",
				margin: "100px 16px 100px 16px"
			}}
		>

			<FlexContainer
				refs={textContainerRef}
				flexDirection="column"
				justifyContent="center"
				style={{
					width: textWidth,
					minWidth: "270px",
					margin: getTextMargin()
				}}
			>
				<h2 style={{ fontSize: "64px", marginBottom: "8px", color: theme.colors.primaryColor }}>{title}</h2>
				<p style={{ fontSize: "24px", color: theme.colors.secondaryColorText }}>{text}</p>
			</FlexContainer>

			<div
				ref={imgContainerRef}
				style={{
					position: "relative",
					width: "250px",
					height: "250px",
					borderRadius: "50%",
					background: theme.colors.secondaryColor
				}}
			>
				<img src={image} style={{ width: "125%", transform: transform, filter: `brightness(${theme.imageBrightness}) contrast(${theme.imageContrast})` }} />
				{particalSystemType === 1 &&
					<HeartParticles
						style={{
							position: "absolute",
							width: 1.8 * particalSystemSize.width,
							height: 1.8 * particalSystemSize.height,
							top: -(0.4) * particalSystemSize.height,
							left: -(0.4) * particalSystemSize.width,
							background: "none"
						}}
					/>
				}
				{particalSystemType === 2 &&
					< CloudParticles
						style={{
							position: "absolute",
							width: 1.2 * particalSystemSize.width,
							height: 1.2 * particalSystemSize.height,
							top: getCloudOffset().top,
							left: getCloudOffset().left,
							background: "none"
						}}
					/>
				}
			</div>

		</FlexContainer >
	)
}

LandingPageRow.particalSystemType = { NONE: 0, HEARTS: 1, CLOUDS: 2 }

export default LandingPageRow