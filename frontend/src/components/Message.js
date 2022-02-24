import React from 'react'
import colorScheme from "../colorScheme"
import FlexContainer from './FlexContainer'

export default function Message({ floatRight = false, children }) {
	return (
		<div
			style={{
				width: "350px",
				minHeight: "50px",
				alignSelf: floatRight ? "flex-end" : "flex-start",
				margin: "16px 16px 0px 16px",
				borderRadius: `${8 * floatRight}px ${8 * !floatRight}px 8px 8px`,
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
