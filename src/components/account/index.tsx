import React from 'react'
import FireContext from '../../FireContext'
import { Button } from '@chakra-ui/react'
import { getAuth, sendEmailVerification } from "firebase/auth";

export const Account = () => {

    const { user, isMobile, showControl, setShowControl } = React.useContext(FireContext)

    return <div>

        {isMobile && <Button
            size='xs'
            colorScheme='green'
            onClick={() => setShowControl( (prev: boolean) => !prev)} >
                {showControl ? 'Ocultar' : 'Mostrar'} controles
        </Button>}

        {!user.emailVerified &&
            <Button
                size='xs'
                colorScheme='green'
                onClick={async () => { 
                    await sendEmailVerification(user)
                    alert('Email enviado a: ' + user.email)
                }}
            >
                Enviar email de verificación
            </Button>
        }

        <Button title={user.email} size='xs' colorScheme='orange' marginLeft='5px' onClick={ e => {
            e.preventDefault()
            getAuth().signOut()
            window.location.href = '/'
        }}>Cerrar sesión</Button>
    </div>
}