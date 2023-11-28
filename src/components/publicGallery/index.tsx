import React from 'react'
import FireContext from '../../FireContext'
import { Button, Stack } from '@chakra-ui/react'
import { PhotoData } from '../../appType'
import { ImgBox } from '../common/imgBox'

export const PublicGallery = () => {

    const { photosList, paginatorData, cartList, setCartList, setShowCartList, cloudinary, gallerySelected,  } = React.useContext(FireContext)

    const [ list, setList ] = React.useState<PhotoData[]>([])
    
    React.useEffect(() => {
      setList(photosList.filter( ( _: any , index: number) => index >= paginatorData.indexFrom - 1 && index <= paginatorData.indexTo - 1 ))
    }, [photosList, paginatorData])

    const addPhoto = ((photo: PhotoData) => {
        setCartList( (prev: PhotoData[]) => ([...prev, photo]))
    })

    const openCart = () => setShowCartList(true)

    return <Stack direction='row' flexWrap='wrap' padding='8px' paddingTop={['120px', '80px']} marginBottom='40px' justifyContent='space-evenly'>
        {list.map( (pf: PhotoData) =>
        <Stack direction='column' key={pf.id} background='white' padding='8px' borderRadius='5px'>
            <ImgBox photo={pf} cld={cloudinary} />
            {gallerySelected?.for_sale && <>
            {!cartList.some( (s: PhotoData) => s.id === pf.id)
                ? <Button colorScheme='pink' onClick={() => addPhoto(pf)} >La quiero!</Button>
                : <Button colorScheme='black' onClick={openCart} >Agregada a tu lista!</Button>
            }</>}
        </Stack>
        )}
    </Stack>
}
