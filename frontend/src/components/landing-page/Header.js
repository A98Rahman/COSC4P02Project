import React from 'react'
import FlexContainer from "../FlexContainer"
import BadgerImage1 from "../../badger.png"
import { useTheme } from "../ThemeContext"

export default function Header() {
	const [theme, setTheme] = useTheme()

	return (
		<>
			<FlexContainer justifyContent="space-between" style={{ position: "absolute", width: "100%", height: "30vh", gap: "30px", padding: "8px 16px 0px 16px", boxSizing: "border-box", background: theme.colors.primaryColor }}>
				<a href="https://brocku.ca/" style={{ height: "min-content", fontSize: `${1.2 * theme.fontScaleFactor}rem`, color: "white" }}>Brock University</a>
				<a href="https://brocku.ca/brock-news/" style={{ height: "min-content", fontSize: `${1.2 * theme.fontScaleFactor}rem`, color: "white" }}>The Brock News</a>
				<a href="https://www.stcatharines.ca/en/index.aspx" style={{ height: "min-content", fontSize: `${1.2 * theme.fontScaleFactor}rem`, color: "white" }}>City of St. Catharines</a>
				<a href="" style={{ height: "min-content", fontSize: `${1.2 * theme.fontScaleFactor}rem`, color: "white" }}>Development Team</a>
			</FlexContainer>
			<FlexContainer justifyContent="center" style={{ width: "100%", height: "40vh", padding: "40px", boxSizing: "border-box", zIndex: 1, pointerEvents: "none" }}> {/* header */}
				<img src={BadgerImage1} alt="Badger Logo" style={{ position: "relative", marginRight: "32px" }} />
				<h1 style={{ fontSize: "64px", alignSelf: "center", color: "#ededed", marginBottom: "10vh" }}>Brock University <br></br> Chatbadger</h1>
			</FlexContainer>
		</>

	)
}
