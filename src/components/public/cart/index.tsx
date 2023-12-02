import React from 'react'
import FireContext from 'FireContext'
import { ShowPrice } from './showPrice'
import { CartMain, CartBody, CartFooter, CartOpenButton, CartGalleryContainer, CartProductContainer, CartProductInfo, PromoText, CartEmpty } from './cart.styled'
import { OrderDataForm } from './orderDataForm'
import { ScreenBlackout } from 'components/common/vamper/modal.styled'
import { PhotoData, GalleryData } from 'appType'
import { ImgBox } from 'components/common/imgBox'
import { ContentModal } from 'components/common/vamper/contentModal'
import { HeaderModal } from 'components/common/vamper/headerModal'

export const Cart = () => {

    const { isMobile, cartList, setCartList, showCartList, setShowCartList, price, galleryList, cloudinary } = React.useContext(FireContext)

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
            <fieldset style={{
                padding: 0,
                textAlign: 'center',
                border: 'none',
            }}>
                {!isMobile && <legend>Solicitar fotos</legend>}
                <CartOpenButton $isMobile={isMobile} onClick={handleShow}>
                    Mi selección {`(${cartList.length })`}
                </CartOpenButton>
            </fieldset>

            {showCartList && <ScreenBlackout>
                <CartMain>
                
                    <HeaderModal onClose={() => setShowCartList(false)} label='Mi selección' />

                    <CartBody>
                            <CartGalleryContainer>
                                {cartList.sort((a: PhotoData, b: PhotoData) => a.gallery_id.localeCompare(b.gallery_id))
                                    .map( (photo: PhotoData) =>

                                    <CartProductContainer key={photo.id} >

                                        <ImgBox photo={photo} cld={cloudinary} />

                                        <CartProductInfo>
                                            <p>{galleryList.find( (g: GalleryData) => g.id === photo.gallery_id).name}</p>
                                            <button onClick={() => removePhoto(photo)} >Quitar</button>
                                        </CartProductInfo>
                                        
                                    </CartProductContainer>)}

                            </CartGalleryContainer>

                            <PromoText>Hasta 50% OFF con 6 o más fotos!</PromoText>

                            {cartList.length
                                ? <ShowPrice quantity={cartList.length} />
                                : <CartEmpty>No hay fotos seleccionadas!</CartEmpty>
                            }
                    </CartBody>
                    
                    <CartFooter>
                        <button onClick={handleShow}>Cerrar</button>
                        <button disabled={cartList.length === 0} onClick={() => setShowBuyModal(true)} >Hacer pedido</button>    
                    </CartFooter>

            </CartMain>
        </ScreenBlackout>}

            {showBuyModal && <ContentModal
                isOpen={true}
                onClose={() => setShowBuyModal(false)}
                label='Completar datos de pedido'
            >
                <OrderDataForm
                    customerName={customerName}
                    setCustomerName={setCustomerName}
                    customerEmail={customerEmail}
                    setCustomerEmail={setCustomerEmail}
                    sendMessage={sendMessage}
                />
            </ContentModal>}
        </>
    )
}