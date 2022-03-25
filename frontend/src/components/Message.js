import React from 'react'
import FlexContainer from './FlexContainer'
import { useTheme } from './ThemeContext'

export default function Message({ floatRight = false, message, children }) {
	const [theme, setTheme] = useTheme()

	return (
		/*<FlexContainer
			style={{
				maxWidth: "50%",
				alignSelf: floatRight ? "flex-end" : "flex-start",
				margin: "16px 10vw 0px 10vw",
				borderRadius: `${6 * floatRight}px ${6 * !floatRight}px 6px 6px`,
				color: floatRight ? theme.colors.textColorRight : "white",

				flex: "0 0 auto"
			}}
		>
			<div style={{ width: "50px", height: "50px", flexShrink: "0", borderRadius: "50%", background: "green" }}></div>
			<FlexContainer width="100%" style={{ minWidth: "8vw", fontSize: `${theme.fontScaleFactor * 1.0}rem`, background: floatRight ? theme.colors.textBackgroundRight : theme.colors.textBackgroundLeft, boxShadow: "0px 2px 2px 1px rgba(0, 0, 0, 0.1)", }}>
				{children}
			</FlexContainer>
			<p>TEST TEXT</p>
		</FlexContainer> */


		<FlexContainer flexDirection="column" alignItems={floatRight ? "flex-end" : "flex-start"} style={{ margin: "0 10vw 32px 10vw", boxSizing: "border-box" }}>

			<FlexContainer flexDirection={floatRight ? "row-reverse" : "row"} >
				<div style={{ width: "50px", height: "50px", margin: floatRight ? "0 0 0 16px" : "0 16px 0 0", borderRadius: "50%", background: "darkgrey" }}></div> {/* image */}
				<div style={{ minWidth: "10vw", maxWidth: "30vw", background: floatRight ? theme.colors.primaryColor : theme.colors.secondaryColor, color: theme.colors.primaryColorText, fontSize: "1.2rem" }}>
					{children}
				</div>
			</FlexContainer >

			<p style={{ margin: "0 calc(50px + 16px) 0 calc(50px + 16px)", color: "grey" }}>sent at {message.time}</p>

		</FlexContainer >

	)
}
