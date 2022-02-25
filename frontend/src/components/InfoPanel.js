import React from 'react'
import colorScheme from "../colorScheme"

export default function InfoPanel({ children,style }) {
	return (
		<div style={{ background: colorScheme.grey, ...style }}>
			{children}
		</div>
	)
}