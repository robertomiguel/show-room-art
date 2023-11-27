import { Stack, Input, Button, Text } from "@chakra-ui/react";
import React from "react";

export const PrivatePass = ({onPassSend, isLoading}: {onPassSend: (pass: string) => void, isLoading: boolean}) => {
    
        const [ pass, setPass ] = React.useState<string>('')
        const [ showPass, setShowPass ] = React.useState<boolean>(false)
    
        const handleForm = (e: React.FormEvent<HTMLFormElement>) => {
            e.preventDefault()
            setPass('')
            onPassSend(pass)
        }

        const handleShowPass = (e: React.MouseEvent<HTMLAnchorElement, MouseEvent>) => {
            e.preventDefault()
            setShowPass(!showPass)
        }
    
        return (
            <form onSubmit={handleForm}>
                <Stack direction='column' columnGap='10px' maxWidth='300px' margin='auto' alignItems='center' gap='30px' >
                    <Text fontWeight={700} letterSpacing='3px' fontSize={30} color='orange' >Galería privada</Text>
                    <Stack direction='row' justifyContent='space-between'>
                        <Input
                            type={showPass ? 'text' : 'password'}
                            placeholder='Contraseña'
                            value={pass}
                            onChange={(e)=>setPass(e.target.value)}
                            required
                        />
                        <Button isLoading={isLoading} type='submit'>Acceder</Button>
                    </Stack>
                    <Stack>
                        <a href="/" onClick={handleShowPass} >{showPass ? 'Ocultar' : 'Mostrar'} contraseña</a>
                    </Stack>
                </Stack>
            </form>
        )
    }