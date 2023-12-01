import React from "react"
import { getAuth, signInWithEmailAndPassword, UserCredential } from "firebase/auth";
import FireContext from "../../FireContext";
import { LoginButtons, LoginContainer, LoginInputs } from "./login.styled";

const Login = () => {

    const { setUser } = React.useContext(FireContext)
    const [ show, setShow ] = React.useState<boolean>(false)

    React.useEffect(() => {
        getAuth().onAuthStateChanged((user: UserCredential['user'] | null) => {
          if (user) {
              setUser(user)
          } else {
              setUser(null)
          }
        })
    },[setUser])
    

    const login = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        const newForm = new FormData(e.target as HTMLFormElement)
        const email = newForm.get('email')
        const password = newForm.get('password')

        const auth = getAuth();
        signInWithEmailAndPassword(auth, email as string, password as string)
        .then((userCredential) => {
            // logueado
            setUser(userCredential.user)            
        })
        .catch((error) => {
            console.log(error)
        })
    }

    const handleShow = () => setShow(!show)
    
    return (
        <>
            <button onClick={handleShow}>Login</button>
            {show && 
                <form onSubmit={login}>
                    <LoginContainer>
                        <LoginInputs>
                            <input autoComplete="false" type="email" placeholder="Email" name="email" required />
                            <input autoComplete="false" type="password" placeholder="Password" name="password" required />
                        </LoginInputs>
                        <LoginButtons>
                            <button onClick={handleShow} >Cancelar</button>
                            <button type="submit">Entrar</button>
                        </LoginButtons>
                    </LoginContainer>
                </form>
            }
        </>
    )
}

export default Login