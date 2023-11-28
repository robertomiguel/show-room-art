import React from 'react'
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
import { MenuButton } from '../common/vamper/menuButton'
import { HeaderModal } from '../common/vamper/headerModal'

export const GalleryControl = () => {

    const { selectedPhotos, setSelectedPhotos, photosList, setPhotosList, gallerySelected, db } = React.useContext(FireContext)
    const [ showSelector, setShowSelector ] = React.useState<boolean>(false)
    const [ showUploader, setShowUploader ] = React.useState<boolean>(false)
    const [ showGalleryCreator, setShowGalleryCreator ] = React.useState<boolean>(false)
    const [ showGalleryEditor, setShowGalleryEditor ] = React.useState<boolean>(false)
    const [ showSetting, setShowSetting ] = React.useState<boolean>(false)
    const [ showGalleryLink, setShowGalleryLink ] = React.useState<boolean>(false)
    const [ showTools, setShowTools ] = React.useState<boolean>(false)

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
                await photos(db).delete(gallerySelected.id, photoId, true)
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

    return <>
        {showTools && <div style={{ zIndex: 3, overflowY: 'scroll', padding: '10px', width: '360px', display: 'flex', flexDirection: 'column', position: 'fixed', background: 'rgb(50,50,50)', left: 0, top: '70px', bottom: 0, boxShadow: '-1px 0px 9px 3px rgba(28,28,28,0.75)' }} >
            <div style={{display: 'flex', flexDirection: 'column', gap: '20px'}} >
                <HeaderModal label='Herramientas' onClose={() => setShowTools(false)} />
                <MenuButton show={showUploader} onClick={closeUploader} text='Subir fotos' />
                {showUploader && <UploadImage />}

                <MenuButton show={showGalleryCreator} onClick={closeGalleryCreator} text='Crear galería' />
                {showGalleryCreator && <GalleryCreator />}

                <MenuButton show={showGalleryEditor} onClick={closeGalleryEditor} text='Editar galería' />
                {showGalleryEditor && <GalleryEditor onClose={() => setShowGalleryEditor(false)} />}

                <MenuButton show={showGalleryLink} onClick={closeGalleryLink} text='Crear link' />
                {showGalleryLink && <GalleryLink onClose={() => setShowGalleryLink(false)} />}

                <MenuButton show={showSetting} onClick={closeSetting} text='Configurar' />
                {showSetting && <Setting />}
            </div>
        </div>}
        <div style={{ display: 'flex', flexDirection: 'row', padding: '10px', alignItems: 'center', position: 'sticky', zIndex: 1 }} >
            <div style={{position: 'fixed', left: '10px'}} >
                <button onClick={() => setShowTools(!showTools)} >Menú</button>
            </div>
            <div>
                <MenuButton show={showSelector} onClick={closeSelector} text='Selector' />
                {showSelector && 
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '10px', position: 'absolute', background: 'rgb(50,50,50)', padding: '10px' }} >
                        <button onClick={() => selector('selectAll')} >Todo</button>
                        <button onClick={() => selector('selectPublished')} >Publicadas</button>
                        <button onClick={() => selector('selectUnPublished')} >Sin publicar</button>
                        <button onClick={() => selector('clearSelection')} >Limpiar selección</button>
                    </div>
                }
            </div>
            <text>Seleccionados ({selectedPhotos.length})</text>
            <button disabled={isDisabledPublished || isLoadingPublic} onClick={() => handlePublished(true)} >Publicar</button>
            <button disabled={isDisabledUnPublished || isLoadingPublic} onClick={() => handlePublished(false)} >Quitar publicación</button>
            <button disabled={isDisabledPublished || isLoadingDelete} onClick={handleDelete} >Eliminar</button>
        </div>
    </>
}