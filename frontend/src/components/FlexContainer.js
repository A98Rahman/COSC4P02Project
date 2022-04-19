import React from 'react'

export default function FlexContainer({
	width = "auto",
	height = "auto",
	flexDirection = "row",
	justifyContent = "flex-start",
	alignItems = "stretch",
	flexWrap = "nowrap",

	refs,
	style,
	children
}) {
	return (
		<div ref={refs} style={{
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
