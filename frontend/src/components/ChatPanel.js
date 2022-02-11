import React from 'react'
import useStateRef from "../useStateRef.js"
import colorScheme from '../colorScheme'
import ChatBar from './ChatBar'
import FlexContainer from './FlexContainer'
import Message from './Message'

export default function ChatPanel({ children }) {
	const placeholderMessageData = [
		{
			text: "test text",
			fromUser: false
		},
		{
			text: "test text",
			fromUser: true
		},
		{
			text: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum",
			fromUser: true
		},
		{
			text: "test text",
			fromUser: true
		},
		{
			text: "test text",
			fromUser: false
		},
	]

	const [messagesState, setMessagesState, messagesStateRef] = useStateRef(placeholderMessageData)

	function handleMessageSubmit(e) {
		e.preventDefault()

		const textValue = e.target[0].value
		e.target[0].value = ""

		setMessagesState(curMessagesState => [
			...curMessagesState,
			{
				text: textValue,
				fromUser: true
			}
		])
	}

	return (
		<FlexContainer flexDirection="column" alignItems="stretch" style={{ flex: "1 1 75%", margin: "8px 8px 8px 0px", borderRadius: "8px", background: colorScheme.grey }}>
			<FlexContainer flexDirection="column" style={{ flex: "1 1 100%" }}>
				{
					messagesState.map((message, i) =>
						<Message key={i} floatRight={message.fromUser}>
							<p style={{ padding: "8px" }}>{message.text}</p>
						</Message>)
				}
			</FlexContainer>

			<ChatBar onSubmitMessage={handleMessageSubmit}></ChatBar>
		</FlexContainer>
	)
}
