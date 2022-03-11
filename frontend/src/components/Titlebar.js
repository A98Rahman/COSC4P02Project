import React, { useRef,useContext, useEffect } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { solid, regular, brands } from '@fortawesome/fontawesome-svg-core/import.macro'
import FlexContainer from './FlexContainer'
import { useTheme, lightTheme, darkTheme } from './ThemeContext'


export default function Titlebar({children}) {
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
			flexDirection='row'
			style={{
				background: theme.colors.primaryColor
			}}
		>
			<FlexContainer style={{ background: theme.colors.secondaryColor }}>
				<p style={{ color: "white" }}>Use Dark Theme</p>
				<input onChange={handleOnChangeTheme} type="checkbox" />
			</FlexContainer>

			<div style={{ background: theme.colors.secondaryColor }}>
				<p style={{ color: "white" }}>Font Size</p>
				<input onChange={handleOnChangeFontSize} min="1.0" max="4.0" defaultValue="1.0" step="0.1" type="range" />
			</div>

			<FontAwesomeIcon icon={solid('bars')} size="2x" inverse style={{ paddingLeft: "1%" }} />
		</FlexContainer>
	)
}
