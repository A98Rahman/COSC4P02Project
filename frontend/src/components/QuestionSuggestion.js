import React, { useState, useRef, useEffect } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { solid, regular, brands } from '@fortawesome/fontawesome-svg-core/import.macro'
import { useTheme } from "./ThemeContext"
import FlexContainer from './FlexContainer'

export default function QuestionSuggestion({ question, onClick }) {
	const [theme, setTheme] = useTheme()
	const [promptUserForInputState, setPromptUserForInputState] = useState(false)
	const userInputRef = useRef(null)

	useEffect(() => {
		if (!userInputRef || !userInputRef.current) return
		userInputRef.current.focus()
	}, [promptUserForInputState])


	function handleOnClick(e) {
		if (question.requireUserInput) {
			setPromptUserForInputState(true)
		} else {
			onClick(question)
		}
	}

	function handleOnSubmitUserInput(e) {
		e.preventDefault()

		setPromptUserForInputState(false)
		onClick({ text: question.text, question: question.question + userInputRef.current.value })
	}

	function handleOnBlur() {
		setPromptUserForInputState(false)
	}

	return (
		<>
			{!promptUserForInputState &&
				<button
					type="button"
					onClick={handleOnClick}
					style={{
						display: "flex",
						alignItems: "center",
						gap: "8px",
						boxSizing: "border-box",
						padding: "8px",
						fontSize: `${theme.fontScaleFactor * 0.8}rem`,
						border: `solid 1px ${theme.colors.borderColor}`,
						borderRadius: "4px",
						background: theme.colors.secondaryColorBackground,
						color: theme.colors.secondaryColorText
					}}
				>
					<FontAwesomeIcon icon={solid('question')} size="1x" style={{ height: "16px", color: theme.colors.iconColor }} />
					<p>{question.text}</p>
				</button>
			}
			{promptUserForInputState &&
				<div style={{}}>
					<form onSubmit={handleOnSubmitUserInput}>
						<input ref={userInputRef} placeholder={question.userInputPlaceholder} onBlur={handleOnBlur} required
							style={{
								display: "block",
								boxSizing: "border-box",
								padding: "8px",
								border: `solid 1px ${theme.colors.borderColor}`,
								borderRadius: "4px",
								fontSize: `${theme.fontScaleFactor * 1.0}rem`
							}}
						/>
					</form>
				</div>
			}
		</>

	)
}
