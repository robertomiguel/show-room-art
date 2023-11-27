import { Button, Input, Stack, Text } from '@chakra-ui/react'
import React from 'react'
import { gallery } from '../../firebase/gallery'
import FireContext from '../../FireContext'
import { GalleryData } from '../../appType'

interface GalleryEditorProps {
  onClose: () => void
}

export const GalleryEditor = ({onClose}: GalleryEditorProps) => {

  const { db, gallerySelected, setGallerySelected, setGalleryList } = React.useContext(FireContext)

  const [ galName, setGalName ] = React.useState<string>('')

  const [ isEditing, setIsEditing ] = React.useState<boolean>(false)

  const handleChange = (e: any) => setGalName(e.target.value)

  const rename = async () => {
    if (galName === '') return
    setIsEditing(true)
    await gallery(db).rename(galName, gallerySelected.id)
    setIsEditing(false)
    setGallerySelected({...gallerySelected, name: galName})
    setGalleryList((prev: GalleryData[]) => prev.map(g => g.id === gallerySelected.id ? {...g, name: galName} : g))
    onClose()
  }

  const handleVisible = async (status: boolean) => {
    await gallery(db).visible(status, gallerySelected.id)
    setGallerySelected({...gallerySelected, visible: status})
    setGalleryList((prev: GalleryData[]) => prev.map(g => g.id === gallerySelected.id ? {...g, visible: status} : g))
    onClose()
  }

  return <Stack direction='column' gap='20px' alignItems='center' textAlign='center' >
    <Stack direction='column' >
      <Text>Nombre actual:</Text>
      <Text fontWeight={700} >{gallerySelected.name}</Text>
      <Text>Estado:</Text>
      <Text fontWeight={700} >{gallerySelected.visible ? 'Visible' : 'Oculto'}</Text>
    </Stack>
    <Stack direction='column' >
      <Text>Nuevo nombre:</Text>
      <Input autoComplete='false' bg='white' color='black' value={galName} onChange={handleChange} />
    </Stack>
    <Button colorScheme='green' isLoading={isEditing} onClick={rename} >Renombrar</Button>
    <Stack direction='column' justifyContent='space-between' >
      <Text>Cambiar estado:</Text>
      <Stack direction='row' justifyContent='space-between' >
        <Button colorScheme='green' onClick={() => handleVisible(true)} >Visible</Button>
        <Button colorScheme='red' onClick={() => handleVisible(false)} >Oculto</Button>
      </Stack>
    </Stack>
    <Button disabled colorScheme='red' >Eliminar</Button>
  </Stack>
}
