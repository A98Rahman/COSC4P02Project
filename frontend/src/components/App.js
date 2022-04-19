import "../reset.css"
import React from 'react'
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import LandingPage from "./landing-page/LandingPage";
import ThemeContext from "./ThemeContext"
import ChatPage from "./ChatPage";

export default function App() {
	return (
		<ThemeContext>
			<Router>
				<Routes>
					<Route path="/" element={<LandingPage />} />
					<Route path="/chat-page" element={<ChatPage />} />
				</Routes>
			</Router>
		</ThemeContext>
	)
}

