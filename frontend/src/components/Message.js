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


		<FlexContainer flexDirection="column" alignItems={floatRight ? "flex-end" : "flex-start"} style={{ boxSizing: "border-box" }}>

			<FlexContainer flexDirection={floatRight ? "row-reverse" : "row"} >
				<div style={{ width: "60px", height: "60px", margin: floatRight ? "0 0 0 16px" : "0 16px 0 0", borderRadius: "50%", background: theme.colors.tertiaryColorBackground }}></div> {/* image */}
				<div style={{ minWidth: "10vw", maxWidth: "70%", background: floatRight ? theme.colors.primaryColor : theme.colors.secondaryColor, color: "#ededed", fontSize: "1.2rem", padding: "8px", boxSizing: "border-box" }}>
					{message.text && <p style={{ fontSize: `${1.4 * theme.fontScaleFactor}rem` }}>{message.text}</p>}
					{message.image && <img src={message.image} style={{ width: "100%" }} />}
				</div>
			</FlexContainer >

			<p style={{ fontSize: `${1.0 * theme.fontScaleFactor}rem`, margin: "0 calc(60px + 16px) 0 calc(60px + 16px)", color: "grey" }}>sent at {message.time}</p>

		</FlexContainer >

	)
}
