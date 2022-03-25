import React from 'react'
import FlexContainer from "../FlexContainer"
import BadgerImage1 from "../../badger.png"

export default function Header() {
	return (
		<FlexContainer justifyContent="center" style={{ width: "100%", height: "40vh", padding: "24px", boxSizing: "border-box", background: "#b02a2a" }}> {/* header */}
			<img src={BadgerImage1} alt="Badger Logo" style={{ position: "relative", marginRight: "32px" }} />
			<h1 style={{ fontSize: "64px", alignSelf: "center", color: "white" }}>Brock University <br></br> Chatbadger</h1>
		</FlexContainer>
	)
}
