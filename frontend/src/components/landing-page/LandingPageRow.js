import React from 'react'
import FlexContainer from "../FlexContainer"

export default function LandingPageRow({ reverseDirection = false }) {
	function renderContent() {

	}

	return (
		<FlexContainer flexDirection={reverseDirection ? "row-reverse" : "row"} alignItems="center" justifyContent="center" style={{ margin: "62px" }}>

			<FlexContainer flexDirection="column" style={{ width: "20vw", minWidth: "236px", margin: "0px 2vw 0px 2vw", background: "white" }}>
				<h2 style={{ fontSize: "64px", color: "#cc0000" }}>Title</h2>
				<p style={{ fontSize: "24px", color: "black" }}>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Curabitur consectetur facilisis enim vitae auctor. Vivamus egestas suscipit tincidunt.</p>
			</FlexContainer>

			<div style={{ width: "300px", height: "300px", background: "lightGrey" }}></div>

		</FlexContainer>
	)
}
