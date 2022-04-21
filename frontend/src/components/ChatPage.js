import React from 'react'
import { useRef, useEffect, useState } from 'react'
import FlexContainer from './FlexContainer.js'
import { useTheme, lightTheme, darkTheme } from "./ThemeContext"
import Titlebar from './Titlebar'
import ChatPanel from "./ChatPanel"
import SettingsPanel from './SettingsPanel.js'


export default function ChatPage({ children, style }) {
	const placeholderMessageData = [
		{
			text: "Hello! The badger is waiting to hear from you.",
			time: new Date().toLocaleString('en-US', { hour: 'numeric', minute: 'numeric', hour12: true }).toLowerCase(),
			fromUser: false
		},
		/*	{
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
			},*/
	]

	const [theme, setTheme] = useTheme()

	const [messagesState, setMessagesState] = useState(placeholderMessageData)
	const [responsePendingState, setResponsePendingState] = useState(null)
	const [inputBarTextState, setInputBarTextState] = useState(null)

	useEffect(() => {
		var fontScale = theme.fontScaleFactor
		if (localStorage.fontScale) {
			fontScale = parseFloat(localStorage.fontScale)
		}
		if (localStorage.theme) {
			if (localStorage.theme === "light") {
				setTheme({ ...lightTheme, fontScaleFactor: fontScale })
			} else {
				setTheme({ ...darkTheme, fontScaleFactor: fontScale })
			}
		}
	}, [])

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

		setResponsePendingState("...")

		//submit the user message to rasa and handle the response
		fetch('rasa/webhooks/rest/webhook', {
			method: 'POST',
			headers: { 'Content-Type': 'application/json' },
			body: JSON.stringify({ sender: "user", message: textValue })
		})
			.then(response => {
				return response.json()
			})
			.then(data => {
				handleRASAResponse(data)
				setResponsePendingState(null)
			})
			.catch((error) => {
				handleRASAResponse([{ text: "Couldn't reach the badger. They are probably sleeping right now, but you can always try again later." }])
				setResponsePendingState(null)
				console.log(error)
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
	}

	function handleOnClickSuggestedQuestion(question) {
		setInputBarTextState(question.question)
	}

	function downloadMessages() {
		let conversationText = ""
		messagesState.forEach(message => {
			if (message.fromUser) {
				conversationText += "You at " + message.time + ":\n"
			} else {
				conversationText += "Chatbadger at " + message.time + ":\n"
			}
			conversationText += "\t" + message.text + "\n\n"
		})


		var element = document.createElement('a');
		element.setAttribute('href', 'data:text/plain;charset=utf-8,' + encodeURIComponent(conversationText))
		element.setAttribute('download', "chatbadger-conversation.txt")

		element.style.display = 'none'
		document.body.appendChild(element)

		element.click()

		document.body.removeChild(element)
	}

	return (
		<FlexContainer
			width="100%"
			height="100vh"
			flexDirection="column"
			alignItems="stretch"
			style={{ minWidth: "0", minHeight: "0", maxHeight: "100vh", background: theme.colors.pageColorBackground, ...style }}>

			<Titlebar></Titlebar>

			<FlexContainer flexDirection="row" alignItems="stretch" style={{ width: "100%", height: "100%", minHeight: "0" }}> {/* panels */}
				<SettingsPanel downloadMessages={downloadMessages}></SettingsPanel>
				<ChatPanel
					messagesState={messagesState}
					responsePendingState={responsePendingState}
					handleMessageSubmit={handleMessageSubmit}
					handleOnClickSuggestedQuestion={handleOnClickSuggestedQuestion}
					inputBarTextState={inputBarTextState}
				/>
			</FlexContainer>

		</FlexContainer>
	)
}