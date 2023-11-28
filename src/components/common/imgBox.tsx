import React from 'react'
import { Cloudinary } from '@cloudinary/url-gen'
import { fill } from '@cloudinary/url-gen/actions/resize'
import { PhotoData } from '../../appType'

interface ImgBoxProp {
    photo: PhotoData
    cld: Cloudinary
}

export const ImgBox = ({photo, cld}: ImgBoxProp) => {

  const [ srcImage, setSrcImage ] = React.useState<string>()

  React.useEffect(() => {
    const myImage = cld.image(photo.public_id)
    myImage.resize(fill().height(320))
    setSrcImage(myImage.toURL())
  }, [photo?.public_id, cld])

    return srcImage ? <img style={{borderRadius: '5px'}} src={srcImage} alt='Foto' /> : <></>

}
