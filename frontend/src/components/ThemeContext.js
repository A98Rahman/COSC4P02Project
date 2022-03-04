import React from 'react'
import { useContext, useState } from 'react'

export const common = {
	fontScaleFactor: 1.0
}

export const lightTheme = {
	...common,
	colors: {
		primaryColor: "#cc0000",
		secondaryColor: "#ac0000",

		primaryColorBackground: "white",
		secondaryColorBackground: "#eeeeee",
		tertiaryColorBackground: "#e7e7e7",

		primaryColorText: "white",
		secondaryColorText: "black",
		tertiaryColorText: "lightgrey"
	}
}

export const darkTheme = {
	...common,
	colors: {
		primaryColor: "green",
		secondaryColor: "blue",

		primaryColorBackground: "yellow",
		secondaryColorBackground: "cyan",
		tertiaryColorBackground: "red",

		primaryColorText: "black",
		secondaryColorText: "magenta",
		tertiaryColorText: "lightgrey"
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
