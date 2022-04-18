import React from 'react'
import { useRef, useEffect, useState } from 'react'
import Speech from 'speak-tts'
import ChatBar from './ChatBar'
import FlexContainer from './FlexContainer'
import Message from './Message'
import { useTheme } from "./ThemeContext"

export default function ChatPanel({ messagesState, responsePendingState, handleMessageSubmit, children }) {
	const [theme, setTheme] = useTheme()

	const messageContainerRef = useRef(null)
	const speechRef = useRef(null)

	useEffect(() => {
		const speech = new Speech() // will throw an exception if not browser supported
		if (speech.hasBrowserSupport()) { // returns a boolean
			console.log("speech synthesis supported")

			speechRef.current = new Speech()
			speech.init({ 'lang': 'en-GB' }).then((data) => {
				console.log("Speech is ready, voices are available", data)
			}).catch(e => {
				console.error("An error occured while initializing : ", e)
			})
		}
	}, [])

	useEffect(() => {
		const messageContainer = messageContainerRef.current
		messageContainer.scrollTo(0, messageContainer.scrollHeight)
	}, [messagesState])

	return (
		<FlexContainer
			flexDirection="column"
			alignItems="stretch"
			style={{
				width: "100%",
				height: "100%",
				padding: "16px 16px 16px 16px",
				boxSizing: "border-box",
				minHeight: "0",
				background: theme.colors.primaryColorBackground
			}}
		>
			<FlexContainer height="100%" refs={messageContainerRef} flexDirection="column" style={{ minHeight: "0", overflowY: "scroll", gap: "10px" }}> {/*message container*/}
				{
					messagesState.map((message, i) =>
						<Message key={i} floatRight={message.fromUser} message={message} speechRef={speechRef} />
					)
				}
				{responsePendingState &&
					<Message
						floatRight={false}
						message={{ text: responsePendingState, time: new Date().toLocaleString('en-US', { hour: 'numeric', minute: 'numeric', hour12: true }).toLowerCase(), fromUser: false }}
					/>
				}
			</FlexContainer>

			<ChatBar onSubmitMessage={handleMessageSubmit}></ChatBar>
		</FlexContainer>
	)
}
