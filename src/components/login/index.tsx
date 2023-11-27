import React from "react"
import {
    Stack,
    Input,
    Button,
    FormControl,
  } from '@chakra-ui/react'
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
            <Button size='xs' onClick={handleShow}>Login</Button>
            {show && 
                <Stack align='center' position='absolute' right={0} top={0} background='black' padding='5px' >
                    <form onSubmit={login} style={{textAlign: 'center'}} >
                        <FormControl isRequired>
                            <Input type="email" placeholder="Email" name="email" />
                        </FormControl>
                        <FormControl isRequired>
                            <Input type="password" placeholder="Password" name="password" />
                        </FormControl>
                        <Button size='sm' marginTop={3} marginRight={2} colorScheme='red' onClick={handleShow} >Cancelar</Button>
                        <Button size='sm' marginTop={3} colorScheme='blue' type="submit">Entrar</Button>
                    </form>
                </Stack>
            }
        </div>
    )
}

export default Login