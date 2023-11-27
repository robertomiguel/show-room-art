import React from 'react'
import { Button, useColorMode } from '@chakra-ui/react'

export const ThemeButton = () => {
    const { colorMode, toggleColorMode } = useColorMode()

    return <Button
        size='xs'
        onClick={toggleColorMode} >
        {colorMode === 'light' ? 'Dark' : 'Light'}
    </Button>
}