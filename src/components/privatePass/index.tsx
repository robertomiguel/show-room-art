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
                <div style={{
                    display: 'flex',
                    flexDirection: 'column',
                    columnGap: '10px',
                    maxWidth: '300px',
                    margin: 'auto',
                    alignItems: 'center',
                    gap: '30px',
                    }}
                    >
                    <text style={{fontWeight: 700}} letterSpacing='3px' fontSize={30} color='orange' >Galería privada</text>
                    <div style={{
                        display: 'flex',
                        flexDirection: 'row',
                        justifyContent: 'space-between',
                        }}
                        >
                        <input
                            type={showPass ? 'text' : 'password'}
                            placeholder='Contraseña'
                            value={pass}
                            onChange={(e)=>setPass(e.target.value)}
                            required
                        />
                        <button disabled={isLoading} type='submit'>Acceder</button>
                    </div>
                    <div>
                        <a href="/" onClick={handleShowPass} >{showPass ? 'Ocultar' : 'Mostrar'} contraseña</a>
                    </div>
                </div>
            </form>
        )
    }