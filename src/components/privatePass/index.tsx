import React from "react";
import { PassRequiredForm, PassRequiredFormField, PassRequiredFormText } from "./privatePass.styled";

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
                <PassRequiredForm>
                    <PassRequiredFormText>Galería privada</PassRequiredFormText>
                    <PassRequiredFormField>
                        <input
                            type={showPass ? 'text' : 'password'}
                            placeholder='Contraseña'
                            value={pass}
                            onChange={(e)=>setPass(e.target.value)}
                            required
                        />
                        <button disabled={isLoading} type='submit'>Acceder</button>
                    </PassRequiredFormField>
                    <div>
                        <a href="/" onClick={handleShowPass} >{showPass ? 'Ocultar' : 'Mostrar'} contraseña</a>
                    </div>
                </PassRequiredForm>
            </form>
        )
    }