import React from 'react'
import {
    Drawer,
    DrawerBody,
    DrawerFooter,
    DrawerHeader,
    DrawerOverlay,
    DrawerContent,
    DrawerCloseButton,
    Button,
    Stack,
    Text,
    Input,
} from '@chakra-ui/react'
import FireContext from '../../FireContext'
import { ShowPrice } from './showPrice'
import { GalleryData, PhotoData } from '../../appType'
import { isEmail } from '../common/emailValidator'
import { ImgBox } from '../common/imgBox'
import { ContentModal } from '../common/vamper/contentModal'

export const Cart = () => {

    const { cartList, setCartList, showCartList, setShowCartList, price, galleryList, cloudinary } = React.useContext(FireContext)

    const handleShow = () => setShowCartList((prev: boolean) => !prev)
    
    const [ showBuyModal, setShowBuyModal ] = React.useState(false)
    const [ customerName, setCustomerName ] = React.useState('')
    const [ customerEmail, setCustomerEmail ] = React.useState('')

    const removePhoto = (pt: PhotoData) => {
        setCartList((prev: PhotoData[]) => prev.filter( f => f !==pt))
    }

    const sendMessage = () => {        
        const files = galleryList.map( (g: GalleryData) => ({
            name: g.name,
            pics: cartList.filter((f: any) => f.gallery_id === g.id).map( (ps: any) => ps.file_name ).sort((a: number, b: number) => a - b).join(',')
          })).filter( (f: any) => f.pics).reduce( (t: string, c: any) => {
            return t + `Galería: ${c.name}%0a${c.pics}%0a`
          },[])          

        const wpMessage =
`
Nombre: ${customerName}%0a
Email: ${customerEmail}%0a
${files}
Importe: $${price.total}
`

        window.open(`https://wa.me/5493412650711?text=${wpMessage}`)
        setShowBuyModal(false)
    }

    return (
        <>
            <Stack
                position={['fixed', 'relative']}
                bottom={[50,'unset']}
                right={['auto', 'unset']}
                left={['auto', 'unset']}
            >
                <Button
                    bg='green'
                    onClick={handleShow}
                    border={['5px solid white','unset']}
                    height={['50px','40px']}
                    fontWeight={[700, 600]}
                    boxShadow={['-1px 0px 19px 8px rgba(0,0,0,0.75);', 'unset']}
                >
                    Mi selección {`(${cartList.length })`}
                </Button>
            </Stack>

            {showCartList && <Drawer
                isOpen={true}
                placement='right'
                onClose={handleShow}
                size='md'
            >
                <DrawerOverlay />
                <DrawerContent>
                    <DrawerCloseButton />
                    <DrawerHeader>Mi selección</DrawerHeader>
                    <DrawerBody>
                        <Stack width='100%' direction='column' alignItems='center' >
                            <Stack width='100%' borderRadius={5} maxHeight='calc(100vh - 350px)' overflowY='scroll' columnGap='10px' border='2px solid white' >
                                {cartList.sort((a: PhotoData, b: PhotoData) => a.gallery_id.localeCompare(b.gallery_id))
                                    .map( (photo: PhotoData) =>
                                    <Stack
                                        key={photo.id}
                                        direction='column'
                                        alignItems='center'
                                        paddingBottom={1}
                                        bg='white'
                                        paddingTop='3px'
                                    >
                                        <div style={{
                                            background: 'black',
                                            width: '100%',
                                            display: 'flex',
                                            justifyContent: 'center',
                                            alignItems: 'center',
                                        }}>
                                            <ImgBox photo={photo} cld={cloudinary} />
                                        </div>
                                        <Stack padding='0 5px' width='100%' direction='row' color='black' justifyContent='space-between' alignItems='center'>
                                            <Text>{galleryList.find( (g: GalleryData) => g.id === photo.gallery_id).name}</Text>
                                            <Button colorScheme='red' onClick={() => removePhoto(photo)} >Quitar</Button>
                                        </Stack>
                                    </Stack>)}
                            </Stack>
                            <Stack width='100%' textAlign='center' color='yellow' >
                                <Text fontSize={20} >Hasta 50% OFF con 6 o más fotos!</Text>
                            </Stack>
                            {cartList.length > 0
                                ? <ShowPrice quantity={cartList.length} />
                                : <Text>No hay fotos seleccionadas!</Text>
                            }
                        </Stack>
                    </DrawerBody>
                    <DrawerFooter justifyContent='space-evenly' >
                        <Button variant='outline' mr={3} onClick={handleShow}>
                            Cerrar
                        </Button>
                        <Button colorScheme='green' isDisabled={cartList.length === 0} onClick={() => setShowBuyModal(true)} >Hacer pedido</Button>
                        <ContentModal
                            isOpen={showBuyModal}
                            onClose={() => setShowBuyModal(false)}
                            label='Completar datos de pedido'
                        >
                            <Stack direction='column' width='100%' height='100%' padding='8px' >
                                <Stack direction='column' spacing={3} >
                                    <Text>Nombre</Text>
                                    <Input value={customerName} onChange={ e => setCustomerName(e.target.value)} />
                                </Stack>
                                <Stack direction='column' spacing={3} >
                                    <Text>Email para recibir las fotos</Text>
                                    <Input value={customerEmail} onChange={ e => setCustomerEmail(e.target.value)} type='email' />
                                </Stack>
                                <Stack color='yellow' marginTop='10px' alignContent='center' alignItems='center' textAlign='center' >
                                    <Text whiteSpace='break-spaces' >El pedido se envía por whatsapps al confirmar.</Text>
                                    <Text>Forma de pago a convenir.</Text>
                                </Stack>
                                <Button
                                    marginTop='20px'
                                    colorScheme='blue'
                                    isDisabled={customerName.trim() === '' || !isEmail(customerEmail)}
                                    onClick={sendMessage} >Confirmar pedido (WSP)</Button>
                            </Stack>
                        </ContentModal>
                    </DrawerFooter>
                </DrawerContent>
            </Drawer>}
        </>
    )
}