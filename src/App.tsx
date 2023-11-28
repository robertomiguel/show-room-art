import { useState, useEffect, useMemo } from 'react';
import FireContext from './FireContext';
import Login from './components/login';
import { UserCredential } from "firebase/auth";
import { doc, getDoc, Firestore } from "firebase/firestore";
import { Cart } from './components/cart';
import { Account } from './components/account';
import { Footer } from './components/footer';
import { GalleryControl } from './components/galleryControl';
import { PublicGallery } from './components/publicGallery';
import { PhotoData, Price, PublicSetting, GalleryData, PersonalData, PaginatorData } from './appType';
import { Paginator } from './components/paginator';
import { GallerySelector } from './components/GallerySelector';
import { personal } from './firebase/personal';
import logoimg from './image/logo.svg'
import { PrivateGallery } from './components/privateGallery';
import { Cloudinary } from '@cloudinary/url-gen';
import { PrivatePass } from './components/privatePass';
import { useMediaQuery } from './components/common/useMediaQuery';

const App = ({db, pathName, cloudinary}: {db: Firestore, pathName: string, cloudinary: Cloudinary}) => {

  const [ user, setUser ] = useState<UserCredential['user'] | null>(null)
  
  // Todas de fotos de la galería seleccionada
  const [ photosList, setPhotosList ] = useState<PhotoData[]>([])

  // Paginado
  const [ paginatorData, setPaginatorData ] = useState<PaginatorData>({  
    indexFrom: 1,
    indexTo: 5,
  })
  
  // IDs de las fotos seleccionadas en el admin
  const [ selectedPhotos, setSelectedPhotos ] = useState<string[]>([])
  
  // Lista de fotos agregadas a la lista de pedido
  const [ cartList, setCartList ] = useState<PhotoData[]>([])
  
  // Muestra/oculta el sidesheet de la lista de pedido
  const [ showCartList, setShowCartList ] = useState<boolean>(false)
  
  // revisar - refactor - quitar
  const [ price, setPrice ] = useState<Price>()
  
  // Configuraciones generales del sistema
  const [ publicSetting, setPublicSetting ] = useState<PublicSetting>()
  
  // Listado de las galerías
  const [ galleryList, setGalleryList ] = useState<GalleryData[]>([])

  // Galería seleccionada / vista actual
  const [ gallerySelected, setGallerySelected ] = useState<GalleryData>()

  // Mostrar/ocultas todos los controles del admin en mobile
  const [ showControl, setShowControl ] = useState<boolean>(false)

  // Datos de la galería personal correspondente a galería seleccionada
  const [ personalGallery, setPersonalGallery ] = useState<PersonalData | null>(null)

  // Muestra pedido de Pass cuando la galería personal tiene contraseña
  const [ showAccessPassForm, setShowAccessPassForm ] = useState<boolean>(false)

  const isMobile = useMediaQuery('(max-width: 900px)')

  const getPersonal = async (personalId: string, fireDB: Firestore, password?: string | null) => {
    const pdata: PersonalData | null = await personal(fireDB).getById(personalId, password)
    setPersonalGallery(pdata)
  }

  useEffect(()=>{
    if (pathName && pathName !== '/' && db) {      
      getPersonal(pathName, db)
    }
  },[pathName, db])


  const getSetting = async (fdb: Firestore) => {
    const documentoRef = doc(fdb, "setting", "public")
    const docSnapshot = await getDoc(documentoRef)
    const setting = docSnapshot.data()
    setPublicSetting(setting as PublicSetting)
  }

  useEffect(() => {
    getSetting(db)
  },[db])

  const handleGoHome = () => {
    window.history.pushState({}, "",'/')
    window.location.reload()
  }
  
  // parámetros del context, solo se re actualiza cuando cambia algunos de los datos
  const valueContext = useMemo(()=>{
    return {
      user,
      photosList,
      selectedPhotos,
      cartList,
      showCartList,
      price,
      publicSetting,
      isMobile,
      db,
      gallerySelected,
      galleryList,
      showControl,
      cloudinary,
      showAccessPassForm,
      paginatorData,
      setPaginatorData,
      setShowAccessPassForm,
      setShowControl,
      setPublicSetting,
      setUser,
      setSelectedPhotos,
      setCartList,
      setShowCartList,
      setPrice,
      setGallerySelected,
      setGalleryList,
      setPhotosList,
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  },[user, photosList, selectedPhotos, showAccessPassForm,
    cartList, showCartList, price, isMobile, db, gallerySelected, publicSetting,
    galleryList, showControl, cloudinary, paginatorData])

  return (
    <FireContext.Provider value={valueContext}>
        <div
          style={{
            display: 'flex',
            flexDirection: 'row',
            justifyContent: 'center',
            alignItems: 'center',
            flexWrap: 'wrap',
            position: 'fixed',
            top: 0,
            left: 0,
            right: 0,
            boxShadow: '0px 0px 10px #000000',
            background: '#333333',
            zIndex: 4,
            padding: '5px',
          }}
        >
          <div style={{
            display: 'flex',
            flexDirection: isMobile ? 'column' : 'row',
            justifyContent: 'space-between',
            alignItems: 'center',
            width: '100%',
          }}>

            <div style={{
              display: 'flex',
              flexDirection: 'row',
              justifyContent: 'center',
              alignItems: 'center',
              width: 'auto',
            }} >
              {!isMobile && <div style={{cursor: 'pointer'}} onClick={handleGoHome}><img src={logoimg} alt="logo" style={{width: '50px', padding: '3px'}} /></div>}

              {(pathName === '/' || !pathName) && <GallerySelector />}

              {personalGallery?.title && <div style={{color: 'orange', fontSize: '20px'}} >{personalGallery.title}</div>}
            </div>

            {publicSetting && <Paginator />}

            {!user && gallerySelected?.for_sale && <Cart />}

            {user
              ? <Account />
              : window.location.href.includes('?admin') && <Login />
            }
          </div>
          {user && <div style={{display: 'flex', flexDirection: 'column'}}>
            {(showControl || !isMobile) && <GalleryControl />}
          </div>
          }
        </div>

        {user && <PrivateGallery />}

        {!user &&  <PublicGallery /> }

        {showAccessPassForm && <PrivatePass isLoading={false} onPassSend={(pass)=>getPersonal(pathName, db, pass)} />}

        <Footer />

    </FireContext.Provider>
  )
}

export default App;
