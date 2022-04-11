import React from 'react'
import { useRef, useState } from 'react'
import FlexContainer from './FlexContainer.js'
import { useTheme, lightTheme, darkTheme } from "./ThemeContext"
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { solid, regular, brands } from '@fortawesome/fontawesome-svg-core/import.macro'

export default function SettingsPanel() {
	const [theme, setTheme] = useTheme()
	const activeThemeRef = useRef(0)
	const [open, setOpen] = useState(false)

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

	function handleOnToggleOpen() {
		setOpen((open) => !open)
	}

	return (
		<FlexContainer
			flexDirection="column"
			style={{
				visibility: open ? "visible" : "hidden",
				width: open ? "5vw" : "0",
				minWidth: open ? "50px" : "0",
				height: open ? "100%" : "0",
				minHeight: "0",
				background: theme.colors.primaryColorBackground,
				borderRight: `solid 1px ${theme.colors.borderColor}`,
				padding: "12px 0px 12px 0px",
				boxSizing: "border-box",
			}}
		>

			<button
				onClick={handleOnToggleOpen}
				type="button"
				style={{
					visibility: "visible",
					position: "absolute",
					left: open ? "max(5vw, 50px)" : "0",
					width: "36px",
					height: "36px",
					display: "flex",
					justifyContent: "center",
					alignItems: "center",
					marginBottom: "50px",
					border: "none",
					marginLeft: "4px",
					background: theme.colors.primaryColor,
					borderRadius: "8px",
					opacity: "0.8"
				}}
			>
				<FontAwesomeIcon icon={open ? solid('angle-left') : solid('gear')} size="1x" style={{ height: "28px", color: "white" }} />
			</button>

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
