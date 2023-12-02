import React from 'react'
import FireContext from 'FireContext'
import { getAuth, sendEmailVerification } from "firebase/auth";

export const Account = () => {

    const { user } = React.useContext(FireContext)

    return <div>
        {!user.emailVerified &&
            <button
                onClick={async () => { 
                    await sendEmailVerification(user)
                    alert('Email enviado a: ' + user.email)
                }}
            >
                Enviar email de verificación
            </button>
        }

        <button title={user.email} style={{marginLeft: '5px'}} onClick={ e => {
            e.preventDefault()
            getAuth().signOut()
            window.location.href = '/'
        }}>Cerrar sesión</button>
    </div>
}