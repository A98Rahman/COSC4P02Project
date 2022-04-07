import React from 'react'
import FlexContainer from "../FlexContainer"
import { useTheme } from "../ThemeContext"
import WavingBadger from "../../waving-badger.png"

export default function LandingPageRow({ title = "Title", text = "text...", reverseDirection = false }) {
	const [theme, setTheme] = useTheme()

	return (
		<FlexContainer flexDirection={reverseDirection ? "row-reverse" : "row"} alignItems="center" justifyContent="center" style={{ margin: "62px" }}>

			<FlexContainer flexDirection="column" justifyContent="center" style={{ width: "33vw", minWidth: "236px", margin: reverseDirection ? "0px 0vw 0px 4vw" : "0px 4vw 0px 0vw" }}>
				<h2 style={{ fontSize: "64px", marginBottom: "8px", color: theme.colors.primaryColor }}>{title}</h2>
				<p style={{ fontSize: "24px", color: theme.colors.secondaryColorText }}>{text}</p>
			</FlexContainer>

			<div style={{ width: "250px", height: "250px", borderRadius: "50%",  background: theme.colors.secondaryColor}}>
				<img src={WavingBadger} style={{width: "100%", marginTop: "-10px"}} />
			</div>

		</FlexContainer>
	)
}
