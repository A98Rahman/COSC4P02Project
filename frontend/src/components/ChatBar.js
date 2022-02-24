import React, { useRef, useState, useEffect } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { solid, regular, brands } from '@fortawesome/fontawesome-svg-core/import.macro'
import useStateRef from '../useStateRef'
import colorScheme from "../colorScheme"
import FlexContainer from './FlexContainer'

export default function ChatBar({ onSubmitMessage }) {

	const [emptyChatbarErrorState, setEmptyChatbarErrorState, emptyChatbarErrorStateRef] = useStateRef(false)

	function handleOnSubmit(e) {
		//so the page doesn't reload
		e.preventDefault()

		const inputElement = e.target[0]
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

	function handleOnBlur(e) {
		e.target.setCustomValidity("");
		e.target.reportValidity()
	}

	return (
		<FlexContainer style={{ flex: "0 0 40px", margin: "8px 8px 8px 8px", background: "white" }}>
			<form onSubmit={handleOnSubmit} style={{ width: "100%", display: "flex", overflow: "hidden", borderRadius: "4px", boxShadow: "0px 2px 2px 1px rgba(0, 0, 0, 0.1)" }}>
				<input
					onInput={handleOnInput}
					onBlur={handleOnBlur}
					type="text"
					placeholder="Ask a question"
					style={{ width: "100%", height: "40px", border: "none" }}
				/>
				<div style={{ display: "flex", justifyContent: "center", alignItems: "center", flex: "0 0 auto", background: colorScheme.darkRed }}>
					<div style={{ display: "flex", justifyContent: "center", alignItems: "center", flex: "0 0 auto", margin: "0px 8px 0px 8px" }}>
						<FontAwesomeIcon icon={solid('paper-plane')} size="1x" style={{ height: "24px", color: "white" }} />
					</div>
				</div>
			</form>

		</FlexContainer>
	)
}
