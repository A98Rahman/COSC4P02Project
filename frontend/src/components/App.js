import "../reset.css"
import React from 'react'
import { useEffect, useRef } from 'react'
import ReactToPrint from 'react-to-print';
import LandingPage from "./landing-page/LandingPage";

import FlexContainer from "./FlexContainer"

import ThemeContext from "./ThemeContext"
import ChatPage from "./ChatPage";

export default function App() {
	
	
	return (
		<ThemeContext>
			<LandingPage />
			<ChatPage />
		</ThemeContext>
	)
}

