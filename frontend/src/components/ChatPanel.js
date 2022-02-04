import React from 'react'
import colorScheme from '../colorScheme'
import ChatBar from './ChatBar'
import FlexContainer from './FlexContainer'
import Message from './Message'

export default function ChatPanel({ children }) {
	return (
		<FlexContainer flexDirection="column" alignItems="stretch" style={{ flex: "1 1 75%", margin: "8px 8px 8px 0px", borderRadius: "8px", background: colorScheme.grey }}>
			<FlexContainer flexDirection="column" style={{ flex: "1 1 100%" }}>
				<Message>
					<p style={{ padding: "8px" }}>test text</p>
				</Message>

				<Message floatRight>
					<p style={{ padding: "8px" }}>test text</p>
				</Message>

				<Message floatRight>
					<p style={{ padding: "8px" }}>
						Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum
					</p>
				</Message>

				<Message floatRight>
					<p style={{ padding: "8px" }}>test text</p>
				</Message>

				<Message>
					<p style={{ padding: "8px" }}>test text</p>
				</Message>
			</FlexContainer>

			<ChatBar></ChatBar>
		</FlexContainer>
	)
}
