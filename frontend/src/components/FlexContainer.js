import React from 'react'

export default function FlexContainer({
	width = "auto",
	height = "auto",
	flexDirection = "row",
	justifyContent = "flex-start",
	alignItems = "stretch",
	flexWrap = "nowrap",

	style,
	children
}) {
	return (
		<div style={{
			width: width,
			height: height,
			display: "flex",
			flexDirection: flexDirection,
			justifyContent: justifyContent,
			alignItems: alignItems,
			flexWrap: flexWrap,
			...style
		}}>
			{children}
		</div>
	)
}
