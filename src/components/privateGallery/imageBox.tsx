import React from 'react'
import { Cloudinary } from '@cloudinary/url-gen'
import { Checkbox, Stack, Text } from '@chakra-ui/react'
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

    return <Stack onClick={onClick} direction='column' gap='0' borderRadius='5px' outline={isSelected ? '1px solid white' : 'unset'} >

      <ImgBox photo={photo} cld={cld} />

      <Stack
        onClick={ e => e.stopPropagation()}
        bg={photo?.public ? 'rgba(100,100,100,0.7)' : 'rgba(50,50,50,1)'}
        fontSize={20}
        padding={2}
        borderRadius='0 0 5px 5px'
        direction='column'
      >
          <Text>Nombre: {photo?.file_name}</Text>
          <Text>Estado: <span style={{fontWeight: 700}} >{photo.public ? 'Pública' : 'Privada'}</span></Text>
          {photo?.public_last_date && <Text>Última publicación: {formatDate(photo.public_last_date)}</Text>}
          <Stack direction='row' >
            <Text>Marcar:</Text>
            <Checkbox size='lg' isChecked={isSelected} onChange={handleSelected} />
          </Stack>
      </Stack>

  </Stack>
}
