import React from 'react'
import colorScheme from "../colorScheme"

export default function ChatBar({ onSubmitMessage }) {
	return (
		<div style={{ flex: "0 0 40px", margin: "8px 8px 8px 8px", background: "white" }}>
			<form onSubmit={onSubmitMessage}>
				<input type="text" style={{ width: "100%", height: "40px" }}></input>
			</form>

		</div>
	)
}
