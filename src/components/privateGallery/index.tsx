import React from "react"
import FireContext from "../../FireContext"
import { ImageBox } from "./imageBox"
import { ModalView } from "./modalView"
import { Stack } from "@chakra-ui/react"
import { PhotoData } from "../../appType"

export interface EditPhoto {
  url: string
  id: string
  public: boolean
}

export const PrivateGallery = () => {
    const { photosList, cloudinary } = React.useContext(FireContext)
    const [ editPhoto, setEditPhoto ] = React.useState<EditPhoto|null>()

    return <Stack direction='row' flexWrap='wrap' padding='8px' paddingTop={['250px', '150px']} marginBottom='40px' justifyContent='space-evenly'>
        {photosList.map((photo: PhotoData) => {
            return <ImageBox key={photo.id} cld={cloudinary} photo={photo} onClick={() => {
                setEditPhoto({url: photo.url, id: photo.id, public: photo.public})
              }
            } />
        })}

        {editPhoto && <ModalView photo={editPhoto} onClose={() => setEditPhoto(null)} /> }

    </Stack>
}
