import React from 'react'
import {
  Popover,
  PopoverTrigger,
  PopoverContent,
  PopoverHeader,
  PopoverBody,
  PopoverFooter,
  PopoverArrow,
  PopoverCloseButton,
  Button,
} from '@chakra-ui/react'
import FireContext from '../../FireContext'


interface Prop {
  onClose: () => void
  docID: string
}

const ConfirmDelete = ({ onClose, docID }: Prop) => {

  const { uploadPhoto } = React.useContext(FireContext)

  return <Popover>
    <PopoverTrigger>
      <Button colorScheme='red' mr={3} >Eliminar</Button>
    </PopoverTrigger>
    <PopoverContent>
      <PopoverArrow />
      <PopoverCloseButton />
      <PopoverHeader>Eliminación permanente</PopoverHeader>
      <PopoverBody textAlign='center'>
        <Button
          colorScheme='blue'
          mr={3}
          onClick={() => {
            uploadPhoto({
              deleted: true,
              delete_at: new Date(),
              id: docID,
            })
            onClose()
          }}
        >Sí, eliminar!</Button>
        <PopoverFooter>
          (No se puede recuperar)
        </PopoverFooter>
      </PopoverBody>
    </PopoverContent>
  </Popover>
}

export default ConfirmDelete
