import React from 'react'
import { useTheme } from "./ThemeContext"

export default function InfoPanel({ children, style }) {
	const [theme, setTheme] = useTheme()

	return (
		<div style={{ background: theme.colors.secondaryColorBackground, ...style }}>
			{children}
		</div>
	)
}