import React from 'react'
import { useContext, useState } from 'react'

export const common = {
	fontScaleFactor: 1.0
}


export const lightTheme = {
	...common,
	colors: {
		primaryColor: "#b02a2a",
		secondaryColor: "#00a99d",

		textBackgroundLeft: "#ac0000",
		textColorRight: "black",
		textBackgroundRight: "rgba(255, 255, 255, 0.2)",

		primaryColorBackground: "#ededed",
		secondaryColorBackground: "white",
		tertiaryColorBackground: "#c9c9c9",

		primaryColorText: "white",
		secondaryColorText: "black",
		tertiaryColorText: "lightgrey",

		pageColorBackground: "white",

		borderColor: "lightgrey",

		iconColor: "#7a7a7a"
	}
}

export const darkTheme = {
	...common,
	colors: {
		primaryColor: "#b02a2a",
		secondaryColor: "#00a99d",

		textBackgroundLeft: "rgba(255, 5, 5, 0.4)",
		textColorRight: "rgba(255, 255, 255, 0.85)",
		textBackgroundRight:"rgba(255, 255, 255, 0.45)",

		primaryColorBackground: "#292929",
		secondaryColorBackground: "#212121",
		tertiaryColorBackground: "#212121",

		primaryColorText: "black",
		secondaryColorText: "rgba(255, 255, 255, 0.8)",
		tertiaryColorText: "lightgrey",

		pageColorBackground: "rgba(0, 0, 0, 0.85)",

		borderColor: "#363636",

		iconColor: "#c9c9c9"
	}
}

const Context = React.createContext()

let setThemeStateFunc = null
export function useTheme() {
	return [useContext(Context), theme => setThemeStateFunc(theme)]
}

export default function ThemeContext({ children }) {
	const [themeState, setThemeState] = useState(lightTheme)
	setThemeStateFunc = setThemeState

	return (
		<Context.Provider value={themeState}>
			{children}
		</Context.Provider>
	)
}
