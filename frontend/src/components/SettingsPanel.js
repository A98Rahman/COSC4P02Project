import React from 'react'
import FlexContainer from './FlexContainer.js'
import { useTheme } from "./ThemeContext"
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { solid, regular, brands } from '@fortawesome/fontawesome-svg-core/import.macro'

export default function SettingsPanel() {
	const [theme, setTheme] = useTheme()

	return (
		<FlexContainer
			flexDirection="column"
			style={{
				width: "5vw",
				minWidth: "50px",
				height: "100%",
				background: theme.colors.primaryColorBackground,
				borderRight: `solid 1px ${theme.colors.borderColor}`,
				paddingTop: "12px",
				boxSizing: "border-box",
			}}
		>

			<button type="button" style={{ display: "flex", justifyContent: "center", alignItems: "center", marginBottom: "50px", border: "none", background: "none" }}>
				<FontAwesomeIcon icon={solid('sun')} size="1x" style={{ height: "36px", color: theme.colors.iconColor}} />
			</button>

			<button type="button" style={{ display: "flex", justifyContent: "center", alignItems: "center", marginBottom: "10px", border: "none", background: "none" }}>
				<FontAwesomeIcon icon={solid('font')} size="1x" style={{ height: "36px", color: theme.colors.iconColor }} />
			</button>

			<button type="button" style={{ display: "flex", justifyContent: "center", alignItems: "center", border: "none", background: "none" }}>
				<FontAwesomeIcon icon={solid('font')} size="1x" style={{ height: "36px", color: theme.colors.iconColor }} />
			</button>

		</FlexContainer>
	)
}
