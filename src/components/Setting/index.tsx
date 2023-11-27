import { Button, Input, Stack, Text } from '@chakra-ui/react'
import React from 'react'
import FireContext from '../../FireContext'
import { PublicSetting } from '../../appType'
import { doc, setDoc } from 'firebase/firestore'

export const Setting = () => {

    const { db, publicSetting, setPublicSetting } = React.useContext(FireContext)

    const [ isLoading, setIsLoading ] = React.useState<boolean>(false)

    const handleSave = async () => {
        setIsLoading(true)
        try {
            await setDoc(doc(db, 'setting', 'public'), publicSetting)
        } catch (error) {
            console.error("Error:", error);
        }finally {
            setIsLoading(false)
        }
    }

    return <Stack direction='column' >
        <Text>Dolar / Foto</Text>
        <Input bg='white' color='black' value={publicSetting.dollar} onChange={( e => setPublicSetting((prev: PublicSetting) => ({...prev, dollar: e.target.value})) )} />
        <Text>Fotos x página</Text>
        <Input bg='white' color='black' value={publicSetting.per_page} onChange={( e => setPublicSetting((prev: PublicSetting) => ({...prev, per_page: e.target.value})) )} />
        <Button colorScheme='green' isLoading={isLoading} onClick={handleSave} >Guardar</Button>
    </Stack>
}