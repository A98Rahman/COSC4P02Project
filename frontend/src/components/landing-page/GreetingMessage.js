import React, { useEffect, useRef } from 'react'
import { useTheme } from '../ThemeContext'
import { useNavigate } from 'react-router'

export default function GreetingMessage() {
	const [theme, setTheme] = useTheme()
	const divRef = useRef()
	const navigate = useNavigate()

	useEffect(() => {
		const growAnimation = `
		@keyframes grow {
			0% {
				min-width: 0vw;
				max-width: 0vw;
			}
			50% {
				min-width: 40%;
				opacity: 1;
			}
			100% {
				min-width: 40%;
				max-width: 100vw;
				opacity: 1;
			}
		}
		`


		const growClass = `
		.grow {
			animation-name: grow;
			animation-duration: 4.0s;
			animation-fill-mode: forwards;
		}
		`

		injectStyle([growAnimation, growClass])

		document.addEventListener('scroll', handleOnScroll)

		return () => {
			document.removeEventListener('scroll', handleOnScroll)
		}
	}, [])



	function injectStyle(styles) {
		const styleElement = document.createElement('style')
		let styleSheet = null

		document.head.appendChild(styleElement)

		styleSheet = styleElement.sheet

		styles.forEach((style) => {
			styleSheet.insertRule(style, styleSheet.cssRules.length)
		})
	}

	function handleOnClick() {
		navigate('/chat-page')
	}

	function handleOnScroll(e) {
		let scrollHeight = document.body.offsetHeight - window.innerHeight
		let scrollPosition = window.scrollY

		let scrollPercentage = scrollPosition / scrollHeight

		if (scrollPercentage > 0.85) {
			divRef.current.className = "grow"
		}
	}


	return (
		<div ref={divRef} onClick={handleOnClick} style={{ background: theme.colors.primaryColor, alignSelf: "flex-end", margin: "32px", opacity: "0", padding: "8px", boxSizing: "border-box", overflow: "hidden" }}>
			<h3 style={{ whiteSpace: "nowrap", color: "white", fontWeight: "normal", fontSize: "1.5rem" }}>The Chatbager says hello.</h3>
			<h3 style={{ textDecoration: "underline", whiteSpace: "nowrap", color: "white", fontSize: "1.5rem" }}><br />Click here to meet them.</h3>
		</div>
	)
}
