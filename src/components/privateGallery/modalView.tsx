import React from 'react'
import {
    Modal,
    ModalOverlay,
    ModalContent,
    ModalHeader,
    ModalFooter,
    ModalBody,
    ModalCloseButton,
    Button,
  } from '@chakra-ui/react'
import ConfirmDelete from './confirmDelete'
import { EditPhoto } from '.'
import { generateId } from '../common/generateId'

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

    return <Modal isOpen={true} onClose={() => onClose() }>
        <ModalOverlay />
        <ModalContent>
            <ModalHeader>Privada</ModalHeader>
            <ModalCloseButton />
            <ModalBody>
            <img src={photo.url || ''} alt="foto" />
            </ModalBody>

            <ModalFooter>
            {!photo.public && <ConfirmDelete docID={photo.id} onClose={onClose} />}
            <Button colorScheme='blue' mr={3} onClick={() => onClose()}>Cerrar</Button>
            <Button
                isLoading={isLoading}
                // variant='ghost'
                colorScheme='green'
                onClick={e=>{
                e.preventDefault()
                e.stopPropagation()
                setIsLoading(true)
                forceDownload(photo.url, `photo-${generateId(8)}.jpg`)
                }}
            >Descargar</Button>
            </ModalFooter>
        </ModalContent>
    </Modal>
}