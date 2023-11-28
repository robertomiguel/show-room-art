import React, { useContext, useState } from 'react'
import { Button, Input, Stack, Switch, Text, useToast } from '@chakra-ui/react'
import { generateId } from '../common/generateId'
import { GalleryData } from '../../appType'
import FireContext from '../../FireContext'
import { gallery } from '../../firebase/gallery'

export const GalleryCreator = () => {

    const { user, db, setGalleryList, setGallerySelected } = useContext(FireContext)
    const toast = useToast()

    const [ galName, setGalName ] = useState<string>('')
    const [ visible, setVisible ] = useState<boolean>(false)
    const [ forSale, setForSale ] = useState<boolean>(false)

    const [ isCreating, setIsCreating ] = useState<boolean>(false)

    const handleChange = (e: any) => setGalName(e.target.value)

    const create = async () => {
        setIsCreating(true)
        const id = generateId()
        const galleryDate: GalleryData ={
            uid: user.uid,
            id,
            name: galName,
            created_at: new Date(),
            visible,
            deleted: false,
            for_sale: forSale,
        }
        try {
          await gallery(db).create(galleryDate)
          const list = await gallery(db).getList(user?.uid)
          setGalleryList(list)
          setGallerySelected(list.find( (f: GalleryData) => f.id === id ))
          setGalName('')
          setVisible(false)
          toast({
            title: 'Galería creada',
            description: `Creada: ${galName}`,
            status: 'success',
            duration: 9000,
            isClosable: true,
          })
        } catch (e) {
          console.error("Error:", e);
        } finally {
            setIsCreating(false)
        }
      }

    return <Stack direction='column' >
        <Text>Nombre de galería</Text>
        <Input bg='white' color='black' value={galName} onChange={handleChange} />
        <Text>Visible</Text>
        <Switch isChecked={visible} onChange={() => setVisible(!visible)} />
        <Text>Para venta</Text>
        <Switch isChecked={forSale} onChange={() => setForSale(!forSale)} />
        <Button isLoading={isCreating} colorScheme='green' disabled={isCreating} onClick={create} >Crear</Button>
    </Stack>
}