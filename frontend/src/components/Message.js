import React from 'react'
import FlexContainer from './FlexContainer'
import { useTheme } from './ThemeContext'

export default function Message({ floatRight = false, children }) {
	const [theme, setTheme] = useTheme()

	return (
		<div
			style={{
				maxWidth: "50%",
				minHeight: "2%",
				alignSelf: floatRight ? "flex-end" : "flex-start",
				margin: "16px 16px 0px 16px",
				borderRadius: `${6 * floatRight}px ${6 * !floatRight}px 6px 6px`,
				background: floatRight ? theme.colors.textBackgroundRight : theme.colors.textBackgroundLeft,
				color: floatRight ? theme.colors.textColorRight : "white",
				boxShadow: "0px 2px 2px 1px rgba(0, 0, 0, 0.1)",
				flex: "0 0 auto"
			}}
		>
			<FlexContainer width="100%" style={{flex: "0 0 100%", fontSize: `${theme.fontScaleFactor*1.0}rem`}}>
				{children}
			</FlexContainer>

		</div>
	)
}
