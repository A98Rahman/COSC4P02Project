import React, { useEffect, useRef, useState } from 'react'
import FlexContainer from "../FlexContainer"
import BadgerImage1 from "../../badger.png"
import { useTheme } from "../ThemeContext"

export default function Header() {
	const [theme, setTheme] = useTheme()
	const [imgHeight, setimgHeight] = useState("auto")
	const imgRef = useRef()

	useEffect(() => {
		setimgHeight(`${imgRef.current.getBoundingClientRect().width}px`)

	}, [imgRef])


	return (

		<FlexContainer flexDirection="column" style={{ background: theme.colors.primaryColor }}>
			<FlexContainer justifyContent="space-between" style={{ width: "100%", padding: "8px 16px 0px 16px", boxSizing: "border-box" }}>
				<a href="https://brocku.ca/" style={{ height: "min-content", fontSize: `${1.0 * theme.fontScaleFactor}rem`, color: "white" }}>Brock University</a>
				<a href="https://brocku.ca/brock-news/" style={{ height: "min-content", fontSize: `${1.0 * theme.fontScaleFactor}rem`, color: "white" }}>The Brock News</a>
				<a href="https://www.stcatharines.ca/en/index.aspx" style={{ height: "min-content", fontSize: `${1.0 * theme.fontScaleFactor}rem`, color: "white" }}>City of St. Catharines</a>
				<a href="" style={{ height: "min-content", fontSize: `${1.0 * theme.fontScaleFactor}rem`, color: "white" }}>Development Team</a>
			</FlexContainer>

			<FlexContainer style={{ padding: "16px", boxSizing: "border-box" }}>
				<img ref={imgRef} src={BadgerImage1} alt="Badger Logo" style={{ display: "block", width: "min(50vw, 50vh)", height: imgHeight, position: "relative", marginRight: "32px" }} />
				<h1 style={{ fontSize: "6vw", alignSelf: "center", color: "#ededed" }}>Brock University <br></br> Chatbadger</h1>
			</FlexContainer>

		</FlexContainer>

	)
}
