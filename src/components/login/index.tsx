import React from "react"
import { getAuth, signInWithEmailAndPassword, UserCredential } from "firebase/auth";
import FireContext from "../../FireContext";

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
        <div>
            <button onClick={handleShow}>Login</button>
            {show && 
                <div style={{ display: 'flex', alignItems: 'center', position: 'absolute', right: 0, top: 0, background: 'black', padding: '5px' }} >
                    <form onSubmit={login} style={{textAlign: 'center'}} >
                        <div style={{display: 'flex', flexDirection: 'column'}} >
                            <input type="email" placeholder="Email" name="email" required />
                            <input type="password" placeholder="Password" name="password" required />
                        </div>
                        <button onClick={handleShow} >Cancelar</button>
                        <button type="submit">Entrar</button>
                    </form>
                </div>
            }
        </div>
    )
}

export default Login