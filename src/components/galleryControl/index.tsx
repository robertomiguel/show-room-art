import React from 'react'
import FireContext from '../../FireContext'
import { PhotoData } from '../../appType'
import { photos } from '../../firebase/photos'
import axios from 'axios'
import { sha1 } from 'crypto-hash'
import { MenuButton } from '../common/vamper/menuButton'
import { HeaderModal } from '../common/vamper/headerModal'
import { GalleryControlContainer, MenuContainer, MenuControlBody, MenuControlContainer } from './gControl.styled'
import { ScreenBlackout } from '../common/vamper/modal.styled'
import { GalleryEditor } from './tools/galleryEditor'
import { Setting } from './tools/Setting'
import { GalleryCreator } from './tools/galleryCreator'
import { UploadImage } from './tools/uploadImage'
import { GalleryLink } from './tools/galleryLink'

export const GalleryControl = () => {

    const { selectedPhotos, setSelectedPhotos, photosList, setPhotosList, gallerySelected, db } = React.useContext(FireContext)
    
    const [ menuSelected, setMenuSelected ] = React.useState<number | null>()

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
    }

    const handleShowMenu = (menuNumber: number | null) => setMenuSelected(menuNumber)

    return <>
        {showTools && <ScreenBlackout>
            <MenuControlContainer>
                <MenuControlBody>
                    <HeaderModal label='Herramientas' onClose={() => setShowTools(false)} />

                    <MenuButton show={menuSelected} value={1} onClick={handleShowMenu} label='Subir fotos' />
                    {menuSelected === 1 && <UploadImage />}

                    <MenuButton show={menuSelected} value={2} onClick={handleShowMenu} label='Crear galería' />
                    {menuSelected === 2 && <GalleryCreator />}

                    <MenuButton show={menuSelected} value={3} onClick={handleShowMenu} label='Editar galería' />
                    {menuSelected === 3 && <GalleryEditor onClose={() => setMenuSelected(null)} />}

                    <MenuButton show={menuSelected} value={4} onClick={handleShowMenu} label='Editar link' />
                    {menuSelected === 4 && <GalleryLink onClose={() => setMenuSelected(null)} />}

                    <MenuButton show={menuSelected} value={5} onClick={handleShowMenu} label='Configurar' />
                    {menuSelected === 5 && <Setting />}
                </MenuControlBody>
            </MenuControlContainer>
        </ScreenBlackout>}
        <GalleryControlContainer>
            <button onClick={() => setShowTools(!showTools)} >Menú</button>
            <div>
                <MenuButton show={menuSelected} value={100} onClick={handleShowMenu} label='Selector' />
                {menuSelected === 100 && 
                    <MenuContainer>
                        <button onClick={() => selector('selectAll')} >Todo</button>
                        <button onClick={() => selector('selectPublished')} >Publicadas</button>
                        <button onClick={() => selector('selectUnPublished')} >Sin publicar</button>
                        <button onClick={() => selector('clearSelection')} >Limpiar selección</button>
                    </MenuContainer>
                }
            </div>
            <div>
                <MenuButton show={menuSelected} value={101} onClick={handleShowMenu} label='Filtro' />
                {menuSelected === 101 && 
                    <MenuContainer>
                        <p>Ver seleccionadas</p>
                        <p>Buscar</p>
                    </MenuContainer>
                }
            </div>
            <p>Seleccionados ({selectedPhotos.length})</p>
            <button disabled={isDisabledPublished || isLoadingPublic} onClick={() => handlePublished(true)} >Publicar</button>
            <button disabled={isDisabledUnPublished || isLoadingPublic} onClick={() => handlePublished(false)} >Quitar publicación</button>
            <button disabled={isDisabledPublished || isLoadingDelete} onClick={handleDelete} >Eliminar</button>
        </GalleryControlContainer>
    </>
}