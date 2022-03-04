import React from 'react'
import InfoPanel from './InfoPanel'
import { useTheme } from "./ThemeContext"


export default function InfoPanel2({ style }) {
	const [theme, setTheme] = useTheme()

	return (
		<InfoPanel style={{  ...style }}>

		</InfoPanel>
	)
}
