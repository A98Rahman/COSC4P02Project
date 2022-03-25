import React from 'react'
import { useRef } from 'react'
import useStateRef from "../useStateRef.js"
import ChatBar from './ChatBar'
import FlexContainer from './FlexContainer'
import Message from './Message'
import { useTheme } from "./ThemeContext"

export default function ChatPanel({ children }) {
	const placeholderMessageData = [
		{
			text: "text",
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

	const [theme, setTheme] = useTheme()

	const [messagesState, setMessagesState, messagesStateRef] = useStateRef(placeholderMessageData)
	const [responsePendingState, setResponsePendingState, responsePendingStateRef] = useStateRef(false)
	const messageContainerRef = useRef(null)

	function handleMessageSubmit(messageValue) {
		//get the submitted text from the message and clear the chatbar
		const textValue = messageValue


		//update the messages state to include the user submitted message
		setMessagesState(curMessagesState => [
			...curMessagesState,
			{
				text: textValue,
				fromUser: true
			}
		])

		//submit the user message to rasa and handle the response
		fetch('http://localhost:8080/api/webhooks/rest/webhook', {
			method: 'POST',
			headers: { 'Content-Type': 'application/json' },
			body: JSON.stringify({ sender: "user", message: textValue })
		})
			.then(response => {
				setResponsePendingState(true)
				return response.json()
			})
			.then(data => {
				handleRASAResponse(data)
				setResponsePendingState(false)
			})
	}

	function handleRASAResponse(res) {
		const textValue = res[0].text

		setMessagesState(curMessagesState => [
			...curMessagesState,
			{
				text: textValue,
				fromUser: false
			}
		])

		//const messageContainer = messageContainerRef.current
		//messageContainer.scrollTo(0,messageContainer.scrollHeight)
	}

	return (
		<FlexContainer
			flexDirection="column"
			alignItems="stretch"
			style={{
				flex: "1 1 75%",
				margin: "0px",
				background: theme.colors.primaryColorBackground
			}}
		>
			<FlexContainer refs={messageContainerRef} flexDirection="column" style={{ flex: "1 1 90%", paddingTop: "64px", overflowY: "auto" }}> {/*message container*/}
				{
					messagesState.map((message, i) =>
						<Message key={i} floatRight={message.fromUser}>
							<p style={{ margin: "8px 8px 8px 8px" }}>{message.text}</p>
						</Message>
					)
				}
				{responsePendingState &&
					<Message floatRight={false}>
						<p style={{ padding: "8px" }}>...</p>
					</Message>
				}
			</FlexContainer>

			<ChatBar onSubmitMessage={handleMessageSubmit}></ChatBar>
		</FlexContainer>
	)
}
