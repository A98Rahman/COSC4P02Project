import React from 'react'
import { useEffect } from 'react'
import Header from "./Header"
import LandingPageRow from "./LandingPageRow";
import FlexContainer from "../FlexContainer"
import { useTheme, lightTheme, darkTheme } from "../ThemeContext"
import WavingBadger from "../../waving-badger.png"
import BadgerHoldingBrain from "../../badger-holding-brain.png"
import GreetingMessage from './GreetingMessage';

export default function LandingPage() {
	const [theme, setTheme] = useTheme()

	useEffect(() => {
		var fontScale = theme.fontScaleFactor
		if (localStorage.fontScale) {
			fontScale = parseFloat(localStorage.fontScale)
		}
		if (localStorage.theme) {
			if (localStorage.theme === "light") {
				setTheme({ ...lightTheme, fontScaleFactor: fontScale })
			} else {
				setTheme({ ...darkTheme, fontScaleFactor: fontScale })
			}
		}
	}, [])

	return (
		<FlexContainer flexDirection="column" style={{ width: "100%", minWidth: "0", overflow: "hidden", minHeight: "100vh", background: theme.colors.primaryColorBackground }}> {/* landing page */}

			<Header />

			<LandingPageRow
				title="The Badger is Friendly"
				image={WavingBadger}
				alt="Badger waving."
				particalSystemType={LandingPageRow.particalSystemType.HEARTS}
				transform="translateX(-5%) translateY(-10%)"
				text="The chatbadger can speak and understand plain english. They are always happy to receive greetings and small talk but they especially love to answer questions about Brock University and St. Catharines."
			/>

			<hr style={{ width: "95%", alignSelf: "center", margin: 0, border: "none", borderTop: `solid 1px ${theme.colors.borderColor}` }} />

			<LandingPageRow reverseDirection
				title="The Badger is Smart"
				image={BadgerHoldingBrain}
				alt="Badger holding a brain."
				particalSystemType={LandingPageRow.particalSystemType.CLOUDS}
				transform="translateX(-10%) translateY(-10%)"
				text="The chatbadger is very knowledgeable about Brock University and St. Catharines. You can ask him all kinds of questions such as those relating to programs, classes, events, schedules, locations..."
			/>

			{/*	
			<hr style={{ width: "95%", alignSelf: "center", margin: 0, border: "none", borderTop: `solid 1px ${theme.colors.borderColor}` }} />

			<LandingPageRow
				title="The Chatbadger Guide"
				image={WavingBadger}
				alt="Badger waving."
				particalSystemType={LandingPageRow.particalSystemType.NONE}
				transform="translateX(-5%) translateY(-10%)"
				text="Some text about the guide goes here."
			/>
			*/}

			<GreetingMessage></GreetingMessage>

		</FlexContainer>
	)
}
