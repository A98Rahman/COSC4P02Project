import "../reset.css"
import colorScheme from "../colorScheme"
import React from 'react'
import Titlebar from './Titlebar'
import InfoPanel from "./InfoPanel"
import ChatPanel from "./ChatPanel"
import FlexContainer from "./FlexContainer"

export default function App() {
	return (
		<FlexContainer flexDirection="column" alignItems="stretch" style={{ width: "100vw", height: "100vh", background: "white" }}> {/* content */}
			<Titlebar></Titlebar>
			<FlexContainer flexDirection="row" alignItems="stretch" style={{ width: "100%", height: "100%" }}> {/* panels */}

				<FlexContainer flexDirection="column" alignItems="stretch" style={{ flex: "1 1 25%" }}> {/* info subpanels */}
					<InfoPanel style={{ flex: "1 1 100%", margin: "8px 8px 0px 8px" }}></InfoPanel>
					<InfoPanel style={{ flex: "1 1 100%", margin: "8px 8px 8px 8px" }}></InfoPanel>
				</FlexContainer>

				<ChatPanel></ChatPanel>

			</FlexContainer>
		</FlexContainer>
	)
}

