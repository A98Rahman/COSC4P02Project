import React, { useRef, useContext, useEffect } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { solid, regular, brands } from '@fortawesome/fontawesome-svg-core/import.macro'
import FlexContainer from './FlexContainer'
import { useTheme, lightTheme, darkTheme } from './ThemeContext'


export default function Titlebar({ children }) {
	const [theme, setTheme] = useTheme()

	function handleOnChangeFontSize(e) {
		const value = e.target.value

		setTheme({ ...theme, fontScaleFactor: value })
	}

	function handleOnChangeTheme(e) {
		const useDarkTheme = e.target.checked
		const themeColors = useDarkTheme ? darkTheme.colors : lightTheme.colors

		const newTheme = { ...theme, colors: { ...themeColors } }
		console.log(theme)

		setTheme(newTheme)
	}



	return (
		<FlexContainer
			width="100%"
			height="60px"
			alignItems='center'
			flexDirection='row-reverse'
			style={{
				flexShrink: 0,
				minHeight: 0,
				background: "#b02a2a"
			}}
		>

		</FlexContainer>
	)
}
