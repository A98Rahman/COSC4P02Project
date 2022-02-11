import React from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { solid, regular, brands } from '@fortawesome/fontawesome-svg-core/import.macro'
import colorScheme from "../colorScheme"
import FlexContainer from './FlexContainer'

export default function Titlebar() {
	return (
		<FlexContainer width="100vw" height="60px" alignItems='center' style={{ background: colorScheme.lightRed }}>
			<FontAwesomeIcon icon={solid('bars')} size="2x" inverse style={{paddingLeft: "8px"}}/>
		</FlexContainer>
	)
}
