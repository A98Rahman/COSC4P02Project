import React from 'react'
import { useRef, useEffect, useState } from 'react'
import Speech from 'speak-tts'
import ChatBar from './ChatBar'
import FlexContainer from './FlexContainer'
import Message from './Message'
import QuestionSuggestion from './QuestionSuggestion'
import { useTheme } from "./ThemeContext"

export default function ChatPanel({ messagesState, responsePendingState, handleMessageSubmit, handleOnClickSuggestedQuestion, inputBarTextState, children }) {
	const questions = [
		{ text: "Restaurants", question: "Tell me about the restaurants at Brock." },
		{ text: "Study Room Bookings", question: "I'm looking to book a room at the library." },
		{ text: "Zone Bookings", question: "I would like to book a time at the zone." },
		{ text: "Library Hours", question: "What are the library hours at Brock?" },
		{ text: "Intramurals", question: "Does brock have intramurals?" },
		{ text: "Campus Map", question: "I would like to see the campus map." },
		{ text: "Parking", question: "Tell me about parking at Brock." },
		{ text: "Buses", question: "Do any buses go to brock?" },
		{ text: "Important Dates", question: "What are the important dates at Brock?" },
		{ text: "Niagara", question: "what is there to do in Niagara?" },
		{ text: "News", question: "I'm looking for news about Brock." },
		{ text: "Careers", question: "Tell me about careers at Brock." },
		{ text: "Course Info", question: "Tell me about ", userInputPlaceholder: "enter course code", requireUserInput: true },
		{ text: "Course Labs", question: "Are there any labs for ", userInputPlaceholder: "enter course code", requireUserInput: true },
		{ text: "Course Term", question: "What term is ", userInputPlaceholder: "enter course code", requireUserInput: true },
		{ text: "Course Instructor", question: "Who teaches ", userInputPlaceholder: "enter course code", requireUserInput: true },
		{ text: "Course Prerequisites", question: "what are the prerequisites for ", userInputPlaceholder: "enter course code", requireUserInput: true },
		{ text: "Clubs", question: "Is there a club for ", userInputPlaceholder: "enter club name", requireUserInput: true },
		{ text: "Programs", question: "Is there a program for ", userInputPlaceholder: "enter program name", requireUserInput: true },
		{ text: "Program Requirements", question: "What are the requirements to get into ", userInputPlaceholder: "enter program name", requireUserInput: true },
		{ text: "Exams", question: "I want to know about the exam for ", userInputPlaceholder: "enter course code", requireUserInput: true },
		{ text: "Exam Locations", question: "Where will the exam be for ", userInputPlaceholder: "enter course code", requireUserInput: true },
		{ text: "Exam Dates", question: "When will the exam be for ", userInputPlaceholder: "enter course code", requireUserInput: true },
		{ text: "Exam Delivery", question: "Will the exam be online for ", userInputPlaceholder: "enter course code", requireUserInput: true },
		{ text: "Course Exams", question: "I want to know about the exam for ", userInputPlaceholder: "enter course code", requireUserInput: true },
		{ text: "Faculty Member", question: "I'm looking for information on ", userInputPlaceholder: "enter faculty member name", requireUserInput: true },
		{ text: "Faculty Member Department", question: "In which department is  ", userInputPlaceholder: "enter faculty member name", requireUserInput: true },
		{ text: "Faculty Member Email", question: "I'm looking for the email that belongs to", userInputPlaceholder: "enter faculty member name", requireUserInput: true },
		{ text: "Faculty Member Title", question: "I'm looking for the faculty title for ", userInputPlaceholder: "enter faculty member name", requireUserInput: true },
		{ text: "Faculty Extension", question: "I'm looking for the extension number for ", userInputPlaceholder: "enter faculty member name", requireUserInput: true },
		{ text: "Faculty Location", question: "Where can I find the office of ", userInputPlaceholder: "enter faculty member name", requireUserInput: true }
	]

	const [theme, setTheme] = useTheme()

	const messageContainerRef = useRef(null)
	const speechRef = useRef(null)
	const [suggestedQuestionMatches, setSuggestedQuestionMatches] = useState(null)

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

	function getSuggestedQuestionLimit() {
		return 12
	}

	function findQuestionSuggestions(substring) {
		//remove any accents and make lowercase, remove any dashes
		let normalizedSubstring = substring.trim().normalize("NFD").replace(/\p{Diacritic}/gu, "").toLowerCase()
		normalizedSubstring = normalizedSubstring.replace(/-+/g, " ").replace(/\s+/g, " ")
		let normalizedSubstrings = normalizedSubstring.split(" ")

		
		var matches = []

		for (let i = 0; i < questions.length; i++) {
			const question = questions[i]
			const questionName = question.text

			//remove any accents and make lowercase
			const normalizedQuestionName = questionName.normalize("NFD").replace(/\p{Diacritic}/gu, "").toLowerCase()
			
			for (let i = 0; i < normalizedSubstrings.length; i++) {
				let str = normalizedSubstrings[i]
				if (normalizedQuestionName.includes(str)) {
					matches.push(question)
					break
				}
			}
		}

		return matches
	}

	function handleOnInputBarUpdate(value) {
		if (value.trim === "") {
			setSuggestedQuestionMatches(null)
		} else {
			setSuggestedQuestionMatches(findQuestionSuggestions(value))
		}
	}

	function renderSuggestedQuestions() {
		let arr = questions
		if (suggestedQuestionMatches && suggestedQuestionMatches.length !== 0) {
			arr = suggestedQuestionMatches
		}
		return arr.map((question, i) => {
			const limit = getSuggestedQuestionLimit()
			if (i >= limit) return null
			return <QuestionSuggestion key={i} question={question} onClick={handleOnClickSuggestedQuestion} />
		})
	}

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
						message={{ text: responsePendingState, time: new Date().toLocaleString('en-US', { hour: 'numeric', minute: 'numeric', hour12: true }).toLowerCase(), fromUser: false, firstInGroup: true }}
					/>
				}
				<FlexContainer flexWrap="wrap" style={{ alignSelf: "flex-end", justifyContent: "flex-end", maxWidth: "min(525px, 90%)", gap: "8px", marginTop: "auto" }}>
					{renderSuggestedQuestions()}
				</FlexContainer>

			</FlexContainer>

			<ChatBar onSubmitMessage={handleMessageSubmit} responsePendingState={responsePendingState} inputBarTextState={inputBarTextState} onUpdate={handleOnInputBarUpdate}></ChatBar>
		</FlexContainer>
	)
}
