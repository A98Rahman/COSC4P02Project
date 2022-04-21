import React, { useState, useEffect, useRef } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { solid, regular, brands } from '@fortawesome/fontawesome-svg-core/import.macro'
import FlexContainer from './FlexContainer'
import { useTheme } from './ThemeContext'
import useWindowSize from '../useWindowSize'

export default function Message({ floatRight = false, message, speechRef, children }) {
	const [theme, setTheme] = useTheme()
	const windowSize = useWindowSize()
	const [small, setSmall] = useState(false)
	const imageIconRef = useRef()
	const messageRef = useRef()
	const timeTextRef = useRef()

	const animationLength = 0.8
	const delayBetweenMessages = 0.5

	useEffect(() => {
		if (windowSize.width < "450") {
			if (!small) {
				setSmall(true)
			}
		} else {
			if (small) {
				setSmall(false)
			}
		}
	}, [windowSize])


	function handleOnClick() {
		if (!speechRef || !speechRef.current) return
		const speech = speechRef.current

		speech.speak({
			text: message.text,
		}).then(() => {
			console.log("Success !")
		}).catch(e => {
			console.error("An error occurred :", e)
		})
	}

	useEffect(() => {
		const slideRightAnimation = `
		@keyframes slideRight {
			0% {
				transform: translateX(${0.5 * windowSize.width}px);
				opacity: 0.0;
			}
			100% {
				transform: translateX(0);
				opacity: 1.0;
			}
		}
		`

		const slideLeftAnimation = `
		@keyframes slideLeft {
			0% {
				transform: translateX(${-0.5 * windowSize.width}px);
				opacity: 0.0;
			}
			100% {
				transform: translateX(0);
				opacity: 1.0;
			}
		}
		`

		const fadeInAnimation = `
		@keyframes fadeIn {
			0% {
				opacity: 0.0;
			}
			100% {
				opacity: 1.0;
			}
		}
		`

		const fadeOutAnimation = `
		@keyframes fadeOut {
			0% {
				opacity: 1.0;
			}
			100% {
				opacity: 0.0;
			}
		}
		`

		const slideRightClass = `
		.slideRight {
			animation-name: slideRight;
			animation-duration: ${animationLength}s;
			animation-fill-mode: forwards;
		}
		`

		const slideLeftClass = `
		.slideLeft {
			animation-name: slideLeft;
			animation-duration: ${animationLength}s;
			animation-fill-mode: forwards;
		}
		`

		const fadeInClass = `
		.fadeIn {
			animation-name: fadeIn;
			animation-duration: ${animationLength}s;
			animation-fill-mode: forwards;
		}
		`

		const fadeOutClass = `
		.fadeOut {
			animation-name: fadeOut;
			animation-duration: ${animationLength}s;
			animation-fill-mode: forwards;
		}
		`


		injectStyle([slideRightAnimation, slideLeftAnimation, fadeInAnimation, fadeOutAnimation, fadeInClass, fadeOutClass, slideRightClass, slideLeftClass])

		animate()
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

	function animate() {
		if (message.indexInGroup === -1) {
			imageIconRef.current.className = "fadeIn"
			messageRef.current.className = "fadeIn"
			timeTextRef.current.className = "fadeIn"
		} else {
			imageIconRef.current.className = floatRight ? "slideLeft" : "slideRight"
			messageRef.current.className = floatRight ? "slideLeft" : "slideRight"
			timeTextRef.current.className = floatRight ? "slideLeft" : "slideRight"
		}
	}

	return (
		<FlexContainer flexDirection="column" alignItems={floatRight ? "flex-end" : "flex-start"} style={{ boxSizing: "border-box" }}>

			<FlexContainer flexDirection={small ? "column" : (floatRight ? "row-reverse" : "row")} >
				{(message.firstInGroup || !small) &&
					<div
						ref={imageIconRef}
						style={{
							position: "relative",
							display: "flex",
							justifyContent: "center",
							alignItems: "center",
							width: "40px",
							height: "40px",
							marginBottom: "6px",
							alignSelf: small ? (floatRight ? "flex-end" : "auto") : "auto",
							borderRadius: "50%",
							background: theme.colors.tertiaryColorBackground,
							opacity: 0.0,
							animationDelay: `${delayBetweenMessages * message.indexInGroup}s`,
						}}
					>
						<FontAwesomeIcon icon={message.fromUser ? solid('user') : solid('paw')} size="1x" style={{ height: "65%", color: theme.colors.userIconColor }} />
					</div>
				} {/* user icon */}

				<div
					onClick={handleOnClick} ref={messageRef}
					style={{
						minWidth: "max(100px, 16vw)",
						maxWidth: "70%",
						background: floatRight ? theme.colors.primaryColor : theme.colors.secondaryColor,
						color: "#ededed",
						fontSize: "1.2rem",
						padding: "8px",
						margin: small ? "0" : "0 6px 0 6px",
						boxSizing: "border-box",
						alignSelf: small ? (floatRight ? "flex-end" : "flex-start") : "auto",
						animationDelay: `${0.7 * animationLength + delayBetweenMessages * message.indexInGroup}s`,
						opacity: 0.0
					}}
				> {/* message */}

					{message.text && <p style={{ fontSize: `${1.0 * theme.fontScaleFactor}rem` }}>{message.text}</p>}
					{message.image && <img src={message.image} style={{ width: "100%" }} />}

				</div>
			</FlexContainer >

			<p
				ref={timeTextRef}
				style={{
					dispaly: "block",
					fontSize: `${0.8 * theme.fontScaleFactor}rem`, margin: small ? "0" : "0 calc(40px + 6px) 0 calc(40px + 6px)",
					color: "grey",
					animationDelay: `${animationLength + delayBetweenMessages * message.indexInGroup}s`,
					opacity: 0
				}}
			>
				sent at {message.time}
			</p>

		</FlexContainer >

	)
}
