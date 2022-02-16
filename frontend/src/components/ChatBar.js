import React, { useRef, useState, useEffect } from 'react'
import useStateRef from '../useStateRef'
import colorScheme from "../colorScheme"

export default function ChatBar({ onSubmitMessage }) {

	const [emptyChatbarErrorState, setEmptyChatbarErrorState, emptyChatbarErrorStateRef] = useStateRef(false)

	function handleOnSubmit(e) {
		//so the page doesn't reload
		e.preventDefault()

		const textValue = e.target[0].value

		if (textValue.trim() === "") {
			setEmptyChatbarErrorState(true)
			return
		}

		onSubmitMessage(e)
	}

	function handleOnInput(e) {
		const textValue = e.target.value

		if(textValue.trim() !== "" && emptyChatbarErrorStateRef.current === true) {
			setEmptyChatbarErrorState(false)
		}
	}

	return (
		<div style={{ flex: "0 0 40px", margin: "8px 8px 8px 8px" }}>
			{emptyChatbarErrorState &&
				<div style={{ width: "300px", height: "30px", background: colorScheme.darkRed, color: "white", position: "relative", float: "right", top: "0px" }}>
					<p>Enter a message for the chat bot.</p>
				</div>
			}

			<form onSubmit={handleOnSubmit}>
				<input type="text" onInput={handleOnInput} style={{ width: "100%", height: "40px" }}></input>
			</form>

		</div>
	)
}
