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
			time: "8:05 am",
			fromUser: false
		},
		{
			text: "test text",
			time: "8:05 am",
			fromUser: true
		},
		{
			text: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum",
			time: "8:05 am",
			fromUser: true
		},
		{
			text: "test text",
			time: "8:05 am",
			fromUser: true
		},
		{
			text: "test text",
			time: "8:05 am",
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

		const time = new Date().toLocaleString('en-US', { hour: 'numeric', minute: 'numeric', hour12: true }).toLowerCase()

		//update the messages state to include the user submitted message
		setMessagesState(curMessagesState => [
			...curMessagesState,
			{
				text: textValue,
				time: time,
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
		const resMessages = []
		res.forEach(resMessage => {
			const textValue = resMessage.text
			const image = resMessage.image
			const time = new Date().toLocaleString('en-US', { hour: 'numeric', minute: 'numeric', hour12: true }).toLowerCase()

			resMessages.push(
				{
					text: textValue,
					image: image,
					time: time,
					fromUser: false
				}
			)
		})

		setMessagesState(curMessagesState => [
			...curMessagesState,
			...resMessages
		])

		//const messageContainer = messageContainerRef.current
		//messageContainer.scrollTo(0,messageContainer.scrollHeight)
	}

	return (
		<FlexContainer
			flexDirection="column"
			alignItems="stretch"
			style={{
				height: "100%",
				padding: "36px 16px 16px 16px",
				boxSizing: "border-box",
				minHeight: "0",
				background: theme.colors.primaryColorBackground
			}}
		>
			<FlexContainer height="100%" refs={messageContainerRef} flexDirection="column" style={{ minHeight: "0", overflowY: "scroll" }}> {/*message container*/}
				{
					messagesState.map((message, i) =>
						<Message key={i} floatRight={message.fromUser} message={message} />
					)
				}
				{responsePendingState &&
					<Message
						floatRight={false}
						message={{ text: "...", time: new Date().toLocaleString('en-US', { hour: 'numeric', minute: 'numeric', hour12: true }).toLowerCase(), fromUser: false }}
					/>
				}
			</FlexContainer>

			<ChatBar onSubmitMessage={handleMessageSubmit}></ChatBar>
		</FlexContainer>
	)
}
