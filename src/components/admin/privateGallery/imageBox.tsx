import React from 'react'
import { Cloudinary } from '@cloudinary/url-gen'
import { FormFieldRow, PrivateImageBox, PrivateProductInfo } from './pGallery.styled'
import FireContext from 'FireContext'
import { PhotoData } from 'appType'
import { formatDate } from 'components/common/formatDate'
import { ImgBox } from 'components/common/imgBox'

interface ImageBoxProp {
    photo: PhotoData
    onClick: () => void
    cld: Cloudinary
}

export const ImageBox = ({photo, onClick, cld}: ImageBoxProp) => {

  const { selectedPhotos, setSelectedPhotos } = React.useContext(FireContext)

  const [ isSelected, setIsSelected ] = React.useState<boolean>(false)

  const handleSelected = () => {
    if (!isSelected) {
      setSelectedPhotos( (prev: string[]) => ([...prev, photo.id]))
    } else {
      setSelectedPhotos( (prev: string[]) => prev.filter( f => f !== photo.id))
    }
  }

  React.useEffect(() => {
    const value = selectedPhotos.includes(photo.id)
    setIsSelected(value)
  },[selectedPhotos, photo.id])

    return <PrivateImageBox $isSelected={isSelected} >

      <ImgBox photo={photo} cld={cld} onClick={onClick} hover />

      <PrivateProductInfo $isPublic={photo?.public} >
        <FormFieldRow>
          <p>Nombre de archivo</p><p>{photo?.file_name}</p>
        </FormFieldRow>

        <FormFieldRow>
          <p>Estado</p><p>{photo.public ? 'Pública' : 'Privada'}</p>
        </FormFieldRow>

        <FormFieldRow>
          <p>Última publicación</p><p>{photo.public_last_date ? formatDate(photo.public_last_date) : 'nunca publicado'}</p>
        </FormFieldRow>

        <FormFieldRow>
          <p>Seleccionar</p><input type='checkbox' checked={isSelected} onChange={handleSelected} />
        </FormFieldRow>
      </PrivateProductInfo>

  </PrivateImageBox>
}
