import React from 'react'
import InfoPanel from './InfoPanel'
import { useTheme } from "./ThemeContext"
import FlexContainer from "./FlexContainer"


export default function InfoPanel2({ style }) {
	const [theme, setTheme] = useTheme()

	return (
		<InfoPanel style={{  ...style }}>
			<FlexContainer flexDirection='column' height='100%' style={{flex: "1 1 auto",display: "flex"}}>
				<iframe style={{ height: "100%"}} src="https://www.youtube.com/embed/6OJu0az55gk" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>
			</FlexContainer>
				
			
			

		</InfoPanel>
	)
}
