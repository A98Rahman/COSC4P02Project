import { useState, useEffect, useRef } from 'react'

export default function useStateRef(initValue) {
	const [value, setValue] = useState(initValue)

	const ref = useRef(value)

	useEffect(() => {
		ref.current = value
	}, [value])

	return [value, setValue, ref]
}