import React from 'react'
import FireContext from '../../FireContext'
import { PhotoData } from '../../appType'
import { ImgBox } from '../common/imgBox'

export const PublicGallery = () => {

    const { isMobile, photosList, paginatorData, cartList, setCartList, setShowCartList, cloudinary, gallerySelected,  } = React.useContext(FireContext)

    const [ list, setList ] = React.useState<PhotoData[]>([])
    
    React.useEffect(() => {
      setList(photosList.filter( ( _: any , index: number) => index >= paginatorData.indexFrom - 1 && index <= paginatorData.indexTo - 1 ))
    }, [photosList, paginatorData])

    const addPhoto = ((photo: PhotoData) => {
        setCartList( (prev: PhotoData[]) => ([...prev, photo]))
    })

    const openCart = () => setShowCartList(true)

    return <div style={{
        display: 'flex',
        flexDirection: 'row',
        flexWrap: 'wrap',
        padding: '8px',
        paddingTop: isMobile ? '120px' : '80px',
        marginBottom: '40px',
        justifyContent: 'space-evenly',
    }}>
        {list.map( (pf: PhotoData) =>
        <div style={{
            display: 'flex',
            flexDirection: 'column',
            background: 'white',
            padding: '8px',
            borderRadius: '5px',
            gap: '5px',
            marginBottom: '10px',
            width: isMobile ? '100%' : 'unset',
        }}>
            <ImgBox photo={pf} cld={cloudinary} />
            {gallerySelected?.for_sale && <>
            {!cartList.some( (s: PhotoData) => s.id === pf.id)
                ? <button onClick={() => addPhoto(pf)} >La quiero!</button>
                : <button onClick={openCart} >Agregada a tu lista!</button>
            }</>}
        </div>
        )}
    </div>
}
