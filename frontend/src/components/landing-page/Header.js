import React from 'react'
import FlexContainer from "../FlexContainer"
import BadgerImage1 from "../../badger.png"
import { useTheme } from "../ThemeContext"

export default function Header() {
	const [theme, setTheme] = useTheme()

	return (
		<>
			<div style={{ position: "absolute", width: "100%", height: "30vh", background: theme.colors.primaryColor }}>

			</div>
			<FlexContainer justifyContent="center" style={{ width: "100%", height: "40vh", padding: "24px", boxSizing: "border-box", zIndex: 1 }}> {/* header */}
				<img src={BadgerImage1} alt="Badger Logo" style={{ position: "relative", marginRight: "32px" }} />
				<h1 style={{ fontSize: "64px", alignSelf: "center", color: "#ededed", marginBottom: "10vh" }}>Brock University <br></br> Chatbadger</h1>
			</FlexContainer>
		</>

	)
}
