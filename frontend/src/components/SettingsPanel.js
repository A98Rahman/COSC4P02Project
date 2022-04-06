import React from 'react'
import { useRef } from 'react'
import FlexContainer from './FlexContainer.js'
import { useTheme, lightTheme, darkTheme } from "./ThemeContext"
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { solid, regular, brands } from '@fortawesome/fontawesome-svg-core/import.macro'

export default function SettingsPanel() {
	const [theme, setTheme] = useTheme()
	const activeThemeRef = useRef(0)

	function increaseFontSize(e) {
		const newFontSize = Math.min(theme.fontScaleFactor + 0.1, 1.8)
		setTheme({ ...theme, fontScaleFactor: newFontSize })
	}

	function decreaseFontSize(e) {
		const newFontSize = Math.max(theme.fontScaleFactor - 0.1, 0.8)
		setTheme({ ...theme, fontScaleFactor: newFontSize })
	}

	function handleOnChangeTheme(e) {
		var themeColors

		activeThemeRef.current = !activeThemeRef.current

		if (activeThemeRef.current) {
			themeColors = darkTheme.colors
		} else {
			themeColors = lightTheme.colors
		}

		const newTheme = { ...theme, colors: { ...themeColors } }

		setTheme(newTheme)
	}

	return (
		<FlexContainer
			flexDirection="column"
			style={{
				width: "5vw",
				minWidth: "50px",
				height: "100%",
				background: theme.colors.primaryColorBackground,
				borderRight: `solid 1px ${theme.colors.borderColor}`,
				padding: "12px 0px 12px 0px",
				boxSizing: "border-box",
			}}
		>

			<button onClick={handleOnChangeTheme} type="button" style={{ display: "flex", justifyContent: "center", alignItems: "center", marginBottom: "50px", border: "none", background: "none" }}>
				<FontAwesomeIcon icon={solid('sun')} size="1x" style={{ height: "36px", color: theme.colors.iconColor }} />
			</button>

			<button onClick={increaseFontSize} type="button" style={{ display: "flex", justifyContent: "center", alignItems: "center", marginBottom: "10px", marginTop: "auto", border: "none", background: "none" }}>
				<FontAwesomeIcon icon={solid('font')} size="1x" style={{ height: "36px", color: theme.colors.iconColor }} />
			</button>

			<button onClick={decreaseFontSize} type="button" style={{ display: "flex", justifyContent: "center", alignItems: "center", border: "none", background: "none" }}>
				<FontAwesomeIcon icon={solid('font')} size="1x" style={{ height: "36px", color: theme.colors.iconColor }} />
			</button>

		</FlexContainer>
	)
}
