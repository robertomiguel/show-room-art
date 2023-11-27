import React from 'react'
import { Button, Stack, Text } from '@chakra-ui/react'
import FireContext from '../../FireContext'
import { UploadImage } from '../uploadImage'
import { PhotoData } from '../../appType'
import { GalleryCreator } from '../galleryCreator'
import { GalleryEditor } from '../GalleryEditor'
import { Setting } from '../Setting'
import { photos } from '../../firebase/photos'
import { GalleryLink } from '../galleryLink'
import axios from 'axios'
import { sha1 } from 'crypto-hash'

const GalleryContainer = ({children}: any) => <Stack
    position={['relative', 'absolute']}
    display='flex'
    flexDirection='column'
    background='var(--chakra-colors-gray-700)'
    border='1px solid var(--chakra-colors-gray-500)'
    padding='10px'
    gap='5px'
    borderRadius='5px'
    boxShadow='-1px 0px 9px 3px rgba(128,128,128,0.75)'
    marginBottom={['10px', '0px']}
>
    {children}
</Stack>

const ButtonContainer = ({children}: any) => <Stack
    width={['100%', 'auto']}
    display={['flex', 'inline-block']}
>
    {children}
</Stack>

export const GalleryControl = () => {

    const { selectedPhotos, setSelectedPhotos, photosList, setPhotosList, gallerySelected, db } = React.useContext(FireContext)
    const [ showSelector, setShowSelector ] = React.useState<boolean>(false)
    const [ showUploader, setShowUploader ] = React.useState<boolean>(false)
    const [ showGalleryCreator, setShowGalleryCreator ] = React.useState<boolean>(false)
    const [ showGalleryEditor, setShowGalleryEditor ] = React.useState<boolean>(false)
    const [ showSetting, setShowSetting ] = React.useState<boolean>(false)
    const [ showGalleryLink, setShowGalleryLink ] = React.useState<boolean>(false)
    
    const [ unPublishList, setUnPublishList ] = React.useState<string[]>([])
    const [ isDisabledUnPublished, setIsDisabledUnPublished ] = React.useState<boolean>(false)

    const [ publishList, setPublishList ] = React.useState<string[]>([])
    const [ isDisabledPublished, setIsDisabledPublished ] = React.useState<boolean>(false)

    const [ isLoadingPublic, setIsLoadingPublic ] = React.useState<boolean>(false)
    const [ isLoadingDelete, setIsLoadingDelete ] = React.useState<boolean>(false)

    React.useEffect(()=>{
        const list = photosList.filter( (f: PhotoData) => f.public && selectedPhotos.includes(f.id)).map((p: PhotoData) => p.id)
        setUnPublishList(list)
        setIsDisabledUnPublished(list.length === 0)

        const list2 = photosList.filter( (f: PhotoData) => !f.public && selectedPhotos.includes(f.id)).map((p: PhotoData) => p.id)
        setPublishList(list2)
        setIsDisabledPublished(list2.length === 0)
    },[selectedPhotos, photosList])
    
    const handlePublished = async (status: boolean) => {
        setIsLoadingPublic(true)
        const list: string[] = status ? publishList : unPublishList
        await Promise.all(list.map(
            async (photoId: string) => await photos(db).public(gallerySelected.id, photoId, status)
        ))
        setPhotosList( (prev: PhotoData[]) => prev.map( (p: PhotoData) => {
            if (list.includes(p.id)) {
                return {...p, public: status}
            }
            return p
        }))
        setSelectedPhotos([])
        setIsLoadingPublic(false)
    }

    const handleDelete = async () => {
        setIsLoadingDelete(true)
        const url = `https://api.cloudinary.com/v1_1/${process.env.REACT_APP_CLOUD_NAME}/image/destroy`
        await Promise.all(publishList.map(
            async (photoId: string) => {
                await photos(db).delete(gallerySelected.id, photoId)
                const public_id = photosList.find( (p: PhotoData) => p.id === photoId)?.public_id
                const timestamp = new Date().getTime().toString()
                const string = `public_id=${public_id}&timestamp=${timestamp}${process.env.REACT_APP_CLOUD_API_SECRET}`
                const signature = await sha1(string)
                await axios.post(url, {
                    api_key: process.env.REACT_APP_CLOUD_API_KEY,
                    public_id,
                    timestamp,
                    signature,
                })
            }

        ))
        setPhotosList( (prev: PhotoData[]) => prev.filter( (p: PhotoData) => !publishList.includes(p.id)))
        setSelectedPhotos([])
        setIsLoadingDelete(false)
    }

    const selector = (typeSel: string) => {
        switch (typeSel) {
            case 'selectAll':
                setSelectedPhotos(photosList.map( (p: PhotoData) => p.id))
                break;
            case 'selectPublished':
                setSelectedPhotos(photosList.filter( (p: PhotoData) => p.id && p.public).map( (p: PhotoData) => p.id))
                break;
            case 'selectUnPublished':
                setSelectedPhotos(photosList.filter( (p: PhotoData) => p.id && !p.public).map( (p: PhotoData) => p.id))
                break;
            case 'clearSelection':
                setSelectedPhotos([])
                break;
        }
        closeSelector()
    }

    const closeSelector = () => {
        setShowSelector(!showSelector)
        setShowUploader(false)
        setShowGalleryCreator(false)
        setShowGalleryEditor(false)
        setShowSetting(false)
        setShowGalleryLink(false)
    }

    const closeUploader = () => {
        setShowUploader(!showUploader)
        setShowGalleryCreator(false)
        setShowSelector(false)
        setShowGalleryEditor(false)
        setShowSetting(false)
        setShowGalleryLink(false)
    }

    const closeGalleryCreator = () => {
        setShowGalleryCreator(!showGalleryCreator)
        setShowSelector(false)
        setShowUploader(false)
        setShowGalleryEditor(false)
        setShowSetting(false)
        setShowGalleryLink(false)
    }

    const closeGalleryEditor = () => {
        setShowGalleryEditor(!showGalleryEditor)
        setShowSelector(false)
        setShowUploader(false)
        setShowGalleryCreator(false)
        setShowSetting(false)
        setShowGalleryLink(false)
    }

    const closeSetting = () => {
        setShowSetting(!showSetting)
        setShowGalleryEditor(false)
        setShowSelector(false)
        setShowUploader(false)
        setShowGalleryCreator(false)
        setShowGalleryLink(false)
    }

    const closeGalleryLink = () => {
        setShowGalleryLink(!showGalleryLink)
        setShowSetting(false)
        setShowGalleryEditor(false)
        setShowSelector(false)
        setShowUploader(false)
        setShowGalleryCreator(false)
    }

    return <Stack direction={['column', 'row']} padding='10px' alignItems='center' justifyContent='space-evenly' position='sticky' zIndex={1} >
        <ButtonContainer>
            <Button colorScheme='green' onClick={closeSetting} >Configurar</Button>
            {showSetting && <GalleryContainer>
                <Setting />
            </GalleryContainer>}
        </ButtonContainer>
        <ButtonContainer>
            <Button colorScheme='green' onClick={closeGalleryCreator} >Crear galería</Button>
            {showGalleryCreator && <GalleryContainer>
                <GalleryCreator />
            </GalleryContainer>}
        </ButtonContainer>
        <ButtonContainer>
            <Button colorScheme='green' onClick={closeGalleryEditor} >Editar galería</Button>
            {showGalleryEditor && <GalleryContainer>
                <GalleryEditor onClose={() => setShowGalleryEditor(false)} />
            </GalleryContainer>}
        </ButtonContainer>
        <ButtonContainer>
            <Button colorScheme='green' onClick={closeGalleryLink} >Crear link</Button>
            {showGalleryLink && <GalleryContainer>
                <GalleryLink onClose={() => setShowGalleryLink(false)} />
            </GalleryContainer>}
        </ButtonContainer>
        <ButtonContainer>
            <Button colorScheme='green' onClick={closeUploader} >Subir fotos</Button>
                {showUploader && <GalleryContainer>
                <UploadImage />
            </GalleryContainer>}
        </ButtonContainer>
        <ButtonContainer>
            <Button colorScheme='green' onClick={closeSelector} >Selector</Button>
            {showSelector && <GalleryContainer>
                <Stack direction='column' gap='10px'>
                    <Button colorScheme='green' onClick={() => selector('selectAll')} >Todo</Button>
                    <Button colorScheme='green' onClick={() => selector('selectPublished')} >Publicadas</Button>
                    <Button colorScheme='green' onClick={() => selector('selectUnPublished')} >Sin publicar</Button>
                    <Button colorScheme='red' onClick={() => selector('clearSelection')} >Borrar selección</Button>
                </Stack>
            </GalleryContainer>}
        </ButtonContainer>
        <Text>Seleccionados ({selectedPhotos.length})</Text>
        <Button colorScheme='green' isLoading={isLoadingPublic} isDisabled={isDisabledPublished} onClick={() => handlePublished(true)} >Publicar</Button>
        <Button colorScheme='orange' isLoading={isLoadingPublic} isDisabled={isDisabledUnPublished} onClick={() => handlePublished(false)} >Quitar publicación</Button>
        <Button colorScheme='red' isLoading={isLoadingDelete} isDisabled={isDisabledPublished} onClick={handleDelete} >Eliminar</Button>
    </Stack>
}