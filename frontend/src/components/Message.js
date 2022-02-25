import React from 'react'
import colorScheme from "../colorScheme"
import FlexContainer from './FlexContainer'

export default function Message({ floatRight = false, children }) {
	return (
		<div
			style={{
				width: "50%",
				minHeight: "2%",
				alignSelf: floatRight ? "flex-end" : "flex-start",
				margin: "16px 16px 0px 16px",
				borderRadius: `${4 * floatRight}px ${4 * !floatRight}px 4px 4px`,
				background: floatRight ? "white" : colorScheme.darkRed,
				color: floatRight ? "black" : "white",
				boxShadow: "0px 2px 2px 1px rgba(0, 0, 0, 0.1)",
				flex: "0 0 auto"
			}}
		>
			<FlexContainer width="100%" style={{flex: "0 0 100%"}}>
				{children}
			</FlexContainer>

		</div>
	)
}
