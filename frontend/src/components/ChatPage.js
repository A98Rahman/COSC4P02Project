import React from 'react'
import { useRef } from 'react'
import useStateRef from "../useStateRef.js"
import FlexContainer from './FlexContainer.js'
import { useTheme } from "./ThemeContext"
import Titlebar from './Titlebar'
import ChatPanel from "./ChatPanel"
import useMediaQuery from "./mediaQuery"

export default function ChatPage({ children, style }) {
	const [theme, setTheme] = useTheme()
	const isComputer = useMediaQuery('(min-device-width: 600px)')

	return (
		<FlexContainer
			width="100%"
			height="100vh"
			flexDirection="column"
			alignItems="stretch"
			style={{ background: theme.colors.pageColorBackground, ...style }}>

			<Titlebar></Titlebar>

			<FlexContainer flexDirection="row" alignItems="stretch" style={{ width: "100%", height: "100%" }}> {/* panels */}

				<FlexContainer style={{ width: "5vw", minWidth: "50px", height: "100%", background: theme.colors.primaryColorBackground, borderRight: `solid 1px ${theme.colors.borderColor}` }}> {/* will be the left side panel*/}

				</FlexContainer>

				<ChatPanel></ChatPanel>

			</FlexContainer>

		</FlexContainer>
	)

}