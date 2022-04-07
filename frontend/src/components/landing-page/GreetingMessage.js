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
				width: 0vw;
			}
			50% {
				opacity: 1;
			}
			100% {
				width: 40vw;
				opacity: 1;
			}
		}
		`


		const growClass = `
		.grow {
			animation-name: grow;
			animation-duration: 1.0s;
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
		<div ref={divRef} onClick={handleOnClick} style={{ width: "40vw", height: "10vw", background: theme.colors.primaryColor, alignSelf: "flex-end", margin: "32px", opacity: "0", padding: "8px", boxSizing: "border-box" }}>
			<h3 style={{ whiteSpace: "nowrap", color: "white", fontWeight: "normal", fontSize: "1.5rem" }}>The Chatbager says hello.</h3>
			<h3 style={{ textDecoration: "underline", whiteSpace: "nowrap", color: "white", fontSize: "1.5rem" }}><br />Click here to meet them.</h3>
		</div>
	)
}
