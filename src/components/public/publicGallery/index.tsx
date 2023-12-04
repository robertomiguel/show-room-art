import React from 'react'
import FireContext from 'FireContext'
import { PhotoData } from 'appType'
import { GalleryDescription, PublicGalleryContainer, PublicGalleryProduct, PublicGalleryProductInfo } from './galleryPublic.styled'
import { ImgBox } from 'components/common/imgBox'

export const PublicGallery = () => {

    const { isMobile, photosList, paginatorData, cartList, setCartList, cloudinary, gallerySelected,  } = React.useContext(FireContext)

    const [ list, setList ] = React.useState<PhotoData[]>([])
    
    React.useEffect(() => {
      setList(photosList.filter( ( _: any , index: number) => index >= paginatorData.indexFrom - 1 && index <= paginatorData.indexTo - 1 ))
    }, [photosList, paginatorData])

    const addPhoto = ((photo: PhotoData) => {
        setCartList( (prev: PhotoData[]) => ([...prev, photo]))
    })

    return <PublicGalleryContainer $isMobile={isMobile}>

        {gallerySelected?.description && <GalleryDescription><p>{gallerySelected.description}</p></GalleryDescription>}

        {list.map( (pf: PhotoData) =>

        <PublicGalleryProduct key={pf.id} $isMobile={isMobile} >

            <ImgBox photo={pf} cld={cloudinary} />

            {gallerySelected?.for_sale && 
                <PublicGalleryProductInfo>
                    {!cartList.some( (s: PhotoData) => s.id === pf.id)
                        ? <button onClick={() => addPhoto(pf)} >La quiero ♡</button>
                        : <p style={{color: 'var(--text-dark)'}}>Agregada a tu lista ♥</p>
                    }
                </PublicGalleryProductInfo>
            }
            
        </PublicGalleryProduct>
        )}
    </PublicGalleryContainer>
}
