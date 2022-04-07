import React from 'react'
import Header from "./Header"
import LandingPageRow from "./LandingPageRow";
import FlexContainer from "../FlexContainer"
import { useTheme } from "../ThemeContext"
import WavingBadger from "../../waving-badger.png"
import BadgerHoldingBrain from "../../badger-holding-brain.png"

export default function LandingPage() {
	const [theme, setTheme] = useTheme()

	return (
		<FlexContainer flexDirection="column" style={{ width: "100%", minWidth: "0", overflow: "hidden", minHeight: "100vh", background: theme.colors.primaryColorBackground }}> {/* landing page */}

			<Header />

			<LandingPageRow
				title="The Badger is Friendly"
				image={WavingBadger}
				transform="translateX(-5%) translateY(-10%)"
				text="The chatbadger can speak and understand plain english. He is always happy to receive greetings and small talk but he especially loves to answer questions about Brock University and St. Catharines."
			/>

			<hr style={{ width: "95%", alignSelf: "center", margin: 0, border: "none", borderTop: `solid 1px ${theme.colors.borderColor}` }} />

			<LandingPageRow reverseDirection
				title="The Badger is Smart"
				image={BadgerHoldingBrain}
				transform="translateX(-10%) translateY(-10%)"
				text="The chatbadger is very knowledgeable about Brock University and St. Catharines. You can ask him all kinds of questions such as those relating to programs, classes, events, schedules, locations..."
			/>

			<hr style={{ width: "95%", alignSelf: "center", margin: 0, border: "none", borderTop: `solid 1px ${theme.colors.borderColor}` }} />

			<LandingPageRow
				title="The Chatbadger Guide"
				image={WavingBadger}
				transform="translateX(-5%) translateY(-10%)"
				text="Some text about the guide goes here."
			/>

		</FlexContainer>
	)
}
