import React from 'react'
import { useRef, useState } from 'react'
import FlexContainer from './FlexContainer.js'
import { useTheme, lightTheme, darkTheme } from "./ThemeContext"
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { solid, regular, brands } from '@fortawesome/fontawesome-svg-core/import.macro'
import useSize from '../useSize.js'

export default function SettingsPanel({downloadMessages}) {
	const [theme, setTheme] = useTheme()
	const activeThemeRef = useRef(0)
	const [open, setOpen] = useState(false)
	const panelRef = useRef()
	const panelSize = useSize(panelRef)

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

	if (panelSize) {
		console.log("panelSize")
	}
	return (
		<FlexContainer
			refs={panelRef}
			flexDirection="column"
			style={{
				visibility: open ? "visible" : "hidden",
				width: open ? "auto" : "0",
				minWidth: open ? "auto" : "0",
				height: open ? "100%" : "0",
				minHeight: "0",
				background: theme.colors.primaryColorBackground,
				borderRight: `solid 1px ${theme.colors.borderColor}`,
				padding: open ? "12px 8px 12px 8px" : "12px 0px 12px 0px",
				boxSizing: "border-box",
			}}
		>

			<button
				onClick={handleOnToggleOpen}
				type="button"
				style={{
					visibility: "visible",
					position: "absolute",
					left: open ? `${panelSize.width}px` : "0",
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

			<hr style={{ width: "100%", marginTop: "0", border: "none", borderTop: `solid 1px ${theme.colors.borderColor}` }}></hr>
			<h3 style={{ alignSelf: "center", fontSize: `${0.8 * theme.fontScaleFactor}rem`, color: theme.colors.iconColor, filter: "brightness(0.6)" }}>Theme</h3>
			<hr style={{ width: "100%", border: "none", borderTop: `solid 1px ${theme.colors.borderColor}` }}></hr>

			<button onClick={handleOnChangeTheme} type="button" style={{ display: "flex", justifyContent: "center", alignItems: "center", marginBottom: "12px", border: "none", background: "none" }}>
				<FontAwesomeIcon icon={solid('sun')} size="1x" style={{ height: "36px", color: theme.colors.iconColor }} />
			</button>

			<hr style={{ width: "100%", border: "none", borderTop: `solid 1px ${theme.colors.borderColor}` }}></hr>

			<h3 style={{ alignSelf: "center", fontSize: `${0.8 * theme.fontScaleFactor}rem`, color: theme.colors.iconColor, filter: "brightness(0.6)" }}>Font</h3>
			<hr style={{ width: "100%", border: "none", borderTop: `solid 1px ${theme.colors.borderColor}` }}></hr>

			<button onClick={increaseFontSize} type="button" style={{ display: "flex", justifyContent: "center", alignItems: "center", marginBottom: "10px", marginTop: "0", border: "none", background: "none" }}>
				<FontAwesomeIcon icon={solid('font')} size="1x" style={{ height: "36px", color: theme.colors.iconColor }} />
				<p style={{ fontWeight: "bold", fontSize: "32px", color: theme.colors.iconColor }}>+</p>
			</button>

			<button onClick={decreaseFontSize} type="button" style={{ display: "flex", justifyContent: "center", alignItems: "center", marginBottom: "12px", border: "none", background: "none" }}>
				<FontAwesomeIcon icon={solid('font')} size="1x" style={{ height: "36px", color: theme.colors.iconColor }} />
				<p style={{ fontWeight: "bold", fontSize: "42px", color: theme.colors.iconColor }}>-</p>
			</button>

			<hr style={{ width: "100%", border: "none", borderTop: `solid 1px ${theme.colors.borderColor}` }}></hr>

			<h3 style={{ alignSelf: "center", fontSize: `${0.8 * theme.fontScaleFactor}rem`, color: theme.colors.iconColor, filter: "brightness(0.6)" }}>Download</h3>
			<hr style={{ width: "100%", border: "none", borderTop: `solid 1px ${theme.colors.borderColor}` }}></hr>

			<button onClick={downloadMessages} type="button" style={{ display: "flex", justifyContent: "center", alignItems: "center", border: "none", background: "none" }}>
				<FontAwesomeIcon icon={solid('download')} size="1x" style={{ height: "36px", color: theme.colors.iconColor }} />
			</button>

		</FlexContainer>
	)
}
