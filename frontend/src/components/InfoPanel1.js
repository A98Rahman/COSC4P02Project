import React from 'react'
import colorScheme from "../colorScheme"
import InfoPanel from './InfoPanel'

export default function InfoPanel1({ style }) {
	return (
		<InfoPanel style={style}>
			<div>
				<p style={{fontSize: "1.6rem"}}>PLACE HOLDERS</p>
			</div>
			<br></br>
			<div>
				<a style={{fontSize: "1.6rem"}} href="https://my.brocku.ca/Portal/">Student Portal</a>
			</div>
			<br></br>
			<div>
				<a style={{fontSize: "1.6rem"}} href="https://brocku.ca/brock-news/">Brock News</a>
			</div>
			<br></br>
			<div>
				<a style={{fontSize: "1.6rem"}} href="https://brocku.ca/brock-news/">Brock undergrad 2021-2022 chalander</a>
			</div>
			<br></br>
			<div>
				<a style={{fontSize: "1.6rem"}} href="https://brocku.ca/">Brock Website</a>
			</div>
			<br></br>
			<div>
				<a style={{fontSize: "1.6rem"}} href="https://www.coolmathgames.com/">Cool Math Games</a>
			</div>
		</InfoPanel>
	)
}
