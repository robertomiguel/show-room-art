import React from 'react'
import { EditPhoto } from '.'
import { generateId } from '../common/generateId'
import { ContentModal } from '../common/vamper/contentModal'
import { ModalButtonContainer, ModalImageContainer } from './pGallery.styled'

interface ModalViewProp {
    photo: EditPhoto
    onClose: () => void
}

export const ModalView = ({photo, onClose}: ModalViewProp) => {

    const [ isLoading, setIsLoading ] = React.useState<boolean>(false)

    function forceDownload(url: string, fileName: string){
        const xhr = new XMLHttpRequest();
        xhr.open("GET", url, true);
        xhr.responseType = "blob";
        xhr.onload = function(){
            const urlCreator = window.URL || window.webkitURL;
            const imageUrl = urlCreator.createObjectURL(this.response);
            const tag = document.createElement('a');
            tag.href = imageUrl;
            tag.download = fileName;
            document.body.appendChild(tag);
            tag.click();
            document.body.removeChild(tag);
            setIsLoading(false)
        }
        xhr.send();
    }

    return <ContentModal isOpen={true} onClose={onClose} label='Foto' >
                <ModalImageContainer>
                    <img src={photo.url || ''} alt="foto" />
                </ModalImageContainer>

                <ModalButtonContainer>
                    <button onClick={() => onClose()}>Cerrar</button>
                    <button
                        disabled={isLoading}
                        onClick={e=>{
                            e.preventDefault()
                            e.stopPropagation()
                            setIsLoading(true)
                            forceDownload(photo.url, `photo-${generateId(8)}.jpg`)
                        }}
                    >Descargar</button>
                </ModalButtonContainer>
            </ContentModal>
}