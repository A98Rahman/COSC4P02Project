import React from 'react'
import Header from "./Header"
import LandingPageRow from "./LandingPageRow";
import FlexContainer from "../FlexContainer"
import { useTheme } from "../ThemeContext"

export default function LandingPage() {
	const [theme, setTheme] = useTheme()

	return (
		<FlexContainer flexDirection="column" style={{ width: "100%", minHeight: "100vh", background: theme.colors.primaryColorBackground }}> {/* landing page */}

			<Header></Header>

			<LandingPageRow></LandingPageRow>
			<hr style={{ width: "95%", alignSelf: "center", margin: 0, color: "lightgrey" }}></hr>
			<LandingPageRow reverseDirection={true}></LandingPageRow>
			<hr style={{ width: "95%", alignSelf: "center", margin: 0, color: "lightgrey" }}></hr>
			<LandingPageRow reverseDirection={false}></LandingPageRow>


		</FlexContainer>
	)
}
