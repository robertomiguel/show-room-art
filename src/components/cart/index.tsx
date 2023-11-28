import React from 'react'
import FireContext from '../../FireContext'
import { ShowPrice } from './showPrice'
import { GalleryData, PhotoData } from '../../appType'
import { isEmail } from '../common/emailValidator'
import { ImgBox } from '../common/imgBox'
import { ContentModal } from '../common/vamper/contentModal'
import { HeaderModal } from '../common/vamper/headerModal'

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
            <div style={{
                    position: isMobile ? 'fixed' : 'relative',
                    bottom: isMobile ? 50 : 'unset',
                    right: isMobile ? 'auto' : 'unset',
                    left: isMobile ? 'auto' : 'unset',
                }}
            >
                <button
                    onClick={handleShow}
                    style={{
                        border: isMobile ? '5px solid white' : 'unset',
                        height: isMobile ? '50px' : 'unset',
                        fontWeight: isMobile ? 700 : 'unset',
                        boxShadow: isMobile ? '-1px 0px 19px 8px rgba(0,0,0,0.75)' : 'unset',
                      }}
                >
                    Mi selección {`(${cartList.length })`}
                </button>
            </div>

            {showCartList && <div
                className='shadow'
                style={{
                    position: 'fixed',
                    display: 'flex',
                    flexDirection: 'column',
                    maxWidth: '400px',
                    top: 0,
                    bottom: 0,
                    right: 0,
                    padding: '10px',
                    background: 'var(--background-darker)'
                }}
            >
                
                <div>
                    <HeaderModal
                        onClose={() => setShowCartList(false)}
                        label='Mi selección'
                    />
                    <div style={{overflowY: 'scroll', height: 'calc(100vh - 120px)' }}>
                        <div  style={{
                            width: '100%',
                            display: 'flex',
                            flexDirection: 'column',
                            alignItems: 'center',
                        }}>
                            <div style={{
                                width: '100%',
                                borderRadius: 5,
                                maxHeight: 'calc(100vh - 350px)',
                                overflowY: 'scroll',
                                columnGap: '10px',
                                border: '2px solid white',
                            }}>
                                {cartList.sort((a: PhotoData, b: PhotoData) => a.gallery_id.localeCompare(b.gallery_id))
                                    .map( (photo: PhotoData) =>
                                    <div
                                        key={photo.id}
                                        style={{
                                            display: 'flex',
                                            flexDirection: 'column',
                                            alignItems: 'center',
                                            paddingBottom: 1,
                                            backgroundColor: 'white',
                                            paddingTop: '3px',
                                          }}
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
                                        <div style={{
                                                padding: '0 5px',
                                                width: '100%',
                                                display: 'flex',
                                                flexDirection: 'row',
                                                color: 'black',
                                                justifyContent: 'space-between',
                                                alignItems: 'center',
                                                // Otros estilos aquí
                                            }}>
                                            <div>{galleryList.find( (g: GalleryData) => g.id === photo.gallery_id).name}</div>
                                            <button onClick={() => removePhoto(photo)} >Quitar</button>
                                        </div>
                                    </div>)}
                            </div>
                            <div style={{ width: '100%', textAlign: 'center', color: 'yellow' }} >
                                <div style={{fontSize: '20px', color: 'yellow'}} >Hasta 50% OFF con 6 o más fotos!</div>
                            </div>
                            {cartList.length > 0
                                ? <ShowPrice quantity={cartList.length} />
                                : <div>No hay fotos seleccionadas!</div>
                            }
                        </div>
                    </div>
                    <div style={{
                        display: 'flex',
                        flexDirection: 'row',
                        justifyContent: 'space-evenly',
                        alignItems: 'center',
                        height: '50px',
                    }} >
                        <button onClick={handleShow}>
                            Cerrar
                        </button>
                        <button disabled={cartList.length === 0} onClick={() => setShowBuyModal(true)} >Hacer pedido</button>
                        <ContentModal
                            isOpen={showBuyModal}
                            onClose={() => setShowBuyModal(false)}
                            label='Completar datos de pedido'
                        >
                            <div style={{ display: 'flex', flexDirection: 'column', width: '100%', height: '100%', padding: '8px', maxWidth: '300px', gap: '10px' }} >
                                <div style={{ display: 'flex', flexDirection: 'column', gap: '3px' }} >
                                    <div>Nombre</div>
                                    <input value={customerName} onChange={ e => setCustomerName(e.target.value)} />
                                </div>
                                <div style={{ display: 'flex', flexDirection: 'column', gap: '3px' }}>
                                    <div>Email para recibir las fotos</div>
                                    <input value={customerEmail} onChange={ e => setCustomerEmail(e.target.value)} type='email' />
                                </div>
                                <div style={{ color: 'yellow', marginTop: '10px', alignContent: 'center', alignItems: 'center', textAlign: 'center' }} >
                                    <div style={{whiteSpace: 'break-spaces'}} >El pedido se envía por whatsapps al confirmar.</div>
                                    <div>Forma de pago a convenir.</div>
                                </div>
                                <button
                                    style={{marginTop: '20px'}}
                                    disabled={customerName.trim() === '' || !isEmail(customerEmail)}
                                    onClick={sendMessage} >Confirmar pedido (WSP)</button>
                            </div>
                        </ContentModal>
                    </div>
                </div>
            </div>}
        </>
    )
}