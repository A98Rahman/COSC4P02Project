import React from 'react'
import InfoPanel from './InfoPanel'
import { useTheme } from "./ThemeContext"

export default function InfoPanel1({ style }) {
	const [theme, setTheme] = useTheme()

	return (
		<InfoPanel style={style}>
			<div>
				<p style={{fontSize: `${theme.fontScaleFactor*1.6}rem`}}>PLACE HOLDERS</p>
			</div>
			<br></br>
			<div>
				<a style={{fontSize: `${theme.fontScaleFactor*1.6}rem`}} href="https://my.brocku.ca/Portal/">Student Portal</a>
			</div>
			<br></br>
			<div>
				<a style={{fontSize: `${theme.fontScaleFactor*1.6}rem`}} href="https://brocku.ca/brock-news/">Brock News</a>
			</div>
			<br></br>
			<div>
				<a style={{fontSize: `${theme.fontScaleFactor*1.6}rem`}} href="https://brocku.ca/brock-news/">Brock undergrad 2021-2022 chalander</a>
			</div>
			<br></br>
			<div>
				<a style={{fontSize: `${theme.fontScaleFactor*1.6}rem`}} href="https://brocku.ca/">Brock Website</a>
			</div>
			<br></br>
			<div>
				<a style={{fontSize: `${theme.fontScaleFactor*1.6}rem`}} href="https://www.coolmathgames.com/">Cool Math Games</a>
			</div>
		</InfoPanel>
	)
}
