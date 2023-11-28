import React from 'react'
import { Cloudinary } from '@cloudinary/url-gen'
import FireContext from '../../FireContext'
import { formatDate } from '../common/formatDate'
import { PhotoData } from '../../appType'
import { ImgBox } from '../common/imgBox'

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

    return <div className='dark-element' style={{
      display: 'flex',
      flexDirection: 'column',
      padding: '4px',
      borderRadius: '5px',
      gap: '5px',
      outline: isSelected ? '1px solid white' : 'unset',
    }} >

      <div onClick={onClick}>
        <ImgBox photo={photo} cld={cld} />
      </div>

      <div  style={{
        display: 'flex',
        flexDirection: 'column',
        background: photo?.public ? 'rgba(100,100,100,0.7)' : 'rgba(50,50,50,1)',
        fontSize: '20px',
        padding: '5px',
        borderRadius: '0 0 5px 5px',
      }}>
          <text>({photo?.order}) Nombre: {photo?.file_name}</text>
          <text>Estado: <span style={{fontWeight: 700}} >{photo.public ? 'Pública' : 'Privada'}</span></text>
          {photo?.public_last_date && <text>Última publicación: {formatDate(photo.public_last_date)}</text>}
          <div style={{ display: 'flex', flexDirection: 'row' }} >
            <text>Marcar:</text>
            <input type='checkbox' checked={isSelected} onChange={handleSelected} />
          </div>
      </div>

  </div>
}
