import React, { useRef, useContext, useEffect } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { solid, regular, brands } from '@fortawesome/fontawesome-svg-core/import.macro'
import FlexContainer from './FlexContainer'
import { useTheme, lightTheme, darkTheme } from './ThemeContext'
import BadgerImage from "../badger.png"


export default function Titlebar({ children }) {
	const [theme, setTheme] = useTheme()

	return (
		<FlexContainer
			width="100%"
			height="60px"
			alignItems='center'
			style={{
				flexShrink: 0,
				minHeight: 0,
				boxSizing: "border-box",
				paddingLeft: "16px",
				background: "#b02a2a"
			}}
		>
			<img src={BadgerImage} alt="Badger Logo" style={{ position: "relative", height: "90%" }} />
			<h1 style={{marginLeft: "16px", fontSize: `${1.8 * theme.fontScaleFactor}rem`, color: "white" }}>Brock University Chatbadger</h1>
		</FlexContainer>
	)
}
