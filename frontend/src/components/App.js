import "../reset.css"
import React from 'react'
import {useEffect} from 'react'
import ReactToPrint from 'react-to-print';
import Titlebar from './Titlebar'
import InfoPanel1 from "./InfoPanel1"
import InfoPanel2 from "./InfoPanel2"
import ChatPanel from "./ChatPanel"
import FlexContainer from "./FlexContainer"
import useMediaQuery from "./mediaQuery"
import ThemeContext from "./ThemeContext"
import {useTheme} from "./ThemeContext"

export default function App() {
	const isComputer = useMediaQuery('(min-device-width: 600px)')

	return (
		<ThemeContext>
			<FlexContainer style={{ width: "100vw", height: "100vh", overflowY: "scroll" }}>
				<FlexContainer width="100%" height="100%" flexDirection="column" alignItems="stretch" style={{ background: "white" }}> {/* content */}
					<Titlebar></Titlebar>

					<FlexContainer flexDirection="row" alignItems="stretch" style={{ width: "100%", height: "100%" }}> {/* panels */}
						<FlexContainer flexDirection="column" alignItems="stretch" style={{ flex: isComputer ? ('1 1 30%') : ('0 0 0%') }}> {/* info subpanels */}
							<InfoPanel1 flexDirection="column" style={{ flex: "1 1 70%", margin: "8px 8px 0px 8px" }}>
							</InfoPanel1>
							<InfoPanel2 style={{ flex: "1 1 30%", margin: "8px 8px 8px 8px" }}></InfoPanel2>
						</FlexContainer>

						<ChatPanel></ChatPanel>

					</FlexContainer>
				</FlexContainer>
			</FlexContainer>
		</ThemeContext>
	)
}

