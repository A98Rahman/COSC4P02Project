import "../reset.css"
import React from 'react'
import { useEffect, useRef } from 'react'
import ReactToPrint from 'react-to-print';
import LandingPage from "./landing-page/LandingPage";
import Titlebar from './Titlebar'
import ChatPanel from "./ChatPanel"
import FlexContainer from "./FlexContainer"
import useMediaQuery from "./mediaQuery"
import ThemeContext from "./ThemeContext"
import { useTheme } from "./ThemeContext"
import Content from "./Content";



export default function App() {
	const isComputer = useMediaQuery('(min-device-width: 600px)')

	const dotSize = 2
	const spaceBetween = 16

	return (
		<ThemeContext>
			<LandingPage></LandingPage>

			<FlexContainer style={{ width: "100%", height: "100vh" }}> {/* chat page */}
				<Content> {/* chate page contents */}

					<Titlebar></Titlebar>

					<FlexContainer flexDirection="row" alignItems="stretch" style={{ width: "100%", height: "100%" }}> {/* panels */}

						<FlexContainer style={{ width: "5vw", minWidth: "50px", height: "100%", background: "white", borderRight: "solid 1px lightgrey" }}>

						</FlexContainer>

						<ChatPanel></ChatPanel>

					</FlexContainer>
				</Content>
			</FlexContainer>
		</ThemeContext>
	)
}

