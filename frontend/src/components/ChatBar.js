import React, { useRef, useState, useEffect } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { solid, regular, brands } from '@fortawesome/fontawesome-svg-core/import.macro'
import useStateRef from '../useStateRef'
import FlexContainer from './FlexContainer'
import { useTheme } from "./ThemeContext"

export default function ChatBar({ onSubmitMessage, responsePendingState, inputBarTextState, onUpdate }) {
	const [theme, setTheme] = useTheme()

	const mediaRecorderRef = useRef()
	const streamRef = useRef()
	const mediaDataRef = useRef([])
	const rawDataRef = useRef([])
	const isRecordingRef = useRef(false)

	const [emptyChatbarErrorState, setEmptyChatbarErrorState, emptyChatbarErrorStateRef] = useStateRef(false)
	const [chatbarLocked, setChatbarLocked] = useState(false)
	const inputBarRef = useRef(null)
	const submitButton = useRef(null)
	const formBarRef = useRef(null)

	useEffect(() => {
		if (!inputBarTextState) return

		inputBarRef.current.value = inputBarTextState
		inputBarRef.current.focus()
	}, [inputBarTextState])


	function clearInput(e) {
		if (chatbarLocked || isRecordingRef.current) return
		e.preventDefault()

		const inputElement = inputBarRef.current
		inputElement.value = ""
		onUpdate("")

	}
	function handleOnSubmit(e) {
		//so the page doesn't reload
		e.preventDefault()
		if (chatbarLocked || isRecordingRef.current) return

		console.log("submit")

		const inputElement = inputBarRef.current
		const textValue = inputElement.value

		//clear the input 
		inputElement.value = ""
		onUpdate("")

		if (textValue.trim() === "") {
			inputElement.setCustomValidity("Enter some text")
			inputElement.reportValidity()

			setEmptyChatbarErrorState(true)
			return
		}

		//send the message the the chat panel
		onSubmitMessage(textValue)
	}

	function handleOnInput(e) {
		if (chatbarLocked) return
		const textValue = e.target.value
		onUpdate(textValue)

		if (textValue.trim() !== "" && emptyChatbarErrorStateRef.current === true) {
			e.target.setCustomValidity("");
			e.target.reportValidity()
			setEmptyChatbarErrorState(false)
		}
	}

	function handleOnBlurInputField(e) {
		if (chatbarLocked) return
		const related = e.relatedTarget

		if (related && e.target.parentElement.contains(related)) {
			return
		}

		e.target.setCustomValidity("");
		e.target.reportValidity()
	}

	function getInputBarHeight(desiredFontScale) {
		const browserDefaultFontSize = window.getComputedStyle(document.body).getPropertyValue('font-size')
		const pixelSize = `${Math.max(desiredFontScale * parseInt(browserDefaultFontSize), 40)}px`

		return pixelSize
	}

	function submitSpeechToServer(blob) {
		//var myBlob = new Blob(["This is my blob content"], { type: "text/plain" });
		//console.log(blob)

		var fd = new FormData()
		fd.append('upl', blob, 'audio-recording.webm');

		fetch('/api/upload-speech', {
			method: 'post',
			body: fd
		})
			.then(promise => {
				return promise.json()
			})
			.then(response => {
				console.log(response)
				setChatbarLocked(false)
				inputBarRef.current.value = response.result
			})
	}

	function handleOnClickRecordButton(e) {
		if (chatbarLocked) return
		e.preventDefault()

		//if there is no stream open
		if (!streamRef.current) {
			navigator.mediaDevices.getUserMedia({ audio: true, video: false }).then(
				stream => {
					streamRef.current = stream
					toggleRecording()
				}
			)
			console.log("Stream now open")
			return
		}

		function toggleRecording() {
			//if there is an active media recorder but the recording is stopped
			if (!isRecordingRef.current) {
				const mediaRecorder = new MediaRecorder(streamRef.current, { mimeType: "audio/webm" })
				mediaRecorderRef.current = mediaRecorder

				mediaRecorder.addEventListener('dataavailable', e => {
					if (e.data.size > 0) {
						mediaDataRef.current.push(e.data)
						submitSpeechToServer(e.data)

						//const blob = new Blob(mediaDataRef.current)
						//const url = URL.createObjectURL(blob)
						//console.log(url)
						//var audio = new Audio(url);
						//audio.play();
					}
				})

				mediaRecorderRef.current.start()
				isRecordingRef.current = true
				inputBarRef.current.value = "Speak now. Click record button when finished speaking."
				console.log("recording started")
			} else {
				mediaRecorderRef.current.stop()
				isRecordingRef.current = false
				inputBarRef.current.value = "Processing audio..."
				setChatbarLocked(true)
				console.log("recording stopped")
				mediaDataRef.current = []
			}
		}

		toggleRecording()
	}

	return (

		<FlexContainer
			style={{
				flex: "0 1 60px",
				boxSizing: "border-box",
				background: theme.colors.primaryColorBackground,
				border: `solid 1px ${theme.colors.borderColor}`,
				borderRadius: "4px",
				marginTop: "8px",
				opacity: chatbarLocked ? 0.5 : 1.0
			}}
		>
			<form onSubmit={handleOnSubmit} style={{ width: "100%", display: "flex", overflow: "hidden", borderRadius: "4px" }}>

				<button type="button" onClick={clearInput} style={{ display: "flex", justifyContent: "center", alignItems: "center", flex: "0 0 auto", border: "none", background: theme.colors.secondaryColorBackground }}>
					<div style={{ display: "flex", justifyContent: "center", alignItems: "center", flex: "0 0 auto", margin: "0px 8px 0px 8px" }}>
						<FontAwesomeIcon icon={solid('xmark')} size="1x" style={{ height: "24px", color: theme.colors.iconColor }} />
					</div>
				</button>

				<input
					ref={inputBarRef} type="text" onInput={handleOnInput} onBlur={handleOnBlurInputField}
					placeholder="Ask a question"
					readOnly={chatbarLocked || responsePendingState !== null}
					style={{
						width: "100%",
						minHeight: "auto",
						border: "none",
						fontSize: `${theme.fontScaleFactor * 1.0}rem`,
						background: theme.colors.secondaryColorBackground,
						color: theme.colors.secondaryColorText
					}}
				/>


				<button type="button" onClick={handleOnClickRecordButton} style={{ display: "flex", justifyContent: "center", alignItems: "center", flex: "0 0 auto", border: "none", background: theme.colors.secondaryColorBackground }}>
					<div style={{ display: "flex", justifyContent: "center", alignItems: "center", flex: "0 0 auto", boxSizing: "border-box", margin: "0px 8px 0px 8px" }}>
						<FontAwesomeIcon icon={solid('microphone')} size="1x" style={{ height: "32px", color: theme.colors.iconColor }} />
					</div>
				</button>

				<button type="submit" style={{ display: "flex", justifyContent: "center", alignItems: "center", flex: "0 0 auto", border: "none", background: theme.colors.primaryColor }}>
					<div style={{ display: "flex", justifyContent: "center", alignItems: "center", flex: "0 0 auto", boxSizing: "border-box", margin: "0px 8px 0px 8px" }}>
						<FontAwesomeIcon icon={solid('paper-plane')} size="1x" style={{ height: "32px", color: "white" }} />
					</div>
				</button>

			</form>

		</FlexContainer >
	)
}
