import React, { useRef, useState, useEffect } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { solid, regular, brands } from '@fortawesome/fontawesome-svg-core/import.macro'
import useStateRef from '../useStateRef'
import FlexContainer from './FlexContainer'
import { useTheme } from "./ThemeContext"

export default function ChatBar({ onSubmitMessage }) {
	const [theme, setTheme] = useTheme()

	const [emptyChatbarErrorState, setEmptyChatbarErrorState, emptyChatbarErrorStateRef] = useStateRef(false)
	const inputBarRef = useRef(null)
	const submitButton = useRef(null)
	const formBarRef = useRef(null)

	function clearInput(e) {
		e.preventDefault()

		console.log("clear")

		const inputElement = inputBarRef.current
		inputElement.value = ""

	}
	function handleOnSubmit(e) {
		//so the page doesn't reload
		e.preventDefault()

		console.log("submit")

		const inputElement = inputBarRef.current
		const textValue = inputElement.value

		//clear the input 
		inputElement.value = ""

		if (textValue.trim() === "") {
			inputElement.setCustomValidity("Enter some text")
			inputElement.reportValidity()

			setEmptyChatbarErrorState(true)
			return
		}

		//send the message the the chat panel
		onSubmitMessage(textValue)
	}

	function handleOnInput(e) {
		const textValue = e.target.value

		if (textValue.trim() !== "" && emptyChatbarErrorStateRef.current === true) {
			e.target.setCustomValidity("");
			e.target.reportValidity()
			setEmptyChatbarErrorState(false)
		}
	}

	function handleOnBlurInputField(e) {
		const related = e.relatedTarget

		if (related && e.target.parentElement.contains(related)) {
			return
		}

		e.target.setCustomValidity("");
		e.target.reportValidity()
	}

	function getInputBarHeight(desiredFontScale) {
		const browserDefaultFontSize = window.getComputedStyle(document.body).getPropertyValue('font-size')
		const pixelSize = `${Math.max(desiredFontScale * parseInt(browserDefaultFontSize), 40)}px`

		return pixelSize
	}

	return (

		<FlexContainer style={{ flex: "0 0 40px", margin: "8px 8px 8px 8px", background: "white" }}>
			<form onSubmit={handleOnSubmit} style={{ width: "100%", display: "flex", overflow: "hidden", borderRadius: "4px", boxShadow: "0px 2px 2px 1px rgba(0, 0, 0, 0.1)" }}>

				<button type="button" onClick={clearInput} style={{ display: "flex", justifyContent: "center", alignItems: "center", flex: "0 0 auto", border: "none", background: "none" }}>
					<div style={{ display: "flex", justifyContent: "center", alignItems: "center", flex: "0 0 auto", margin: "0px 8px 0px 8px" }}>
						<FontAwesomeIcon icon={solid('xmark')} size="1x" style={{ height: "24px", color: "5C615E" }} />
					</div>
				</button>

				<input
					ref={inputBarRef}
					onInput={handleOnInput}
					onBlur={handleOnBlurInputField}
					type="text"
					placeholder="Ask a question"
					style={{ width: "100%", minHeight: "auto", border: "none", fontSize: `${theme.fontScaleFactor * 1.0}rem` }}
				/>


				<button type="submit" style={{ display: "flex", justifyContent: "center", alignItems: "center", flex: "0 0 auto", border: "none", background: theme.colors.primaryColor }}>
					<div style={{ display: "flex", justifyContent: "center", alignItems: "center", flex: "0 0 auto", margin: "0px 8px 0px 8px" }}>
						<FontAwesomeIcon icon={solid('paper-plane')} size="1x" style={{ height: "24px", color: "white" }} />
					</div>
				</button>

			</form>

		</FlexContainer >
	)
}
