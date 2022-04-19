import React, { useEffect, useRef, useState } from 'react'
import FlexContainer from "../FlexContainer"
import BadgerImage1 from "../../badger.png"
import { useTheme } from "../ThemeContext"
import useSize from '../../useSize'

export default function Header() {
	const [theme, setTheme] = useTheme()
	const headerRef = useRef()
	const imgRef = useRef()
	const imageSize = useSize(imgRef)
	const headerSize = useSize(headerRef)

	return (

		<FlexContainer
			refs={headerRef}
			flexDirection="column"
			justifyContent="center"
			style={{
				transform: "skewY(-4deg)",
				transformOrigin: "top left",
				boxSizing: "border-box",
				paddingBottom: "62px",
				background: theme.colors.primaryColor
			}}
		>
			<FlexContainer
				justifyContent="space-between"
				style={{
					display: window.innerWidth < 800 ? "none" : "flex",
					transform: "skewY(4deg)", transformOrigin: "top left",
					width: "100%", padding: "8px 16px 0px 16px",
					boxSizing: "border-box"
				}}
			>
				<a href="https://brocku.ca/" style={{ height: "min-content", fontSize: `${1.0 * theme.fontScaleFactor}rem`, color: "white" }}>Brock University</a>
				<a href="https://brocku.ca/brock-news/" style={{ height: "min-content", fontSize: `${1.0 * theme.fontScaleFactor}rem`, color: "white" }}>The Brock News</a>
				<a href="https://www.stcatharines.ca/en/index.aspx" style={{ height: "min-content", fontSize: `${1.0 * theme.fontScaleFactor}rem`, color: "white" }}>City of St. Catharines</a>
				<a href="https://www.stcatharines.ca/en/index.aspx" style={{ height: "min-content", fontSize: `${1.0 * theme.fontScaleFactor}rem`, color: "white" }}>Development Team</a>
			</FlexContainer>

			<FlexContainer justifyContent="center" style={{ padding: "16px", boxSizing: "border-box", margin: "auto 0 auto 0", transform: "skewY(4deg)", transformOrigin: "top left" }}>
				<img ref={imgRef} src={BadgerImage1} alt="Badger Logo" style={{ width: "50vw", maxWidth: "400px", height: imageSize.width, position: "relative", marginRight: "32px" }} />
				<h1 style={{ fontSize: "min(6vw, 100px)", alignSelf: "center", color: "#ededed" }}>Brock University <br></br> Chatbadger</h1>
			</FlexContainer>

		</FlexContainer>

	)
}
