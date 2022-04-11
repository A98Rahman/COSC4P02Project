import React from 'react'
import useStateRef from "../useStateRef.js"
import FlexContainer from './FlexContainer.js'
import { useTheme } from "./ThemeContext"
import Titlebar from './Titlebar'
import ChatPanel from "./ChatPanel"
import useMediaQuery from "./mediaQuery"
import SettingsPanel from './SettingsPanel.js'


export default function ChatPage({ children, style }) {
	const [theme, setTheme] = useTheme()
	const isComputer = useMediaQuery('(min-device-width: 600px)')

	return (
		<FlexContainer
			width="100%"
			height="100vh"
			flexDirection="column"
			alignItems="stretch"
			style={{ minWidth: "0", minHeight: "0", maxHeight: "100vh", background: theme.colors.pageColorBackground, ...style }}>

			<Titlebar></Titlebar>

			<FlexContainer flexDirection="row" alignItems="stretch" style={{ width: "100%", height: "100%", minHeight: "0" }}> {/* panels */}
				<SettingsPanel></SettingsPanel>
				<ChatPanel></ChatPanel>
			</FlexContainer>

		</FlexContainer>
	)

}