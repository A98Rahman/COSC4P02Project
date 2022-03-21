import React from 'react'
import { useRef } from 'react'
import useStateRef from "../useStateRef.js"
import FlexContainer from './FlexContainer.js'
import { useTheme } from "./ThemeContext"

export default function Content({children,style}) {

    const [theme, setTheme] = useTheme()

    return (
        <FlexContainer 
        width="100%" 
        height="100%" 
        flexDirection="column" 
        alignItems="stretch" 
            style={{ background: theme.colors.pageColorBackground, ...style }}>
        
            {children}
        
        </FlexContainer>
    )
  
}