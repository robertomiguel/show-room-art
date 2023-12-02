import React from "react"
import { ImageBox } from "./imageBox"
import { ModalView } from "./modalView"
import { PrivateGalleryContainer } from "./pGallery.styled"
import FireContext from "FireContext"
import { PhotoData } from "appType"

export interface EditPhoto {
  url: string
  id: string
  public: boolean
}

export const PrivateGallery = () => {
    const { isMobile, photosList, cloudinary, paginatorData } = React.useContext(FireContext)
    const [ editPhoto, setEditPhoto ] = React.useState<EditPhoto|null>()
    const [ list, setList ] = React.useState<PhotoData[]>([])
    
    React.useEffect(() => {
      setList(photosList.filter( ( _: any , index: number) => index >= paginatorData.indexFrom - 1 && index <= paginatorData.indexTo - 1 ))
    }, [photosList, paginatorData])

    return <PrivateGalleryContainer $isMobile={isMobile}>
        {list.map((photo: PhotoData) => {
            return <ImageBox key={photo.id} cld={cloudinary} photo={photo} onClick={() => {
                setEditPhoto({url: photo.url, id: photo.id, public: photo.public})
              }
            } />
        })}
        {editPhoto && <ModalView photo={editPhoto} onClose={() => setEditPhoto(null)} /> }

    </PrivateGalleryContainer>
}
