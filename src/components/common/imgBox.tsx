import React from 'react'
import { Cloudinary } from '@cloudinary/url-gen'
import { fill } from '@cloudinary/url-gen/actions/resize'
import { PhotoData } from '../../appType'
import styled from 'styled-components';

const StyledImage = styled.img`
  width: 100%;
  height: 100%;
  object-fit: contain; // cover | contain
  border-radius: 5px;
  max-height: 320px;
`;

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

    return srcImage ? <StyledImage src={srcImage} alt='Foto' /> : <></>

}
